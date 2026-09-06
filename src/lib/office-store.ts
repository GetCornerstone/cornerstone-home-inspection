import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AutoReply, InspectionRequest } from "@/lib/auto-reply";

export type PageView = {
  id: string;
  at: string;
  path: string;
  referrer: string;
  title: string;
  ua: string;
  sessionId: string;
};

export type StoredRequest = InspectionRequest & {
  id: string;
  at: string;
  autoReply: AutoReply;
  delivery: "on-site" | "email";
  officeNotified?: boolean;
  officeChannel?: string;
  emailError?: string;
};

export type OfficeStore = {
  pageViews: PageView[];
  requests: StoredRequest[];
};

const MAX_PAGE_VIEWS = 5000;
const FILE_PATH = (() => {
  if (process.env.OFFICE_DATA_DIR) {
    return path.join(process.env.OFFICE_DATA_DIR, "office.json");
  }
  if (process.env.VERCEL) {
    return path.join("/tmp", "cornerstone-office.json");
  }
  return path.join(process.cwd(), "data", "office.json");
})();

let memory: OfficeStore | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function emptyStore(): OfficeStore {
  return { pageViews: [], requests: [] };
}

async function loadStore(): Promise<OfficeStore> {
  if (memory) return memory;
  try {
    const raw = await readFile(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<OfficeStore>;
    memory = {
      pageViews: Array.isArray(parsed.pageViews) ? parsed.pageViews : [],
      requests: Array.isArray(parsed.requests) ? parsed.requests : [],
    };
  } catch {
    memory = emptyStore();
  }
  return memory;
}

async function persist(store: OfficeStore) {
  memory = store;
  writeQueue = writeQueue.then(async () => {
    try {
      await mkdir(path.dirname(FILE_PATH), { recursive: true });
      await writeFile(FILE_PATH, JSON.stringify(store, null, 2), "utf8");
    } catch {
      // Vercel and similar hosts may be read-only; in-memory store still works for this instance.
    }
  });
  await writeQueue;
}

export async function recordPageView(input: Omit<PageView, "id" | "at">) {
  const store = await loadStore();
  store.pageViews.unshift({
    id: randomUUID(),
    at: new Date().toISOString(),
    ...input,
  });
  if (store.pageViews.length > MAX_PAGE_VIEWS) {
    store.pageViews.length = MAX_PAGE_VIEWS;
  }
  await persist(store);
}

export async function recordRequest(
  request: InspectionRequest,
  autoReply: AutoReply,
  delivery: StoredRequest["delivery"],
  extra?: { emailError?: string; officeNotified?: boolean; officeChannel?: string },
) {
  const store = await loadStore();
  const record: StoredRequest = {
    id: randomUUID(),
    at: new Date().toISOString(),
    ...request,
    autoReply,
    delivery,
    officeNotified: extra?.officeNotified,
    officeChannel: extra?.officeChannel,
    emailError: extra?.emailError,
  };
  store.requests.unshift(record);
  await persist(store);
  return record;
}

export async function getOfficeData() {
  const store = await loadStore();
  const pageViews = store.pageViews;
  const requests = store.requests;
  const byPath = new Map<string, number>();
  const byReferrer = new Map<string, number>();
  const sessions = new Set<string>();

  for (const view of pageViews) {
    byPath.set(view.path, (byPath.get(view.path) ?? 0) + 1);
    const referrer = view.referrer || "(direct)";
    byReferrer.set(referrer, (byReferrer.get(referrer) ?? 0) + 1);
    sessions.add(view.sessionId);
  }

  const sortCounts = (map: Map<string, number>) =>
    [...map.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      pageViews: pageViews.length,
      uniqueSessions: sessions.size,
      requests: requests.length,
      emailedReplies: requests.filter((item) => item.delivery === "email").length,
    },
    topPages: sortCounts(byPath),
    topReferrers: sortCounts(byReferrer),
    pageViews,
    requests,
  };
}

export function cookieSettings(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
    secure: process.env.NODE_ENV === "production",
  };
}

export function officePin() {
  return process.env.OFFICE_PIN?.trim() || "cornerstone";
}

export function officeToken() {
  return createHmac("sha256", officePin()).update("cornerstone-office").digest("hex");
}

export function officeCookieValid(value: string | undefined) {
  const expected = officeToken();
  if (!value || value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

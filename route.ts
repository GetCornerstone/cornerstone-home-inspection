import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { cookieSettings, recordPageView } from "@/lib/office-store";

export const runtime = "nodejs";

const SKIP = [/^\/office/, /^\/api\//];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const pathName = String(body.path ?? "").trim() || "/";
    if (SKIP.some((pattern) => pattern.test(pathName))) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const jar = await cookies();
    let sessionId = jar.get("chi_sid")?.value;
    const isNew = !sessionId;
    if (!sessionId) sessionId = randomUUID();

    await recordPageView({
      path: pathName.slice(0, 200),
      referrer: String(body.referrer ?? "").slice(0, 500),
      title: String(body.title ?? "").slice(0, 200),
      ua: request.headers.get("user-agent")?.slice(0, 300) ?? "",
      sessionId,
    });

    const response = NextResponse.json({ ok: true });
    if (isNew) {
      response.cookies.set("chi_sid", sessionId, cookieSettings(60 * 60 * 24 * 180));
    }
    return response;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

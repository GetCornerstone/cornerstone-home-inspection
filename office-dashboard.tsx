"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CountRow = { label: string; count: number };
type PageView = {
  id: string;
  at: string;
  path: string;
  referrer: string;
  title: string;
  ua: string;
  sessionId: string;
};
type StoredRequest = {
  id: string;
  at: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  address: string;
  message: string;
  addons: string[];
  delivery: "on-site" | "email";
  officeNotified?: boolean;
  officeChannel?: string;
  emailError?: string;
  autoReply: { subject: string; fullText: string; topics: string[] };
};
type OfficeData = {
  generatedAt: string;
  totals: {
    pageViews: number;
    uniqueSessions: number;
    requests: number;
    emailedReplies: number;
  };
  topPages: CountRow[];
  topReferrers: CountRow[];
  pageViews: PageView[];
  requests: StoredRequest[];
};

type Tab = "overview" | "pages" | "requests";

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export function OfficeDashboard() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<OfficeData | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setError("");
    const response = await fetch("/api/office/data");
    if (response.status === 401) {
      setAuthed(false);
      setData(null);
      setChecking(false);
      setLoading(false);
      return;
    }
    const payload = (await response.json()) as { ok?: boolean; data?: OfficeData; error?: string };
    if (!response.ok || !payload.ok || !payload.data) {
      throw new Error(payload.error || "Could not load analytics.");
    }
    setAuthed(true);
    setData(payload.data);
    setChecking(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load().catch((err: unknown) => {
      setError(err instanceof Error ? err.message : "Could not load analytics.");
      setChecking(false);
      setLoading(false);
    });
  }, [load]);

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const response = await fetch("/api/office/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    const payload = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !payload.ok) {
      setLoading(false);
      setError(payload.error || "That PIN did not match.");
      return;
    }
    await load();
  }

  async function signOut() {
    await fetch("/api/office/login", { method: "DELETE" });
    setAuthed(false);
    setData(null);
    setPin("");
  }

  function exportJson() {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cornerstone-analytics-${data.generatedAt.slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportCsv() {
    if (!data) return;
    const header = ["at", "path", "referrer", "title", "sessionId"];
    const rows = data.pageViews.map((view) =>
      [view.at, view.path, view.referrer, view.title, view.sessionId]
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cornerstone-pageviews-${data.generatedAt.slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const filteredViews = useMemo(() => {
    if (!data) return [];
    const needle = query.trim().toLowerCase();
    if (!needle) return data.pageViews;
    return data.pageViews.filter((view) =>
      `${view.path} ${view.referrer} ${view.title} ${view.ua}`.toLowerCase().includes(needle),
    );
  }, [data, query]);

  const filteredRequests = useMemo(() => {
    if (!data) return [];
    const needle = query.trim().toLowerCase();
    if (!needle) return data.requests;
    return data.requests.filter((item) =>
      `${item.name} ${item.email} ${item.phone} ${item.subject} ${item.address} ${item.message} ${item.addons.join(" ")} ${item.autoReply.fullText}`
        .toLowerCase()
        .includes(needle),
    );
  }, [data, query]);

  if (checking) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-brand-ink/70">Loading office…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">Office</p>
        <h1 className="mt-3 text-3xl font-bold text-brand-ink">Review site activity</h1>
        <p className="mt-3 text-sm text-brand-ink/70">
          Enter the office PIN to see page views, inspection requests, and every automatic reply.
          New requests are also emailed to GetCornerstoneHI@Gmail.com — check Inbox and Spam.
        </p>
        <form onSubmit={signIn} className="mt-8 border border-black/10 bg-white p-6">
          <Label htmlFor="pin" className="text-xs font-semibold tracking-wide uppercase">
            PIN
          </Label>
          <Input
            id="pin"
            type="password"
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            className="mt-2 h-11 rounded-none"
            autoComplete="current-password"
            required
          />
          {error ? (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button
            type="submit"
            disabled={loading}
            className="mt-6 h-11 w-full rounded-none bg-brand-gold text-white hover:bg-brand-gold/90"
          >
            {loading ? "Opening…" : "Open dashboard"}
          </Button>
        </form>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-brand-ink/70">Loading analytics…</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-brand-cream/40">
      <div className="bg-brand-ink px-4 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-white/60">Office / Analytics</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">All site data</h1>
            <p className="mt-2 text-sm text-white/70">
              Updated {formatWhen(data.generatedAt)}. New inspection requests are emailed to
              GetCornerstoneHI@Gmail.com. Check Inbox and Spam. This on-screen list can reset
              on the hosted site; Gmail is the inbox that lasts.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              className="h-10 rounded-none bg-brand-gold text-white hover:bg-brand-gold/90"
              onClick={exportJson}
            >
              Export JSON
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-none border-white/40 bg-transparent text-white hover:bg-white/10"
              onClick={exportCsv}
            >
              Export page views CSV
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-none border-white/40 bg-transparent text-white hover:bg-white/10"
              onClick={() => void signOut()}
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Page views" value={data.totals.pageViews} />
          <Stat label="Unique sessions" value={data.totals.uniqueSessions} />
          <Stat label="Inspection requests" value={data.totals.requests} />
          <Stat label="Emailed auto-replies" value={data.totals.emailedReplies} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {(
            [
              ["overview", "Overview"],
              ["pages", "Every page view"],
              ["requests", "Requests and replies"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={
                tab === id
                  ? "h-10 rounded-none bg-brand-ink px-4 text-sm font-semibold text-white"
                  : "h-10 rounded-none border border-black/10 bg-white px-4 text-sm font-semibold text-brand-ink"
              }
            >
              {label}
            </button>
          ))}
        </div>

        {tab !== "overview" ? (
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={tab === "pages" ? "Filter page views" : "Filter requests"}
            className="mt-6 h-11 max-w-md rounded-none bg-white"
          />
        ) : null}

        {tab === "overview" ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <CountTable title="Pages" rows={data.topPages} empty="No page views yet. Browse the site, then refresh." />
            <CountTable title="Referrers" rows={data.topReferrers} empty="No referrers recorded yet." />
            <section className="border border-black/10 bg-white lg:col-span-2">
              <h2 className="border-b border-black/10 px-4 py-3 font-semibold text-brand-ink">
                Website QR code
              </h2>
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <Image
                  src="/images/website-qr.png"
                  alt="QR code with Cornerstone house logo for the live website"
                  width={160}
                  height={160}
                  unoptimized
                  className="size-40 shrink-0 bg-white"
                />
                <div>
                  <p className="text-sm leading-relaxed text-brand-ink/70">
                    Scan this with a phone camera to open the live site. Download the
                    square image for business cards, or open the print page for a flyer.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href="/images/website-qr.png"
                      download="cornerstone-website-qr.png"
                      className="inline-flex h-10 items-center bg-brand-gold px-4 text-sm font-semibold text-white"
                    >
                      Download QR
                    </a>
                    <a
                      href="/qr"
                      className="inline-flex h-10 items-center border border-black/10 px-4 text-sm font-semibold text-brand-ink"
                    >
                      Print page
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : null}

        {tab === "pages" ? (
          <div className="mt-8 overflow-x-auto border border-black/10 bg-white">
            {filteredViews.length === 0 ? (
              <p className="p-6 text-sm text-brand-ink/70">No page views match that filter.</p>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead className="bg-brand-ink text-white">
                  <tr>
                    <th className="px-3 py-2 font-medium">When</th>
                    <th className="px-3 py-2 font-medium">Page</th>
                    <th className="px-3 py-2 font-medium">Referrer</th>
                    <th className="px-3 py-2 font-medium">Session</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredViews.map((view) => (
                    <tr key={view.id} className="border-t border-black/5">
                      <td className="px-3 py-2 whitespace-nowrap text-brand-ink/80">{formatWhen(view.at)}</td>
                      <td className="px-3 py-2">{view.path}</td>
                      <td className="px-3 py-2 text-brand-ink/70">{view.referrer || "(direct)"}</td>
                      <td className="px-3 py-2 font-mono text-xs">{view.sessionId.slice(0, 8)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : null}

        {tab === "requests" ? (
          <div className="mt-8 space-y-4">
            {filteredRequests.length === 0 ? (
              <p className="border border-black/10 bg-white p-6 text-sm text-brand-ink/70">
                No inspection requests yet. Submit the schedule form to see the auto-reply land here.
              </p>
            ) : (
              filteredRequests.map((item) => (
                <article key={item.id} className="border border-black/10 bg-white p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-brand-ink">{item.name}</h2>
                      <p className="text-sm text-brand-ink/70">
                        {item.email} · {item.phone} · {formatWhen(item.at)}
                      </p>
                    </div>
                    <p className="text-xs font-semibold tracking-wide text-brand-gold uppercase">
                      {item.officeNotified
                        ? item.officeChannel === "formsubmit-pending"
                          ? "Check Gmail to confirm email"
                          : "Emailed to office"
                        : item.delivery === "email"
                          ? "Client emailed"
                          : "Saved on site"}
                    </p>
                  </div>
                  <p className="mt-3 text-sm">
                    <span className="font-semibold">Subject:</span> {item.subject}
                  </p>
                  {item.address ? (
                    <p className="text-sm">
                      <span className="font-semibold">Address:</span> {item.address}
                    </p>
                  ) : null}
                  {item.addons.length > 0 ? (
                    <p className="text-sm">
                      <span className="font-semibold">Add-ons:</span> {item.addons.join(", ")}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-brand-ink/80">{item.message}</p>
                  {item.emailError ? (
                    <p className="mt-2 text-sm text-destructive">Email note: {item.emailError}</p>
                  ) : null}
                  <pre className="mt-4 overflow-auto whitespace-pre-wrap bg-brand-cream p-4 text-sm leading-relaxed">
                    {item.autoReply.fullText}
                  </pre>
                </article>
              ))
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-black/10 bg-white p-5">
      <p className="text-xs font-semibold tracking-wide text-brand-gold uppercase">{label}</p>
      <p className="mt-2 text-3xl font-bold text-brand-ink">{value}</p>
    </div>
  );
}

function CountTable({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: CountRow[];
  empty: string;
}) {
  return (
    <section className="border border-black/10 bg-white">
      <h2 className="border-b border-black/10 px-4 py-3 font-semibold text-brand-ink">{title}</h2>
      {rows.length === 0 ? (
        <p className="p-4 text-sm text-brand-ink/70">{empty}</p>
      ) : (
        <ul>
          {rows.map((row) => (
            <li key={row.label} className="flex justify-between gap-4 border-t border-black/5 px-4 py-2 text-sm">
              <span className="truncate">{row.label}</span>
              <span className="font-semibold">{row.count}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

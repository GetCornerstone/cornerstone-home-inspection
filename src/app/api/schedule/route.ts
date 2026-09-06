import { NextResponse } from "next/server";
import { composeAutoReply } from "@/lib/auto-reply";
import { recordRequest } from "@/lib/office-store";
import { sendAutoReplyEmail } from "@/lib/send-email";

export const runtime = "nodejs";

function asAddons(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();
    const subject = String(body.subject ?? "Schedule a home inspection").trim();
    const address = String(body.address ?? "").trim();
    const addons = asAddons(body.addons);

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill in your name, email, phone, and message." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const payload = { name, email, phone, subject, address, message, addons };
    const autoReply = composeAutoReply(payload);

    let delivery: "on-site" | "email" = "on-site";
    let emailError: string | undefined;
    try {
      const result = await sendAutoReplyEmail(email, autoReply);
      if (result.sent) delivery = "email";
    } catch (error) {
      emailError = error instanceof Error ? error.message : "Email send failed.";
    }

    await recordRequest(payload, autoReply, delivery, emailError);

    return NextResponse.json({
      ok: true,
      delivery,
      autoReply,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that request. Please call the office." },
      { status: 400 },
    );
  }
}

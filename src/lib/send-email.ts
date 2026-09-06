import { business } from "@/lib/business";
import type { InspectionRequest } from "@/lib/auto-reply";

export type NotifyResult = {
  notified: boolean;
  channel: "resend" | "none";
  error?: string;
};

function officeInbox() {
  return process.env.NOTIFY_EMAIL?.trim() || business.email;
}

export function formatOfficeNotice(request: InspectionRequest) {
  const addons = request.addons.length ? request.addons.join(", ") : "None";
  return [
    "New inspection request from the Cornerstone website.",
    "",
    `Name: ${request.name}`,
    `Email: ${request.email}`,
    `Phone: ${request.phone}`,
    `Subject: ${request.subject}`,
    `Address: ${request.address || "(not provided)"}`,
    `Add-ons: ${addons}`,
    "",
    "Message:",
    request.message,
    "",
    `Reply to the client at ${request.email} or call ${request.phone}.`,
    `Office page: ${business.websiteUrl}/office`,
  ].join("\n");
}

export async function notifyOffice(request: InspectionRequest): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { notified: false, channel: "none" };
  }

  try {
    await sendResend({
      apiKey,
      to: officeInbox(),
      replyTo: request.email,
      subject: `New inspection request from ${request.name}`,
      text: formatOfficeNotice(request),
    });
    return { notified: true, channel: "resend" };
  } catch (error) {
    return {
      notified: false,
      channel: "none",
      error: error instanceof Error ? error.message : "Office email failed.",
    };
  }
}

export async function sendAutoReplyEmail(to: string, reply: { subject: string; fullText: string }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { sent: false as const };
  }

  await sendResend({
    apiKey,
    to,
    replyTo: officeInbox(),
    subject: reply.subject,
    text: reply.fullText,
  });
  return { sent: true as const };
}

async function sendResend(input: {
  apiKey: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM?.trim() || `${business.inspector} <onboarding@resend.dev>`,
      to: [input.to],
      reply_to: input.replyTo,
      subject: input.subject,
      text: input.text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail.slice(0, 300) || "Email provider rejected the message.");
  }
}

import { business } from "@/lib/business";

export async function sendAutoReplyEmail(to: string, reply: { subject: string; fullText: string }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { sent: false as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM?.trim() || `${business.inspector} <onboarding@resend.dev>`,
      to: [to, business.email],
      subject: reply.subject,
      text: reply.fullText,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail.slice(0, 300) || "Email provider rejected the message.");
  }

  return { sent: true as const };
}

import { business } from "@/lib/business";

export async function notifyOfficeFromBrowser(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  address: string;
  message: string;
  addons: string[];
}) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(business.email)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `New inspection request from ${input.name}`,
        _template: "box",
        _captcha: "false",
        _replyto: input.email,
        name: input.name,
        email: input.email,
        phone: input.phone,
        subject: input.subject,
        address: input.address || "(not provided)",
        addons: input.addons.length ? input.addons.join(", ") : "None",
        message: input.message,
      }),
    },
  );

  const payload = (await response.json().catch(() => ({}))) as {
    success?: string | boolean;
    message?: string;
  };
  const text = `${payload.success ?? ""} ${payload.message ?? ""}`.toLowerCase();
  const pending =
    text.includes("activate") || text.includes("confirm") || text.includes("check your email");
  const success =
    payload.success === true ||
    payload.success === "true" ||
    pending ||
    response.ok;

  return { ok: Boolean(success), pending };
}

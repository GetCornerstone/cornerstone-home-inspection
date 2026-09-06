"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { business, scheduleAddons, scheduleSubjects } from "@/lib/business";
import type { AutoReply } from "@/lib/auto-reply";

export function ScheduleForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState<AutoReply | null>(null);
  const [delivery, setDelivery] = useState<"on-site" | "email" | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const addons = formData.getAll("addons").map(String);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, addons }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        autoReply?: AutoReply;
        delivery?: "on-site" | "email";
      };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Something went wrong.");
      }
      setReply(payload.autoReply ?? null);
      setDelivery(payload.delivery ?? "on-site");
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not send that. Please call or email instead.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-brand-ink/10 bg-white p-8">
        <p className="font-heading text-sm tracking-[0.2em] text-brand-gold uppercase">
          Request received
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-brand-ink">
          Here is your automatic reply
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">
          {delivery === "email"
            ? "A copy was also emailed to you and to the office."
            : "John will follow up in person. If email sending is connected later, replies will go out automatically as well."}{" "}
          For a same-day answer, call or text{" "}
          <a className="font-semibold text-brand-gold" href={`tel:${business.phoneTel}`}>
            {business.phone}
          </a>
          .
        </p>
        {reply ? (
          <pre className="mt-6 max-h-80 overflow-auto whitespace-pre-wrap border border-brand-ink/10 bg-brand-cream p-4 text-sm leading-relaxed text-brand-ink">
            {reply.fullText}
          </pre>
        ) : null}
        <Button
          className="mt-6 h-10 rounded-none bg-brand-ink text-white hover:bg-brand-ink/90"
          onClick={() => {
            setStatus("idle");
            setReply(null);
            setDelivery(null);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-brand-ink/10 bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <Input id="name" name="name" required className="h-11 rounded-none" />
        </Field>
        <Field label="Email address" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="h-11 rounded-none"
          />
        </Field>
        <Field label="Phone number" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" required className="h-11 rounded-none" />
        </Field>
        <Field label="Subject" htmlFor="subject">
          <select
            id="subject"
            name="subject"
            required
            defaultValue="Schedule a home inspection"
            className="h-11 w-full rounded-none border border-input bg-transparent px-2.5 text-sm"
          >
            {scheduleSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Property address (optional)" htmlFor="address" className="sm:col-span-2">
          <Input id="address" name="address" className="h-11 rounded-none" />
        </Field>
        <fieldset className="sm:col-span-2">
          <legend className="mb-2 text-xs font-semibold tracking-wide uppercase">
            Add-on services
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {scheduleAddons.map((addon) => (
              <label key={addon} className="flex items-center gap-2 text-sm text-brand-ink/80">
                <input type="checkbox" name="addons" value={addon} className="size-4" />
                {addon}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Message" htmlFor="message" className="sm:col-span-2">
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            className="min-h-32 rounded-none"
            placeholder="Tell us the city, closing timeline, and which add-ons you want: thermal, drone, wood-destroying insects, radon, mold, or lawn irrigation."
          />
        </Field>
      </div>
      {status === "error" ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 h-12 w-full rounded-none bg-brand-gold text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-gold/90 sm:w-auto sm:px-8"
      >
        {status === "submitting" ? "Sending…" : "Submit"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className="mb-1.5 text-xs font-semibold tracking-wide uppercase">
        {label}
      </Label>
      {children}
    </div>
  );
}

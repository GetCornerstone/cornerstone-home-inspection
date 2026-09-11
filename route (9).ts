import { NextResponse } from "next/server";
import { cookieSettings, officePin, officeToken } from "@/lib/office-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { pin?: string };
    const pin = String(body.pin ?? "");
    if (pin !== officePin()) {
      return NextResponse.json({ ok: false, error: "That PIN did not match." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("chi_office", officeToken(), cookieSettings(60 * 60 * 24 * 14));
    return response;
  } catch {
    return NextResponse.json({ ok: false, error: "Could not sign in." }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("chi_office", "", { path: "/", maxAge: 0 });
  return response;
}

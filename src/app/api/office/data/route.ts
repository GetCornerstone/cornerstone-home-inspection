import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getOfficeData, officeCookieValid } from "@/lib/office-store";

export const runtime = "nodejs";

export async function GET() {
  const jar = await cookies();
  if (!officeCookieValid(jar.get("chi_office")?.value)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  const data = await getOfficeData();
  return NextResponse.json({ ok: true, data });
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.CAKTO_WEBHOOK_SECRET;
  const receivedSecret =
    request.headers.get("x-cakto-webhook-secret") ??
    request.headers.get("x-cakto-secret") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (secret && receivedSecret !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  console.log("[cakto:webhook]", payload);

  return NextResponse.json({ ok: true }, { status: 200 });
}


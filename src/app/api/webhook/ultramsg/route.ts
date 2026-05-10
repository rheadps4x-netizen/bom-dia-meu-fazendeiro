import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (token !== process.env.ULTRAMSG_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // TODO: persistir mensagens recebidas no Supabase e despachar handlers
  console.log("[ultramsg webhook]", payload);

  return NextResponse.json({ ok: true });
}

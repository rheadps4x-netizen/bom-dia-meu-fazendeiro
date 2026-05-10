import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWhatsAppMessage } from "@/lib/ultramsg/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: fazendeiros, error } = await supabase
    .from("fazendeiros")
    .select("id, nome, telefone")
    .eq("ativo", true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = await Promise.allSettled(
    (fazendeiros ?? []).map((f) =>
      sendWhatsAppMessage({
        to: f.telefone,
        body: `Bom dia, ${f.nome}! Que seu dia na fazenda seja produtivo. 🌾`,
      }),
    ),
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.length - sent;

  return NextResponse.json({
    ok: true,
    total: results.length,
    sent,
    failed,
    timestamp: new Date().toISOString(),
  });
}

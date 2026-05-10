import { NextResponse } from "next/server";
import { z } from "zod";
import { getAnalyticsStats, recordAnalyticsEvent } from "@/lib/analytics-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const eventSchema = z.object({
  type: z.enum(["visit", "click"]),
  plan: z.enum(["teste", "premium", "personalizado"]).optional(),
  path: z.string().optional(),
  referrer: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await recordAnalyticsEvent({
    ...parsed.data,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const expectedToken = process.env.METRICS_TOKEN;

  if (expectedToken && token !== expectedToken) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json(await getAnalyticsStats(), { status: 200 });
}


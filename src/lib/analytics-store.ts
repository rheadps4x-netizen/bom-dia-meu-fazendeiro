import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { createClient } from "@supabase/supabase-js";

export type AnalyticsEventType = "visit" | "click";
export type AnalyticsPlan = "teste" | "premium" | "personalizado";

export type AnalyticsEvent = {
  type: AnalyticsEventType;
  plan?: AnalyticsPlan;
  path?: string;
  referrer?: string;
  userAgent?: string;
  createdAt?: string;
};

export type AnalyticsStats = {
  visits: number;
  clicks: Record<AnalyticsPlan, number>;
  totalClicks: number;
  updatedAt: string;
  storage: "supabase" | "local";
};

const plans: AnalyticsPlan[] = ["teste", "premium", "personalizado"];
const localFile = path.join(os.tmpdir(), "bom-dia-meu-fazendeiro-analytics.jsonl");

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

function createAnalyticsClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}

export async function recordAnalyticsEvent(event: AnalyticsEvent) {
  const normalized: AnalyticsEvent = {
    ...event,
    createdAt: event.createdAt ?? new Date().toISOString(),
  };

  if (hasSupabaseConfig()) {
    const supabase = createAnalyticsClient();
    const { error } = await supabase.from("landing_analytics_events").insert({
      event_type: normalized.type,
      plan: normalized.plan ?? null,
      path: normalized.path ?? null,
      referrer: normalized.referrer ?? null,
      user_agent: normalized.userAgent ?? null,
      created_at: normalized.createdAt,
    });

    if (!error) {
      return "supabase" as const;
    }

    console.warn("[analytics] Supabase insert failed, using local fallback", error);
  }

  await fs.appendFile(localFile, `${JSON.stringify(normalized)}\n`, "utf8");
  return "local" as const;
}

export async function getAnalyticsStats(): Promise<AnalyticsStats> {
  if (hasSupabaseConfig()) {
    const supabase = createAnalyticsClient();
    const { data, error } = await supabase
      .from("landing_analytics_events")
      .select("event_type, plan")
      .limit(10000);

    if (!error && data) {
      return buildStats(
        data.map((item) => ({
          type: item.event_type as AnalyticsEventType,
          plan: item.plan as AnalyticsPlan | undefined,
        })),
        "supabase",
      );
    }

    console.warn("[analytics] Supabase read failed, using local fallback", error);
  }

  try {
    const content = await fs.readFile(localFile, "utf8");
    const events = content
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as AnalyticsEvent);

    return buildStats(events, "local");
  } catch {
    return buildStats([], "local");
  }
}

function buildStats(
  events: Pick<AnalyticsEvent, "type" | "plan">[],
  storage: AnalyticsStats["storage"],
): AnalyticsStats {
  const clicks = plans.reduce(
    (acc, plan) => ({ ...acc, [plan]: 0 }),
    {} as Record<AnalyticsPlan, number>,
  );
  let visits = 0;

  for (const event of events) {
    if (event.type === "visit") {
      visits += 1;
    }

    if (event.type === "click" && event.plan && event.plan in clicks) {
      clicks[event.plan] += 1;
    }
  }

  return {
    visits,
    clicks,
    totalClicks: clicks.teste + clicks.premium + clicks.personalizado,
    updatedAt: new Date().toISOString(),
    storage,
  };
}


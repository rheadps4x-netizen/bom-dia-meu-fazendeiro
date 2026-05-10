import { BarChart3, MousePointerClick, ShoppingCart, Users } from "lucide-react";
import { getAnalyticsStats } from "@/lib/analytics-store";

export const dynamic = "force-dynamic";

type MetricsPageProps = {
  searchParams: {
    token?: string;
  };
};

const labels = {
  teste: "R$ 5",
  premium: "Premium",
  personalizado: "Personalizado",
};

export default async function MetricsPage({ searchParams }: MetricsPageProps) {
  const expectedToken = process.env.METRICS_TOKEN;
  const canView =
    !expectedToken ||
    searchParams.token === expectedToken ||
    process.env.NODE_ENV === "development";

  if (!canView) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream-50 px-6 text-center text-ink-900">
        <div>
          <h1 className="font-serif text-3xl">Acesso restrito</h1>
          <p className="mt-3 text-sm text-ink-700">
            Abra esta página usando o token definido em METRICS_TOKEN.
          </p>
        </div>
      </main>
    );
  }

  const stats = await getAnalyticsStats();
  const conversionRate =
    stats.visits > 0 ? ((stats.totalClicks / stats.visits) * 100).toFixed(1) : "0.0";

  return (
    <main className="min-h-screen bg-cream-50 px-5 py-10 text-ink-900 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-4 border-b border-cream-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra-600">
              Métricas
            </p>
            <h1 className="mt-2 font-serif text-4xl">Visitas e cliques</h1>
          </div>
          <p className="text-sm text-ink-500">
            Fonte: {stats.storage} · Atualizado em{" "}
            {new Date(stats.updatedAt).toLocaleString("pt-BR")}
          </p>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <MetricCard
            icon={Users}
            label="Visitas"
            value={stats.visits.toString()}
          />
          <MetricCard
            icon={MousePointerClick}
            label="Cliques em checkout"
            value={stats.totalClicks.toString()}
          />
          <MetricCard
            icon={ShoppingCart}
            label="Taxa clique/visita"
            value={`${conversionRate}%`}
          />
        </section>

        <section className="mt-8 rounded-2xl bg-white/80 p-6 shadow-card ring-1 ring-cream-200">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-terra-600" />
            <h2 className="font-serif text-2xl">Cliques por opção</h2>
          </div>

          <div className="mt-6 space-y-4">
            {Object.entries(stats.clicks).map(([plan, count]) => {
              const width =
                stats.totalClicks > 0
                  ? Math.max((count / stats.totalClicks) * 100, count > 0 ? 8 : 0)
                  : 0;

              return (
                <div key={plan}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink-900">
                      {labels[plan as keyof typeof labels]}
                    </span>
                    <span className="text-ink-600">{count} cliques</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-cream-100">
                    <div
                      className="h-full rounded-full bg-terra-500 transition-all"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/80 p-6 shadow-card ring-1 ring-cream-200">
      <Icon className="h-5 w-5 text-terra-600" />
      <p className="mt-5 text-sm text-ink-600">{label}</p>
      <p className="mt-1 font-serif text-4xl text-ink-900">{value}</p>
    </div>
  );
}


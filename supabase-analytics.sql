create table if not exists public.landing_analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('visit', 'click')),
  plan text check (plan in ('teste', 'premium', 'personalizado')),
  path text,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists landing_analytics_events_created_at_idx
  on public.landing_analytics_events (created_at desc);

create index if not exists landing_analytics_events_type_plan_idx
  on public.landing_analytics_events (event_type, plan);


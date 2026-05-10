"use client";

import {
  Check,
  Sparkles,
  Star,
  Crown,
  CircleDollarSign,
  CalendarX,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { openCaktoCheckout, type CaktoCheckoutKey } from "@/lib/cakto";
import { trackCheckoutClick } from "@/lib/tracking";

type Plano = {
  id: string;
  nome: string;
  preco: string;
  precoSufixo: string;
  descricao: string;
  features: string[];
  cta: string;
  destaque?: boolean;
  badge?: string;
  iconBadge?: typeof Sparkles;
  checkout: CaktoCheckoutKey;
};

const planos: Plano[] = [
  {
    id: "teste",
    nome: "Teste",
    preco: "R$ 5",
    precoSufixo: "por 7 dias",
    descricao: "Para sentir o tom da nossa palavra antes de assinar.",
    features: [
      "7 mensagens diárias no WhatsApp",
      "Horário escolhido por você",
      "Sem renovação automática",
      "Sem cartão para começar",
    ],
    cta: "Começar por R$ 5",
    checkout: "teste",
  },
  {
    id: "premium",
    nome: "Premium",
    preco: "R$ 14,90",
    precoSufixo: "/mês",
    descricao: "O acolhimento diário completo, para transformar suas manhãs.",
    features: [
      "Mensagem diária todos os dias do mês",
      "Áudio gravado aos domingos",
      "Devocional em datas marcantes",
      "Grupo VIP de mulheres no WhatsApp",
      "Cancele quando quiser, sem multa",
    ],
    cta: "Quero o Premium",
    destaque: true,
    badge: "Mais escolhido",
    iconBadge: Sparkles,
    checkout: "premium",
  },
  {
    id: "personalizado",
    nome: "Personalizado",
    preco: "R$ 24,90",
    precoSufixo: "/mês",
    descricao: "Uma palavra feita à mão, conhecendo a sua história.",
    features: [
      "Conversa inicial de 30 minutos",
      "Mensagens escritas para a sua jornada",
      "Acompanhamento mensal individual",
      "Tudo do Premium incluído",
      "Resposta personalizada quando você escreve",
    ],
    cta: "Quero o Personalizado",
    iconBadge: Crown,
    checkout: "personalizado",
  },
];

export function Planos() {
  return (
    <section
      id="planos"
      className="relative overflow-hidden bg-gradient-to-b from-cream-100/40 to-cream-50 py-16 sm:py-32"
    >
      <Container>
        <SectionTitle
          eyebrow="Planos"
          title={
            <>
              Escolha o jeito de receber{" "}
              <em className="italic text-terra-600">o seu bom dia.</em>
            </>
          }
          description="Comece testando por R$ 5. Se fizer sentido, você fica. Se não, ninguém te cobra mais nada."
        />

        <Stagger
          amount={0.1}
          className="mt-12 grid items-stretch gap-6 md:mt-20 md:grid-cols-3 md:gap-8"
        >
          {planos.map((plano) => (
            <StaggerItem key={plano.id} className="flex">
              <PlanoCard plano={plano} />
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger
          amount={0.1}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
        >
          {garantias.map((g) => (
            <StaggerItem key={g.title}>
              <GarantiaCard {...g} />
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-sage-600" strokeWidth={3} />
            Pagamento seguro
          </span>
          <span className="text-cream-300">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-sage-600" strokeWidth={3} />
            Pix, cartão ou boleto
          </span>
          <span className="text-cream-300">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-sage-600" strokeWidth={3} />
            Dados protegidos
          </span>
        </p>
      </Container>
    </section>
  );
}

type Garantia = {
  icon: LucideIcon;
  title: string;
  body: string;
  tint: string;
  iconColor: string;
};

const garantias: Garantia[] = [
  {
    icon: CircleDollarSign,
    title: "R$ 5 para testar",
    body: "Você testa por R$ 5 e decide se quer continuar.",
    tint: "from-terra-400/20 to-terra-500/10",
    iconColor: "text-terra-600",
  },
  {
    icon: CalendarX,
    title: "Sem fidelidade",
    body: "Pode cancelar quando quiser, em um clique.",
    tint: "from-sage-100 to-sage-200/50",
    iconColor: "text-sage-600",
  },
  {
    icon: ShieldCheck,
    title: "Garantia de 7 dias",
    body: "Se não sentir diferença, a gente devolve seu dinheiro.",
    tint: "from-rose-100 to-rose-300/40",
    iconColor: "text-rose-500",
  },
  {
    icon: Users,
    title: "Atendimento humano",
    body: "Gente de verdade lê e responde — não é robô.",
    tint: "from-cream-200 to-cream-300/60",
    iconColor: "text-terra-600",
  },
];

function GarantiaCard({ icon: Icon, title, body, tint, iconColor }: Garantia) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl bg-white/70 p-6 shadow-card ring-1 ring-cream-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft hover:ring-terra-500/20">
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tint} ${iconColor} ring-1 ring-inset ring-white/40 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </div>
      <h4 className="font-serif text-lg text-ink-900">{title}</h4>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-700">{body}</p>
      <span className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-terra-400/0 to-rose-300/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-hover:from-terra-400/20 group-hover:to-rose-300/15" />
    </div>
  );
}

function PlanoCard({ plano }: { plano: Plano }) {
  const destaque = plano.destaque;
  const BadgeIcon = plano.iconBadge;

  return (
    <div
      className={`relative mt-5 flex w-full flex-col rounded-3xl p-8 ring-1 transition-all duration-300 ${
        destaque
          ? "bg-gradient-to-br from-ink-900 via-ink-900 to-[#3b2a1f] text-cream-50 ring-ink-900 shadow-glow hover:-translate-y-2 hover:shadow-[0_32px_80px_-34px_rgba(122,62,44,0.95)] md:scale-[1.04]"
          : "bg-white/80 text-ink-900 ring-cream-200 shadow-card backdrop-blur-sm hover:-translate-y-1.5 hover:bg-white hover:shadow-soft"
      }`}
    >
      {/* Decorative gradient orb on premium */}
      {destaque && (
        <>
          <span className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-terra-500/30 blur-3xl" />
          <span className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-rose-500/20 blur-3xl" />
        </>
      )}

      {plano.badge && (
        <span className="absolute -top-5 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-terra-500 px-5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_10px_24px_-14px_rgba(122,62,44,0.75)]">
          {BadgeIcon && <BadgeIcon className="h-3 w-3" />}
          {plano.badge}
        </span>
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-2">
          {BadgeIcon && !plano.badge && (
            <BadgeIcon
              className={`h-4 w-4 ${
                destaque ? "text-terra-400" : "text-terra-500"
              }`}
            />
          )}
          <h3
            className={`font-serif text-2xl ${
              destaque ? "text-cream-50" : "text-ink-900"
            }`}
          >
            {plano.nome}
          </h3>
        </div>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            destaque ? "text-cream-100/80" : "text-ink-700"
          }`}
        >
          {plano.descricao}
        </p>
      </div>

      <div className="relative z-10 mt-7 flex items-end gap-2">
        <span className="font-serif text-5xl font-semibold leading-none">
          {plano.preco}
        </span>
        <span
          className={`pb-1.5 text-sm ${
            destaque ? "text-cream-100/70" : "text-ink-500"
          }`}
        >
          {plano.precoSufixo}
        </span>
      </div>

      <ul className="relative z-10 mt-8 flex-1 space-y-3.5">
        {plano.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-[15px] leading-relaxed"
          >
            <span
              className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                destaque
                  ? "bg-terra-500/20 text-terra-300 ring-1 ring-inset ring-terra-400/30"
                  : "bg-sage-100 text-sage-600"
              }`}
            >
              <Check className="h-3 w-3" strokeWidth={3.5} />
            </span>
            <span className={destaque ? "text-cream-100/90" : "text-ink-700"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        variant={destaque ? "primary" : "secondary"}
        size="lg"
        className="relative z-10 mt-9 w-full"
        onClick={() => {
          trackCheckoutClick(plano.checkout);
          openCaktoCheckout(plano.checkout);
        }}
      >
        {plano.cta}
      </Button>

      {destaque && (
        <div className="relative z-10 mt-4 flex items-center justify-center gap-1 text-xs text-cream-100/70">
          <Star className="h-3 w-3 fill-current text-terra-400" strokeWidth={0} />
          Garantia de 7 dias ou seu dinheiro de volta
        </div>
      )}
    </div>
  );
}

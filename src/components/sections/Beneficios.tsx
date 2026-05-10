"use client";

import {
  HeartHandshake,
  Sunrise,
  MessageCircleHeart,
  Sparkles,
  ShieldCheck,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

type Beneficio = {
  icon: LucideIcon;
  title: string;
  body: string;
  iconBg: string;
  iconColor: string;
};

const beneficios: Beneficio[] = [
  {
    icon: Sunrise,
    title: "Acorda com propósito",
    body: "Uma palavra no horário que você escolhe — antes do café, do trabalho, do barulho. O dia começa do jeito certo.",
    iconBg: "from-terra-400/20 to-terra-500/10",
    iconColor: "text-terra-600",
  },
  {
    icon: HeartHandshake,
    title: "Sente-se acolhida de verdade",
    body: "Não é frase de auto-ajuda. É uma palavra escrita à mão, por quem entende a sua fase da vida.",
    iconBg: "from-rose-100 to-rose-300/40",
    iconColor: "text-rose-500",
  },
  {
    icon: MessageCircleHeart,
    title: "Pode responder, e a gente lê",
    body: "Conte o que está sentindo. Aqui você não é número — é nome, é história, é gente.",
    iconBg: "from-sage-100 to-sage-200/60",
    iconColor: "text-sage-600",
  },
  {
    icon: Flower2,
    title: "Cultivada para a sua fase",
    body: "Os 40, 50, 60 trazem uma sabedoria que merece ser regada. Nossas palavras são feitas para esse solo.",
    iconBg: "from-rose-100 to-terra-400/20",
    iconColor: "text-terra-600",
  },
  {
    icon: Sparkles,
    title: "Pequena, mas que muda o dia",
    body: "São 30 segundos de leitura. Mas o efeito dura horas — e, com o tempo, muda como você se enxerga.",
    iconBg: "from-cream-200 to-cream-300/60",
    iconColor: "text-terra-600",
  },
  {
    icon: ShieldCheck,
    title: "Sem fidelidade, sem letrinha",
    body: "Comece com R$ 5. Se não fizer sentido, você sai com um clique. Nada de prender ninguém.",
    iconBg: "from-sage-100 to-sage-200/60",
    iconColor: "text-sage-600",
  },
];

export function Beneficios() {
  return (
    <section id="beneficios" className="relative py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="Benefícios"
          title={
            <>
              Mais do que uma mensagem.{" "}
              <em className="italic text-terra-600">Um cuidado diário.</em>
            </>
          }
          description="Pensado para a mulher que dá demais — e que merece, todos os dias, receber um pouco de volta."
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((b) => (
            <StaggerItem key={b.title}>
              <BeneficioCard {...b} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function BeneficioCard({ icon: Icon, title, body, iconBg, iconColor }: Beneficio) {
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl bg-white/70 p-7 shadow-card ring-1 ring-cream-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-soft hover:ring-terra-500/20">
      <div
        className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBg} ${iconColor} ring-1 ring-inset ring-white/40 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]`}
      >
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>
      <h3 className="font-serif text-xl text-ink-900 sm:text-[22px]">
        {title}
      </h3>
      <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-ink-700">
        {body}
      </p>

      <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-terra-400/0 to-rose-300/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-hover:from-terra-400/20 group-hover:to-rose-300/20" />
    </div>
  );
}

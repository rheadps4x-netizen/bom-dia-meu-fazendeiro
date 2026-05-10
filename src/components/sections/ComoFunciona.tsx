"use client";

import { ClipboardList, Clock, Send, MessageSquareHeart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Você escolhe um plano",
    body: "Comece com R$ 5 e teste por 7 dias. Sem fidelidade, sem letrinha miúda.",
  },
  {
    number: "02",
    icon: Clock,
    title: "A gente combina o horário",
    body: "5h30, 6h, 7h? Você escolhe. A mensagem chega no horário que faz sentido para você.",
  },
  {
    number: "03",
    icon: Send,
    title: "Recebe no seu WhatsApp",
    body: "Toda manhã, uma palavra escrita à mão — fé, propósito, gratidão e gentileza com você mesma.",
  },
  {
    number: "04",
    icon: MessageSquareHeart,
    title: "Responde se quiser",
    body: "Conte como está o seu dia. A gente lê, guarda e responde — porque você é nome, não número.",
  },
];

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-gradient-to-b from-cream-100/40 via-cream-100/60 to-cream-100/40 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terra-500/20 to-transparent" />

      <Container>
        <SectionTitle
          eyebrow="Como funciona"
          title={
            <>
              Tão simples quanto abrir uma{" "}
              <em className="italic text-terra-600">janela de manhã.</em>
            </>
          }
          description="Quatro passos. Em menos de dois minutos, o seu primeiro bom dia já chega amanhã cedo."
        />

        <Stagger className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line on desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[58px] hidden h-px bg-gradient-to-r from-transparent via-terra-500/30 to-transparent lg:block"
          />

          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="group relative h-full rounded-3xl bg-cream-50 p-7 shadow-card ring-1 ring-cream-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft hover:ring-terra-500/20">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-terra-400/20 to-terra-500/10 text-terra-600 ring-1 ring-inset ring-white/40 transition-transform duration-300 group-hover:scale-110">
                    <step.icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span className="font-serif text-5xl text-terra-500/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {step.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

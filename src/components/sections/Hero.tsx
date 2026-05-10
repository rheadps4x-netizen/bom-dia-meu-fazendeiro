"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, Heart, ShieldCheck, Sparkles, Sunrise } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GradientBg } from "@/components/ui/GradientBg";
import { WhatsAppMockup } from "@/components/ui/WhatsAppMockup";

const easeOut = [0.16, 1, 0.3, 1] as const;

const trustBadges = [
  { icon: Heart, label: "Carinho diário" },
  { icon: ShieldCheck, label: "Cancele quando quiser" },
  { icon: Sparkles, label: "Sem grupo" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pb-14 pt-8 sm:pt-10 lg:min-h-[680px] lg:pb-14"
    >
      <GradientBg variant="warm" />
      <div
        aria-hidden
        className="absolute left-[-12%] top-[10%] -z-10 h-72 w-72 rounded-full bg-cream-200/70 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="absolute right-[-8%] top-[18%] -z-10 h-80 w-80 rounded-full bg-sage-100/75 blur-3xl sm:h-[28rem] sm:w-[28rem]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-18%] left-[36%] -z-10 h-72 w-72 rounded-full bg-terra-400/20 blur-3xl sm:h-[26rem] sm:w-[26rem]"
      />

      <Container className="grid items-center gap-10 lg:min-h-[590px] lg:grid-cols-[1.02fr,0.98fr] lg:gap-12">
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-terra-700 shadow-card ring-1 ring-inset ring-terra-500/15 backdrop-blur-sm"
          >
            <Sunrise className="h-3.5 w-3.5" />
            Bom dia direto no seu celular
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: easeOut }}
            className="mx-auto mt-5 max-w-2xl text-balance font-serif text-[2.35rem] leading-[0.98] tracking-tight text-ink-900 sm:text-[2.85rem] md:text-[3.25rem] lg:mx-0 lg:text-[3.65rem]"
          >
            Receba um bom dia carinhoso no seu{" "}
            <span className="text-sage-600">WhatsApp</span>{" "}
            <span className="text-terra-600">todos os dias.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-700 sm:text-xl lg:mx-0"
          >
            Uma mensagem simples, bonita e acolhedora para começar o dia se
            sentindo lembrada.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
            className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
          >
            <Button href="#planos" size="xl" className="w-full sm:w-auto">
              Quero receber por R$5 🌻
            </Button>
            <Button
              href="#como-funciona"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Ver como funciona
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.2} />
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: easeOut }}
            className="mx-auto mt-3 flex max-w-xl items-center justify-center gap-2 text-sm font-medium text-terra-700 lg:mx-0 lg:justify-start"
          >
            <Clock3 className="h-4 w-4 shrink-0" />
            Hoje às 06:30 você já pode receber a primeira mensagem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: easeOut }}
            className="mx-auto mt-3 max-w-xl rounded-[1.25rem] bg-white/82 p-2.5 text-left shadow-card ring-1 ring-inset ring-cream-200/90 backdrop-blur-sm lg:mx-0"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                <CheckCircle2 className="h-[18px] w-[18px]" />
              </span>
              +2.300 mulheres já recebem mensagens todos os dias
            </p>
            <p className="pl-10 text-[13px] text-ink-500">
              Teste por R$5 · cancele quando quiser
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.54, ease: easeOut }}
            className="mt-3 grid gap-2 sm:grid-cols-3 lg:max-w-2xl"
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-[1.1rem] bg-cream-50/80 px-2.5 py-1.5 text-left text-[12px] font-medium leading-snug text-ink-700 shadow-sm ring-1 ring-cream-200/80 backdrop-blur-sm"
              >
                <Icon className="h-5 w-5 shrink-0 text-terra-500" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
      className="relative mx-auto flex w-full justify-center lg:justify-end"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[80%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-gradient-to-br from-sage-100/80 via-cream-100/80 to-terra-400/25 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        className="relative h-[475px] max-h-[calc(100vh-150px)] w-[min(276px,88vw)] lg:h-[570px] lg:max-h-[calc(100vh-180px)] lg:w-[331px]"
      >
        <WhatsAppMockup />
      </motion.div>
    </motion.div>
  );
}

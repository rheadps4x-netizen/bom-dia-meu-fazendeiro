"use client";

import { motion } from "framer-motion";
import { Heart, Sunrise, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-terra-700 via-terra-600 to-rose-500" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.5)_1px,_transparent_0)] [background-size:22px_22px]" />

        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
          className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-rose-300/40 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
          className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cream-300/30 blur-3xl"
        />

        {/* Soft top fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cream-50/30 to-transparent" />
      </div>

      <Container size="md" className="relative text-center text-cream-50">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="inline-flex items-center gap-2 rounded-full bg-cream-50/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] ring-1 ring-inset ring-cream-50/25 backdrop-blur-sm"
        >
          <Heart className="h-3.5 w-3.5 fill-current" />
          Um convite, com carinho
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
          className="mt-8 text-balance font-serif text-[2.5rem] leading-[1.04] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]"
        >
          Amanhã, ao acordar,
          <br />
          <em className="italic">você não vai estar sozinha.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
          className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-cream-100/90 sm:text-xl"
        >
          Você cuidou de tanta gente. De filhos, de marido, de pais, de casa,
          de tudo.{" "}
          <br className="hidden sm:block" />
          Por R$ 5, deixa a gente cuidar de você por sete dias.{" "}
          <strong className="text-cream-50">Só sete dias.</strong>
          <br />
          Se não sentir diferença, a gente devolve. Mas você vai sentir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: easeOut }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button href="#planos" size="xl" variant="white">
            <Sunrise className="h-5 w-5" />
            Quero meu bom dia amanhã
          </Button>
          <Button
            href="#depoimentos"
            variant="ghost"
            size="lg"
            className="text-cream-50 hover:bg-cream-50/10 hover:text-cream-50"
          >
            Ler mais depoimentos
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-100/80"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" strokeWidth={2} />
            Sem fidelidade
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
            Garantia de 7 dias
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-4 w-4 fill-current" />
            Cancelamento em 1 clique
          </span>
        </motion.div>
      </Container>
    </section>
  );
}

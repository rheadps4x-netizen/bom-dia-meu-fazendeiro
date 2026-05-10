"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sprout, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { openCaktoCheckout } from "@/lib/cakto";
import { trackCheckoutClick } from "@/lib/tracking";

const nav = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#planos", label: "Planos" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-cream-200/70 bg-cream-50/78 shadow-[0_10px_28px_-24px_rgba(42,31,24,0.35),0_1px_0_rgba(255,255,255,0.7)_inset] backdrop-blur-xl"
          : "border-cream-200/35 bg-cream-50/45 backdrop-blur-md",
      )}
    >
      <Container className="flex h-14 items-center justify-between sm:h-16">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sage-500 to-sage-700 text-cream-50 shadow-soft ring-1 ring-inset ring-white/10">
            <Sprout className="h-4 w-4" />
            <span className="absolute -inset-1 -z-10 rounded-full bg-sage-500/20 blur-md" />
          </span>
          <span className="font-serif text-base leading-none tracking-tight text-ink-900">
            Bom Dia,{" "}
            <span className="italic text-terra-600">Meu Fazendeiro</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-[13px] text-ink-700 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative transition-colors hover:text-ink-900"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-terra-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="md"
            variant="primary"
            className="hidden px-4 py-2 text-[13px] sm:inline-flex"
            onClick={() => {
              trackCheckoutClick("teste");
              openCaktoCheckout("teste");
            }}
          >
            Começar por R$ 5
          </Button>
          <button
            type="button"
            className="rounded-full p-2 text-ink-900 ring-1 ring-inset ring-ink-900/10 hover:bg-cream-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-cream-200 bg-cream-50/95 backdrop-blur-xl md:hidden"
        >
          <Container className="flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-ink-700 hover:bg-cream-100"
              >
                {item.label}
              </a>
            ))}
            <Button
              type="button"
              size="md"
              className="mt-2"
              onClick={() => {
                trackCheckoutClick("teste");
                openCaktoCheckout("teste");
              }}
            >
              Começar por R$ 5
            </Button>
          </Container>
        </motion.div>
      )}
    </motion.header>
  );
}

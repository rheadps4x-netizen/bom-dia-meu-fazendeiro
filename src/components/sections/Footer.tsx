"use client";

import { Sprout, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream-200 bg-cream-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terra-500/30 to-transparent" />

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sage-500 to-sage-700 text-cream-50 shadow-soft">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="font-serif text-lg text-ink-900">
              Bom Dia,{" "}
              <span className="italic text-terra-600">Meu Fazendeiro</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-700">
            Mensagens diárias de acolhimento, fé e propósito direto no seu
            WhatsApp. Feito com carinho para a mulher que cuida de todos.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-ink-700 ring-1 ring-inset ring-ink-900/10 transition-colors hover:bg-terra-500 hover:text-cream-50"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="mailto:contato@bomdiameufazendeiro.com.br"
              aria-label="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-ink-700 ring-1 ring-inset ring-ink-900/10 transition-colors hover:bg-terra-500 hover:text-cream-50"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <FooterCol
          title="Navegação"
          links={[
            { href: "#beneficios", label: "Benefícios" },
            { href: "#como-funciona", label: "Como funciona" },
            { href: "#depoimentos", label: "Depoimentos" },
            { href: "#planos", label: "Planos" },
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            { href: "#", label: "Termos de uso" },
            { href: "#", label: "Política de privacidade" },
            { href: "#", label: "Política de reembolso" },
            { href: "mailto:contato@bomdiameufazendeiro.com.br", label: "Contato" },
          ]}
        />
      </Container>

      <div className="border-t border-cream-200">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Bom Dia, Meu Fazendeiro. Todos os direitos reservados.</p>
          <p>Feito com carinho no Brasil.</p>
        </Container>
      </div>
    </footer>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-ink-900">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5 text-sm text-ink-700">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="transition-colors hover:text-terra-600">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

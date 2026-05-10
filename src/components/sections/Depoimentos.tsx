"use client";

import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

type Depoimento = {
  nome: string;
  idade: number;
  texto: string;
  iniciais: string;
  cor: string;
};

const depoimentos: Depoimento[] = [
  {
    nome: "Marlene",
    idade: 62,
    iniciais: "M",
    cor: "from-rose-300 to-terra-500",
    texto:
      "Eu acordava sem vontade até começar a receber essas mensagens.",
  },
  {
    nome: "Rosângela",
    idade: 54,
    iniciais: "R",
    cor: "from-sage-200 to-sage-500",
    texto: "Parece uma companhia logo cedo. Me sinto lembrada.",
  },
  {
    nome: "Célia",
    idade: 49,
    iniciais: "C",
    cor: "from-cream-300 to-terra-400",
    texto: "Virou parte da minha rotina do café da manhã.",
  },
  {
    nome: "Vera",
    idade: 67,
    iniciais: "V",
    cor: "from-rose-100 to-rose-500",
    texto: "As mensagens são simples, mas mudam meu dia.",
  },
  {
    nome: "Tânia",
    idade: 58,
    iniciais: "T",
    cor: "from-sage-200 to-terra-400",
    texto: "Foi os melhores R$ 5 que já gastei comigo.",
  },
  {
    nome: "Fátima",
    idade: 63,
    iniciais: "F",
    cor: "from-terra-400 to-rose-500",
    texto: "Hoje eu já espero a mensagem chegar.",
  },
];

export function Depoimentos() {
  return (
    <section id="depoimentos" className="relative py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="Depoimentos"
          title={
            <>
              Não somos nós que dizemos. <br />
              <em className="italic text-terra-600">São elas.</em>
            </>
          }
          description="Mulheres reais, manhãs reais, vidas que mudaram com uma palavra por dia."
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((d) => (
            <StaggerItem key={d.nome}>
              <DepoimentoCard depoimento={d} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-cream-100 via-cream-50 to-rose-100/40 p-1 shadow-card ring-1 ring-cream-200">
          <div className="flex flex-col items-center justify-center gap-6 rounded-[1.4rem] bg-cream-50/60 p-8 backdrop-blur-sm sm:flex-row sm:gap-12">
            <div className="text-center sm:text-left">
              <p className="font-serif text-6xl leading-none text-terra-600">
                4,9
              </p>
              <div className="mt-2 flex justify-center gap-0.5 text-terra-500 sm:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" strokeWidth={0} />
                ))}
              </div>
            </div>
            <div className="hidden h-16 w-px bg-cream-300 sm:block" />
            <div className="text-center sm:text-left">
              <p className="font-serif text-xl text-ink-900 sm:text-2xl">
                Avaliação média de mais de 2.300 assinantes
              </p>
              <p className="mt-1.5 text-sm text-ink-700">
                <strong className="text-ink-900">97%</strong> renovam ao final
                do primeiro mês.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DepoimentoCard({ depoimento: d }: { depoimento: Depoimento }) {
  return (
    <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/80 p-7 shadow-card ring-1 ring-cream-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-soft hover:ring-terra-500/20">
      <Quote className="h-7 w-7 text-terra-500/30" strokeWidth={1.5} />
      <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-ink-900">
        {d.texto}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-cream-200 pt-5">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${d.cor} font-serif text-lg text-cream-50 ring-2 ring-white shadow-sm`}
        >
          {d.iniciais}
        </span>
        <div className="leading-tight">
          <p className="font-serif text-base text-ink-900">{d.nome}</p>
          <p className="text-xs text-ink-500">{d.idade} anos</p>
        </div>
        <div className="ml-auto flex gap-0.5 text-terra-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
          ))}
        </div>
      </figcaption>

      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-terra-400/0 to-rose-300/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-hover:from-terra-400/20 group-hover:to-rose-300/20" />
    </figure>
  );
}

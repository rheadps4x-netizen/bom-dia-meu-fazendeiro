"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, BadgeCheck, Check, Clock3, CreditCard, Flame, Mail, Phone, ShieldCheck, Sparkles, UserRound, Zap } from "lucide-react";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL || "COLOCAR_LINK_DA_CAKTO_AQUI";
const RED = "#dc2626";
const TOTAL_STEPS = 18;

type Answers = Record<string, string | string[] | number>;
type CheckoutFields = { name: string; email: string; phone: string; cpf: string };
type Option = { id: string; label: string; icon?: string; image?: string };
type Step =
  | { id: string; kind: "age"; badge: string; title: ReactNode; options: Option[] }
  | { id: string; kind: "single"; badge?: string; title: ReactNode; helper?: string; options: Option[] }
  | { id: string; kind: "multi"; badge?: string; title: ReactNode; helper?: string; options: Option[]; exclusive?: string }
  | { id: string; kind: "range"; badge: string; title: ReactNode; min: number; max: number; defaultValue: number; unit: string; helper: string }
  | { id: string; kind: "statement"; badge: string; title: ReactNode; body: ReactNode; options: Option[] }
  | { id: string; kind: "loading"; title: string; helper: string }
  | { id: string; kind: "final"; badge: string; title: ReactNode; body: ReactNode; options: Option[] };

const ageOptions: Option[] = [
  { id: "under40", label: "Abaixo dos 40", image: "/images/abaixo-40.png" },
  { id: "40to50", label: "De 40 a 50", image: "/images/40-50.png" },
  { id: "51to60", label: "De 51 a 60", image: "/images/51-60.png" },
  { id: "over60", label: "Acima dos 60", image: "/images/acima-60.png" },
];

const steps: Step[] = [
  {
    id: "age",
    kind: "age",
    badge: "📋 MONTANDO SEU PROTOCOLO",
    title: <>Qual é a sua <span className="text-[#dc2626]">faixa etária</span>?</>,
    options: ageOptions,
  },
  {
    id: "methods",
    kind: "multi",
    badge: "🔎 DIAGNÓSTICO",
    title: <>Quais métodos você já tentou para melhorar sua <span className="text-[#dc2626]">rotina masculina</span>?</>,
    helper: "☑️ Você pode marcar mais de uma opção",
    options: [
      { id: "supplements", label: "Produtos naturais ou suplementos", icon: "🌿" },
      { id: "exercise", label: "Exercícios físicos e dieta", icon: "🏋️" },
      { id: "content", label: "Conteúdos na internet", icon: "📱" },
      { id: "none", label: "Nenhum, não sabia por onde começar", icon: "😕" },
    ],
  },
  {
    id: "weight",
    kind: "range",
    badge: "📋 MONTANDO SEU PROTOCOLO",
    title: <>Qual é o seu <span className="text-[#dc2626]">peso</span>?</>,
    min: 50,
    max: 150,
    defaultValue: 85,
    unit: "kg",
    helper: "👆 Arraste a barra para selecionar seu peso aproximado",
  },
  {
    id: "height",
    kind: "range",
    badge: "📋 MONTANDO SEU PROTOCOLO",
    title: <>Qual é a sua <span className="text-[#dc2626]">altura</span>?</>,
    min: 150,
    max: 210,
    defaultValue: 170,
    unit: "cm",
    helper: "👆 Arraste a barra para selecionar sua altura aproximada",
  },
  {
    id: "time",
    kind: "single",
    badge: "📋 MONTANDO SEU PROTOCOLO",
    title: <>Há quanto tempo você sente que sua <span className="text-[#dc2626]">confiança</span> oscilou?</>,
    options: [
      { id: "less6", label: "Menos de 6 meses", icon: "😐" },
      { id: "6to12", label: "Entre 6 meses e 1 ano", icon: "🤔" },
      { id: "1to3", label: "Entre 1 e 3 anos", icon: "😕" },
      { id: "more3", label: "Mais de 3 anos", icon: "⏳" },
    ],
  },
  {
    id: "proof",
    kind: "statement",
    badge: "📊 RESULTADOS REAIS",
    title: <>Homens acima dos 40 buscam mais <span className="text-[#dc2626]">energia e rotina</span> todos os dias.</>,
    body: "O Projeto Alpha organiza um plano simples, discreto e direto para ajudar você a retomar consistência, autoestima e performance no dia a dia.",
    options: [
      { id: "low", label: "Sinto que minha energia caiu bastante", icon: "🔋" },
      { id: "unstable", label: "Tenho dias bons e dias ruins", icon: "🎲" },
      { id: "routine", label: "Quero uma rotina mais clara para seguir", icon: "📌" },
      { id: "ok", label: "Estou bem, mas quero evoluir", icon: "💪" },
    ],
  },
  {
    id: "health",
    kind: "multi",
    badge: "🏥 HISTÓRICO DE SAÚDE",
    title: <>Você tem alguma dessas <span className="text-[#dc2626]">condições de saúde</span>?</>,
    helper: "☑️ Você pode marcar mais de uma opção",
    exclusive: "none",
    options: [
      { id: "pressure", label: "Tenho pressão alta", icon: "🩺" },
      { id: "glucose", label: "Tenho alteração de glicose", icon: "📊" },
      { id: "heart", label: "Já tive questão cardiovascular", icon: "❤️" },
      { id: "none", label: "Nenhuma das opções acima", icon: "✅" },
    ],
  },
  {
    id: "habits",
    kind: "multi",
    badge: "🚬 HÁBITOS DO DIA A DIA",
    title: <>Você pratica algum desses <span className="text-[#dc2626]">hábitos com frequência</span>?</>,
    helper: "Sem julgamento, isso ajuda a calibrar sua rotina.",
    exclusive: "none",
    options: [
      { id: "smoke", label: "Fumo regularmente", icon: "🚬" },
      { id: "alcohol", label: "Consumo álcool com frequência", icon: "🍺" },
      { id: "screen", label: "Uso telas até muito tarde", icon: "📱" },
      { id: "sleep", label: "Durmo pouco ou sem horário", icon: "🌙" },
      { id: "none", label: "Não tenho nenhum desses hábitos", icon: "✅" },
    ],
  },
  {
    id: "goal",
    kind: "single",
    badge: "📏 PERSONALIZAÇÃO AVANÇADA",
    title: <>Qual evolução você mais quer sentir na sua <span className="text-[#dc2626]">rotina masculina</span>?</>,
    options: [
      { id: "confidence", label: "Mais confiança", icon: "🛡️" },
      { id: "energy", label: "Mais energia", icon: "⚡" },
      { id: "focus", label: "Mais foco e disciplina", icon: "🎯" },
      { id: "performance", label: "Melhor desempenho no dia a dia", icon: "🚀" },
    ],
  },
  {
    id: "daily",
    kind: "single",
    badge: "⏱️ DESEMPENHO",
    title: <>Quanto tempo por dia você consegue dedicar ao <span className="text-[#dc2626]">protocolo</span>?</>,
    helper: "A rotina foi pensada para caber em dias corridos.",
    options: [
      { id: "5", label: "5 minutos", icon: "⚡" },
      { id: "10", label: "10 minutos", icon: "⏰" },
      { id: "15", label: "15 minutos", icon: "🕖" },
      { id: "20", label: "20 minutos ou mais", icon: "💪" },
    ],
  },
  {
    id: "vigor",
    kind: "single",
    badge: "🔥 NÍVEL DE VIGOR",
    title: <>Como está sua <span className="text-[#dc2626]">disposição</span> atualmente?</>,
    options: [
      { id: "zero", label: "Muito baixa, quase sem constância", icon: "❄️" },
      { id: "low", label: "Baixa, aparece só às vezes", icon: "😕" },
      { id: "medium", label: "Razoável, mas quero melhorar", icon: "🙂" },
      { id: "high", label: "Boa, quero elevar o nível", icon: "🔥" },
    ],
  },
  {
    id: "approach",
    kind: "single",
    title: "Quando surge uma situação que exige mais confiança...",
    options: [
      { id: "avoid", label: "Costumo evitar ou deixar para depois", icon: "😶" },
      { id: "explain", label: "Fico sem saber como agir com clareza", icon: "🤔" },
      { id: "drop", label: "Minha constância cai e eu percebo isso", icon: "😔" },
      { id: "act", label: "Quero agir com mais controle e presença", icon: "🧭" },
    ],
  },
  {
    id: "feeling",
    kind: "single",
    title: "Quando sua energia falha no momento em que você precisa...",
    options: [
      { id: "shame", label: "Sinto vergonha e fico remoendo", icon: "😳" },
      { id: "angry", label: "Fico irritado comigo mesmo", icon: "😠" },
      { id: "weight", label: "Carrego aquilo pelo resto do dia", icon: "😶" },
      { id: "lost", label: "Sinto que não me reconheço como antes", icon: "🧊" },
    ],
  },
  {
    id: "fear",
    kind: "single",
    title: <>No fundo, o que mais te <span className="text-[#dc2626]">preocupa</span> com tudo isso?</>,
    options: [
      { id: "confidence", label: "Perder cada vez mais confiança", icon: "😨" },
      { id: "age", label: "Envelhecer sem recuperar minha disposição", icon: "😢" },
      { id: "routine", label: "Continuar sem saber por onde começar", icon: "💭" },
      { id: "worse", label: "Que isso piore com o tempo", icon: "😔" },
    ],
  },
  {
    id: "loading",
    kind: "loading",
    title: "Analisando suas respostas",
    helper: "Estamos montando seu protocolo Alpha com base no seu momento atual.",
  },
  {
    id: "summary",
    kind: "statement",
    badge: "✅ PROTOCOLO PRONTO!",
    title: "Um resumo rápido:",
    body: <>O Projeto Alpha combina orientações simples, rotina objetiva e passos discretos para fortalecer sua confiança, energia e desempenho no dia a dia.</>,
    options: [
      { id: "understood", label: "Sim, entendi como o protocolo funciona", icon: "✅" },
      { id: "access", label: "Quero acessar meu protocolo agora", icon: "🚀" },
    ],
  },
  {
    id: "commitment",
    kind: "statement",
    badge: "🎯 PROTOCOLO EXCLUSIVO",
    title: "Você se compromete a seguir o Projeto Alpha por 7 dias?",
    body: "O resultado da rotina depende de consistência. Por isso, o plano foi criado para ser simples e aplicável.",
    options: [
      { id: "commit", label: "Sim, eu me comprometo", icon: "✅" },
      { id: "need", label: "Com certeza, é isso que preciso", icon: "💪" },
    ],
  },
  {
    id: "confirm",
    kind: "final",
    badge: "🏁 CONFIRMAÇÃO FINAL",
    title: "Você está pronto para começar seu protocolo ainda hoje?",
    body: "Seu plano digital está pronto. O próximo passo é liberar seu acesso ao Projeto Alpha.",
    options: [
      { id: "today", label: "Sim, vou começar ainda hoje", icon: "🔥" },
      { id: "now", label: "Com certeza, quero resolver isso agora", icon: "✅" },
    ],
  },
];

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

function buildCheckoutUrl(baseUrl: string, answers: Answers, fields: CheckoutFields) {
  const params = new URLSearchParams();
  const entries: Array<[string, string | string[] | number | undefined]> = [
    ["idade", answers.age],
    ["objetivo", answers.goal],
    ["metodos", answers.methods],
    ["tempo", answers.time],
    ["rotina", answers.daily],
    ["vigor", answers.vigor],
    ["nome", fields.name.trim()],
    ["email", fields.email.trim()],
    ["telefone", onlyDigits(fields.phone)],
    ["cpf", onlyDigits(fields.cpf)],
    ["produto", "projeto-alpha"],
  ];

  entries.forEach(([key, value]) => {
    if (Array.isArray(value) && value.length) {
      params.set(key, value.join(","));
    } else if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}${params.toString()}`;
}

export function QuizFunnel() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const step = steps[stepIndex];
  const stepKind = step?.kind;
  const isCheckout = stepIndex >= TOTAL_STEPS;
  const progress = isCheckout ? 100 : Math.round(10 + (stepIndex / (TOTAL_STEPS - 1)) * 90);

  useEffect(() => {
    if (stepKind !== "loading") {
      setLoadingProgress(0);
      return;
    }
    const interval = window.setInterval(() => setLoadingProgress((current) => Math.min(current + 4, 100)), 120);
    const timeout = window.setTimeout(() => {
      window.scrollTo(0, 0);
      setStepIndex((current) => Math.min(current + 1, TOTAL_STEPS));
    }, 3000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [stepKind]);

  function goNext() {
    window.scrollTo(0, 0);
    setStepIndex((current) => Math.min(current + 1, TOTAL_STEPS));
  }

  function goBack() {
    if (stepIndex === 0) return;
    window.scrollTo(0, 0);
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  function answerSingle(id: string, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
    window.setTimeout(goNext, 260);
  }

  function toggleMulti(id: string, value: string, exclusive?: string) {
    setAnswers((current) => {
      const selected = Array.isArray(current[id]) ? (current[id] as string[]) : [];
      if (exclusive && value === exclusive) return { ...current, [id]: [exclusive] };
      const clean = exclusive ? selected.filter((item) => item !== exclusive) : selected;
      const next = clean.includes(value) ? clean.filter((item) => item !== value) : [...clean, value];
      return { ...current, [id]: next };
    });
  }

  function setRange(id: string, value: number) {
    setAnswers((current) => ({ ...current, [id]: value }));
  }

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      {!isCheckout && <QuizHeader canGoBack={stepIndex > 0} onBack={goBack} progress={progress} />}
      <div className={isCheckout ? "mx-auto min-h-screen w-full max-w-[520px]" : "mx-auto min-h-screen w-full max-w-[520px] px-4 pb-8 pt-10"}>
        <div key={stepIndex} className="animate-fade-up">
          {!isCheckout && step.kind === "age" && <AgeStep onAnswer={(value) => answerSingle(step.id, value)} selected={String(answers[step.id] || "")} step={step} />}
          {!isCheckout && step.kind === "single" && <ChoiceStep onAnswer={(value) => answerSingle(step.id, value)} selected={String(answers[step.id] || "")} step={step} />}
          {!isCheckout && step.kind === "multi" && (
            <MultiStep
              onContinue={goNext}
              onToggle={(value) => toggleMulti(step.id, value, step.exclusive)}
              selected={Array.isArray(answers[step.id]) ? (answers[step.id] as string[]) : []}
              step={step}
            />
          )}
          {!isCheckout && step.kind === "range" && <RangeStep onChange={(value) => setRange(step.id, value)} onContinue={goNext} step={step} value={Number(answers[step.id] || step.defaultValue)} />}
          {!isCheckout && step.kind === "statement" && <StatementStep onAnswer={(value) => answerSingle(step.id, value)} selected={String(answers[step.id] || "")} step={step} />}
          {!isCheckout && step.kind === "loading" && <AnalysisStep progress={loadingProgress} step={step} />}
          {!isCheckout && step.kind === "final" && <FinalStep onAnswer={(value) => setAnswers((current) => ({ ...current, [step.id]: value }))} onContinue={goNext} selected={String(answers[step.id] || "")} step={step} />}
          {isCheckout && <CheckoutStep answers={answers} />}
        </div>
      </div>
    </main>
  );
}

function QuizHeader({ canGoBack, onBack, progress }: { canGoBack: boolean; onBack: () => void; progress: number }) {
  return (
    <header className="sticky inset-x-0 top-0 z-40 border-b border-zinc-100 bg-white/95 backdrop-blur">
      <div className="mx-auto w-full max-w-[520px] px-4 py-3">
        <div className="flex justify-center">
          <div className="mx-auto flex h-[96px] w-[96px] items-center justify-center rounded-full bg-black shadow-[0_0_28px_rgba(220,38,38,0.35)] border border-red-500/30 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-alpha.png"
              alt="Projeto Alpha"
              className="h-[120px] w-[120px] max-w-none object-cover scale-[1.55]"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3 pb-1">
          <button aria-label="Voltar" className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-700 transition hover:border-red-600 hover:text-red-600 disabled:opacity-30" disabled={!canGoBack} onClick={onBack} type="button">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: RED }} />
          </div>
        </div>
      </div>
    </header>
  );
}

function Badge({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <div className="mb-5 inline-flex rounded-full bg-[#fee2e2] px-4 py-2 text-xs font-extrabold uppercase text-[#dc2626]">{children}</div>;
}

function AgeStep({ onAnswer, selected, step }: { onAnswer: (value: string) => void; selected: string; step: Extract<Step, { kind: "age" }> }) {
  return (
    <section>
      <Badge>{step.badge}</Badge>
      <h1 className="max-w-md font-sans text-2xl font-black leading-tight tracking-normal text-zinc-950 sm:text-3xl">{step.title}</h1>
      <div className="mt-7 grid grid-cols-2 gap-4">
        {step.options.map((option) => <AgeOptionCard key={option.id} onClick={() => onAnswer(option.id)} option={option} selected={selected === option.id} />)}
      </div>
    </section>
  );
}

function AgeOptionCard({ onClick, option, selected }: { onClick: () => void; option: Option; selected: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <button className={`group overflow-hidden rounded-2xl border-[1.5px] bg-white p-0 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[#dc2626] hover:shadow-lg ${selected ? "border-[#dc2626] shadow-[0_0_0_4px_rgba(220,38,38,0.12)]" : "border-[#e5e7eb]"}`} onClick={onClick} type="button">
      <div className="w-full overflow-hidden rounded-t-[14px] bg-[linear-gradient(135deg,#111111,#3d1f1f_55%,#dc2626)]">
        {!imageFailed && <Image alt={option.label} className="block aspect-square h-auto w-full object-cover transition group-hover:scale-[1.03]" height={520} onError={() => setImageFailed(true)} priority sizes="(max-width: 640px) 46vw, 240px" src={option.image || ""} width={520} />}
        {imageFailed && <div className="grid aspect-square place-items-center"><div><div className="mx-auto h-14 w-14 rounded-full bg-white/80" /><div className="mx-auto mt-3 h-12 w-24 rounded-t-full bg-white/55" /></div></div>}
      </div>
      <span className={`block px-3 py-4 text-sm font-extrabold sm:text-base ${selected ? "text-[#dc2626]" : "text-zinc-950"}`}>{option.label}</span>
    </button>
  );
}

function ChoiceStep({ onAnswer, selected, step }: { onAnswer: (value: string) => void; selected: string; step: Extract<Step, { kind: "single" }> }) {
  return (
    <section className="text-left">
      <Badge>{step.badge}</Badge>
      <h1 className="font-sans text-2xl font-black leading-tight tracking-normal text-zinc-950 sm:text-3xl">{step.title}</h1>
      {step.helper && <p className="mt-3 text-sm leading-6 text-zinc-500">{step.helper}</p>}
      <div className="mt-7 grid gap-3">{step.options.map((option) => <OptionCard key={option.id} onClick={() => onAnswer(option.id)} option={option} selected={selected === option.id} />)}</div>
    </section>
  );
}

function MultiStep({ onContinue, onToggle, selected, step }: { onContinue: () => void; onToggle: (value: string) => void; selected: string[]; step: Extract<Step, { kind: "multi" }> }) {
  return (
    <section className="text-left">
      <Badge>{step.badge}</Badge>
      <h1 className="font-sans text-2xl font-black leading-tight tracking-normal text-zinc-950 sm:text-3xl">{step.title}</h1>
      {step.helper && <p className="mt-3 text-sm leading-6 text-zinc-500">{step.helper}</p>}
      <div className="mt-7 grid gap-3">{step.options.map((option) => <OptionCard checkbox key={option.id} onClick={() => onToggle(option.id)} option={option} selected={selected.includes(option.id)} />)}</div>
      <button className="mt-6 w-full rounded-xl bg-red-600 px-5 py-4 text-base font-black text-white shadow-[0_14px_28px_-16px_rgba(220,38,38,0.9)] transition hover:bg-red-700 disabled:bg-zinc-300" disabled={selected.length === 0} onClick={onContinue} type="button">Continuar →</button>
    </section>
  );
}

function OptionCard({ checkbox = false, onClick, option, selected }: { checkbox?: boolean; onClick: () => void; option: Option; selected: boolean }) {
  return (
    <button className={`flex min-h-16 items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition hover:border-red-600 ${selected ? "border-red-600 bg-red-50 text-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]" : "border-zinc-200 bg-white text-zinc-900 shadow-sm"}`} onClick={onClick} type="button">
      {option.icon && <span className="text-2xl">{option.icon}</span>}
      <span className="flex-1 text-[15px] font-bold leading-snug">{option.label}</span>
      {checkbox && <span className={`grid h-6 w-6 place-items-center rounded-md border-2 ${selected ? "border-red-600 bg-red-600 text-white" : "border-zinc-300 text-transparent"}`}><Check className="h-4 w-4" /></span>}
    </button>
  );
}

function RangeStep({ onChange, onContinue, step, value }: { onChange: (value: number) => void; onContinue: () => void; step: Extract<Step, { kind: "range" }>; value: number }) {
  return (
    <section className="text-center">
      <Badge>{step.badge}</Badge>
      <h1 className="font-sans text-2xl font-black tracking-normal text-zinc-950 sm:text-3xl">{step.title}</h1>
      <div className="mb-8 mt-10 flex items-baseline justify-center gap-2 text-6xl font-black text-red-600">{value}<span className="text-2xl font-semibold text-zinc-400">{step.unit}</span></div>
      <input className="h-2 w-full cursor-pointer accent-red-600" max={step.max} min={step.min} onChange={(event) => onChange(Number(event.target.value))} type="range" value={value} />
      <div className="mt-3 flex justify-between text-xs font-semibold text-zinc-400"><span>{step.min} {step.unit}</span><span>{step.max} {step.unit}</span></div>
      <p className="mt-5 text-sm text-zinc-500">{step.helper}</p>
      <button className="mt-10 w-full rounded-xl bg-red-600 px-5 py-4 text-base font-black text-white shadow-[0_14px_28px_-16px_rgba(220,38,38,0.9)] transition hover:bg-red-700" onClick={onContinue} type="button">Continuar →</button>
    </section>
  );
}

function StatementStep({ onAnswer, selected, step }: { onAnswer: (value: string) => void; selected: string; step: Extract<Step, { kind: "statement" }> }) {
  return (
    <section className="text-left">
      <Badge>{step.badge}</Badge>
      <h1 className="font-sans text-2xl font-black leading-tight tracking-normal text-zinc-950 sm:text-3xl">{step.title}</h1>
      <div className="mt-5 rounded-r-xl border-l-4 border-red-600 bg-red-50 p-5 text-sm font-medium leading-6 text-zinc-700">{step.body}</div>
      <div className="mt-7 grid gap-3">{step.options.map((option) => <OptionCard key={option.id} onClick={() => onAnswer(option.id)} option={option} selected={selected === option.id} />)}</div>
    </section>
  );
}

function AnalysisStep({ progress, step }: { progress: number; step: Extract<Step, { kind: "loading" }> }) {
  return (
    <section className="pt-16 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-red-50 text-red-600"><Sparkles className="h-9 w-9 animate-pulse" /></div>
      <h1 className="mt-6 font-sans text-2xl font-black tracking-normal text-zinc-950">{step.title}</h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">{step.helper}</p>
      <div className="mt-8 h-3 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-red-600 transition-all duration-150" style={{ width: `${progress}%` }} /></div>
      <p className="mt-3 text-sm font-black text-red-600">{Math.min(progress, 100)}%</p>
    </section>
  );
}

function FinalStep({ onAnswer, onContinue, selected, step }: { onAnswer: (value: string) => void; onContinue: () => void; selected: string; step: Extract<Step, { kind: "final" }> }) {
  return (
    <section className="text-left">
      <Badge>{step.badge}</Badge>
      <h1 className="font-sans text-2xl font-black leading-tight tracking-normal text-zinc-950 sm:text-3xl">{step.title}</h1>
      <div className="mt-5 grid gap-3">{step.options.map((option) => <OptionCard key={option.id} onClick={() => onAnswer(option.id)} option={option} selected={selected === option.id} />)}</div>
      {selected && <button className="mt-6 w-full rounded-xl bg-red-600 px-5 py-4 text-base font-black text-white shadow-[0_14px_28px_-16px_rgba(220,38,38,0.9)] transition hover:bg-red-700" onClick={onContinue} type="button">Continuar para o Checkout →</button>}
      <div className="mt-7 rounded-r-xl border-l-4 border-red-600 bg-red-50 p-5 text-sm font-medium leading-6 text-zinc-700">{step.body}</div>
    </section>
  );
}

function CheckoutStep({ answers }: { answers: Answers }) {
  const [fields, setFields] = useState<CheckoutFields>({ name: "", email: "", phone: "", cpf: "" });
  const [errors, setErrors] = useState<Partial<CheckoutFields>>({});
  const [loading, setLoading] = useState(false);
  const complete = fields.name && fields.email && fields.phone && fields.cpf;

  function update(field: keyof CheckoutFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<CheckoutFields> = {};
    if (fields.name.trim().split(" ").filter(Boolean).length < 2) next.name = "Informe seu nome completo.";
    if (!isValidEmail(fields.email.trim())) next.email = "Informe um e-mail válido.";
    if (onlyDigits(fields.phone).length < 10) next.phone = "Informe um telefone válido.";
    if (onlyDigits(fields.cpf).length !== 11) next.cpf = "Informe um CPF com 11 dígitos.";
    setErrors(next);
    if (Object.keys(next).length) return;
    console.info("Projeto Alpha quiz answers", answers);
    if (!CHECKOUT_URL || CHECKOUT_URL === "COLOCAR_LINK_DA_CAKTO_AQUI") {
      window.alert("Checkout em configuração");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      window.location.href = buildCheckoutUrl(CHECKOUT_URL, answers, fields);
    }, 1000);
  }

  return (
    <section className="min-h-screen bg-zinc-100 pb-8">
      <CountdownBar />
      <div className="px-4 pt-4">
        <div className="rounded-[20px] bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.24),transparent_35%),linear-gradient(135deg,#090909,#2f0808)] p-5 text-white shadow-sm">
          <div className="flex items-center gap-4"><AlphaLogo /><div><p className="text-xs font-black uppercase tracking-[0.18em] text-red-200">Plano recomendado</p><h1 className="mt-1 font-sans text-2xl font-black tracking-normal">Projeto Alpha</h1><p className="mt-1 text-sm leading-5 text-zinc-200">Rotina masculina prática, digital e discreta.</p></div></div>
        </div>
        <div className="group my-5 overflow-hidden rounded-[20px] bg-zinc-950 shadow-[0_18px_40px_-22px_rgba(127,29,29,0.95),0_0_0_1px_rgba(220,38,38,0.12)] ring-1 ring-red-950/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-24px_rgba(127,29,29,1),0_0_28px_rgba(220,38,38,0.16)]">
          <Image
            alt="Projeto Alpha"
            className="block aspect-[16/8.5] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            height={600}
            priority
            sizes="(max-width: 640px) 100vw, 520px"
            src="/images/banner-alpha.png"
            width={1200}
          />
        </div>
        <article className="mt-4 rounded-[18px] border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4"><div className="grid h-20 w-20 flex-none place-items-center rounded-[14px] bg-zinc-950 text-red-500"><Flame className="h-9 w-9" /></div><div><h2 className="font-sans text-xl font-black tracking-normal">Projeto Alpha</h2><p className="mt-1 text-sm text-zinc-500">Acesso digital imediato</p><p className="mt-2 text-3xl font-black text-zinc-950">R$ 12,90</p></div></div>
        </article>
        <form className="mt-4 rounded-[18px] border border-zinc-200 bg-white p-4 shadow-sm" onSubmit={submit}>
          <h2 className="font-sans text-xl font-black tracking-normal">Dados de acesso</h2>
          <p className="mt-1 text-sm text-zinc-500">Preencha seus dados para continuar com o pagamento via PIX.</p>
          <div className="mt-4 grid gap-4">
            <Field error={errors.name} icon={<UserRound className="h-5 w-5" />} label="Nome completo" onChange={(value) => update("name", value)} placeholder="Seu nome completo" value={fields.name} />
            <Field error={errors.email} icon={<Mail className="h-5 w-5" />} label="E-mail" onChange={(value) => update("email", value)} placeholder="voce@email.com" type="email" value={fields.email} />
            <Field error={errors.phone} icon={<Phone className="h-5 w-5" />} label="Telefone" onChange={(value) => update("phone", value)} placeholder="(11) 99999-9999" type="tel" value={fields.phone} />
            <Field error={errors.cpf} icon={<CreditCard className="h-5 w-5" />} label="CPF" maxLength={14} onChange={(value) => update("cpf", value)} placeholder="000.000.000-00" value={fields.cpf} />
          </div>
          <div className="mt-5 rounded-[14px] border border-red-200 bg-red-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-red-600 text-white">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-zinc-900">Método de pagamento</p>
                  <p className="text-sm font-bold text-red-600">PIX</p>
                </div>
              </div>
              <ShieldCheck className="h-6 w-6 text-red-600" />
            </div>
            <div className="mt-4 rounded-xl border border-red-100 bg-white px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-black text-zinc-900">
                <ShieldCheck className="h-4 w-4 text-red-600" />
                Pagamento 100% seguro
              </div>
              <p className="mt-1 text-sm leading-5 text-zinc-600">
                Você será redirecionado para o ambiente seguro de pagamento.
              </p>
            </div>
          </div>
          <button
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-800 via-red-600 to-red-500 px-5 py-4 text-base font-black uppercase tracking-wide text-white shadow-[0_16px_30px_-16px_rgba(220,38,38,0.9)] transition hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_20px_34px_-18px_rgba(220,38,38,1)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            disabled={!complete || loading}
            type="submit"
          >
            {loading && <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
            {loading ? "Gerando pagamento PIX..." : "Finalizar compra agora"}
          </button>
        </form>
        <p className="px-2 pt-5 text-center text-xs leading-5 text-zinc-500">Este produto é um conteúdo digital educativo. Não substitui orientação médica, psicológica ou profissional.</p>
      </div>
    </section>
  );
}

function CountdownBar() {
  const [seconds, setSeconds] = useState(9 * 60 + 50);
  useEffect(() => {
    const interval = window.setInterval(() => setSeconds((current) => Math.max(current - 1, 0)), 1000);
    return () => window.clearInterval(interval);
  }, []);
  return <div className="bg-gradient-to-r from-red-950 via-red-700 to-red-950 px-3 py-3 text-white"><div className="flex items-center justify-center gap-2 text-center text-sm font-black uppercase tracking-wide"><span>Oferta encerra em:</span><Clock3 className="h-5 w-5 text-red-100" /><span className="rounded-md bg-black/20 px-2 py-1 font-mono text-red-50">{formatTime(seconds)}</span></div></div>;
}

function AlphaLogo() {
  return (
    <>
      <div className="mx-auto flex h-[96px] w-[96px] items-center justify-center rounded-full bg-black shadow-[0_0_28px_rgba(220,38,38,0.35)] border border-red-500/30 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-alpha.png"
          alt="Projeto Alpha"
          className="h-[120px] w-[120px] max-w-none object-cover scale-[1.55]"
        />
      </div>
    </>
  );
}

type FieldProps = { error?: string; icon: ReactNode; label: string; maxLength?: number; onChange: (value: string) => void; placeholder: string; type?: string; value: string };

function Field({ error, icon, label, maxLength, onChange, placeholder, type = "text", value }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-zinc-800">{label}</span>
      <span className="flex items-center gap-3 rounded-[14px] border border-zinc-200 bg-white px-3 focus-within:border-red-600 focus-within:ring-4 focus-within:ring-red-600/10">
        <span className="text-zinc-400">{icon}</span>
        <input className="min-h-12 w-full bg-transparent text-base font-medium text-zinc-950 outline-none placeholder:text-zinc-400" maxLength={maxLength} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type={type} value={value} />
      </span>
      {error && <span className="mt-2 block text-xs font-semibold text-red-700">{error}</span>}
    </label>
  );
}

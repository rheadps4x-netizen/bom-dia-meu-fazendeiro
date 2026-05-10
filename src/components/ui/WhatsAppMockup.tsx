"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, Mic, MoreVertical, Paperclip, Phone, Plus, Search, Send, Smile } from "lucide-react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export function WhatsAppMockup() {
  const [step, setStep] = useState<Step>(0);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (delay: number, value: Step) => {
      timeouts.push(setTimeout(() => setStep(value), delay));
    };

    schedule(450, 1);
    schedule(1300, 2);
    schedule(2200, 3);
    schedule(3050, 4);
    schedule(3900, 5);
    schedule(4750, 6);
    schedule(5600, 7);
    schedule(6500, 8);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const isTyping = step === 1 || step === 3 || step === 5 || step === 7;

  return (
    <div className="relative mx-auto h-full w-full rounded-[2.35rem] bg-[#171313] p-2 shadow-[0_34px_78px_-28px_rgba(42,31,24,0.58),0_18px_36px_-24px_rgba(122,62,44,0.5),inset_0_0_0_1px_rgba(255,255,255,0.1)]">
      <div className="absolute left-1/2 top-2.5 z-20 h-4 w-24 -translate-x-1/2 rounded-b-2xl bg-[#171313]" />
      <div className="flex h-full flex-col overflow-hidden rounded-[1.9rem] bg-[#ECE5DD] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]">
        <header className="shrink-0 bg-[#075E54] px-3.5 pb-2.5 pt-6 text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <div className="mb-2.5 flex items-center justify-between text-white/90">
            <span className="text-[11px] font-semibold">06:30</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-4 rounded-sm border border-white/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="/fazendeiro-avatar.jpg"
              alt="Fazendeiro"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full border border-white/20 object-cover shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold leading-tight">
                Bom Dia Carinhoso
              </p>
              <p className="mt-0.5 text-[11px] text-white/78">
                {isTyping ? "digitando..." : "online agora"}
              </p>
            </div>
            <div className="flex items-center gap-2.5 text-white/85">
              <Phone className="h-4 w-4" />
              <Search className="h-4 w-4" />
              <MoreVertical className="h-4 w-4" />
            </div>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col bg-[#ECE5DD] bg-grain px-3 py-2.5">
          <p className="self-center rounded-full bg-[#D9CDBD]/95 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-ink-500 shadow-sm">
            hoje · 06:30
          </p>

          <div className="mt-2 flex flex-1 flex-col gap-1.5 overflow-hidden">
            <AnimatePresence>{step === 1 && <TypingBubble key="typing-1" />}</AnimatePresence>

            {step >= 2 && (
              <MessageBubble>
                Bom dia, minha querida. Que seu coração acorde com calma hoje.
              </MessageBubble>
            )}

            <AnimatePresence>{step === 3 && <TypingBubble key="typing-2" />}</AnimatePresence>

            {step >= 4 && (
              <MessageBubble>
                Tem alguém lembrando de você logo cedo. Respira fundo e recebe
                esse carinho.
              </MessageBubble>
            )}

            <AnimatePresence>{step === 5 && <TypingBubble key="typing-3" />}</AnimatePresence>

            {step >= 6 && (
              <AudioBubble />
            )}

            <AnimatePresence>{step === 7 && <TypingBubble key="typing-4" />}</AnimatePresence>

            {step >= 8 && (
              <MessageBubble>
                Que seu dia seja leve, bonito e cheio de pequenas bênçãos. 🌻
              </MessageBubble>
            )}
          </div>
        </main>

        <footer className="flex shrink-0 items-center gap-2 bg-[#ECE5DD] px-2.5 pb-3 pt-1.5">
          <div className="flex h-10 flex-1 items-center gap-1.5 rounded-full bg-white px-2.5 text-ink-500 shadow-sm">
            <Smile className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-[13px]">Digite uma mensagem</span>
            <Paperclip className="h-4 w-4 shrink-0" />
            <Plus className="h-4 w-4 shrink-0" />
          </div>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-[0_8px_16px_rgba(7,94,84,0.22)]"
          >
            <Send className="h-4 w-4" />
          </span>
        </footer>
      </div>
    </div>
  );
}

function MessageBubble({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className="flex"
    >
      <div className="relative max-w-[88%] rounded-2xl rounded-tl-md bg-white px-3 py-2 text-[12px] leading-snug text-ink-900 shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <span className="absolute -left-1 top-0 h-3 w-3 bg-white [clip-path:polygon(100%_0,100%_100%,0_0)]" />
        {children}
        <div className="mt-0.5 flex items-center justify-end gap-1 text-[9px] text-ink-500">
          06:30
          <CheckCheck className="h-3 w-3 text-sky-500" strokeWidth={2.5} />
        </div>
      </div>
    </motion.div>
  );
}

function AudioBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className="flex"
    >
      <div className="relative flex max-w-[90%] items-center gap-2 rounded-2xl rounded-tl-md bg-white px-3 py-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <span className="absolute -left-1 top-0 h-3 w-3 bg-white [clip-path:polygon(100%_0,100%_100%,0_0)]" />
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#128C7E] text-white">
          <Mic className="h-4 w-4" />
        </span>
        <div className="flex min-w-0 flex-1 items-center gap-1">
          {[8, 13, 10, 20, 15, 24, 13, 19, 9, 15, 22, 11, 16].map((height, index) => (
            <span
              key={index}
              className="w-1 rounded-full bg-sage-500/60"
              style={{ height }}
            />
          ))}
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] font-medium text-ink-700">0:18</p>
          <p className="mt-0.5 flex items-center justify-end gap-1 text-[9px] text-ink-500">
            06:31
            <CheckCheck className="h-3 w-3 text-sky-500" strokeWidth={2.5} />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="flex"
    >
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-white px-3 py-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-ink-500"
            animate={{ y: [0, -2, 0], opacity: [0.35, 1, 0.35] }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

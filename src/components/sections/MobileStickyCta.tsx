"use client";

import { useEffect, useState } from "react";
import { Sunrise } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { openCaktoCheckout } from "@/lib/cakto";
import { trackCheckoutClick } from "@/lib/tracking";

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-cream-200/80 bg-cream-50/92 px-4 pb-4 pt-3 shadow-[0_-18px_34px_-26px_rgba(42,31,24,0.42)] backdrop-blur-xl transition-all duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <Button
        type="button"
        size="lg"
        className="w-full py-4"
        onClick={() => {
          trackCheckoutClick("teste");
          openCaktoCheckout("teste");
        }}
      >
        <Sunrise className="h-5 w-5" />
        Começar por R$ 5
      </Button>
    </div>
  );
}

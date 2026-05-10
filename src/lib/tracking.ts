import type { CaktoCheckoutKey } from "@/lib/cakto";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackCheckoutClick(plan: CaktoCheckoutKey) {
  if (typeof window === "undefined") {
    return;
  }

  window.fbq?.("track", "InitiateCheckout", {
    content_name: `cakto_${plan}`,
  });

  window.gtag?.("event", "begin_checkout", {
    checkout_provider: "cakto",
    plan,
  });
}


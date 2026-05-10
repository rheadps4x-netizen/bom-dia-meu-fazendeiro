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

  trackInternalEvent("click", plan);

  window.fbq?.("track", "InitiateCheckout", {
    content_name: `cakto_${plan}`,
  });

  window.gtag?.("event", "begin_checkout", {
    checkout_provider: "cakto",
    plan,
  });
}

export function trackLandingVisit() {
  if (typeof window === "undefined") {
    return;
  }

  trackInternalEvent("visit");
}

function trackInternalEvent(type: "visit" | "click", plan?: CaktoCheckoutKey) {
  const payload = JSON.stringify({
    type,
    plan,
    path: window.location.pathname,
    referrer: document.referrer || undefined,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/analytics",
      new Blob([payload], { type: "application/json" }),
    );
    return;
  }

  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

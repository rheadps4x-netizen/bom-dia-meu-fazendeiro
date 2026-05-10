export const CAKTO_CHECKOUTS = {
  teste: "https://pay.cakto.com.br/32kqoqb_880174",
  premium: "https://pay.cakto.com.br/ym5qjuc",
  personalizado: "https://pay.cakto.com.br/sj4kern",
} as const;

export type CaktoCheckoutKey = keyof typeof CAKTO_CHECKOUTS;

export function openCaktoCheckout(plan: CaktoCheckoutKey) {
  if (typeof window === "undefined") {
    return;
  }

  window.open(CAKTO_CHECKOUTS[plan], "_blank");
}

const CAKTO_CHECKOUT_URL = "https://pay.cakto.com.br/32kqoqb_880174";

export const CAKTO_CHECKOUTS = {
  teste: CAKTO_CHECKOUT_URL,
  premium: CAKTO_CHECKOUT_URL,
  personalizado: CAKTO_CHECKOUT_URL,
} as const;

export type CaktoCheckoutKey = keyof typeof CAKTO_CHECKOUTS;

export function openCaktoCheckout(plan: CaktoCheckoutKey) {
  if (typeof window === "undefined") {
    return;
  }

  window.open(CAKTO_CHECKOUTS[plan], "_blank");
}

import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bom Dia, Meu Fazendeiro — Mensagens diárias que cuidam de você",
  description:
    "Receba todos os dias, no WhatsApp, uma palavra que te acolhe, te lembra do que importa e te dá força para cultivar a sua vida.",
  openGraph: {
    title: "Bom Dia, Meu Fazendeiro",
    description:
      "Mensagens diárias de acolhimento, fé e propósito direto no seu WhatsApp.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}

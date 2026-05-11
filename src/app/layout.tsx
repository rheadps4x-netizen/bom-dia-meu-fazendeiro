import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { TrackingScripts } from "@/components/analytics/TrackingScripts";
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
  title: "Projeto Alpha",
  description: "Quiz e checkout digital do Projeto Alpha para confiança, energia e rotina masculina.",
  icons: {
    icon: "/images/logo-alpha.png",
  },
  openGraph: {
    title: "Projeto Alpha",
    description: "Quiz e checkout digital do Projeto Alpha para confiança, energia e rotina masculina.",
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
      <body>
        <TrackingScripts />
        {children}
      </body>
    </html>
  );
}

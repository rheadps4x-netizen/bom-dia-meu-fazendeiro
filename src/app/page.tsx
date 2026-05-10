import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Beneficios } from "@/components/sections/Beneficios";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Planos } from "@/components/sections/Planos";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyCta } from "@/components/sections/MobileStickyCta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Beneficios />
        <ComoFunciona />
        <Depoimentos />
        <Planos />
        <CtaFinal />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}

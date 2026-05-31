import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import HowItWorks from "@/components/HowItWorks";
import Setup from "@/components/Setup";
import Features from "@/components/Features";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Logos />
      <Divider />
      <HowItWorks />
      <Divider />
      <Setup />
      <Divider />
      <Features />
      <Divider />
      <Faq />
      <Divider />
      <Cta />
      <Footer />
    </>
  );
}

function Divider() {
  return (
    <div style={{
      height: 1,
      background: "linear-gradient(90deg, transparent, var(--border2), transparent)",
      maxWidth: 960,
      margin: "0 auto",
    }} />
  );
}

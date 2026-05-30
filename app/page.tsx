import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Setup from "@/components/Setup";
import Features from "@/components/Features";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Divider />
      <HowItWorks />
      <Divider />
      <Setup />
      <Divider />
      <Features />
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
      background: "linear-gradient(90deg, transparent, var(--border), transparent)",
      maxWidth: 900,
      margin: "0 auto",
    }} />
  );
}

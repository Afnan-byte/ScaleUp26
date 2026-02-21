"use client";
import { useState, useEffect, useRef } from "react";
import Banner from "@/components/Banner";
import Date from "@/components/Date";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Involved from "@/components/Involved";
import Navbar from "@/components/Navbar";
import { Whatsapp } from "@/components/whatsapp";
import Marque from "@/components/Marque";
import Speaker from "@/components/Speakers"
import PartnersSection from "@/components/Partners";
import ScaleupEventRoster from "@/components/EventRoster";

export default function Home() {
  const [open, setOpen] = useState(false);
  const hasShown = useRef(false);

  useEffect(() => {
    if (hasShown.current) return;

    const timer = setTimeout(() => {
      setOpen(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("whatsapp-modal-opened"));
      }
      hasShown.current = true;
    }, 6000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <main className="flex flex-col overflow-hidden">
      <Navbar />
      <Marque />
      <Hero />
      <Date />
      <Speaker/>
      
      <Banner />
      <Involved />
      <ScaleupEventRoster/>
      <PartnersSection/>
      <Footer />
      <Whatsapp open={open} setOpen={setOpen} />
    </main>
  );
}

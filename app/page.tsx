import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero";
import MenuSection from "@/components/menu";
import TestimonialSection from "@/components/testimonial";
import ContactSection from "@/components/contact";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <TestimonialSection />
        <ContactSection />
        <FooterSection />
      </main>
    </>
  );
}

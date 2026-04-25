import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero";
import MenuSection from "@/components/menu";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
      </main>
    </>
  );
}

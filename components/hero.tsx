"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", "/");
    }
  };

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollY } = useScroll();

  const rawXLeft = useTransform(
    scrollY,
    [0, 1400],
    isMobile ? [0, 0] : isTablet ? [0, -140] : [0, -260],
  );

  const rawXRight = useTransform(
    scrollY,
    [0, 1400],
    isMobile ? [0, 0] : isTablet ? [0, 140] : [0, 260],
  );

  const xLeft = useSpring(rawXLeft, {
    stiffness: 70,
    damping: 18,
  });

  const xRight = useSpring(rawXRight, {
    stiffness: 70,
    damping: 18,
  });

  /* decor parallax only */
  const topParallax = useTransform(scrollY, [0, 800], [0, -35]);
  const midParallax = useTransform(scrollY, [0, 800], [0, -55]);
  const deepParallax = useTransform(scrollY, [0, 800], [0, -90]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#f8f5ef] pt-18 md:pt-24 lg:pt-0 lg:max-h-screen"
    >
      {/* DECOR 1 : top left */}
      <motion.div
        style={{ y: topParallax }}
        className="pointer-events-none absolute left-0 top-8 -z-10 opacity-75"
      >
        <Image
          src="/assets/tomato2.svg"
          alt="Tomato"
          width={90}
          height={90}
          className="h-auto w-12 md:w-14"
        />
      </motion.div>

      {/* DECOR 2 : extra left corner */}
      <motion.div
        style={{ y: midParallax }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="pointer-events-none absolute bottom-18 left-0 -z-10 opacity-70"
      >
        <Image
          src="/assets/parsley.svg"
          alt="Parsley"
          width={130}
          height={130}
          className="h-auto w-16 md:w-18"
        />
      </motion.div>

      {/* DECOR 4 : bottom right */}
      <motion.div
        style={{ x: xLeft, y: deepParallax }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="pointer-events-none absolute bottom-8 right-0 top-20 opacity-75 md:top-0 md:left-0"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/assets/cheese.svg"
            alt="Cheese"
            width={210}
            height={210}
            className="h-auto w-22 md:w-34 rotate-20"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:items-center">
        {/* LEFT CONTENT STATIC */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex min-h-[420px] flex-col justify-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-neutral-500">
            Delicious
          </p>

          <h1 className="text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">
            Where every bite
            <br />
            feels special
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600">
            Fresh handmade pasta, authentic flavors, and unforgettable dining
            moments crafted every day.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              className="rounded-full bg-orange-500 px-8 py-6 text-white hover:bg-orange-600"
              onClick={() => scrollToSection("menu")}
            >
              Explore Menu
            </Button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          style={{ y: deepParallax }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-square w-full max-w-145">
            <Image
              src="/assets/Lasagna.svg"
              alt="Lasagna Pasta"
              fill
              priority
              loading="eager"
              sizes="(max-width: 768px) 90vw, 50vw"
              className="object-contain"
            />

            {/* DECOR 3 : cheese visible */}
            <motion.div
              style={{ x: xLeft, y: topParallax }}
              animate={{ rotate: [6, 10, 6] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="pointer-events-none absolute hidden -left-10 top-0 md:block md:right-8 md:left-0 md:top-10"
            >
              <Image
                src="/assets/sauce.svg"
                alt="Cheese"
                width={270}
                height={270}
                className="h-auto w-25 md:w-32"
              />
            </motion.div>

            <motion.div
              style={{ x: xRight }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="pointer-events-none absolute -right-10 md:right-0 top-15"
            >
              <Image
                src="/assets/tomato2.svg"
                alt="Tomato"
                width={100}
                height={200}
                className="h-auto w-20"
              />
            </motion.div>

            <motion.div
              style={{ x: xRight }}
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="pointer-events-none absolute bottom-5 -left-10"
            >
              <Image
                src="/assets/parsley.svg"
                alt="Parsley"
                width={200}
                height={200}
                className="h-auto w-25 lg:w-35"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

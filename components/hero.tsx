"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  const rawX = useTransform(
    scrollY,
    [0, 1400],
    isMobile ? [0, 0] : isTablet ? [0, -180] : [0, -500],
  );
  const x = useSpring(rawX, {
    stiffness: 70,
    damping: 18,
  });
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#f8f5ef] pt-28 lg:pt-0 lg:max-h-screen overflow-hidden"
    >
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center lg:items-end lg:pb-35 gap-12 px-6 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
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
            <Button className="rounded-full bg-orange-500 px-8 py-6 text-white hover:bg-orange-600">
              Explore Menu
            </Button>
          </div>

          {/* Cheesee */}
          <motion.div
            style={{ x, opacity }}
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute top-20 -right-20 rotate-5 md:right-0 lg:-top-35 lg:-left-15"
          >
            <Image
              src="/assets/cheese.svg"
              alt="https://pin.it/2UjYSL02G"
              width={200}
              height={200}
              className="w-25 h-auto md:w-25 lg:w-25"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-square w-full max-w-145">
            <Image
              src="/assets/Lasagna.svg"
              alt="https://pin.it/4PCLFMDPp"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />

            {/* Floating tomato */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute right-0 top-15"
            >
              <Image
                src="/assets/tomato2.svg"
                alt="https://pin.it/4PCLFMDPp"
                width={100}
                height={200}
                className="w-20 h-auto md:w-20 lg:w-20"
              />
            </motion.div>

            {/* Floating basil */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute bottom-5 left-0"
            >
              <Image
                src="/assets/parsley.svg"
                alt="https://pin.it/2UjYSL02G"
                width={200}
                height={200}
                className="w-25 h-auto md:w-25 lg:w-35"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

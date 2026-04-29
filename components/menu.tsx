"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const data = {
  pasta: [
    {
      name: "Lasagna",
      image: "/assets/Lasagna.svg",
      desc: "Layers of fresh pasta, rich meat sauce, and melted cheese baked to perfection.",
    },
    {
      name: "Macaroni Schotel",
      image: "/assets/macaroni.svg",
      desc: "Creamy baked macaroni blended with cheese and flavorful toppings.",
    },
    {
      name: "Spaghetti Brulee",
      image: "/assets/spaghetti.svg",
      desc: "Tender spaghetti finished with creamy sauce and caramelized cheese topping.",
    },
  ],

  dessert: [
    {
      name: "Tiramisu",
      image: "/assets/tiramisu.svg",
      desc: "Soft layers of cream and coffee-soaked sponge in every spoonful.",
    },
    {
      name: "Creme Brulee",
      image: "/assets/brulee.svg",
      desc: "Silky vanilla custard topped with crisp caramelized sugar.",
    },
    {
      name: "Panna Cotta",
      image: "/assets/panna.svg",
      desc: "Delicate cream dessert with a smooth and silky texture.",
    },
  ],

  drink: [
    {
      name: "Latte",
      image: "/assets/latte.svg",
      desc: "Smooth espresso blended with perfectly steamed milk.",
    },
    {
      name: "Mojito",
      image: "/assets/mojito.svg",
      desc: "Fresh mint, citrus, and sparkling flavors combined beautifully.",
    },
    {
      name: "Lemon Tea",
      image: "/assets/tea.svg",
      desc: "Refreshing tea infused with zesty lemon notes.",
    },
  ],
};

const decorMap = {
  pasta: {
    left: "/assets/tomatosplash.svg",
    right: "/assets/pasta2.svg",
  },
  dessert: {
    left: "/assets/choco.svg",
    right: "/assets/dcr2.svg",
  },
  drink: {
    left: "/assets/matcha.svg",
    right: "/assets/dcr3.svg",
  },
};

export default function MenuSection() {
  type Category = "pasta" | "dessert" | "drink";

  const [active, setActive] = useState<Category>("pasta");

  const tabs: { key: Category; label: string }[] = [
    { key: "pasta", label: "Pasta" },
    { key: "dessert", label: "Dessert" },
    { key: "drink", label: "Minuman" },
  ];

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

  const rawLeftX = useTransform(
    scrollY,
    [0, 1000],
    isMobile ? [0, 0] : isTablet ? [-60, 0] : [-180, 0],
  );

  const rawRightX = useTransform(
    scrollY,
    [0, 500],
    isMobile ? [0, 0] : isTablet ? [60, 0] : [180, 0],
  );

  const leftX = useSpring(rawLeftX, {
    stiffness: 70,
    damping: 18,
  });

  const rightX = useSpring(rawRightX, {
    stiffness: 70,
    damping: 18,
  });

  const opacity = useTransform(scrollY, [0, 500], [0, 1]);

  const decor = decorMap[active];

  /* =========================
   ADD THESE STATES
========================= */

  const [mobileIndex, setMobileIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* reset when category changes */
  useEffect(() => {
    if (!isMobile || paused) return;

    intervalRef.current = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % data[active].length);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMobile, paused, active]);

  /* resume after hold / scroll */
  const resumeAuto = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setPaused(false);
    }, 450);
  };

  const stopAuto = () => {
    setPaused(true);

    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <section id="menu" className="relative overflow-hidden py-24">
      {/* LEFT DECOR CHANGING */}
      <motion.div
        key={`left-${active}`}
        style={{ x: leftX, opacity }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, 10, 0],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 0.35,
          y: { repeat: Infinity, duration: 6 },
          rotate: { repeat: Infinity, duration: 6 },
        }}
        className="absolute top-0 -left-20 md:left-5 md:top-28 z-0"
      >
        <Image
          src={decor.left}
          alt=""
          width={180}
          height={180}
          className="w-35 md:w-35 opacity-80"
        />
      </motion.div>

      {/* RIGHT DECOR CHANGING */}
      <motion.div
        key={`right-${active}`}
        style={{ x: rightX, opacity }}
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          duration: 0.35,
          y: {
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          },
          rotate: {
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          },
        }}
        className="absolute -right-10 bottom-34 hidden lg:block"
      >
        <Image
          src={decor.right}
          alt=""
          width={280}
          height={280}
          className="w-44 md:w-35 opacity-80"
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            Our Menu
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            What’s on our plate
          </h2>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                active === tab.key
                  ? "bg-black text-white"
                  : "bg-transparent text-black hover:bg-black/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* MENU CONTENT */}
        {isMobile ? (
          <div className="mt-14 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-${mobileIndex}`}
                initial={{ opacity: 0, scale: 0.75, x: -40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 40 }}
                transition={{ duration: 0.45 }}
                onTouchStart={stopAuto}
                onTouchEnd={resumeAuto}
                onMouseDown={stopAuto}
                onMouseUp={resumeAuto}
                className="mx-auto max-w-xs text-center"
              >
                <div className="relative mx-auto aspect-square w-full max-w-56">
                  <Image
                    src={data[active][mobileIndex].image}
                    alt={data[active][mobileIndex].name}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {data[active][mobileIndex].name}
                </h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-neutral-600">
                  {data[active][mobileIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* INDICATOR FIXED */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                {data[active].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      width: mobileIndex === i ? 22 : 8,
                      opacity: mobileIndex === i ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full bg-black"
                  />
                ))}
              </div>

              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                Hold to pause
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35 }}
              className="mt-16 grid gap-10 md:grid-cols-3"
            >
              {data[active].map((item) => (
                <div key={item.name} className="group text-center">
                  <div className="relative mx-auto aspect-square w-full max-w-55">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">{item.name}</h3>

                  <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-neutral-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

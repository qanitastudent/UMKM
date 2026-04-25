"use client";

import { useState, useEffect } from "react";
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
      desc: "Layers of fresh pasta, rich meat sauce, and melted cheese baked to perfection. Warm, savory, and deeply satisfying in every bite. A comforting favorite you will want to enjoy again.",
    },
    {
      name: "Macaroni Schotel",
      image: "/assets/macaroni.svg",
      desc: "Creamy baked macaroni blended with cheese and flavorful toppings. Soft, rich, and perfectly golden on top. Try this classic dish made to brighten your meal.",
    },
    {
      name: "Spaghetti Brulee",
      image: "/assets/spaghetti.svg",
      desc: "Tender spaghetti finished with creamy sauce and caramelized cheese topping. A unique balance of savory and indulgent flavors. Taste something special crafted for your cravings.",
    },
  ],

  dessert: [
    {
      name: "Tiramisu",
      image: "/assets/tiramisu.svg",
      desc: "Soft layers of cream and coffee-soaked sponge in every spoonful. Light, smooth, and irresistibly elegant. End your meal with this timeless Italian delight.",
    },
    {
      name: "Creme Brulee",
      image: "/assets/brulee.svg",
      desc: "Silky vanilla custard topped with crisp caramelized sugar. Crack the golden surface and enjoy the creamy center. A luxurious dessert made to impress.",
    },
    {
      name: "Panna Cotta",
      image: "/assets/panna.svg",
      desc: "Delicate cream dessert with a smooth and silky texture. Light sweetness that melts beautifully on the tongue. A refreshing finish to any dining moment.",
    },
  ],

  drink: [
    {
      name: "Latte",
      image: "/assets/latte.svg",
      desc: "Smooth espresso blended with perfectly steamed milk. Rich aroma and comforting warmth in every sip. The perfect companion for any time of day.",
    },
    {
      name: "Mojito",
      image: "/assets/mojito.svg",
      desc: "Fresh mint, citrus, and sparkling flavors combined beautifully. Cool, lively, and instantly refreshing. A bright drink made to lift your mood.",
    },
    {
      name: "Lemon Tea",
      image: "/assets/tea.svg",
      desc: "Refreshing tea infused with zesty lemon notes. Light, crisp, and wonderfully balanced. Enjoy a calming sip with every meal.",
    },
  ],
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

  return (
    <section
      id="menu"
      className="relative py-24 scroll-mt-24 lg:max-w-screen overflow-hidden"
    >
      {/* Left Decor */}
      <motion.div
        style={{ x: leftX, opacity: opacity }}
        animate={{ y: [0, 10, 0], rotate: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="
        absolute
        left-5 top-28
        sm:left-0 sm:top-24
        md:left-2 md:top-24
        lg:left-0 lg:top-32
        z-0"
      >
        <Image
          src="/assets/dcr1.svg"
          alt=""
          width={180}
          height={180}
          className="
        w-14
        sm:w-16
        md:w-20
        lg:w-28
        xl:w-36
        opacity-50 lg:opacity-70"
        />
      </motion.div>

      {/* Right Decor */}
      <motion.div
        style={{ x: rightX, opacity: opacity }}
        animate={{ y: [0, -10, 0], rotate: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute -right-10 bottom-34 hidden lg:block"
      >
        <Image
          src="/assets/dcr2.svg"
          alt=""
          width={280}
          height={280}
          className="w-44 xl:w-32 opacity-80"
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

        {/* Content */}
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
              <div
                key={item.name}
                className="group text-center transition-all duration-300"
              >
                {/* Image */}
                <div className="relative mx-auto aspect-square w-full max-w-55">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-2xl font-semibold">{item.name}</h3>

                {/* Desc */}
                <p
                  className="
                    mx-auto mt-3 max-w-xs text-sm leading-7 text-neutral-600
                    overflow-hidden
                    max-h-none
                    lg:max-h-21
                    lg:group-hover:max-h-40
                    transition-all duration-500 ease-in-out"
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

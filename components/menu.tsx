"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const data = {
  pasta: [
    {
      name: "Lasagna",
      image: "/assets/Lasagna.svg",
      desc: "Rich layered pasta with cheese.",
    },
    {
      name: "Macaroni Schotel",
      image: "/assets/macaroni.svg",
      desc: "Creamy baked macaroni delight.",
    },
    {
      name: "Spaghetti Brulee",
      image: "/assets/spaghetti.svg",
      desc: "Spaghetti with caramelized cheese.",
    },
  ],

  dessert: [
    {
      name: "Tiramisu",
      image: "/assets/tiramisu.svg",
      desc: "Coffee layered Italian dessert.",
    },
    {
      name: "Creme Brulee",
      image: "/assets/brulee.svg",
      desc: "Crunchy caramel vanilla cream.",
    },
    {
      name: "Panna Cotta",
      image: "/assets/panna.svg",
      desc: "Silky cream dessert.",
    },
  ],

  drink: [
    {
      name: "Latte",
      image: "/assets/latte.svg",
      desc: "Smooth espresso milk coffee.",
    },
    {
      name: "Mojito",
      image: "/assets/mojito.svg",
      desc: "Fresh sparkling mint drink.",
    },
    {
      name: "Lemon Tea",
      image: "/assets/tea.svg",
      desc: "Refreshing citrus tea.",
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

  return (
    <section id="menu" className="bg-[#f8f5ef] py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            Our Menu
          </p>

          <h2 className="mt-3 text-4xl font-semibold md:text-6xl">
            What’s on our plate
          </h2>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`rounded-full px-6 py-3 text-sm font-medium transition ${
                active === tab.key
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-neutral-100"
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
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="mt-14 grid gap-8 md:grid-cols-3"
          >
            {data[active].map((item) => (
              <div
                key={item.name}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <div className="relative mx-auto aspect-square w-full max-w-55">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">{item.name}</h3>

                <p className="mt-2 text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

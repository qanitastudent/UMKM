"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    name: "Sophia Carter",
    role: "Food Blogger",
    avatar: "/assets/profile1.jpeg",
    image: "/assets/spaghetti.svg",
    quote:
      "The pasta was absolutely unforgettable. Fresh flavors, elegant presentation, and a dining experience I would happily repeat.",
  },
  {
    name: "Daniel Moore",
    role: "Local Customer",
    avatar: "/assets/profile2.jpeg",
    image: "/assets/Lasagna.svg",
    quote:
      "Every bite felt warm and comforting. The lasagna was rich, cheesy, and perfectly baked.",
  },
  {
    name: "Emma Wilson",
    role: "Traveler",
    avatar: "/assets/profile3.jpeg",
    image: "/assets/macaroni.svg",
    quote:
      "Beautiful atmosphere and incredible taste. Easily one of the best meals during my trip.",
  },
];

export default function TestimonialSection() {
  const [active, setActive] = useState(0);

  const item = testimonials[active];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#f8f5ef] py-20 md:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        {/* decor kiri atas */}
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="pointer-events-none absolute left-0 top-0"
        >
          <Image
            src="/assets/parsley.svg"
            alt=""
            width={90}
            height={90}
            className="h-auto w-14 opacity-70 md:w-20"
          />
        </motion.div>

        {/* decor kanan bawah */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="pointer-events-none absolute bottom-0 right-0"
        >
          <Image
            src="/assets/eggw.svg"
            alt=""
            width={90}
            height={90}
            className="h-auto w-14 opacity-70 md:w-20"
          />
        </motion.div>

        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT IMAGE */}
          <motion.div
            key={item.image}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="relative mx-auto"
          >
            <div className="relative mx-auto h-[320px] w-[320px] md:h-[420px] md:w-[420px]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority={active === 0}
                loading={active === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 320px, 420px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
              Testimonials
            </p>

            <h2 className="mt-3 text-4xl font-semibold md:text-6xl">
              Let’s see what others say
            </h2>

            <motion.p
              key={item.quote}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 lg:mx-0"
            >
              “{item.quote}”
            </motion.p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-sm text-neutral-500">{item.role}</p>
            </div>

            {/* avatars */}
            <div className="mt-8 flex justify-center gap-4 lg:justify-start">
              {testimonials.map((user, index) => (
                <button
                  key={user.name}
                  onClick={() => setActive(index)}
                  className={`relative h-14 w-14 overflow-hidden rounded-full ring-2 transition-all ${
                    active === index
                      ? "scale-110 ring-orange-500"
                      : "ring-black/10 hover:scale-105"
                  }`}
                  aria-label={`Show testimonial from ${user.name}`}
                >
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

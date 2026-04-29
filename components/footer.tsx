"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  { icon: FaInstagram, href: "#" },
  { icon: FaFacebook, href: "#" },
  { icon: FaXTwitter, href: "#" },
];

export default function FooterSection() {
  return (
    <section
      id="footer"
      className="relative overflow-x-hidden overflow-y-visible bg-[#f8f5ef] pt-36 pb-5 md:pt-28 md:pb-5"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        {/* BACKGROUND SMALL DECOR */}
        {/* garlic top center */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="pointer-events-none absolute left-[42%] top-6 z-0 opacity-80"
        >
          <Image
            src="/assets/celery.svg"
            alt=""
            width={70}
            height={70}
            className="w-12 md:w-25"
          />
        </motion.div>

        {/* basil mid left */}
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 5.8 }}
          className="pointer-events-none absolute left-8 top-1/2 z-0 opacity-85"
        >
          <Image
            src="/assets/parsley.svg"
            alt=""
            width={70}
            height={70}
            className="w-12 md:w-25"
          />
        </motion.div>

        {/* chili bottom left */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
          className="pointer-events-none absolute left-14 bottom-14 z-0 opacity-80"
        >
          <Image
            src="/assets/chili.svg"
            alt=""
            width={90}
            height={90}
            className="w-14 md:w-20"
          />
        </motion.div>

        {/* garlic bottom right */}
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -7, 0] }}
          transition={{ repeat: Infinity, duration: 6.5 }}
          className="pointer-events-none absolute right-0 bottom-18 z-0 opacity-75"
        >
          <Image
            src="/assets/garlic.svg"
            alt=""
            width={60}
            height={60}
            className="w-10 md:w-80"
          />
        </motion.div>

        {/* RIGHT MAIN DECOR */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="
          pointer-events-none absolute z-0 opacity-95
          -right-22.5 top-[58%]
          sm:-right-27.5 sm:top-[56%]
          md:-right-22.5 md:top-1/2
          lg:right-20 lg:top-1/2
          -translate-y-1/2
          w-85
          sm:w-105
          md:w-150
          lg:w-130
          "
        >
          <div className="relative aspect-square w-full">
            <Image
              src="/assets/Lasagna.svg"
              alt=""
              fill
              sizes="(max-width:640px) 340px,
              (max-width:768px) 420px,
              (max-width:1024px) 520px,
              (max-width:1280px) 620px,
              700px"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* floating parsley */}
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="pointer-events-none absolute right-10 top-14 z-0 w-12 opacity-70 md:w-16"
        >
          <Image
            src="/assets/parsley.svg"
            alt=""
            width={70}
            height={70}
            className="h-auto w-full"
          />
        </motion.div>

        {/* floating tomato */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4.8 }}
          className="pointer-events-none absolute bottom-16 left-0 z-0 w-12 opacity-70 md:w-16"
        >
          <Image
            src="/assets/tomato2.svg"
            alt=""
            width={70}
            height={70}
            className="h-auto w-full"
          />
        </motion.div>

        {/* CONTENT */}
        <div className="relative z-10 grid items-center gap-14 md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
              Follow Us
            </p>

            <h3 className="mt-4 text-4xl font-semibold leading-tight text-black md:text-6xl">
              Stay connected
              <br />
              with PastaHouse
            </h3>

            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-700 md:text-lg">
              Discover fresh dishes, seasonal creations, and moments from our
              kitchen every day. Follow our journey and never miss what is
              cooking next.
            </p>

            {/* SOCIAL */}
            <div className="mt-8 flex flex-wrap gap-4">
              {socials.map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-black text-white shadow-sm transition hover:bg-orange-500"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>

            {/* CTA */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-green-500 px-7 py-4 text-sm font-medium text-white shadow-lg transition hover:bg-green-600"
            >
              <FaWhatsapp className="h-4 w-4" />
              Chat via WhatsApp
            </motion.a>
          </div>

          {/* RIGHT SPACE */}
          <div className="hidden md:block" />
        </div>

        {/* LEFT CONTENT SHADOW MASK */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full bg-gradient-to-r from-[#f8f5ef] via-[#f8f5ef]/92 to-transparent md:w-[72%]" />
      </div>

      {/* COPYRIGHT */}
      <div className="relative z-10 mt-12 md:mt-16 px-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} PastaHouse. All rights reserved.
      </div>
    </section>
  );
}

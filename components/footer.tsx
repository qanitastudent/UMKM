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
    <section className="relative overflow-hidden bg-[#f8f5ef] py-20 md:py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* ===================== */}
        {/* RIGHT MAIN DECOR */}
        {/* ===================== */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="pointer-events-none absolute right-[-40px] top-1/2 z-0 w-[220px] -translate-y-1/2 opacity-90 md:right-[-20px] md:w-[320px] lg:right-0 lg:w-[420px]"
        >
          <Image
            src="/assets/Lasagna.svg"
            alt=""
            width={420}
            height={420}
            className="h-auto w-full object-contain drop-shadow-2xl"
          />
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

        {/* ===================== */}
        {/* CONTENT */}
        {/* ===================== */}
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

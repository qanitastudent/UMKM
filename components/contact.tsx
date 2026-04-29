"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  /* scroll berdasarkan section contact */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* kiri masuk kiri -> kanan */
  const rawLeftX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : isTablet ? [-90, 20] : [-240, 40],
  );

  /* kanan masuk kanan -> kiri */
  const rawRightX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : isTablet ? [90, -20] : [240, -40],
  );

  const leftX = useSpring(rawLeftX, {
    stiffness: 65,
    damping: 18,
  });

  const rightX = useSpring(rawRightX, {
    stiffness: 65,
    damping: 18,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.35, 1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-[#f8f5ef] py-24 md:pb-5"
    >
      <div className="relative mx-auto max-w-5xl px-6">
        {/* DECOR AROUND CARD */}
        {/* kiri atas */}
        <motion.div
          style={{ x: leftX, opacity }}
          animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="pointer-events-none absolute -left-14 top-8 z-0"
        >
          <Image
            src="/assets/butter.svg"
            alt=""
            width={90}
            height={90}
            className="w-14 opacity-80 md:w-28"
          />
        </motion.div>

        {/* kiri bawah */}
        <motion.div
          style={{ x: leftX, opacity }}
          animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 6.4 }}
          className="pointer-events-none absolute -left-16 bottom-12 z-0"
        >
          <Image
            src="/assets/cinnamon.svg"
            alt=""
            width={110}
            height={110}
            className="w-16 opacity-80 md:w-34"
          />
        </motion.div>

        {/* kanan atas */}
        <motion.div
          style={{ x: rightX, opacity }}
          animate={{ y: [0, -12, 0], rotate: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 5.2 }}
          className="pointer-events-none absolute -right-12 top-10 z-0"
        >
          <Image
            src="/assets/caramel.svg"
            alt=""
            width={110}
            height={110}
            className="w-16 opacity-80 md:w-24"
          />
        </motion.div>

        {/* kanan bawah */}
        <motion.div
          style={{ x: rightX, opacity }}
          animate={{ y: [0, 10, 0], rotate: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 5.8 }}
          className="pointer-events-none absolute -right-14 bottom-8 z-0"
        >
          <Image
            src="/assets/chili.svg"
            alt=""
            width={95}
            height={95}
            className="w-14 opacity-80 md:w-28"
          />
        </motion.div>

        {/* CARD */}
        <div className="relative z-10 rounded-[36px] bg-white px-6 py-14 shadow-sm ring-1 ring-black/5 md:px-14">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
              Contact Us
            </p>

            <h2 className="mt-3 text-4xl font-semibold md:text-6xl">
              Fresh updates to your inbox
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-neutral-600">
              Have questions, reservations, or special requests? Send us a
              message and let’s create something delicious together.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 max-w-3xl space-y-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="h-14 rounded-full border border-black/10 px-6 outline-none transition focus:border-orange-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                required
                className="h-14 rounded-full border border-black/10 px-6 outline-none transition focus:border-orange-500"
              />
            </div>

            <textarea
              placeholder="Your Message"
              required
              rows={5}
              className="w-full resize-none rounded-3xl border border-black/10 px-6 py-4 outline-none transition focus:border-orange-500"
            />

            <div className="text-center">
              <button
                type="submit"
                className="rounded-full bg-orange-500 px-10 py-4 text-white transition hover:bg-orange-600"
              >
                Send Message
              </button>

              {sent && (
                <p className="mt-4 text-sm text-green-600">
                  Message sent successfully.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

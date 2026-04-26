"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
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
    [0, 450],
    isMobile ? [0, 0] : isTablet ? [-80, 0] : [-240, 0],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f8f5ef] py-24"
    >
      <div className="relative mx-auto max-w-5xl px-6">
        {/* dekor kiri */}
        <motion.div
          style={{ x: leftX, opacity }}
          animate={{ y: [0, 12, 0], rotate: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute left-4 top-12 z-10"
        >
          <Image
            src="/assets/tomato2.svg"
            alt=""
            width={70}
            height={70}
            className="h-auto w-12 opacity-70 md:w-16 lg:w-20"
          />
        </motion.div>

        {/* dekor kanan */}
        <motion.div
          style={{ x: rightX, opacity }}
          animate={{ y: [0, -12, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute bottom-0 -right-20 z-10"
        >
          <Image
            src="/assets/parsley.svg"
            alt=""
            width={70}
            height={70}
            className="h-auto w-12 opacity-70 md:w-16 lg:w-30"
          />
        </motion.div>

        {/* Card */}
        <div className="relative rounded-[36px] bg-white px-6 py-14 shadow-sm ring-1 ring-black/5 md:px-14">
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

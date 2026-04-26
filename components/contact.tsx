"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // sementara dummy success
    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f8f5ef] py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* dekor kiri */}
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute left-4 top-12"
        >
          <Image
            src="/assets/tomato2.svg"
            alt=""
            width={70}
            height={70}
            className="w-12 md:w-16 opacity-70"
          />
        </motion.div>

        {/* dekor kanan */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute right-4 bottom-12"
        >
          <Image
            src="/assets/parsley.svg"
            alt=""
            width={70}
            height={70}
            className="w-12 md:w-16 opacity-70"
          />
        </motion.div>

        {/* Card */}
        <div className="rounded-[36px] bg-white px-6 py-14 shadow-sm ring-1 ring-black/5 md:px-14">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
              Contact Us
            </p>

            <h2 className="mt-3 text-4xl font-semibold md:text-6xl">
              Fresh updates to your inbox
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-neutral-600 leading-relaxed">
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
              className="w-full rounded-3xl border border-black/10 px-6 py-4 outline-none transition focus:border-orange-500 resize-none"
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

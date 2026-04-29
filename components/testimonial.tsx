"use client";

import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";

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

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const [paused, setPaused] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);

  const item = testimonials[active];

  /* DEVICE CHECK */
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  /* AUTO LOOP */
  useEffect(() => {
    if (paused) return;

    const delay = isMobile ? 2600 : isTablet ? 3400 : 3000;

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, isMobile, isTablet]);

  const stopLoop = () => {
    setPaused(true);

    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resumeLoop = () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);

    resumeRef.current = setTimeout(() => {
      setPaused(false);
    }, 450);
  };

  /* PARALLAX PER SECTION */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawLeftX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [-20, 0] : isTablet ? [-60, 0] : [-80, 0],
  );

  const rawRightX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [20, 0] : isTablet ? [60, 0] : [80, 0],
  );

  const decorOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const leftX = useSpring(rawLeftX, {
    stiffness: 70,
    damping: 18,
  });

  const rightX = useSpring(rawRightX, {
    stiffness: 70,
    damping: 18,
  });

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative overflow-hidden bg-[#f8f5ef] py-20 md:pb-10 md:pt-24"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        {/* DECOR LEFT TOP */}
        <motion.div
          style={{ x: leftX, opacity: decorOpacity }}
          animate={{
            y: [0, 10, 0],
            rotate: [0, 6, 0],
          }}
          transition={{
            y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute left-0 -top-20 md:top-0 z-0"
        >
          <Image
            src="/assets/egg.svg"
            alt=""
            width={90}
            height={90}
            className="h-auto w-30 opacity-40 md:opacity-70 md:w-30"
          />
        </motion.div>

        {/* DECOR RIGHT BOTTOM */}
        <motion.div
          style={{ x: rightX, opacity: decorOpacity }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, -6, 0],
          }}
          transition={{
            y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute bottom-0 right-0 z-0"
        >
          <Image
            src="/assets/chili.svg"
            alt=""
            width={90}
            height={90}
            className="h-auto w-14 opacity-70 md:w-30"
          />
        </motion.div>

        {/* CONTENT */}
        <div
          onTouchStart={stopLoop}
          onTouchEnd={resumeLoop}
          onMouseDown={stopLoop}
          onMouseUp={resumeLoop}
          onWheel={resumeLoop}
          className="relative z-10 grid items-center gap-14 lg:grid-cols-2"
        >
          {/* LEFT IMAGE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={item.image}
              initial={{ opacity: 0, scale: 0.8, x: -40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 40 }}
              transition={{ duration: 0.45 }}
              className="relative mx-auto"
            >
              <div className="relative mx-auto h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] md:h-[420px] md:w-[420px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  priority={active === 0}
                  sizes="(max-width:768px) 280px, (max-width:1024px) 340px, 420px"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT TEXT */}
          <div className="text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
              Testimonials
            </p>

            <h2 className="mt-3 text-4xl font-semibold md:text-6xl">
              Let’s see what others say
            </h2>

            <AnimatePresence mode="wait">
              <motion.p
                key={item.quote}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 lg:mx-0"
              >
                “{item.quote}”
              </motion.p>
            </AnimatePresence>

            <div className="mt-8">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-sm text-neutral-500">{item.role}</p>
            </div>

            {/* AVATAR INDICATOR */}
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

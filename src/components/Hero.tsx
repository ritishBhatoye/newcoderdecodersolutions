"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";

const slides = [
  {
    title: "EXPERT WEB SOLUTIONS FOR YOUR BUSINESS",
    subtitle: "Crafting Cutting-Edge Websites to Elevate Your Brand",
  },
  {
    title: "MOBILE APP DEVELOPMENT MASTERY",
    subtitle: "iOS, Android, and Cross-Platform Solutions That Inspire",
  },
  {
    title: "FREELANCE EXCELLENCE",
    subtitle: "Bringing Your Digital Vision to Life with Precision",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const springProps = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 300, friction: 10 },
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
      <div className="text-center max-w-4xl mx-auto px-4 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-5xl font-bold mb-4 text-white">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-white mb-6">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <animated.div style={springProps}>
          <Link href="#contact" className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-indigo-100 transition-colors inline-block">
            LET'S CREATE SOMETHING AMAZING
          </Link>
        </animated.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12"
        >
          <p className="text-white mb-4">Trusted By Industry Leaders</p>
          <div className="flex justify-center space-x-8">
            {/* Add your client logos here */}
            {/* Example: <Image src="/client-logo.svg" alt="Client" width={100} height={50} /> */}
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

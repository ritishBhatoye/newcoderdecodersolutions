"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (slides.length === 0) {
    return null; // or a fallback UI
  }

  return (  
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-indigo-300 via-purple-500 to-pink-500 overflow-hidden relative">
      <div className="text-center max-w-4xl mx-auto px-4 relative">
        <h1 className="sr-only">New Coder Decoder Solutions</h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
            aria-live="polite"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black font-montserrat tracking-wide">
              {slides[currentSlide].title}
            </h2>
            <p className="text-lg md:text-xl text-black mb-6 font-roboto font-medium">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <Link href="#contact" className="bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold font-montserrat hover:bg-gray-800 transition-colors inline-block">
            LET'S CREATE SOMETHING AMAZING
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';

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

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const smoothScroll = useCallback((targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // ms
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    }
  }, []);

  const handleBookingClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScroll('booking');
    window.history.pushState(null, '', `${pathname}#booking`);
  }, [pathname, smoothScroll]);

  if (slides.length === 0) {
    return null; // or a fallback UI
  }

  return (  
    <section className="relative bg-black text-white py-20">
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
          <a 
            href="#booking" 
            onClick={handleBookingClick}
            className="bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold font-montserrat hover:bg-gray-800 transition-colors inline-block"
          >
            LET'S CREATE SOMETHING AMAZING
          </a>
        </motion.div>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
        Let&apos;s Grow Your Brand Together
      </h1>
    </section>
  );
}

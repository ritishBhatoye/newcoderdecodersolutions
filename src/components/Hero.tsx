"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';

const slides = [
  {
    category: "WEB SOLUTIONS",
    title: "Transform Your Business with Confidence",
    subtitle: "Cutting-edge websites that convert visitors into loyal customers.",
    highlight: "500+ Projects Delivered",
    cta: "Start Your Project",
    icon: "🚀"
  },
  {
    category: "MOBILE APPS",
    title: "Dominate the Market with Intuitive Apps",
    subtitle: "iOS, Android & cross-platform solutions that users simply adore.",
    highlight: "4.9/5 Client Rating",
    cta: "Build Your App",
    icon: "📱"
  },
  {
    category: "FREELANCE EXCELLENCE",
    title: "Scale Your Operations with Expert Support",
    subtitle: "Professional solutions that grow dynamically with your business needs.",
    highlight: "24/7 Dedicated Support",
    cta: "Get Started Today",
    icon: "⚡"
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const smoothScroll = useCallback((targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
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
    return null;
  }

  return (  
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      {/* Simplified background - removed distracting elements */}

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center"
          >

            {/* Category / Sub-heading (formerly part of the title) */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl font-semibold uppercase tracking-wider text-blue-600 mb-2"
              >
                {slides[currentSlide].category}
              </motion.p>
            </AnimatePresence>

            {/* Main Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                  {slides[currentSlide].title}
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  {slides[currentSlide].subtitle}
                </p>

                
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons (simplified) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex justify-center"
            >
              <a
                href="#booking"
                onClick={handleBookingClick}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                {slides[currentSlide].cta}
              </a>
            </motion.div>

            {/* Removed Features Grid to reduce noise */}
          </motion.div>

          {/* Right Content - Visual Element (simplified) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center"
          >
         
          </motion.div>
        </div>
      </div>
    </section>
  );
}

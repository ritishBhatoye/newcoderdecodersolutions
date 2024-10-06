"use client";

import { useState, useCallback, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  }, [isMenuOpen]);

  const navItems = ['process', 'testimonials', 'booking', 'faqs'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto'; // Ensure scroll is enabled when component unmounts
    };
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

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    smoothScroll(item);
    window.history.pushState(null, '', `${pathname}#${item}`);
    if (isMenuOpen) toggleMenu();
  }, [isMenuOpen, pathname, smoothScroll, toggleMenu]);

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMenuOpen) toggleMenu();
  }, [isMenuOpen, toggleMenu]);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-sm shadow-lg" : "bg-transparent"
      )}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center" 
            aria-label="Home"
            onClick={handleLogoClick}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full overflow-hidden"
            >
              <Image
                src="/logo-2-no-bg.png"
                alt="Company Logo"
                width={50}
                height={50}
                className="rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-logo.png";
                }}
              />
            </motion.div>
          </Link>
          <nav className="hidden md:block" aria-label="Main Navigation">
            <ul className="flex space-x-6 bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              {navItems.map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item}`} 
                    className="text-white hover:text-gray-300 transition-colors"
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link 
            href="#booking" 
            className="hidden md:inline-block bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors shadow-md"
            onClick={(e) => handleNavClick(e, 'booking')}
          >
            GET IN TOUCH
          </Link>
          <button  
            type="button"
            className="md:hidden text-white focus:outline-none z-50"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg shadow-xl md:hidden z-40"
          >
            <nav className="h-full flex flex-col justify-center px-6">
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * navItems.indexOf(item) }}
                  >
                    <Link 
                      href={`#${item}`} 
                      className="block text-white text-lg font-semibold hover:text-gray-300 transition-colors"
                      onClick={(e) => handleNavClick(e, item)}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * navItems.length }}
                >
                  <Link 
                    href="#booking" 
                    className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                    onClick={(e) => handleNavClick(e, 'booking')}
                  >
                    GET IN TOUCH
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
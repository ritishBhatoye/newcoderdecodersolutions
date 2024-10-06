"use client";

import { useState, useCallback } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = ['process', 'testimonials', 'faqs', 'booking'];  // Add 'booking' to navItems

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
  }, [isMenuOpen, pathname, smoothScroll]);

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMenuOpen) toggleMenu();
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
              width={70}
              height={70}
              className="rounded-full"
              onError={(e) => {
                e.currentTarget.src = "/fallback-logo.png";
              }}
            />
          </motion.div>
        </Link>
        <nav 
          className="hidden md:block" 
          aria-label="Main Navigation"
        >
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
          type='button'
          className="md:hidden"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen.toString()}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black bg-opacity-80"
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item}`} 
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="#booking" 
                  className="block bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  onClick={(e) => handleNavClick(e, 'booking')}
                >
                  GET IN TOUCH
                </Link>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
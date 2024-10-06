"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import instagramIcon from '../../public/instagram.png';
import facebookIcon from '../../public/facebook.png';
import linkedinIcon from '../../public/linkedin (1).png';

export default function Footer() {
  const socialProfiles = [
    { name: 'Instagram', icon: instagramIcon, url: 'https://www.instagram.com/coder_decoder_solutions/' },
    { name: 'Facebook', icon: facebookIcon, url: 'https://www.facebook.com/profile.php?id=61561702121874' },
    { name: 'LinkedIn', icon: linkedinIcon, url: 'https://www.linkedin.com/company/coderdecoder-solutions/about/' },
    // { name: 'YouTube', icon: '/youtube-icon.svg', url: '#' },
  ];

  const scrollToBooking = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Email Row */}
        <div className="bg-[#d4ff39] text-black py-4 mb-8 rounded-lg">
          <p className="text-center text-xl font-bold">
            Got Enquires? Contact Us → coderdecodersolutions@gmail.com 😃
          </p>
        </div>

        {/* Logo and Let's Connect Row */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center" aria-label="Home">
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
          <a 
            href="#booking" 
            onClick={scrollToBooking}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
          >
            LET&apos;S DISCUSS
          </a>
        </div>

        {/* Social Profiles Row */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialProfiles.map((profile) => (
            <Link 
              key={profile.name} 
              href={profile.url} 
              aria-label={profile.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={profile.icon}
                alt={`${profile.name} icon`}
                width={24}
                height={24}
              />
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2024 Coder Decoder Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

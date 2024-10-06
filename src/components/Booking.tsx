"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cal, { getCalApi } from "@calcom/embed-react";

// Avatar Component
interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
}

const Avatar: React.FC<AvatarProps> = React.memo(({ src, alt, fallback }) => {
  return (
    <div className="relative w-10 h-10 overflow-hidden bg-gray-600 rounded-full">
      {src ? (
        <Image
          className="object-cover"
          src={src}
          alt={alt || `Avatar for ${fallback}`}
          width={40}
          height={40}
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-white font-medium">
          {fallback.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

// Main Component
export function BrandGrowthBooking() {
  const [calHeight, setCalHeight] = useState('550px');

  useEffect(() => {
    const updateCalHeight = () => {
      const viewportHeight = window.innerHeight;
      const newHeight = Math.max(550, viewportHeight * 0.7); // At least 550px or 70% of viewport height
      setCalHeight(`${newHeight}px`);
    };

    updateCalHeight();
    window.addEventListener('resize', updateCalHeight);

    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {
        "styles": {
          "branding": {"brandColor": "#f97316"}, // Orange color
          "body": {"background": "#000000"}, // Black background
          // "text": {"color": "#ffffff"}, // White text
          // "eventCard": {"background": "#1f2937", "textColor": "#ffffff"}, // Dark gray cards with white text
          // "button": {"background": "#f97316", "textColor": "#000000"} // Orange buttons with black text
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();

    return () => window.removeEventListener('resize', updateCalHeight);
  }, []);

  return (
    <div id="booking" className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-black text-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-8 text-center bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent py-2 leading-tight">
        Let&apos;s Grow Your <span className="text-orange-500">Brand</span> Together
      </h1>
      
      {/* ... rest of the component ... */}
    </div>
  );
}
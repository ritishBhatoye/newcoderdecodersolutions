"use client";
import React, { useEffect } from 'react';
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
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={alt || `Avatar for ${fallback}`}
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
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {
        "styles":{"branding":{"brandColor":"#000000"}},
        "hideEventTypeDetails":false,
        "layout":"month_view"
      });
    })();
  }, []);

  return (
    <div id="booking" className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
        Let's Grow Your <span className="text-orange-500">Brand</span> Together
      </h1>
      {/* <div className="bg-gray-900 rounded-lg p-4 md:p-6"> */}
        {/* User Info Section */}
        
        {/* Cal.com Embed */}
        <div className="h-[600px] w-full"> {/* Changed height from 600px to 500px */}
          <Cal
            namespace="30min"
            calLink="coder-decoder-solutions-accyhp/30min"
            style={{width:"100%", height:"100%", overflow:"scroll"}}
            config={{"layout":"month_view"}}
          />
        </div>
      {/* </div> */}
    </div>
  );
}
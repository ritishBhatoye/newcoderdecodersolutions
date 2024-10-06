'use client'
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image, { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import trophy from '../../public/award.png';
import earth from "../../public/earth.png";
import team from "../../public/united.png";
import simran from "../../public/simran.jpg";
import ritish from "../../public/ritish.jpg";

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  icon: StaticImageData;
  number: string;
  label: string;
  color: 'gray-800' | 'blue-500' | 'indigo-600' | 'green-600';
}

interface FounderProps {
  image: StaticImageData;
  name: string;
  role: string;
}

const formatNumber = (num: number, suffix: string): string => {
  if (suffix === 'M') return (num / 1000000).toFixed(1) + 'M';
  if (suffix === 'k') return (num / 1000).toFixed(1) + 'k';
  return num.toString() + suffix;
}

const getBgColor = (color: StatItemProps['color']): string => {
  const colors = {
    'gray-800': '#1F2937',
    'blue-500': '#3B82F6',
    'indigo-600': '#4F46E5',
    'green-600': '#059669'
  };
  return colors[color] || '#FFFFFF';
}

const StatItem: React.FC<StatItemProps> = ({ icon, number, label, color }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && numberRef.current) {
      controls.start('visible');
      
      const finalNumber = parseFloat(number.replace(/[^0-9.-]/g, ''));
      const suffix = number.replace(/[0-9.-]/g, '');
      
      const animation = gsap.to(numberRef.current, {
        innerHTML: Math.abs(finalNumber),
        duration: 2,
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: numberRef.current,
          start: 'top bottom-=100',
          end: 'bottom center',
          scrub: true,
        },
        onUpdate: function() {
          if (numberRef.current) {
            const currentNumber = Math.round(parseFloat(numberRef.current.innerHTML));
            numberRef.current.innerHTML = formatNumber(currentNumber, suffix);
          }
        }
      });

      return () => {
        animation.kill();
      }
    }
  }, [controls, inView, number]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const isLightBg = color === 'green-600';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      style={{ backgroundColor: getBgColor(color) }}
      className="p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center"
      role="article"
      aria-label={`${label} statistic`}
    >
      <Image src={icon} alt="" width={40} height={40} className="mb-4" aria-hidden="true" />
      <motion.div
        ref={numberRef}
        className={`text-3xl font-bold mb-2 ${isLightBg ? 'text-gray-800' : 'text-white'}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        aria-live="polite"
      >
        0
      </motion.div>
      <div className={`text-sm ${isLightBg ? 'text-gray-700' : 'text-gray-200'}`}>{label}</div>
    </motion.div>
  );
};

const Founder: React.FC<FounderProps> = ({ image, name, role }) => {
  return (
    <motion.div variants={itemVariants} className="text-center">
      <Image 
        src={image} 
        alt={`${name}, ${role}`} 
        width={150} 
        height={150} 
        className="rounded-full mb-4"
        onError={(e) => {
          e.currentTarget.src = '/placeholder.jpg';
        }}
      />
      <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
      <p className="text-lg text-gray-600">{role}</p>
      {/* <p className="mt-2 text-gray-700">{followers} Followers</p> */}
    </motion.div>
  );
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Glorious: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const stats: StatItemProps[] = [
    { icon: trophy, number: "10+", label: "Projects Completed", color: "gray-800" },
    { icon: trophy, number: "100k+", label: "Lines of Code Written", color: "blue-500" },
    { icon: team, number: "5+", label: "Expert Developers", color: "gray-800" },
    { icon: earth, number: "2+", label: "Countries Served", color: "indigo-600" },

  ];

  const founders: FounderProps[] = [
    { image: ritish, name: "Ritish Bhatoye", role: "Full Stack Developer",  },
    { image: simran, name: "Simranpreet Singh", role: "Full Stack Developer",  },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl font-bold text-center mt-20 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black"
        >
          Meet the Founders
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12"
        >
          {founders.map((founder, index) => (
            <Founder key={index} {...founder} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
            aria-label="Contact us to grow your digital presence"
          >
            Grow Your Digital Presence
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Glorious;
'use client'
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSpring } from 'react-spring';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  icon: string;
  number: string;
  label: string;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, number, label, color }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      const finalNumber = parseFloat(number.replace(/[^0-9.]/g, ''));
      const suffix = number.replace(/[0-9.]/g, '');
      
      gsap.to(numberRef.current, {
        innerHTML: finalNumber,
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
            let currentNumber = Math.round(parseFloat(numberRef.current.innerHTML));
            if (suffix === 'M') {
              numberRef.current.innerHTML = (currentNumber / 1000000).toFixed(1) + 'M';
            } else if (suffix === 'k') {
              numberRef.current.innerHTML = (currentNumber / 1000).toFixed(1) + 'k';
            } else {
              numberRef.current.innerHTML = currentNumber + suffix;
            }
          }
        }
      });
    }
  }, [controls, inView, number]);

  const { value } = useSpring({
    from: { value: 0 },
    to: { value: parseFloat(number.replace(/[^0-9.]/g, '')) },
    delay: 200,
    config: { duration: 1000 },
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getBgColor = () => {
    switch (color) {
      case 'gray-800': return '#1F2937';
      case 'blue-500': return '#3B82F6';
      case 'indigo-600': return '#4F46E5';
      case 'green-600': return '#059669';
      default: return '#FFFFFF';
    }
  };

  const isLightBg = color === 'white' || color === 'green-400';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      style={{ backgroundColor: getBgColor() }}
      className="p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center"
    >
      <Image src={icon} alt={label} width={40} height={40} className="mb-4" />
      <motion.div
        ref={numberRef}
        className={`text-3xl font-bold mb-2 ${isLightBg ? 'text-gray-800' : 'text-white'}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        0
      </motion.div>
      <div className={`text-sm ${isLightBg ? 'text-gray-700' : 'text-gray-200'}`}>{label}</div>
    </motion.div>
  );
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

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="py-20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <StatItem icon="/trophy.png" number="500+" label="Projects Completed" color="gray-800" />
          <StatItem icon="/eye.png" number="10M+" label="Lines of Code Written" color="blue-500" />
          <StatItem icon="/globe.png" number="20+" label="Countries Served" color="indigo-600" />
          <StatItem icon="/team.png" number="50+" label="Expert Developers" color="green-600" />
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
          <motion.div variants={itemVariants} className="text-center">
            <Image src="/founder1.jpg" alt="Founder 1" width={150} height={150} className="rounded-full mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-lg text-gray-600">Full Stack Developer</p>
            <p className="mt-2 text-gray-700">100,000+ Followers</p>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <Image src="/founder2.jpg" alt="Founder 2" width={150} height={150} className="rounded-full mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-lg text-gray-600">UI/UX Designer</p>
            <p className="mt-2 text-gray-700">50,000+ Followers</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Grow Your Digital Presence
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Glorious;

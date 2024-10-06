"use client";

import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React, { FC, memo, useRef } from 'react';

// Define the interface for a process step
interface ProcessStepData {
  id: string;
  number: number;
  title: string;
  description: string;
}

// Updated processSteps with unique IDs and corrected descriptions
const processSteps: ProcessStepData[] = [
  {
    id: 'step-1',
    number: 1,
    title: 'Requirement Gathering',
    description:
      'We start by having a detailed conversation with you to understand your needs and goals, ensuring we capture your vision accurately.',
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Project/Product Management',
    description:
      'With our combined expertise, we organize resources and implement agile methodologies to keep your website development on schedule and within scope.',
  },
  {
    id: 'step-3',
    number: 3,
    title: 'UX / UI Design',
    description:
      'Our designers create intuitive wireframes and visually appealing prototypes, focusing on both user experience and aesthetic design to deliver a website that’s easy to navigate and pleasing to the eye.',
  },
  {
    id: 'step-4',
    number: 4,
    title: 'Development',
    description:
      'We leverage modern technologies like Next.js, Tailwind CSS, and ReactJS to build a responsive and scalable website, ensuring it functions seamlessly across all browsers and devices.',
  },
  {
    id: 'step-5',
    number: 5,
    title: 'Launch',
    description:
      'Together, we prepare your Product for launch by performing final checks and optimizations, making sure everything is polished and ready to provide visitors with an excellent first impression.',
  },
  {
    id: 'step-6',
    number: 6,
    title: 'Marketing Strategy',
    description:
      'We develop and implement effective SEO and content strategies, using data analytics to boost your website’s visibility and engagement with your target audience.',
  },
];

// Animation variants for the container and steps
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

// Renamed component to avoid naming conflict and memoized for performance
const ProcessStepItem: FC<{ step: ProcessStepData; isEven: boolean }> = memo(({ step, isEven }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.li
      ref={ref}
      variants={stepVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.5 }}
      className={`flex items-center mb-12 ${isEven ? 'flex-row-reverse' : ''}`}
      aria-labelledby={`step-title-${step.id}`}
    >
      <div className={`w-1/2 ${isEven ? 'pl-8' : 'pr-8'}`}>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h3 id={`step-title-${step.id}`} className="text-xl font-semibold text-black mb-2">
            Step {step.number}
          </h3>
          <h4 className="text-lg font-medium text-blue-600 mb-2">{step.title}</h4>
          <p className="text-gray-700">{step.description}</p>
        </motion.div>
      </div>
      <motion.div 
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold z-10`}
        initial={{ backgroundColor: "#D1D5DB" }} // Start with gray
        animate={{ backgroundColor: inView ? "#000000" : "#D1D5DB" }} // Animate to black when in view
        transition={{ duration: 0.5 }}
      >
        {step.number}
      </motion.div>
      <div className="w-1/2"></div>
    </motion.li>
  );
});

export default function Process() {
  const processRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" className="py-20 bg-gray-50" ref={processRef}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-black"
        >
          How It Works
        </motion.h2>
        <div className="relative">
          {/* Combined grey and black line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300"
            style={{ 
              top: 0,
              bottom: 0,
              zIndex: 0
            }}
          >
            <motion.div 
              className="absolute top-0 left-0 w-full bg-black origin-top"
              style={{ scaleY }}
            />
          </div>
          <motion.ol
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-label="Process Steps"
          >
            {processSteps.map((step, index) => (
              <ProcessStepItem key={step.id} step={step} isEven={index % 2 !== 0} />
            ))}
          </motion.ol>
        </div>
        <div className="text-center mt-12">
          <motion.a
            href="#"
            className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes, Grow My Brand!
          </motion.a>
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Requirement Gathering",
    description: "Our Business Analysts gets on a call with you to take requirement gatherings about your requirements and pass it to the project/product manager."
  },
  {
    number: 2,
    title: "Project/Product Management",
    description: "Efficient resource allocation and agile methodologies underpin our project management, ensuring on-time delivery and seamless execution of your website development."
  },
  {
    number: 3,
    title: "UX / UI Design",
    description: "UX/UI Designers employ wireframes and prototypes, craft an intuitive, visually appealing interface, harmonizing user experience and visual design principles for your website."
  },
  {
    number: 4,
    title: "Development",
    description: "Our skilled developers employ languages like HTML, CSS, and JavaScript to code and build a responsive, scalable website, rigorously tested for cross-browser compatibility."
  },
  {
    number: 5,
    title: "Launch",
    description: "It's showtime! We get your website ready for the world to see. It's like opening the doors to your brand new store—making sure everything is perfect before inviting everyone in."
  },
  {
    number: 6,
    title: "Marketing Strategy",
    description: "Utilizing SEO, content strategies, and analytics, we promote your website, optimizing its visibility and engagement for your target audience."
  }
];

const ProcessStep: React.FC<{ step: ProcessStep; index: number }> = ({ step, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex flex-col md:flex-row items-start mb-12 relative"
    >
      <motion.div
        className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 md:mb-0 md:mr-6"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {step.number}
      </motion.div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-green-600 mb-2">{step.title}</h3>
        <p className="text-gray-700">{step.description}</p>
      </div>
      {index < processSteps.length - 1 && (
        <motion.div
          className="absolute left-8 top-16 w-0.5 bg-gray-300 hidden md:block"
          style={{ height: 'calc(100% + 3rem)' }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        />
      )}
    </motion.div>
  );
};
export default function Process() {
  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Process
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}


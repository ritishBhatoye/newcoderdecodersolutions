'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqData: FaqItem[] = [
  {
    category: "Web Development",
    questions: [
      {
        question: "What technologies do you use for web development?",
        answer: "We specialize in modern web technologies including React, Next.js, Node.js, Laravel, and the MERN stack (MongoDB, Express, React, Node.js). Our tech stack is chosen based on project requirements to ensure optimal performance and scalability."
      },
      {
        question: "Can you explain the benefits of using Next.js for web development?",
        answer: "Next.js offers several advantages including server-side rendering, static site generation, and automatic code splitting. This results in faster page loads, improved SEO, and a better overall user experience. It's particularly well-suited for large-scale applications and content-heavy websites."
      },
      {
        question: "How do you ensure the security of web applications?",
        answer: "We implement industry-standard security practices including data encryption, secure authentication methods, regular security audits, and protection against common vulnerabilities like XSS and CSRF. We also keep all libraries and dependencies up-to-date to patch known security issues."
      }
    ]
  },
  {
    category: "Laravel Development",
    questions: [
      {
        question: "Why choose Laravel for backend development?",
        answer: "Laravel offers a robust set of tools and an elegant syntax that makes it ideal for building complex backend systems. It provides excellent features for database management, routing, authentication, and caching, which speeds up development and ensures code quality."
      },
      {
        question: "How do you handle database migrations and seeding in Laravel projects?",
        answer: "We use Laravel's built-in migration system to version control our database schema. This allows for easy collaboration and deployment across different environments. We also utilize seeders to populate the database with initial data, which is particularly useful for testing and development."
      },
      {
        question: "Can Laravel be used with a React or Vue.js frontend?",
        answer: "Absolutely! We often create Laravel APIs that serve as the backend for React or Vue.js frontends. This combination allows us to leverage Laravel's powerful backend features while providing a dynamic and responsive user interface."
      }
    ]
  },
  {
    category: "MERN Stack",
    questions: [
      {
        question: "What are the advantages of using the MERN stack?",
        answer: "The MERN stack (MongoDB, Express, React, Node.js) allows for a full JavaScript ecosystem, which can streamline development and make it easier to find developers. It's highly scalable, great for real-time applications, and offers excellent performance for data-intensive applications."
      },
      {
        question: "How do you handle state management in MERN stack applications?",
        answer: "For smaller applications, we often use React's built-in Context API. For larger, more complex applications, we typically implement Redux or MobX for more robust state management. The choice depends on the specific needs of the project."
      },
      {
        question: "Can you integrate other databases with a MERN stack application?",
        answer: "While MongoDB is the traditional database for MERN stack, we can certainly integrate other databases like PostgreSQL or MySQL if the project requires it. We use ORMs like Sequelize or TypeORM to make this integration seamless."
      }
    ]
  },
  {
    category: "Full Stack Development",
    questions: [
      {
        question: "What does your full stack development process look like?",
        answer: "Our full stack development process typically involves requirements gathering, system design, frontend and backend development in parallel, integration, testing, and deployment. We use agile methodologies to ensure regular communication and iterative development."
      },
      {
        question: "How do you handle API development and integration?",
        answer: "We design RESTful APIs using best practices for endpoint naming, status codes, and data formatting. We use tools like Swagger for API documentation. For integration, we ensure proper error handling, implement rate limiting when necessary, and use JWT for authentication."
      },
      {
        question: "What strategies do you use for optimizing application performance?",
        answer: "We employ various strategies including code splitting, lazy loading, caching mechanisms, database query optimization, and CDN usage for static assets. We also conduct regular performance audits and use tools like Lighthouse to identify and address performance bottlenecks."
      }
    ]
  }
];

const Faq: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Web Development");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 sm:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={itemVariants}
          className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-center text-lg mb-12 text-gray-600"
        >
          Curious about our services? We've got you covered.
        </motion.p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            variants={itemVariants}
            className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg"
          >
            {faqData.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05, color: '#3B82F6' }}
                whileTap={{ scale: 0.95 }}
                className={`flex justify-between items-center py-4 cursor-pointer transition-colors duration-300 ${activeCategory === item.category ? 'text-blue-500' : 'text-gray-700'}`}
                onClick={() => setActiveCategory(item.category)}
              >
                <span className="font-medium">{item.category}</span>
                <motion.span 
                  animate={{ rotate: activeCategory === item.category ? 90 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  →
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg"
          >
            <AnimatePresence mode="wait">
              {faqData.find(item => item.category === activeCategory)?.questions.map((q, index) => (
                <motion.div 
                  key={q.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25, delay: index * 0.1 }}
                >
                  <motion.div 
                    className="flex justify-between items-center py-4 cursor-pointer border-b border-gray-200"
                    onClick={() => setOpenQuestion(openQuestion === q.question ? null : q.question)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium text-gray-800">{q.question}</span>
                    <motion.span
                      animate={{ rotate: openQuestion === q.question ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="text-blue-500"
                    >
                      {openQuestion === q.question ? '−' : '+'}
                    </motion.span>
                  </motion.div>
                  <AnimatePresence>
                    {openQuestion === q.question && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="py-4 text-gray-600"
                      >
                        {q.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Faq;
'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'

// Utility function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

interface FaqItem {
  category: string
  questions: {
    question: string
    answer: string
  }[]
}

const faqData: FaqItem[] = [
  {
    category: "Web Development",
    questions: [
      {
        question: "What's your approach to creating responsive and mobile-friendly websites?",
        answer: "Our mobile-first approach ensures optimal user experience across all devices:\n\n• Design for mobile devices first, then enhance for larger screens\n• Utilize responsive design techniques and flexible grid layouts\n• Implement CSS media queries for device-specific styling\n• Conduct extensive testing on various devices and browsers\n• Ensure consistent performance and functionality across platforms"
      },
      {
        question: "How do you handle website performance optimization?",
        answer: "We employ a comprehensive strategy to optimize website performance:\n\n• Code optimization: Write clean, efficient code and use modern build tools\n• Image optimization: Utilize next-gen formats (e.g., WebP) and implement lazy loading\n• Caching: Implement both browser and server-side caching strategies\n• Content Delivery Networks (CDNs): Serve static assets from locations closer to users\n• Database optimization: Optimize queries and indexes for faster data retrieval\n• Regular audits: Use tools like Lighthouse and WebPageTest for continuous improvement"
      },
      {
        question: "Can you integrate third-party services and APIs into web applications?",
        answer: "Absolutely! We have extensive experience integrating various third-party services and APIs:\n\n• Payment gateways (e.g., Stripe, PayPal)\n• Social media APIs\n• Mapping services (e.g., Google Maps)\n• Analytics tools\n• CRM systems\n\nOur integration process includes:\n\n• Following best practices for secure authentication\n• Implementing proper error handling\n• Applying rate limiting where necessary\n• Creating abstraction layers for easier future updates\n• Developing custom APIs when needed for seamless integration"
      }
    ]
  },
  {
    category: "E-commerce Solutions",
    questions: [
      {
        question: "What e-commerce platforms do you work with, and how do you choose the right one for a project?",
        answer: "We work with various e-commerce platforms and select the best fit based on specific project needs:\n\nPlatforms we work with:\n• Shopify\n• WooCommerce\n• Magento\n• Custom solutions (e.g., Next.js, Laravel)\n\nFactors considered when choosing a platform:\n1. Business size and scalability needs\n2. Required features and customization level\n3. Budget constraints\n4. Integration requirements with existing systems\n5. Expected traffic and product volume\n\nOur approach:\n• Conduct thorough analysis with clients\n• Recommend suitable platforms (e.g., Shopify for smaller businesses, custom solutions for larger enterprises)\n• Focus on solutions that meet current needs and can scale with the business"
      },
      {
        question: "How do you handle security for e-commerce websites, especially regarding payment processing?",
        answer: "We prioritize security in e-commerce, especially for sensitive data handling:\n\n• SSL/TLS encryption for all data transmissions\n• PCI DSS compliance for credit card data handling\n• Integration of secure, PCI-compliant payment gateways\n• Regular security audits and vulnerability assessments\n• Implementation of strong authentication (including two-factor authentication)\n• Data minimization practices\n• Regular software and dependency updates\n• DDoS protection measures\n\nOur comprehensive approach ensures robust security for both customers and businesses."
      },
      {
        question: "Can you implement custom features like product configurators or subscription-based models in e-commerce sites?",
        answer: "Yes, we specialize in implementing advanced, custom e-commerce features:\n\nProduct Configurators:\n• Develop using JavaScript frameworks (e.g., React, Vue.js)\n• Integrate with backend for complex pricing and inventory management\n\nSubscription-based Models:\n• Implement recurring billing systems\n• Integrate with services like Stripe or Chargebee\n• Develop features such as tiered pricing, trial periods, and upgrade/downgrade options\n\nOther Custom Features:\n• Personalized product recommendations\n• Advanced search functionality with filters\n• Inventory management systems\n\nOur approach focuses on understanding specific business needs and customer expectations to enhance the shopping experience and drive conversions."
      }
    ]
  },
  {
    category: "Mobile Application Development",
    questions: [
      {
        question: "What mobile app development frameworks do you specialize in?",
        answer: "We specialize in two leading cross-platform mobile development frameworks:\n\n• React Native: Ideal for building native apps using JavaScript and React\n• Flutter: Google's UI toolkit for crafting natively compiled applications\n\nBoth frameworks allow us to develop high-performance, visually appealing apps for iOS and Android from a single codebase, reducing development time and costs."
      },
      {
        question: "How do you ensure a native look and feel in cross-platform apps?",
        answer: "We prioritize creating a native user experience in our cross-platform apps:\n\n• Utilize platform-specific UI components and design patterns\n• Implement custom native modules when necessary\n• Adhere to platform-specific design guidelines (Material Design for Android, Human Interface Guidelines for iOS)\n• Optimize animations and transitions for smooth performance\n• Conduct extensive testing on various devices to ensure consistency\n\nOur approach combines the efficiency of cross-platform development with the quality of native apps."
      },
      {
        question: "Can you integrate device-specific features like biometrics or push notifications?",
        answer: "Absolutely! We have extensive experience integrating device-specific features:\n\n• Biometric authentication (fingerprint, face recognition)\n• Push notifications\n• Camera and photo library access\n• Geolocation services\n• Bluetooth and NFC capabilities\n• Accelerometer and gyroscope integration\n\nOur process involves:\n• Using native modules or plugins for seamless integration\n• Implementing fallback mechanisms for devices lacking specific features\n• Ensuring proper permissions handling and user privacy"
      },
      {
        question: "How do you handle app performance optimization for mobile devices?",
        answer: "We employ various strategies to optimize mobile app performance:\n\n• Efficient state management (e.g., Redux for React Native, BLoC for Flutter)\n• Lazy loading and code splitting to reduce initial load times\n• Optimizing images and assets for mobile devices\n• Minimizing unnecessary re-renders and computations\n• Implementing proper caching strategies\n• Using performance profiling tools to identify and resolve bottlenecks\n• Optimizing animations for smooth 60fps performance\n• Conducting regular performance audits throughout development"
      },
      {
        question: "What's your approach to testing and quality assurance for mobile apps?",
        answer: "Our comprehensive testing approach ensures high-quality mobile applications:\n\n• Unit testing: Verify individual components and functions\n• Integration testing: Ensure different parts of the app work together\n• UI testing: Automated tests for user interface elements\n• Performance testing: Analyze app behavior under various conditions\n• Device testing: Test on a wide range of physical devices and emulators\n• Beta testing: Gather real-world user feedback before launch\n• Continuous Integration/Continuous Deployment (CI/CD): Automate testing and deployment processes\n\nWe use tools like Jest, Detox, and Firebase Test Lab to maintain rigorous quality standards throughout development."
      }
    ]
  }
]

const Faq: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(faqData[0].category)
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  return (
    <section id="faqs" className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl sm:text-5xl font-bold mb-4 text-gray-900 font-playfair">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-lg mb-12 text-gray-600">
          Detailed answers to your most pressing questions about our services and expertise.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <nav className="lg:w-1/4 space-y-2">
            {faqData.map((item) => (
              <button
                key={item.category}
                onClick={() => setActiveCategory(item.category)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out",
                  activeCategory === item.category
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="font-medium">{item.category}</span>
                <ChevronRight className={cn(
                  "inline-block ml-2 transition-transform duration-200",
                  activeCategory === item.category ? "rotate-90" : ""
                )} />
              </button>
            ))}
          </nav>
          
          <div className="lg:w-3/4 bg-white rounded-xl shadow-lg overflow-hidden">
            <AnimatePresence mode="wait">
              {faqData.find(item => item.category === activeCategory)?.questions.map((q) => (
                <motion.div 
                  key={q.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    className="flex justify-between items-center w-full px-6 py-4 text-left"
                    onClick={() => setOpenQuestion(openQuestion === q.question ? null : q.question)}
                    aria-expanded={openQuestion === q.question}
                  >
                    <span className="font-medium text-gray-900">{q.question}</span>
                    <ChevronDown className={cn(
                      "text-black transition-transform duration-200",
                      openQuestion === q.question ? "rotate-180" : ""
                    )} />
                  </button>
                  <AnimatePresence>
                    {openQuestion === q.question && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="px-6 pb-4"
                      >
                        <pre className="text-gray-600 whitespace-pre-wrap">{q.answer}</pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
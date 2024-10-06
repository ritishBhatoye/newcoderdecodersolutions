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
        answer: "We prioritize a mobile-first approach in our web development process. This means we design and develop for mobile devices first, then progressively enhance the experience for larger screens. We use responsive design techniques, flexible grid layouts, and CSS media queries to ensure our websites look great and function well on all devices, from smartphones to large desktop monitors. We also extensively test on various devices and browsers to guarantee consistency and optimal performance across platforms."
      },
      {
        question: "How do you handle website performance optimization?",
        answer: "Website performance is crucial for user experience and SEO. Our optimization strategy includes several key areas: 1) Code optimization: We write clean, efficient code and use modern build tools to minimize and bundle assets. 2) Image optimization: We use next-gen formats like WebP and implement lazy loading for images. 3) Caching: We implement both browser and server-side caching strategies. 4) Content Delivery Networks (CDNs): We utilize CDNs to serve static assets from locations closer to the user. 5) Database optimization: We optimize database queries and indexes for faster data retrieval. 6) Regular performance audits: We use tools like Lighthouse and WebPageTest to continuously monitor and improve performance metrics."
      },
      {
        question: "Can you integrate third-party services and APIs into web applications?",
        answer: "Absolutely! We have extensive experience integrating a wide range of third-party services and APIs into web applications. This includes payment gateways (like Stripe or PayPal), social media APIs, mapping services (like Google Maps), analytics tools, CRM systems, and more. We follow best practices for API integration, including secure authentication, proper error handling, and rate limiting where necessary. We also create abstraction layers in our code to make future API changes or replacements easier to manage. If a custom API is needed, we can develop it to ensure seamless integration with your specific requirements."
      }
    ]
  },
  {
    category: "E-commerce Solutions",
    questions: [
      {
        question: "What e-commerce platforms do you work with, and how do you choose the right one for a project?",
        answer: "We work with a variety of e-commerce platforms, including Shopify, WooCommerce, Magento, and custom solutions built with frameworks like Next.js or Laravel. The choice of platform depends on several factors: 1) Business size and scalability needs, 2) Required features and customization level, 3) Budget constraints, 4) Integration requirements with existing systems, 5) Expected traffic and product volume. We conduct a thorough analysis of these factors with our clients to recommend the most suitable platform. For smaller businesses or those just starting, we might recommend Shopify for its ease of use. For larger enterprises needing extensive customization, we might suggest a custom solution or Magento. Our goal is to provide a solution that not only meets current needs but can also scale with the business."
      },
      {
        question: "How do you handle security for e-commerce websites, especially regarding payment processing?",
        answer: "Security is paramount in e-commerce, especially when handling sensitive customer and payment data. Our approach includes: 1) SSL/TLS encryption: We ensure all data transmitted between the user and the server is encrypted. 2) PCI DSS compliance: For sites handling credit card data, we ensure compliance with Payment Card Industry Data Security Standards. 3) Secure payment gateways: We integrate trusted, PCI-compliant payment gateways that handle the actual processing of sensitive financial data. 4) Regular security audits: We conduct periodic security assessments to identify and address potential vulnerabilities. 5) Secure authentication: We implement strong password policies and offer two-factor authentication where possible. 6) Data minimization: We only collect and store essential user data. 7) Regular updates: We keep all software, plugins, and dependencies up-to-date to patch known security vulnerabilities. 8) DDoS protection: We implement measures to protect against Distributed Denial of Service attacks."
      },
      {
        question: "Can you implement custom features like product configurators or subscription-based models in e-commerce sites?",
        answer: "Yes, we specialize in implementing advanced, custom features for e-commerce sites. Product configurators, which allow customers to customize products before purchase, can be developed using JavaScript frameworks like React or Vue.js, integrated with the backend to manage complex pricing and inventory. For subscription-based models, we can implement recurring billing systems, often integrating with services like Stripe or Chargebee for payment processing and subscription management. We can also develop features like tiered pricing, trial periods, and upgrade/downgrade capabilities. Other custom features we've implemented include personalized product recommendations, advanced search functionality with filters, and inventory management systems. Our approach is always to understand the specific business needs and customer expectations to deliver a solution that enhances the shopping experience and drives conversions."
      }
    ]
  }
  // ... Add more categories and questions as needed
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
                        <p className="text-gray-600">{q.answer}</p>
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
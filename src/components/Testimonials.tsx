'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Project {
    title: string
    description: string
    imageUrl: string
    technologies: string[]
    link: string
}

const projectsData: Project[] = [
    {
        title: "Adocities",
        description: "Advertisement and booking platform for property management.",
        imageUrl: "/adocities_1.png",
        technologies: ["Next.js", "Tailwind CSS", "MySQL", "Laravel"],
        link: "https://adocities.com/"
    },
    {
        title: "Deep Catering & Events",
        description: "Comprehensive catering service website featuring menu options, event planning, and online booking for various occasions.",
        imageUrl: "/dc_1.png",
        technologies: ["Next.js", "Tailwind CSS", "Node.js"],
        link: "https://www.deepcateringandevents.com/"
    },
    {
        title: "Makeup Artist Portfolio",
        description: "Professional makeup artist portfolio showcasing services, gallery, and booking system for beauty and wedding makeup services.",
        imageUrl: "/mkup_1.png",
        technologies: ["React", "Tailwind CSS", "Framer Motion"],
        link: "https://makeup-nine.vercel.app/"
    },
    {
        title: "Kew Garden Homes",
        description: "Modern home construction and real estate website showcasing luxury properties and architectural designs.",
        imageUrl: "/gkh_1.png",
        technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
        link: "https://barber-chop-shop.vercel.app/"
    },
    {
        title: "Adocities Mobile App",
        description: "Mobile app for booking and advertisement of properties on LED screens and Hoardings.",
        imageUrl: "/adocities_2.png",
        technologies: ["Flutter", "Dart", "MySQL", 'Laravel'],
        link: "https://adocities.com/"
    }
]

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-24 scroll-mt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-4xl sm:text-5xl font-bold mb-4 text-gray-900 font-playfair">
                    Portfolio
                </h2>
                <p className="text-center text-lg mb-12 text-gray-600">
                    Explore our latest web development projects and solutions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projectsData.map((project) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="relative h-[300px] w-full">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                                >
                                    View Project
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials 
import { Metadata } from 'next'
import Process from "@/components/Process";
import Hero from "../components/Hero";
import Faq from "@/components/Faq";
import Glorious from "@/components/Glorious";
import { BrandGrowthBooking } from "@/components/Booking";

export const metadata: Metadata = {
  title: 'Coder Decoder Solutions - Top Web & Mobile App Development in Punjab & Haryana',
  description: 'Leading tech services in Punjab & Haryana. Expert mobile app development, e-commerce solutions, website design, and custom software for Amritsar, Ludhiana, Jalandhar, Patiala, Bathinda, Mohali, Pathankot, Hoshiarpur, Batala, Moga, Malerkotla, Khanna, Phagwara, Muktsar, Barnala, Rajpura, Firozpur, Kapurthala, Faridkot, Gurdaspur, Abohar, Mansa, Sangrur, Chandigarh, Ambala, Panipat, Yamunanagar, Rohtak, Hisar, Karnal, Sonipat, Panchkula, Kurukshetra, Sirsa, Bhiwani, Bahadurgarh, Jind, Kaithal, Rewari, Fatehabad, Palwal, Gohana, Tohana, Narnaul, Hansi, and more cities across both states.',
  keywords: 'mobile app development Punjab, e-commerce Haryana, website design Chandigarh, custom software Ludhiana, tech services Amritsar, web development Jalandhar, IT solutions Patiala, digital marketing Bathinda, SEO Mohali, UI/UX design Panchkula, cloud solutions Ambala, IoT Karnal, AI development Panipat, blockchain Rohtak, cybersecurity Hisar',
  openGraph: {
    title: 'Coder Decoder Solutions - Top Tech Services in Punjab & Haryana',
    description: 'Leading mobile app, web, and e-commerce development across Punjab & Haryana. Serving Amritsar, Ludhiana, Jalandhar, Patiala, Bathinda, Mohali, Pathankot, Hoshiarpur, Batala, Moga, Malerkotla, Khanna, Phagwara, Muktsar, Barnala, Rajpura, Firozpur, Kapurthala, Faridkot, Gurdaspur, Abohar, Mansa, Sangrur, Chandigarh, Ambala, Panipat, Yamunanagar, Rohtak, Hisar, Karnal, Sonipat, Panchkula, Kurukshetra, Sirsa, Bhiwani, Bahadurgarh, Jind, Kaithal, Rewari, Fatehabad, Palwal, Gohana, Tohana, Narnaul, Hansi, and more cities with cutting-edge tech solutions.',
    url: 'https://coderdecodersolutions.com',
    siteName: 'Coder Decoder Solutions',
    images: [
      {
        url: 'https://coderdecodersolutions.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coder Decoder Solutions - Tech Experts in Punjab & Haryana',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coder Decoder Solutions - Top Tech Services in Punjab & Haryana',
    description: 'Expert mobile app, web, and e-commerce development across Punjab & Haryana. Serving all major cities with innovative tech solutions.',
    images: ['https://coderdecodersolutions.com/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://coderdecodersolutions.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <Glorious />
      <Process />
      <BrandGrowthBooking />
      <Faq />
    </>
  );
}

import Process from "@/components/Process";
import Hero from "../components/Hero";
import Faq from "@/components/Faq";
import Glorious from "@/components/Glorious";
import { BrandGrowthBooking } from "@/components/Booking";
// import Services from "../components/Services";
// import About from "../components/About";
// import Portfolio from "@/components/Portfolio";
// import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Glorious />
      <Process />
      <BrandGrowthBooking />
      {/* <Booking /> */}
      <Faq />
      {/* <Services />
      <About />
      <Portfolio />
      <Contact /> */}
    </>
  );
}

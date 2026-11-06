import { Hero, Brands, About } from "@/components/Hero";
import Offer from "@/components/Offer";
import Courses from "@/components/Courses";
import Booking from "@/components/Booking";
import { How, Stats, Reviews, Faq, Cta, Location } from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <About />
      <Offer />
      <How />
      <Stats />
      <Courses />
      <Booking />
      <Reviews />
      <Faq />
      <Cta />
      <Location />
    </main>
  );
}

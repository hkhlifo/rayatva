import { Hero, Brands, About } from "../Hero";
import Offer from "../Offer";
import Courses from "../Courses";
import Booking from "../Booking";
import { How, Stats, Reviews, Faq, Cta, Location } from "../Sections";

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

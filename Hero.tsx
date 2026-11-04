import Link from "next/link";
import { BRANDS } from "@/lib/data";

export function Hero() {
  return (
    <section id="hero">
      <video id="heroVid" autoPlay muted loop playsInline><source src="/hero.mp4" type="video/mp4" /></video>
      <div className="w">
        <div>
          <span className="pill">Courses, live yoga and business growth</span>
          <h1>Grow Your Skills, Brand and Wellbeing</h1>
          <p className="lead">Certified courses in digital marketing, editing and more. Live yoga every day. Branding, marketing and websites built for your business.</p>
          <div className="row"><Link className="btn wh" href="/#courses">Get Started</Link><Link className="tl" href="/#booking">Book a service</Link></div>
        </div>
        <div className="stack" aria-hidden="true">
          <div className="gl l"><small>Live now</small><div className="pic">🧘</div><b>Morning Yoga</b><br /><small>32 joined · 4.9 rating</small></div>
          <div className="gl"><b>Everything we offer</b>
            <div className="chips">{["Digital marketing", "Video editing", "Live yoga", "Certificates", "Brand marketing", "Websites"].map((c) => <span key={c}>{c}</span>)}</div></div>
          <div className="gl"><b>Learner growth</b> <small style={{ float: "right" }}>+8.5%</small>
            <svg viewBox="0 0 300 90" width="100%" style={{ marginTop: 10 }}>
              <path d="M0 62 L40 52 L80 68 L120 30 L160 60 L200 38 L240 46 L300 22 L300 90 L0 90Z" fill="rgba(255,255,255,.16)" />
              <path d="M0 62 L40 52 L80 68 L120 30 L160 60 L200 38 L240 46 L300 22" fill="none" stroke="#fff" strokeWidth="2.5" /></svg></div>
        </div>
      </div>
    </section>
  );
}

export function Brands() {
  return (
    <div className="ob">
      <div className="marq"><h3>Brands we have worked for</h3>
        <div className="track">{[...BRANDS, ...BRANDS].map((b, i) => <span key={i}>{b}</span>)}</div></div>
      <p className="tagl">Courses, live classes and business services, all in one place</p>
    </div>
  );
}

export function About() {
  return (
    <div className="pull"><div className="sheet" id="about"><div className="ab">
      <div><span className="eb">About us</span><h2>We help people and businesses grow</h2>
        <p className="lead">YourBrand is a learning and growth company. We teach practical skills, run live wellness classes, and build brands and websites for businesses.</p>
        <ul className="ck"><li>Industry-focused courses with certificates</li><li>Live yoga classes with trained instructors</li><li>Brand, marketing and web services for businesses</li></ul>
        <Link className="btn" href="/#loc">Talk to us</Link></div>
      <div className="big"><div><b>Y</b>YourBrand</div></div>
    </div></div></div>
  );
}

import Link from "next/link";
import { BRANDS } from "@/lib/data";

export function Hero() {
  return (
    <section id="hero">
      <video id="heroVid" autoPlay muted loop playsInline><source src="/hero.mp4" type="video/mp4" /></video>
      <div className="w">
        <div>
          <span className="pill"><span className="dot" />Courses, live yoga and business growth</span>
          <h1>Build a stronger brand and a calmer life.</h1>
          <p className="lead">Certified courses for modern skills, live yoga sessions for daily balance, and strategic brand growth for businesses ready to stand out.</p>
          <div className="row"><Link className="btn wh" href="/#courses">Get Started</Link><Link className="tl" href="/#booking">Book a service</Link></div>
          <div className="trust">
            <div><b>5k+</b><span>Learners</span></div>
            <div><b>120+</b><span>Brand clients</span></div>
            <div><b>4.9/5</b><span>Experience</span></div>
          </div>
        </div>
        <div className="stack" aria-hidden="true">
          <div className="gl l"><small>Live now</small><div className="pic">🧘</div><b>Morning Yoga</b><br /><small>32 joined · 4.9 rating</small></div>
          <div className="gl"><b>Everything we offer</b>
            <div className="chips">{["Brand strategy", "Video editing", "Live yoga", "Certificates", "Marketing", "Websites"].map((c) => <span key={c}>{c}</span>)}</div></div>
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
      <div><span className="eb">About us</span><h2>We help individuals and businesses grow with purpose.</h2>
        <p className="lead">Rayatva is a learning and growth studio where people build stronger skills, healthier routines and clearer brand presence. We teach, coach and create with intention.</p>
        <ul className="ck"><li>Industry-focused courses with certifications</li><li>Live yoga sessions for focus and recovery</li><li>Brand, marketing and web services for ambitious businesses</li></ul>
        <Link className="btn" href="/#loc">Talk to us</Link></div>
      <div className="big"><div><b>R</b>Rayatva</div></div>
    </div></div></div>
  );
}

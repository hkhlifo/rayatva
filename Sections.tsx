import Link from "next/link";
import { FAQS, REVIEWS } from "@/lib/data";

export function How() {
  const steps = [["1.", "Log in", "Open your dashboard to see your courses and classes."], ["2.", "Open the class link", "Your link appears on your course card before each session."], ["3.", "Join and learn", "Ask questions live and get your certificate when you finish."]];
  return (
    <section id="how"><div className="w">
      <div className="sh"><span className="eb">Live classes</span><h2>How to join a live class</h2><p className="lead">Watch this short walkthrough, then join your first class in minutes.</p></div>
      <div className="frame"><div className="fb"><i /><i /><i /></div>
        <div className="screen"><div><div className="play">▶</div><b style={{ fontSize: "1.3rem" }}>Joining your first live class</b><br /><span style={{ opacity: 0.75 }}>Replace this panel with your tutorial video</span></div></div></div>
      <div className="steps">{steps.map((s) => <div className="card" key={s[1]}><h3><b>{s[0]}</b> {s[1]}</h3><p>{s[2]}</p></div>)}</div>
    </div></section>
  );
}

export function Stats() {
  return (
    <div className="stats"><div className="w">
      {[["5,000+", "Learners"], ["15+", "Courses"], ["120+", "Business clients"], ["98%", "Would recommend us"]].map((s) => <div key={s[1]}><b>{s[0]}</b><span>{s[1]}</span></div>)}
    </div></div>
  );
}

export function Reviews() {
  return (
    <section id="proof"><div className="w">
      <div className="sh"><span className="eb">Reviews</span><h2>What our learners and clients say</h2></div>
      <div className="tg">{REVIEWS.map((r) => (
        <div className="card" key={r.n}><div className="stars">★★★★★</div><p>{r.q}</p>
          <div className="who"><div className="av">{r.a}</div><div><b>{r.n}</b><br /><small style={{ color: "var(--mut)" }}>{r.r}</small></div></div></div>))}</div>
    </div></section>
  );
}

export function Faq() {
  return (
    <section id="faqs"><div className="w">
      <div><h2>Frequently asked questions</h2><p className="lead">Can’t find your answer? Contact us and we will help.</p></div>
      <div>{FAQS.map((f, i) => <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
    </div></section>
  );
}

export function Cta() {
  return (
    <div className="cta"><div className="in"><h2>Ready to learn, grow or start your project?</h2>
      <div className="row" style={{ margin: 0 }}><Link className="btn" href="/#courses">Start a course</Link><Link className="btn out" href="/#booking">Book a service</Link></div></div></div>
  );
}

export function Location() {
  const rows = [["📍", "Address", "Your street, Your city, State, PIN"], ["📞", "Phone", "+91 00000 00000"], ["✉️", "Email", "hello@yourbrand.com"], ["🕘", "Hours", "Mon–Sat, 9 am – 7 pm"]];
  return (
    <section id="loc"><div className="w">
      <div><h2>Visit or contact us</h2><p className="lead">We are happy to answer questions about courses, classes and services.</p>
        <div className="inf">{rows.map((r) => <div key={r[1]}><span className="ic">{r[0]}</span><p style={{ margin: 0 }}><b>{r[1]}</b><span>{r[2]}</span></p></div>)}</div></div>
      <div className="map"><div><div style={{ fontSize: "2.4rem" }}>📍</div>Paste your Google Maps embed here</div></div>
    </div></section>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";
import { useApp } from "./AppProvider";

export default function Footer() {
  const { openAuth } = useApp();
  const [mail, setMail] = useState(""); const [ok, setOk] = useState(false);
  return (
    <footer><div className="fp"><div className="fg">
      <div>
        <Link className="logo" href="/"><span className="mark" style={{ background: "#fff", color: "var(--od)" }}>Y</span>YourBrand</Link>
        <p style={{ margin: "14px 0 18px", maxWidth: "34ch" }}>Courses, live yoga and business growth services, all in one place.</p>
        <small>Newsletter</small>
        <div className="nl"><input type="email" aria-label="Email" placeholder={ok ? "Thanks for subscribing" : "Work email"} value={mail} onChange={(e) => setMail(e.target.value)} />
          <button className="btn wh sm" onClick={() => { if (mail.includes("@")) { setOk(true); setMail(""); } }}>Sign up</button></div>
        <div className="soc"><span>in</span><span>X</span><span>▶</span><span>ig</span></div>
      </div>
      <div><h4>Company</h4><Link href="/#about">About</Link><Link href="/#faqs">FAQ</Link><Link href="/#loc">Contact</Link></div>
      <div><h4>Learn</h4><Link href="/#courses">Courses</Link><Link href="/#how">Live classes</Link><a href="#" onClick={(e) => { e.preventDefault(); openAuth(); }}>Login</a></div>
      <div><h4>Business</h4><Link href="/#booking">Digital marketing</Link><Link href="/#booking">Web development</Link><Link href="/#booking">Influencer marketing</Link></div>
    </div><div className="cr">© 2026 YourBrand. All rights reserved.</div></div></footer>
  );
}

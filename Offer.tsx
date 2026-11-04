"use client";
import Link from "next/link";
import { useState } from "react";
import { TABS } from "@/lib/data";

const FEATURES = [
  ["💡", "Business ideas", "Shape a rough idea into a clear plan and a first customer."],
  ["💻", "Web development", "Fast, modern websites that bring your business leads."],
  ["🚀", "Entrepreneurship courses", "Learn to start, price and sell, and earn a certificate."],
  ["🧘", "Wellness & lifestyle", "Live yoga and daily routines you can actually keep."],
];

export default function Offer() {
  const [n, setN] = useState(0);
  const t = TABS[n];
  return (
    <section id="offer"><div className="w">
      <div className="sh"><span className="eb">What we provide</span><h2>Everything you need to learn and grow</h2></div>
      <div className="tabs">{TABS.map((x, i) => <button key={x.tab} className={i === n ? "act" : ""} onClick={() => setN(i)}>{x.tab}</button>)}</div>
      <div className="show">
        <div className="mini"><div className="mi">{t.i}</div><b>{t.t}</b><div className="pb"><i style={{ width: t.p + "%" }} /></div><small>{t.s}</small></div>
        <div style={{ textAlign: "right" }}><h3>{t.h}</h3><p>{t.d}</p><Link className="btn wh sm" href={t.href}>{t.a}</Link></div>
      </div>
      <div className="grid4">{FEATURES.map((f) => (
        <div className="card fe" key={f[1]}><div className="ico">{f[0]}</div><h3>{f[1]}</h3><p>{f[2]}</p></div>))}</div>
    </div></section>
  );
}

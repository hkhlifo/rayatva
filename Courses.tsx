"use client";
import { useRef } from "react";
import { COURSES } from "@/lib/data";
import { useApp } from "./AppProvider";

export default function Courses() {
  const { buy } = useApp();
  const sc = useRef<HTMLDivElement>(null);
  const go = (d: number) => sc.current?.scrollBy({ left: (d * sc.current.clientWidth) / 1.2, behavior: "smooth" });
  return (
    <section id="courses"><div className="w">
      <div className="sh"><span className="eb">Courses</span><h2>Courses that come with a certificate</h2>
        <p className="lead">Log in to buy a course. Your purchases appear on your dashboard.</p></div>
      <div className="arrows"><button aria-label="Previous courses" onClick={() => go(-1)}>←</button><button aria-label="Next courses" onClick={() => go(1)}>→</button></div>
      <div className="scroller" ref={sc}>{COURSES.map((c, i) => (
        <div className="card" key={c.t}>
          <div className="thumb">{c.i}<em>Certificate included</em></div>
          <h3>{c.t}</h3><p>{c.d}</p>
          <div className="meta"><span>⏱ {c.w}</span><span>▶ {c.l}</span></div>
          <div className="price">₹{c.p.toLocaleString("en-IN")}<small>one-time</small></div>
          <button className="btn" style={{ justifyContent: "center" }} onClick={() => buy(i)}>Buy course</button>
        </div>))}</div>
    </div></section>
  );
}

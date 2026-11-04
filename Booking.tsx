"use client";
import { SERVICES } from "@/lib/data";
import { useApp } from "./AppProvider";

export default function Booking() {
  const { openBook } = useApp();
  return (
    <section id="booking"><div className="w">
      <div><h2>Book a service for your business</h2><p className="lead">Pick what you need, share your details, and our team will get back to you.</p></div>
      <div className="bk">{SERVICES.map((s) => (
        <div className="card" key={s.n}><h3><span className="ic">{s.i}</span>{s.n}</h3>
          <button className="btn sm" onClick={() => openBook(s.n)}>Book</button></div>))}</div>
    </div></section>
  );
}

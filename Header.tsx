"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "./AppProvider";

export default function Header() {
  const { user, logout, openAuth, drawer, setDrawer } = useApp();
  const solid = usePathname() !== "/";
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const close = () => setDrawer(false);
  return (
    <>
      <header className={solid || sc ? "on" : ""}>
        <div className="nav">
          <Link className="logo" href="/"><span className="mark">Y</span>Rayatva</Link>
          <div className="nr">
            {user ? <Link className="lnk" href="/dashboard">Dashboard</Link>
              : <a className="lnk lg" href="#" onClick={(e) => { e.preventDefault(); openAuth(); }}>Log In</a>}
            <Link className="btn sm" href="/#courses">Get Started</Link>
            <button className="burger" aria-label="Open menu" onClick={() => setDrawer(true)}>
              <span style={{ display: "grid", gap: 6 }}><i /><i /><i /></span>
            </button>
          </div>
        </div>
      </header>
      <div className={"veil" + (drawer ? " open" : "")} onClick={close} />
      <nav className={"drawer" + (drawer ? " open" : "")} aria-label="Main menu">
        <div className="dh"><span>Menu</span><button aria-label="Close menu" onClick={close}>×</button></div>
        <Link className="l" href="/#about" onClick={close}>About</Link>
        <Link className="l" href="/#courses" onClick={close}>Courses</Link>
        <Link className="l" href="/#booking" onClick={close}>Booking</Link>
        <Link className="l" href="/#loc" onClick={close}>Contact</Link>
        {user && <Link className="l" href="/dashboard" onClick={close}>My dashboard</Link>}
        {!user && <a className="l" href="#" onClick={(e) => { e.preventDefault(); close(); openAuth(); }}>Login</a>}
        {user && <a className="l" href="#" onClick={(e) => { e.preventDefault(); close(); logout(); }}>Sign out</a>}
        <Link className="btn" href="/#courses" onClick={close} style={{ marginTop: "auto", justifyContent: "center" }}>Explore courses</Link>
      </nav>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { read, useApp, write } from "./AppProvider";

export function AuthModal() {
  const { authOpen, authMsg, closeAuth, login, signup } = useApp();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => { if (authOpen) setMsg(authMsg); }, [authOpen, authMsg]);
  if (!authOpen) return null;
  const submit = () => {
    const em = email.trim();
    if (!em.includes("@") || pw.length < 4) return setMsg("Enter a valid email and a password of 4 or more characters.");
    if (mode === "signup") { if (!name.trim()) return setMsg("Enter your name."); return void signup(name.trim(), em, pw); }
    const err = login(em, pw); if (err) setMsg(err);
  };
  return (
    <div className="modal open"><div className="box">
      <button className="x" aria-label="Close" onClick={closeAuth}>×</button>
      <h3>{mode === "login" ? "Log in" : "Create account"}</h3>
      {mode === "signup" && <><label htmlFor="aName">Full name</label><input id="aName" value={name} onChange={(e) => setName(e.target.value)} /></>}
      <label htmlFor="aMail">Email</label><input id="aMail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="aPass">Password</label><input id="aPass" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      <p className="msg">{msg}</p>
      <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>{mode === "login" ? "Log in" : "Create account"}</button>
      <p style={{ textAlign: "center", margin: "16px 0 0" }}>
        <a href="#" style={{ color: "var(--od)", fontWeight: 700 }} onClick={(e) => { e.preventDefault(); setMode(mode === "login" ? "signup" : "login"); setMsg(""); }}>
          {mode === "login" ? "New here? Create an account" : "Have an account? Log in"}</a></p>
    </div></div>
  );
}

export function BookingModal() {
  const { bookSvc, closeBook, user } = useApp();
  const empty = { name: "", phone: "", email: "", what: "", loc: "" };
  const [f, setF] = useState(empty); const [msg, setMsg] = useState("");
  useEffect(() => { if (bookSvc) { setMsg(""); setF((p) => ({ ...p, name: user?.name ?? p.name, email: user?.email ?? p.email })); } }, [bookSvc, user]);
  if (!bookSvc) return null;
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const submit = () => {
    if (Object.values(f).some((v) => !v.trim())) return setMsg("Fill in all fields to book.");
    write("bookings", [...read<unknown[]>("bookings", []), { service: bookSvc, ...f }]);
    setMsg("Booked. We will contact you soon."); setF(empty);
  };
  return (
    <div className="modal open"><div className="box">
      <button className="x" aria-label="Close" onClick={closeBook}>×</button>
      <h3>Book: {bookSvc}</h3>
      <label htmlFor="bName">Your name</label><input id="bName" value={f.name} onChange={set("name")} />
      <label htmlFor="bPhone">Contact number</label><input id="bPhone" type="tel" value={f.phone} onChange={set("phone")} />
      <label htmlFor="bMail">Email</label><input id="bMail" type="email" value={f.email} onChange={set("email")} />
      <label htmlFor="bFor">What are you booking for?</label><textarea id="bFor" rows={3} value={f.what} onChange={set("what")} />
      <label htmlFor="bLoc">Location</label><input id="bLoc" value={f.loc} onChange={set("loc")} />
      <p className="msg">{msg}</p>
      <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>Book now</button>
    </div></div>
  );
}

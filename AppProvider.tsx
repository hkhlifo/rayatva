"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type User = { name: string; email: string };
type Ctx = {
  user: User | null; ready: boolean; enrolled: number[];
  login: (e: string, p: string) => string | null;
  signup: (n: string, e: string, p: string) => string | null;
  logout: () => void; buy: (i: number) => void;
  authOpen: boolean; authMsg: string; openAuth: (m?: string) => void; closeAuth: () => void;
  bookSvc: string | null; openBook: (s: string) => void; closeBook: () => void;
  drawer: boolean; setDrawer: (b: boolean) => void;
};
const C = createContext<Ctx | null>(null);
export const useApp = () => { const c = useContext(C); if (!c) throw new Error("AppProvider missing"); return c; };

const mem: Record<string, unknown> = {};
export function read<T>(k: string, d: T): T {
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : d; } catch { return (k in mem ? mem[k] : d) as T; }
}
export function write(k: string, v: unknown) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch { mem[k] = v; }
}

export default function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [enrolled, setEnrolled] = useState<number[]>([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMsg, setAuthMsg] = useState("");
  const [pending, setPending] = useState<number | null>(null);
  const [bookSvc, setBookSvc] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => { const u = read<User | null>("user", null); setUser(u); if (u) setEnrolled(read<number[]>("enr:" + u.email, [])); setReady(true); }, []);

  const enroll = (u: User, i: number) => {
    const list = read<number[]>("enr:" + u.email, []);
    if (!list.includes(i)) list.push(i);
    write("enr:" + u.email, list); setEnrolled(list);
  };
  const finish = (u: User) => {
    setUser(u); write("user", u); setEnrolled(read<number[]>("enr:" + u.email, []));
    setAuthOpen(false);
    if (pending !== null) { enroll(u, pending); setPending(null); }
    router.push("/dashboard");
  };
  const login = (email: string, pw: string) => {
    const ac = read<Record<string, { name: string; pw: string }>>("accts", {});
    if (!ac[email] || ac[email].pw !== pw) return "Email or password is wrong. Create an account if you are new.";
    finish({ name: ac[email].name, email }); return null;
  };
  const signup = (name: string, email: string, pw: string) => {
    const ac = read<Record<string, { name: string; pw: string }>>("accts", {});
    ac[email] = { name, pw }; write("accts", ac);
    finish({ name, email }); return null;
  };
  const logout = () => { setUser(null); setEnrolled([]); write("user", null); router.push("/"); };
  const buy = (i: number) => {
    if (!user) { setPending(i); setAuthMsg("Log in to buy this course."); setAuthOpen(true); return; }
    enroll(user, i); router.push("/dashboard");
  };
  return (
    <C.Provider value={{
      user, ready, enrolled, login, signup, logout, buy, authOpen, authMsg,
      openAuth: (m = "") => { setAuthMsg(m); setAuthOpen(true); }, closeAuth: () => setAuthOpen(false),
      bookSvc, openBook: setBookSvc, closeBook: () => setBookSvc(null), drawer, setDrawer,
    }}>{children}</C.Provider>
  );
}

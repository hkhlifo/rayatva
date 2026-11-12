"use client";

import Link from "next/link";
import { useApp } from "../../AppProvider";

export default function DashboardPage() {
  const { user, enrolled } = useApp();

  if (!user) {
    return (
      <main className="dashboard-shell">
        <section className="dashboard-card">
          <p className="eyebrow">Rayatva dashboard</p>
          <h1>Log in to unlock your journey</h1>
          <p>Track your enrolled courses, live yoga session access, and business growth plans.</p>
          <Link className="btn" href="/#courses">
            Explore courses
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard-shell">
      <section className="dashboard-card large">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
        <div className="stats-inline">
          <div>
            <strong>{enrolled.length}</strong>
            <span>Enrolled</span>
          </div>
          <div>
            <strong>3</strong>
            <span>Live classes</span>
          </div>
          <div>
            <strong>96%</strong>
            <span>Focus score</span>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <p className="eyebrow">Next up</p>
          <h3>Brand Growth Intensive</h3>
          <p>Module 04 · Positioning your offer for premium clients</p>
        </article>

        <article className="dashboard-card">
          <p className="eyebrow">Schedule</p>
          <h3>Live yoga flow</h3>
          <p>Today at 7:00 AM · Zoom link active</p>
        </article>

        <article className="dashboard-card">
          <p className="eyebrow">Support</p>
          <h3>Growth coaching</h3>
          <p>Book a 1:1 session with our strategy team</p>
        </article>
      </section>
    </main>
  );
}

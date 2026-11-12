
import Link from "next/link";
import { FAQS, REVIEWS } from "@/lib/data";

const STEPS = [
  {
    number: "1.",
    title: "Log in",
    description:
      "Open your dashboard to see your courses and classes.",
  },
  {
    number: "2.",
    title: "Open the class link",
    description:
      "Your link appears on your course card before each session.",
  },
  {
    number: "3.",
    title: "Join and learn",
    description:
      "Ask questions live and get your certificate when you finish.",
  },
];

const STATS = [
  { value: "5,000+", label: "Learners" },
  { value: "15+", label: "Courses" },
  { value: "120+", label: "Business clients" },
  { value: "98%", label: "Would recommend us" },
];

const CONTACT_INFO = [
  { icon: "📍", label: "Address", value: "Sector 22, Chandigarh, India" },
  { icon: "📞", label: "Phone", value: "+91 98765 43210" },
  { icon: "✉️", label: "Email", value: "hello@rayatva.in" },
  { icon: "🕘", label: "Hours", value: "Mon–Sat, 9 am – 7 pm" },
];

export function How() {
  return (
    <section id="how">
      <div className="w">
        <div className="sh">
          <span className="eb">Live classes</span>
          <h2>How to join a live class</h2>
          <p className="lead">
            Watch this short walkthrough, then join your first class in minutes.
          </p>
        </div>

        <div className="frame">
          <div className="fb">
            <i />
            <i />
            <i />
          </div>

          <div className="screen">
            <div>
              <div className="play">▶</div>
              <b style={{ fontSize: "1.3rem" }}>
                Joining your first live class
              </b>
              <br />
              <span style={{ opacity: 0.75 }}>
                Replace this panel with your tutorial video
              </span>
            </div>
          </div>
        </div>

        <div className="steps">
          {STEPS.map((step) => (
            <article className="card" key={step.title}>
              <h3>
                <b>{step.number}</b> {step.title}
              </h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <div className="stats">
      <div className="w">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <b>{stat.value}</b>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section id="proof">
      <div className="w">
        <div className="sh">
          <span className="eb">Reviews</span>
          <h2>What our learners and clients say</h2>
        </div>

        <div className="tg">
          {REVIEWS.map((review) => (
            <article className="card" key={review.n}>
              <div className="stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>

              <p>{review.q}</p>

              <div className="who">
                <div className="av" aria-hidden="true">
                  {review.a}
                </div>

                <div>
                  <b>{review.n}</b>
                  <br />
                  <small style={{ color: "var(--mut)" }}>
                    {review.r}
                  </small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faqs">
      <div className="w">
        <div>
          <h2>Frequently asked questions</h2>
          <p className="lead">
            Can’t find your answer? Contact us and we will help.
          </p>
        </div>

        <div>
          {FAQS.map((faq, index) => (
            <details key={faq.q} open={index === 0}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <div className="cta">
      <div className="in">
        <h2>Ready to learn, grow or start your project?</h2>

        <div className="row" style={{ margin: 0 }}>
          <Link className="btn" href="/#courses">
            Start a course
          </Link>

          <Link className="btn out" href="/#booking">
            Book a service
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Location() {
  return (
    <section id="loc">
      <div className="w">
        <div>
          <h2>Visit or contact us</h2>

          <p className="lead">
            We are happy to answer questions about courses, classes and services.
          </p>

          <div className="inf">
            {CONTACT_INFO.map((contact) => (
              <div key={contact.label}>
                <span className="ic" aria-hidden="true">
                  {contact.icon}
                </span>

                <p style={{ margin: 0 }}>
                  <b>{contact.label}</b>
                  <span>{contact.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="map">
          <div>
            <div style={{ fontSize: "2.4rem" }}>📍</div>
            Rayatva Studio<br />
            Chandigarh, India
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const practices = [
  ["01", "Systematic strategy design", "Rules-based systems built on ALMA crossovers and ATR-derived risk, engineered to remove discretion from entries and exits."],
  ["02", "Live risk & execution", "Alpaca and IBKR infrastructure with R-multiple position sizing, concurrent trade caps, and drawdown control built into the stack."],
  ["03", "Multi-asset coverage", "U.S. equities and ETFs across intraday and swing horizons, alongside NSE F&O options-selling models filtered by India VIX and IVP/IVR."],
  ["04", "Platform engineering", "Multi-tenant trading platforms on FastAPI and PostgreSQL, with role-based dashboards clients use to track performance in real time."],
];

const studies = [
  { tag: "LIVE STRATEGY", title: "Requitybot", problem: "Discretionary swing entries were inconsistent and hard to audit across changing volatility regimes.", approach: "A fast/slow ALMA crossover on confirmed two-hour bars, with a 200-period trend filter and volume confirmation.", architecture: "Pine Script signals, ATR stops, R-multiple sizing, Discord alerts, and an EOD dashboard deployed on Vercel.", result: "Moved from paper trading to live Alpaca accounts after rebuilding repaint-prone signals and unreliable data sourcing." },
  { tag: "PLATFORM", title: "Equity Bot Platform", problem: "No single system existed to manage strategy access and performance across multiple client accounts.", approach: "A multi-tenant architecture separating strategy logic from account-level permissions and reporting.", architecture: "FastAPI, PostgreSQL, React, JWT authentication, and role-based access control.", result: "Each account holder gets isolated, auditable visibility into their own performance." },
  { tag: "IN DEVELOPMENT", title: "NSE Options Selling System", problem: "Short-volatility strategies need disciplined stock and strike selection to manage margin efficiently.", approach: "Rules-based selection using India VIX regime filters and IVP/IVR ranking, paired with SPAN margin modeling.", architecture: "Python backtesting with a complete rules document; Kite Connect ingestion is the next integration.", result: "A complete, testable ruleset with a validated backtesting layer, ready for live data." },
];

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.dataset.visible = "true"; observer.disconnect(); }
    }, { threshold: .12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function SectionLabel({ index, children }) {
  return <div className="section-label"><span>{index}</span><p>{children}</p></div>;
}

function App() {
  const [open, setOpen] = useState(0);
  const [menu, setMenu] = useState(false);
  return <main>
    <header className="nav">
      <a className="wordmark" href="#top" aria-label="Rakheeb, home"><span>R</span> RAKHEEB</a>
      <button className="menu" aria-expanded={menu} aria-label="Toggle navigation" onClick={() => setMenu(!menu)}>{menu ? "CLOSE" : "MENU"}</button>
      <nav className={menu ? "open" : ""} aria-label="Main navigation">
        {[["01", "About"], ["02", "Approach"], ["03", "Work"], ["04", "Contact"]].map(([n, name]) => <a key={name} onClick={() => setMenu(false)} href={`#${name.toLowerCase()}`}><small>{n}</small>{name}</a>)}
      </nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-meta"><span>HYDERABAD / INDIA</span><span>17.3850° N<br/>78.4867° E</span></div>
      <div className="hero-copy">
        <p className="eyebrow">ALGORITHMIC TRADER · QUANT DEVELOPER</p>
        <h1>Systematic edge,<br/><em>engineered.</em></h1>
        <p className="intro">I design rules-based trading systems across U.S. equities and NSE derivatives—from signal research to live execution.</p>
        <a className="text-link" href="#work">Explore selected systems <span>↘</span></a>
      </div>
      <div className="trace" aria-hidden="true">
        <svg viewBox="0 0 900 260" preserveAspectRatio="none"><path className="trace-fill" d="M0 220 C90 214 95 184 160 191 S230 150 290 165 S350 130 412 135 S490 104 540 115 S630 62 680 79 S746 28 800 43 S860 9 900 10 L900 260 L0 260Z"/><path className="trace-line" d="M0 220 C90 214 95 184 160 191 S230 150 290 165 S350 130 412 135 S490 104 540 115 S630 62 680 79 S746 28 800 43 S860 9 900 10"/></svg>
        <span className="axis a1">0.0R</span><span className="axis a2">2.5R</span><span className="axis a3">5.0R</span>
      </div>
      <p className="hero-note">A SYSTEM IS A HYPOTHESIS<br/>WITH CONSEQUENCES.</p>
    </section>

    <section className="about section" id="about">
      <SectionLabel index="01">PROFILE / MANDATE</SectionLabel>
      <Reveal className="about-copy"><p>I’m Rakheeb, an algorithmic trader at Shah Equity, working across intraday and swing strategies in U.S. equities and ETFs.</p><p>My background sits at the intersection of markets and engineering. A BTech in Computer Science with an AI/ML specialization gives me the tools to build the systems I trade—from signal logic to infrastructure that runs live.</p></Reveal>
      <div className="stat"><strong>2</strong><span>MARKETS<br/>US / INDIA</span></div>
    </section>

    <section className="approach section" id="approach">
      <SectionLabel index="02">OPERATING SYSTEM</SectionLabel>
      <Reveal><h2>Four disciplines.<br/><em>One process.</em></h2></Reveal>
      <div className="practice-grid">{practices.map(([n, title, body]) => <Reveal className="practice" key={n}><span>{n}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div>
    </section>

    <section className="work section" id="work">
      <SectionLabel index="03">SELECTED SYSTEMS</SectionLabel>
      <Reveal className="work-heading"><h2>Built to survive<br/><em>contact with markets.</em></h2><p>Research is only useful when it holds up under execution, data failure, and real capital.</p></Reveal>
      <div className="studies">{studies.map((s, i) => <article className={open === i ? "study active" : "study"} key={s.title}>
        <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
          <span className="study-index">0{i + 1}</span><span><small>{s.tag}</small><strong>{s.title}</strong></span><i>{open === i ? "−" : "+"}</i>
        </button>
        <div className="study-detail"><div><small>CONSTRAINT</small><p>{s.problem}</p></div><div><small>RESPONSE</small><p>{s.approach}</p></div><div><small>STACK</small><p>{s.architecture}</p></div><div><small>STATE</small><p>{s.result}</p></div></div>
      </article>)}</div>
    </section>

    <section className="stack section"><SectionLabel index="04">TOOLS / INFRASTRUCTURE</SectionLabel><div className="ticker">{["PYTHON", "IBKR API", "ALPACA", "PINE SCRIPT", "FASTAPI", "POSTGRESQL", "REACT"].map(x => <span key={x}>{x}</span>)}</div></section>

    <section className="contact section" id="contact">
      <SectionLabel index="05">OPEN CHANNEL</SectionLabel>
      <h2>Let’s talk<br/><em>markets.</em></h2>
      <div className="contact-actions"><a href="mailto:hello@rakheeb.com">hello@rakheeb.com <span>↗</span></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></div>
      <footer><span>© 2026 RAKHEEB</span><span>BUILT WITH DISCIPLINE</span><a href="#top">BACK TO TOP ↑</a></footer>
    </section>
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);

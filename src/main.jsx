import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./styles.css";

const practices = [
  ["01", "Research the edge", "Turn a market thesis into explicit, falsifiable rules. Every signal is tested across different volatility and liquidity regimes."],
  ["02", "Engineer the risk", "Define exposure, stop distance, position size, and failure conditions before a strategy is allowed near live capital."],
  ["03", "Automate execution", "Build reliable broker integrations, data validation, alerting, and recovery paths so the system behaves predictably in production."],
  ["04", "Measure and refine", "Track expectancy, drawdown, slippage, and regime sensitivity. Promote changes only when evidence supports them."],
];

const studies = [
  { tag: "LIVE AUTOMATION", status: "OPERATIONS DASHBOARD", updated: "AUG 07 2026", title: "Automated U.S. Stock Trading Bot", problem: "Manual monitoring makes systematic swing execution inconsistent across a broad U.S. equity universe.", approach: "Ranks liquid stocks, confirms trend and momentum on completed bars, then sizes every trade using account risk and ATR based invalidation.", architecture: "Python execution engine, Alpaca Trading API, market data validation, bracket orders, persistent trade state, Discord operations alerts, and EOD reconciliation.", flow: ["MARKET DATA", "SCREENER", "RISK ENGINE", "ALPACA", "MONITORING"], link: "https://github.com/RakheebShaik-web/alpaca.bot-eod-dashboard", linkLabel: "VIEW PUBLIC DASHBOARD", result: "A fully automated pipeline from screening to order management, with exposure caps, duplicate order protection, and auditable live decisions." },
  { tag: "DERIVATIVES SYSTEM", status: "RESEARCH / NO LIVE ORDERS", updated: "AUG 11 2026", title: "NSE Options Selling System", problem: "Selling premium without regime and volatility filters can expose capital to weak risk and reward conditions and sudden volatility expansion.", approach: "Researches liquid NSE underlyings and explicit volatility, trend, liquidity, and event risk conditions before a structure is considered.", architecture: "Python research stack, completed five minute candles, configurable assumptions, conservative intrabar handling, auditable outputs, and read only historical data access.", flow: ["HISTORICAL DATA", "SIGNAL RULES", "SIMULATION", "RISK REVIEW", "REPORT"], link: "https://github.com/RakheebShaik-web/stocks-options-strategy", linkLabel: "VIEW RESEARCH REPOSITORY", result: "A research framework for testing cash stock and options hypotheses. It does not place live orders, and its public documentation states the limitations of candle based simulation." },
  { tag: "RESEARCH PLATFORM", status: "DOCUMENTATION / ROADMAP", updated: "JUL 20 2026", title: "Quant Screener", problem: "Finding quality investments and timely trading opportunities across thousands of securities is slow and vulnerable to narrative bias.", approach: "Defines a reproducible, risk aware methodology for comparing quality, value, momentum, volatility, liquidity, and trend factors.", architecture: "The public repository currently documents principles, evaluation criteria, risk controls, and the implementation roadmap; production screening code is not published there.", flow: ["UNIVERSE", "CRITERIA", "RISK REVIEW", "RANKING", "RESEARCH NOTE"], link: "https://github.com/RakheebShaik-web/quant-screener", linkLabel: "VIEW METHODOLOGY", result: "A transparent research specification designed to make future shortlists explainable and reproducible without presenting documentation as a finished trading product." },
];

const tools = [
  ["Python", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"],
  ["C++", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"],
  ["PostgreSQL", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"],
  ["Rust", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg"],
  ["TypeScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"],
  ["FastAPI", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg"],
  ["React", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"],
  ["Redis", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"],
  ["Docker", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"],
  ["Git", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"],
  ["Alpaca API", null, "A"], ["IBKR API", null, "IB"],
];

const navItems = [
  ["00", "Overview", "top"], ["01", "Profile", "about"],
  ["02", "Projects", "work"], ["03", "Tools", "stack"],
  ["04", "Operating system", "approach"], ["05", "Contact", "contact"],
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

function WireGlobe() {
  const meridians = [80, 210, 340, 470, 600, 730, 860, 990, 1120];
  return <div className="globe" aria-hidden="true"><svg viewBox="0 0 1200 560" preserveAspectRatio="none">
    <defs><linearGradient id="globeFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".28"/><stop offset="1" stopColor="#fff" stopOpacity=".045"/></linearGradient><linearGradient id="pathBlue" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#f04b19" stopOpacity="0"/><stop offset=".35" stopColor="#f04b19"/><stop offset="1" stopColor="#ff6a2f"/></linearGradient></defs>
    <path className="globe-edge" d="M-80 560 Q600 -230 1280 560"/>
    {meridians.map((x, i) => <path key={x} className="globe-line" d={`M600 35 Q${x} 225 ${x - 85} 560`} style={{opacity:.42 - Math.abs(4-i)*.045}}/>)}
    <path className="globe-line" d="M52 420 Q600 165 1148 420"/><path className="globe-line" d="M0 520 Q600 260 1200 520"/><path className="globe-line faint" d="M190 295 Q600 120 1010 295"/>
    <path className="signal-path" d="M130 500 C340 465 390 405 530 420 S760 345 910 380 S1080 310 1160 275"/>
    {[130,530,910,1160].map((cx,i)=><g key={cx}><circle className="node-ring" cx={cx} cy={[500,420,380,275][i]} r="9"/><circle className="node" cx={cx} cy={[500,420,380,275][i]} r="3"/></g>)}
  </svg></div>;
}

function SocialIcon({ name }) {
  if (name === "email") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6"/></svg>;
  if (name === "linkedin") return <svg className="linkedin-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.54V8.99H7.1v11.46Z"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 19.2c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.3c.1-1-.3-1.9-.9-2.5 3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6c.2-.9.1-2.3-.2-3.3 0 0-1.1-.4-3.7 1.4a12.7 12.7 0 0 0-6.7 0C4.9 1.7 3.8 2.1 3.8 2.1c-.3 1-.4 2.4-.2 3.3A5.2 5.2 0 0 0 2.2 9c0 5.2 3.2 6.4 6.2 6.7-.5.5-.8 1.2-.9 2v3.8"/></svg>;
}

function MeshTerrain() {
  const rows = Array.from({ length: 17 }, (_, i) => i);
  const cols = Array.from({ length: 19 }, (_, i) => i);
  return <div className="mesh-terrain" aria-hidden="true"><svg viewBox="0 0 700 480">
    <path className="mesh-base" d="M45 355 348 474 655 355 351 245Z"/>
    <g className="mesh-lines">
      {rows.map(i => { const y=135+i*14; const a=Math.sin(i*.58)*17; return <path key={`r${i}`} d={`M65 ${y+125} C185 ${y+75+a} 220 ${y-45-a} 330 ${y+26} S485 ${y-58+a} 635 ${y+115}`}/>; })}
      {cols.map(i => { const x=95+i*28; const bend=Math.sin(i*.62)*30; return <path key={`c${i}`} d={`M${x} 365 C${x-65+bend} 300 ${x-45-bend} 205 ${350+(i-9)*8} 138`}/>; })}
    </g>
  </svg></div>;
}

const GH_USER = "RakheebShaik-web";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function GithubActivity() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [tip, setTip] = useState(null);
  const plotRef = useRef(null);
  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=all`)
      .then(r => { if (!r.ok) throw new Error("bad status"); return r.json(); })
      .then(j => {
        const today = new Date().toISOString().slice(0, 10);
        const days = j.contributions.filter(d => d.date <= today).sort((a, b) => a.date.localeCompare(b.date)).slice(-371);
        const pad = new Date(days[0].date + "T00:00:00").getDay();
        const weeks = [];
        let week = Array(pad).fill(null);
        days.forEach(d => { week.push(d); if (week.length === 7) { weeks.push(week); week = []; } });
        if (week.some(Boolean)) weeks.push(week);
        const labels = [];
        let lastM = -1;
        weeks.forEach((w, i) => {
          const d = w.find(Boolean);
          if (!d || i > weeks.length - 2) return;
          const m = new Date(d.date + "T00:00:00").getMonth();
          if (m !== lastM) { labels.push([i, m]); lastM = m; }
        });
        const latestDate = days.length ? days[days.length-1].date : null;
        setData({ weeks, labels, total: Object.values(j.total).reduce((s, n) => s + n, 0), latestDate });
      })
      .catch(() => setFailed(true));
  }, []);
  useEffect(() => {
    if (!data || window.innerWidth > 768) return;
    const id = requestAnimationFrame(() => { const el = plotRef.current; if (el) el.scrollLeft = el.scrollWidth; });
    return () => cancelAnimationFrame(id);
  }, [data]);
  if (failed) return null;
  const PITCH = 12.6, TOP = 18;
  const showTip = e => {
    const t = e.target;
    if (!t.dataset || !t.dataset.count || !plotRef.current) { setTip(null); return; }
    const box = plotRef.current.getBoundingClientRect();
    const y = e.clientY - box.top;
    setTip({
      x: Math.min(Math.max(e.clientX - box.left, 78), Math.max(box.width - 78, 78)),
      y,
      below: y < 48,
      count: +t.dataset.count,
      date: t.dataset.label
    });
  };
  return <div className="github-activity">
    <div className="github-activity-head"><span>GITHUB ACTIVITY / COMMITS</span><a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer">@{GH_USER.toUpperCase()} ↗</a></div>
    {data ? <a className="github-plot" ref={plotRef} href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer" aria-label={`${data.total} contributions on GitHub`} onMouseMove={showTip} onMouseLeave={() => setTip(null)}>
      <svg viewBox={`0 0 ${Math.ceil(data.weeks.length * PITCH)} ${TOP + 7 * PITCH}`} role="img">
        {data.labels.map(([i, m]) => <text key={m + "-" + i} x={i * PITCH} y="9" className="gh-month">{MONTHS[m]}</text>)}
        {data.weeks.map((w, c) => w.map((d, r) => d ? <rect key={d.date} className={`gh-cell l${d.level}`} data-count={d.count} data-label={new Date(d.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} x={c * PITCH} y={TOP + r * PITCH} width="10.1" height="10.1" rx="2.5" style={{ animationDelay: `${c * 14}ms` }}/> : null))}
      </svg>
      {tip && <span className={"gh-tip" + (tip.below ? " gh-tip-below" : "")} style={{ left: tip.x, top: tip.y }}><strong>{tip.count} contribution{tip.count === 1 ? "" : "s"}</strong><em>{tip.date}</em></span>}
    </a> : <div className="gh-skeleton" aria-hidden="true">LOADING CONTRIBUTION DATA…</div>}
    {data && (
      <>
        <p className="github-total">Total {data.total.toLocaleString("en-US")} contributions in lifetime</p>
        {data.latestDate && <p className="github-updated">Updated {new Date(data.latestDate).toLocaleDateString("en-US", { month:"short", day:"numeric" })}</p>}
      </>
    )}
  </div>;
}

function GenerativeVisual({ type }) {
  if (type === 0) return <div className="generative g-poly" aria-hidden="true"><svg viewBox="0 0 320 260"><polygon points="42,55 260,42 292,205 102,224 42,55"/>{Array.from({length:11},(_,i)=><path key={i} d={`M42 55 L${102+i*16} ${224-i*2} L260 42`}/>)}</svg></div>;
  if (type === 1) return <div className="generative g-tunnel" aria-hidden="true"><svg viewBox="0 0 320 260">{Array.from({length:14},(_,i)=><rect key={i} x={25+i*9} y={20+i*7.4} width={270-i*18} height={220-i*14.8}/>)}</svg></div>;
  if (type === 2) return <div className="generative g-orbit" aria-hidden="true"><svg viewBox="0 0 320 260"><g>{Array.from({length:15},(_,i)=><ellipse key={i} cx="160" cy="130" rx={42+i*7.2} ry={18+i*4.6} transform={`rotate(${i*11} 160 130)`}/>)}</g><circle cx="160" cy="130" r="3"/></svg></div>;
  return <div className="generative g-field" aria-hidden="true"><svg viewBox="0 0 320 260"><g>{Array.from({length:16},(_,i)=>{const y=40+i*11;return <path key={i} d={`M22 ${y+65} C75 ${y+48} 98 ${y+70} 135 ${y+30} S178 ${y-42} 205 ${y+18} S267 ${y+50} 298 ${y+38}`}/>})}</g></svg></div>;
}

function App() {
  const [open, setOpen] = useState(-1);
  const [palette, setPalette] = useState(false);
  const [active, setActive] = useState("top");
  const [theme, setTheme] = useState(() => localStorage.getItem("rakheeb-theme") || "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#070706" : "#f1efe9");
    localStorage.setItem("rakheeb-theme", theme);
  }, [theme]);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      const dark = mq.matches;
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      localStorage.setItem("rakheeb-theme", dark ? "dark" : "light");
    };
    updateTheme();
    const handleChange = () => updateTheme();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [])
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setPalette(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-40% 0px -50%", threshold: 0 });
    navItems.forEach(([, , id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const bar = document.querySelector('.progress-bar')
    const barInner = bar?.querySelector('div')
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.body.scrollHeight - window.innerHeight
      const pct = Math.round(scrollTop / docHeight * 100)
      if (barInner) barInner.style.width = pct + '%'
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])
  const goTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setPalette(false); };
  return <main>
    <header className="nav"><a className="wordmark" href="#top" aria-label="Rakheeb Shaikh, home">RAKHEEB SHAIKH</a><nav aria-label="Main navigation">{navItems.slice(1,5).map(([n, name, id]) => <a key={name} className={active === id ? "active" : ""} href={`#${id}`}><small>{n}</small>{name}</a>)}</nav><div className="nav-utilities"><button className="menu-trigger" onClick={() => setPalette(true)} aria-label="Open menu"><span className="menu-lines"><i/><i/></span><span>MENU</span></button><button onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}><span className="theme-mark">◐</span></button></div></header>
    <aside className="progress-nav" aria-label="Section progress">{navItems.map(([n, name, id]) => <button key={id} className={active === id ? "active" : ""} onClick={() => goTo(id)} aria-label={`Go to ${name}`}><span>{n}</span></button>)}</aside>
    {palette && <div className="command-backdrop" onMouseDown={() => setPalette(false)}><div className="command-palette" role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={event => event.stopPropagation()}><div className="command-head"><span>GO TO</span><div><kbd>ESC</kbd><button className="command-close" onClick={() => setPalette(false)} aria-label="Close menu">×</button></div></div>{navItems.map(([n, name, id]) => <button key={id} onClick={() => goTo(id)}><small>{n}</small><span>{name}</span><i>↵</i></button>)}</div></div>}
    <section className="hero" id="top"><div className="hero-meta"><span>HYDERABAD / INDIA</span></div><div className="hero-copy"><p className="eyebrow">ALGORITHMIC TRADER · QUANT DEVELOPER</p><h1>Research<br/><em>into execution.</em></h1><p className="intro">Quantitative trading systems built from research, tested through data, and deployed with disciplined execution.</p></div><figure className="hero-art"><img src="/hero-probability.png" alt="Probability paths converging around a realized market price series"/><figcaption>PROBABILITY / PATH / EXECUTION</figcaption></figure><p className="hero-note">A SYSTEM IS A HYPOTHESIS<br/>WITH CONSEQUENCES.</p></section>
    <section className="about section" id="about"><SectionLabel index="01">PROFILE / MANDATE</SectionLabel><Reveal className="about-copy"><p>I’m Rakheeb Shaikh, an algorithmic trader at a hedge fund, working across quantitative strategies in U.S. equities and Indian options.</p><p>Working across U.S. equities and Indian derivatives gives me exposure to two distinct market structures, trading sessions, and execution environments. That contrast shapes how I research and engineer systems.</p><p>I research market ideas and develop automated trading systems that handle screening, risk, execution, and monitoring. My background in Computer Science and AI gives me the technical foundation to turn trading ideas into reliable systems.</p><p className="offdesk">I watch crypto charts, invest in mutual funds, and spend an unreasonable amount of time with my cat.</p></Reveal><Reveal className="experience-strip"><div><small>ROLE</small><strong>Algorithmic trader</strong><span>Hedge fund</span></div><div><small>EDUCATION</small><strong>BTech Computer Science</strong><span>AI and ML specialization</span></div><div><small>FOCUS</small><strong>Systematic trading</strong><span>U.S. equities and Indian options</span></div><div><small>BASE</small><strong>Hyderabad</strong><span>India</span></div></Reveal><GithubActivity/></section>
    <section className="work section" id="work"><SectionLabel index="02">SELECTED SYSTEMS</SectionLabel><Reveal className="work-heading"><h2>Built to survive<br/><em>contact with markets.</em></h2><p>Research is only useful when it holds up under execution, data failure, and real capital.</p></Reveal><div className="studies">{studies.map((s, i) => <article className={open === i ? "study active" : "study"} key={s.title}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`project-detail-${i}`}><span className="study-index">0{i + 1}</span><span><small>{s.tag} · {s.status}</small><strong>{s.title}</strong></span><i>{open === i ? "−" : "+"}</i></button><div className="study-detail" id={`project-detail-${i}`} role="region" aria-label={`${s.title} details`}><div><small>CONSTRAINT</small><p>{s.problem}</p></div><div><small>RESPONSE</small><p>{s.approach}</p></div><div><small>STACK</small><p>{s.architecture}</p></div><div><small>STATE</small><p>{s.result}</p></div><div className="study-architecture"><small>SYSTEM ARCHITECTURE · LAST UPDATED {s.updated}</small><div>{s.flow.map((step, stepIndex) => <React.Fragment key={step}><span>{step}</span>{stepIndex < s.flow.length - 1 && <i>→</i>}</React.Fragment>)}</div><a href={s.link} target="_blank" rel="noreferrer" aria-label={`${s.linkLabel}: ${s.title}`}>{s.linkLabel} <b>↗</b></a></div></div></article>)}</div></section>
    <section className="stack section" id="stack"><SectionLabel index="03">TOOLS / INFRASTRUCTURE</SectionLabel><div className="tool-grid">{tools.map(([name, icon, mark], i) => <div className="tool" key={name}><span className="tool-index">{String(i+1).padStart(2,"0")}</span><span className="tool-logo">{icon ? <img src={icon} alt=""/> : mark}</span><strong>{name}</strong><span className="tool-arrow">↗</span></div>)}</div></section>
    <section className="approach section" id="approach"><SectionLabel index="04">OPERATING SYSTEM</SectionLabel><Reveal className="operating-simple"><div><h2>From hypothesis<br/><em>to live capital.</em></h2><p>A repeatable system for research, risk, execution, and continuous refinement.</p></div></Reveal><div className="practice-grid">{practices.map(([n, title, body]) => <Reveal className="practice" key={n}><div className="practice-copy"><span>{`{${n}}`}</span><h3>{title}</h3><p>{body}</p></div></Reveal>)}</div></section>
    <section className="contact section" id="contact"><SectionLabel index="05">OPEN CHANNEL</SectionLabel><Reveal className="contact-heading"><h2>Let’s talk<br/><em>markets.</em></h2></Reveal><div className="contact-actions"><a href="mailto:shaikrakheeb280@gmail.com"><span className="social-name"><SocialIcon name="email"/>Email</span><span>↗</span></a><a href="https://www.linkedin.com/in/rakheeb-shaik-aba0762b5/" target="_blank" rel="noreferrer"><span className="social-name"><SocialIcon name="linkedin"/>LinkedIn</span><span>↗</span></a><a href="https://github.com/RakheebShaik-web" target="_blank" rel="noreferrer"><span className="social-name"><SocialIcon name="github"/>GitHub</span><span>↗</span></a></div><p className="legal-note">Projects are presented for engineering and research purposes. Nothing on this site constitutes financial advice or a solicitation to trade.</p><footer><span>© 2026 RAKHEEB SHAIKH</span><span>BUILT FOR MARKETS</span><a href="#top">BACK TO TOP ↑</a></footer></section>
  </main>;
}
createRoot(document.getElementById("root")).render(<><App/><Analytics/></>);

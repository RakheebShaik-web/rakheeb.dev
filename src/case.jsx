import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./case.css";

const lifecycle = [
  ["01", "SCREEN", "Universe of liquid U.S. equities ranked each session on trend and momentum confirmed only on completed bars."],
  ["02", "SIZE", "Every candidate position is sized from account risk with ATR-based invalidation distance — never a fixed lot."],
  ["03", "ROUTE", "Bracket orders via Alpaca Trading API: entry, stop, and target submitted atomically with duplicate-order protection."],
  ["04", "WATCH", "Persistent trade state plus Discord operations alerts surface any divergence between broker and local books in real time."],
  ["05", "RECONCILE", "End-of-day reconciliation compares fills against expected state; mismatches flatten the leg before they compound."],
];

const invariants = [
  ["No signal on an incomplete bar", "Indicators are computed strictly on closed candles. An intrabar repaint once produced a phantom entry; completed-bars-only became a hard invariant."],
  ["One order per symbol per cycle", "Duplicate fill protection at the engine level — a retried submission can never double the position."],
  ["Risk is set before entry", "Stop distance derives from ATR at signal time. The position size is a function of risk, not the other way around."],
  ["Reconciliation is not optional", "The day does not end until broker state matches local state. Any mismatch halts new entries."],
];

function CaseStudy() {
  const [active, setActive] = useState(-1);
  const ref = useRef(null);
  useEffect(() => {
    document.title = "Automated U.S. Stock Trading Bot — Rakheeb Shaikh";
    return () => { document.title = "Rakheeb Shaikh — Algorithmic Trader & Quant Developer"; };
  }, []);
  return <main className="case">
    <header className="case-nav"><a href="/">← RAKHEEB SHAIKH</a><a href="mailto:shaikrakheeb280@gmail.com">REQUEST DETAILS ↗</a></header>
    <section className="case-hero">
      <p className="case-eyebrow">CASE STUDY · LIVE AUTOMATION</p>
      <h1>Automated U.S.<br/><em>Stock Trading Bot</em></h1>
      <p className="case-intro">A fully automated pipeline from screening to order management: exposure caps, duplicate-order protection, and auditable live decisions across a broad U.S. equity universe.</p>
    </section>
    <section className="case-section">
      <small>TRADE LIFECYCLE</small>
      <div className="lifecycle">{lifecycle.map(([n, t, b]) => (
        <div className="life-step" key={n}><span>{n}</span><h3>{t}</h3><p>{b}</p></div>
      ))}</div>
    </section>
    <section className="case-section">
      <small>FIELD NOTES → INVARIANTS</small>
      <p className="case-lede">Each incident below was caught by the system's own monitoring, then promoted from bugfix to permanent invariant.</p>
      <div className="invariants">{invariants.map(([t, b], i) => (
        <button className={active === i ? "inv active" : "inv"} onClick={() => setActive(active === i ? -1 : i)} aria-expanded={active === i} key={t}>
          <strong>{t}</strong><i>{active === i ? "−" : "+"}</i>
          {active === i && <p>{b}</p>}
        </button>
      ))}</div>
    </section>
    <section className="case-section case-cta">
      <h2>Operated daily,<br/><em>built to be explained.</em></h2>
      <p className="case-lede" style={{marginBottom:"34px"}}>The implementation is private. Happy to walk through architecture, invariants, and operational history in detail on request.</p>
      <a href="mailto:shaikrakheeb280@gmail.com" className="case-link">REQUEST A WALKTHROUGH <b>↗</b></a>
    </section>
    <footer className="case-foot"><span>© 2026 RAKHEEB SHAIKH</span><a href="/">BACK TO SITE ↑</a></footer>
  </main>;
}
createRoot(document.getElementById("root")).render(<><CaseStudy/><Analytics/></>);

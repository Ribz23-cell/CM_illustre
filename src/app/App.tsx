import { useState, useEffect, useRef, type ReactNode } from "react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  blue: "#185FA5",
  coral: "#D85A30",
  dark: "#111827",
  gray: "#6B7280",
  green: "#0F6E56",
  bg: "#FFFFFF",
  bgAlt: "#F8F7F4",
  border: "#E5E7EB",
  blueMuted: "#EEF4FF",
  greenMuted: "#DCFCE7",
};

// ─── Global CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  body { font-family: 'DM Sans', sans-serif; scroll-behavior: smooth; margin: 0; }
  * { box-sizing: border-box; }
  ::selection { background: #185FA5; color: #fff; }

  .nav-desktop { display: flex; align-items: center; gap: 32px; }
  .nav-burger  { display: none; }

  .hero-stats  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .pain-grid   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .step-grid   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .service-grid{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
  .proof-grid  { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .stat-mini   { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .compare-row { display: grid; grid-template-columns: 1fr 1fr 1fr; }
  .contact-grid{ display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .footer-inner{ display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }

  @media (max-width: 900px) {
    .service-grid { grid-template-columns: 1fr; }
    .step-grid    { grid-template-columns: 1fr; }
    .pain-grid    { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .nav-desktop  { display: none; }
    .nav-burger   { display: flex; }
    .hero-stats   { grid-template-columns: 1fr; }
    .proof-grid   { grid-template-columns: 1fr; }
    .stat-mini    { grid-template-columns: repeat(2, 1fr); }
    .contact-grid { grid-template-columns: 1fr; }
    .compare-row  { grid-template-columns: 1fr 1fr 1fr; }
    .footer-inner { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 480px) {
    .stat-mini    { grid-template-columns: 1fr 1fr; }
    .compare-row  { font-size: 12px; }
  }

  .fade-item { transition: opacity 0.65s ease, transform 0.65s ease; }

  .section-bg-wrapper {
    position: relative;
    overflow: hidden;
  }
  .section-bg-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  .section-content {
    position: relative;
    z-index: 1;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }
`;

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

// ─── FadeIn ───────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "", style = {} }: {
  children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={`fade-item ${className}`}
      style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(26px)", transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function CheckIcon({ white = false }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="7.5" stroke={white ? "rgba(255,255,255,0.4)" : C.green} strokeWidth="1"/>
      <path d="M4.5 8l2.5 2.5 4.5-5" stroke={white ? "#fff" : C.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      style={{ flexShrink: 0, transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
      <path d="M5 7.5l5 5 5-5" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ILLUSTRATIONS SVG — thématique Community Manager
// ═══════════════════════════════════════════════════════════════════════════════

// Hero BG — Réseau social flottant (bulles, likes, followers, graphiques)
function HeroBgSVG() {
  return (
    <svg className="section-bg-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="hg1" cx="80%" cy="20%" r="50%">
          <stop offset="0%" stopColor="#185FA5" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#185FA5" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="hg2" cx="10%" cy="80%" r="40%">
          <stop offset="0%" stopColor="#D85A30" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="#D85A30" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#hg1)"/>
      <rect width="1440" height="900" fill="url(#hg2)"/>

      {/* Floating social cards top-right */}
      <g transform="translate(1100, 80)" opacity="0.12">
        <rect x="0" y="0" width="180" height="90" rx="14" fill="#185FA5"/>
        <rect x="12" y="12" width="66" height="8" rx="4" fill="white" opacity="0.7"/>
        <rect x="12" y="26" width="44" height="6" rx="3" fill="white" opacity="0.4"/>
        <rect x="12" y="48" width="80" height="22" rx="6" fill="white" opacity="0.15"/>
        <text x="52" y="63" fontSize="11" fill="white" fontFamily="sans-serif" fontWeight="700" opacity="0.8">+214%</text>
      </g>
      <g transform="translate(1230, 200)" opacity="0.09">
        <rect x="0" y="0" width="140" height="70" rx="12" fill="#0F6E56"/>
        <rect x="12" y="14" width="50" height="7" rx="3" fill="white" opacity="0.6"/>
        <rect x="12" y="27" width="80" height="5" rx="2" fill="white" opacity="0.35"/>
        <rect x="12" y="42" width="36" height="14" rx="5" fill="white" opacity="0.2"/>
        <text x="30" y="53" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600" opacity="0.9">8–15 leads</text>
      </g>

      {/* Graph lines top-right */}
      <g transform="translate(1050, 300)" opacity="0.07" strokeWidth="2" stroke="#185FA5" fill="none">
        <polyline points="0,60 30,45 60,50 90,30 120,35 150,10 180,15"/>
        <circle cx="150" cy="10" r="5" fill="#185FA5"/>
      </g>

      {/* Left side — phone mockup */}
      <g transform="translate(60, 180)" opacity="0.08">
        <rect x="0" y="0" width="88" height="160" rx="16" fill="#111827" stroke="#185FA5" strokeWidth="1.5"/>
        <rect x="6" y="16" width="76" height="128" rx="10" fill="#185FA5" opacity="0.3"/>
        <rect x="14" y="26" width="60" height="8" rx="4" fill="white" opacity="0.6"/>
        <rect x="14" y="40" width="44" height="5" rx="2" fill="white" opacity="0.35"/>
        <rect x="14" y="58" width="60" height="34" rx="6" fill="white" opacity="0.12"/>
        <rect x="14" y="100" width="26" height="8" rx="4" fill="white" opacity="0.2"/>
        <rect x="46" y="100" width="28" height="8" rx="4" fill="#D85A30" opacity="0.5"/>
        {/* Like icon */}
        <path d="M24 125 Q27 120 30 125 Q33 120 36 125 Q36 132 30 136 Q24 132 24 125Z" fill="#D85A30" opacity="0.7"/>
        <text x="40" y="134" fontSize="8" fill="white" fontFamily="sans-serif" opacity="0.6">1.2k</text>
      </g>

      {/* Floating icons — heart, share, comment */}
      <g opacity="0.1">
        {/* Heart */}
        <path d="M200 700 Q204 694 210 700 Q216 694 220 700 Q220 710 210 716 Q200 710 200 700Z" fill="#D85A30"/>
        {/* Comment bubble */}
        <rect x="280" y="740" width="44" height="28" rx="8" fill="#185FA5"/>
        <polygon points="284,768 292,780 300,768" fill="#185FA5"/>
        {/* Share arrow */}
        <path d="M1260 680 L1280 668 L1300 680" stroke="#0F6E56" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <line x1="1280" y1="668" x2="1280" y2="700" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round"/>
      </g>

      {/* Dotted grid pattern */}
      {Array.from({ length: 12 }).map((_, row) =>
        Array.from({ length: 20 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 80 + 40} cy={row * 80 + 40} r="1.5" fill="#185FA5" opacity="0.04"/>
        ))
      )}

      {/* Circular chart bottom-left */}
      <g transform="translate(120, 600)" opacity="0.07">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#185FA5" strokeWidth="10" strokeDasharray="138 138" strokeDashoffset="35"/>
        <circle cx="50" cy="50" r="44" fill="none" stroke="#D85A30" strokeWidth="10" strokeDasharray="55 221" strokeDashoffset="-103"/>
        <text x="50" y="55" textAnchor="middle" fontSize="14" fill="#111827" fontFamily="sans-serif" fontWeight="700">ROI</text>
      </g>

      {/* Notification dots */}
      <circle cx="1380" cy="120" r="8" fill="#D85A30" opacity="0.15"/>
      <circle cx="1360" cy="150" r="5" fill="#185FA5" opacity="0.1"/>
      <circle cx="1400" cy="160" r="6" fill="#0F6E56" opacity="0.1"/>
    </svg>
  );
}

// Problem BG — écrans cassés, signaux faibles, post sans engagement
function ProblemBgSVG() {
  return (
    <svg className="section-bg-svg" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="pg1" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#D85A30" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#D85A30" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="700" fill="url(#pg1)"/>

      {/* Flat graph — no growth */}
      <g transform="translate(80, 80)" opacity="0.08" strokeWidth="2.5" stroke="#D85A30" fill="none" strokeLinecap="round">
        <polyline points="0,80 40,82 80,78 120,81 160,79 200,82 240,80"/>
        <circle cx="240" cy="80" r="5" fill="#D85A30"/>
        <line x1="0" y1="40" x2="240" y2="40" stroke="#D85A30" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
        <text x="248" y="44" fontSize="10" fill="#D85A30" fontFamily="sans-serif" opacity="0.9">Objectif</text>
        <text x="248" y="84" fontSize="10" fill="#D85A30" fontFamily="sans-serif" opacity="0.9">Réalité</text>
      </g>

      {/* Broken like icon */}
      <g transform="translate(1200, 100)" opacity="0.07">
        <path d="M0 30 Q5 20 12 30 Q19 20 24 30 Q24 42 12 50 Q0 42 0 30Z" fill="none" stroke="#D85A30" strokeWidth="2"/>
        <line x1="2" y1="2" x2="22" y2="52" stroke="#D85A30" strokeWidth="1.5" strokeLinecap="round"/>
      </g>

      {/* Empty chart bars */}
      <g transform="translate(1280, 500)" opacity="0.07">
        {[60,30,50,20,40].map((h, i) => (
          <rect key={i} x={i * 22} y={80 - h} width="16" height={h} rx="3" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeDasharray="3 2"/>
        ))}
      </g>

      {/* Question marks */}
      <text x="680" y="120" fontSize="180" fill="#D85A30" opacity="0.025" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">?</text>

      {/* Muted notification bell */}
      <g transform="translate(1340, 280)" opacity="0.08">
        <path d="M15 0 Q25 0 28 10 L32 30 H0 L4 10 Q7 0 15 0Z" fill="none" stroke="#6B7280" strokeWidth="2"/>
        <line x1="12" y1="34" x2="20" y2="34" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
        <line x1="0" y1="0" x2="32" y2="36" stroke="#D85A30" strokeWidth="2" strokeLinecap="round"/>
      </g>

      {/* Dots pattern */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 16 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 92 + 46} cy={row * 90 + 45} r="1.5" fill="#D85A30" opacity="0.03"/>
        ))
      )}
    </svg>
  );
}

// Solution BG — engrenages, checklist, workflow
function SolutionBgSVG() {
  return (
    <svg className="section-bg-svg" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="sg1" cx="20%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#185FA5" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#185FA5" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="sg2" cx="85%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#0F6E56" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="#0F6E56" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="700" fill="url(#sg1)"/>
      <rect width="1440" height="700" fill="url(#sg2)"/>

      {/* Gear / cog left */}
      <g transform="translate(60, 280)" opacity="0.07">
        <circle cx="50" cy="50" r="38" fill="none" stroke="#185FA5" strokeWidth="3"/>
        <circle cx="50" cy="50" r="18" fill="none" stroke="#185FA5" strokeWidth="3"/>
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 50 + 38 * Math.cos(rad);
          const y1 = 50 + 38 * Math.sin(rad);
          const x2 = 50 + 50 * Math.cos(rad);
          const y2 = 50 + 50 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#185FA5" strokeWidth="6" strokeLinecap="round"/>;
        })}
      </g>

      {/* Small gear right */}
      <g transform="translate(1320, 120)" opacity="0.06">
        <circle cx="30" cy="30" r="22" fill="none" stroke="#0F6E56" strokeWidth="2.5"/>
        <circle cx="30" cy="30" r="10" fill="none" stroke="#0F6E56" strokeWidth="2.5"/>
        {[0,60,120,180,240,300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 30 + 22 * Math.cos(rad);
          const y1 = 30 + 22 * Math.sin(rad);
          const x2 = 30 + 30 * Math.cos(rad);
          const y2 = 30 + 30 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0F6E56" strokeWidth="5" strokeLinecap="round"/>;
        })}
      </g>

      {/* Workflow arrows */}
      <g transform="translate(400, 600)" opacity="0.06" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round">
        <rect x="0" y="0" width="80" height="40" rx="8"/>
        <text x="40" y="25" textAnchor="middle" fontSize="10" fill="#185FA5" fontFamily="sans-serif">Audit</text>
        <line x1="80" y1="20" x2="120" y2="20"/>
        <polygon points="118,15 130,20 118,25" fill="#185FA5"/>
        <rect x="130" y="0" width="80" height="40" rx="8"/>
        <text x="170" y="25" textAnchor="middle" fontSize="10" fill="#185FA5" fontFamily="sans-serif">Contenu</text>
        <line x1="210" y1="20" x2="250" y2="20"/>
        <polygon points="248,15 260,20 248,25" fill="#185FA5"/>
        <rect x="260" y="0" width="80" height="40" rx="8"/>
        <text x="300" y="25" textAnchor="middle" fontSize="10" fill="#185FA5" fontFamily="sans-serif">ROI</text>
      </g>

      {/* Checklist top right */}
      <g transform="translate(1240, 400)" opacity="0.07">
        {["Stratégie","Contenu","Mesure","Scale"].map((label, i) => (
          <g key={i} transform={`translate(0, ${i * 32})`}>
            <rect x="0" y="0" width="16" height="16" rx="4" fill="none" stroke="#0F6E56" strokeWidth="1.5"/>
            <path d="M3 8l4 4 7-8" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <text x="24" y="12" fontSize="11" fill="#0F6E56" fontFamily="sans-serif">{label}</text>
          </g>
        ))}
      </g>

      {/* Grid dots */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 18 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 84 + 42} cy={row * 88 + 44} r="1.2" fill="#185FA5" opacity="0.035"/>
        ))
      )}
    </svg>
  );
}

// Services BG — post cards, calendar, analytics
function ServicesBgSVG() {
  return (
    <svg className="section-bg-svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="svbg" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#185FA5" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="#185FA5" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="800" fill="url(#svbg)"/>

      {/* Calendar top-left */}
      <g transform="translate(60, 60)" opacity="0.08">
        <rect x="0" y="0" width="140" height="120" rx="12" fill="none" stroke="#185FA5" strokeWidth="1.5"/>
        <rect x="0" y="0" width="140" height="28" rx="12" fill="#185FA5" opacity="0.4"/>
        <rect x="0" y="14" width="140" height="14" fill="#185FA5" opacity="0.4"/>
        <text x="70" y="19" textAnchor="middle" fontSize="10" fill="white" fontFamily="sans-serif" fontWeight="600">MAI 2026</text>
        {[0,1,2,3,4,5,6].map(d => (
          <text key={d} x={d*20+10} y="40" fontSize="8" fill="#185FA5" fontFamily="sans-serif" textAnchor="middle" opacity="0.6">
            {["L","M","M","J","V","S","D"][d]}
          </text>
        ))}
        {[1,2,3,4,5,8,9,10,11,12,15,16,17,18,19,22,23,24,25,26].map((day, i) => (
          <g key={day}>
            <rect x={(i%7)*20+2} y={Math.floor(i/7)*20+48} width="16" height="16" rx="4"
              fill={[3,10,17].includes(day) ? "#185FA5" : "none"}
              stroke={[3,10,17].includes(day) ? "none" : "#185FA5"} strokeWidth="0.5" opacity="0.3"/>
            <text x={(i%7)*20+10} y={Math.floor(i/7)*20+60} textAnchor="middle" fontSize="8"
              fill={[3,10,17].includes(day) ? "white" : "#185FA5"} fontFamily="sans-serif" opacity="0.7">{day}</text>
          </g>
        ))}
      </g>

      {/* Analytics chart top-right */}
      <g transform="translate(1200, 60)" opacity="0.08">
        <rect x="0" y="0" width="180" height="110" rx="12" fill="none" stroke="#0F6E56" strokeWidth="1.5"/>
        <text x="12" y="22" fontSize="11" fill="#0F6E56" fontFamily="sans-serif" fontWeight="600">Leads / mois</text>
        {[20,45,35,70,55,90].map((h, i) => (
          <rect key={i} x={i*26+14} y={110-h*0.7} width="18" height={h*0.7-14} rx="3" fill="#0F6E56" opacity={0.2 + i*0.1}/>
        ))}
        <polyline points="23,86 49,58 75,68 101,40 127,50 153,24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="153" cy="24" r="4" fill="#185FA5"/>
      </g>

      {/* Post card mockup bottom-left */}
      <g transform="translate(80, 580)" opacity="0.07">
        <rect x="0" y="0" width="160" height="110" rx="12" fill="none" stroke="#D85A30" strokeWidth="1.5"/>
        <rect x="12" y="12" width="136" height="48" rx="8" fill="#D85A30" opacity="0.15"/>
        <rect x="12" y="70" width="90" height="7" rx="3" fill="#D85A30" opacity="0.3"/>
        <rect x="12" y="83" width="60" height="5" rx="2" fill="#D85A30" opacity="0.2"/>
        <rect x="12" y="96" width="40" height="10" rx="4" fill="#D85A30" opacity="0.35"/>
        <text x="32" y="105" fontSize="8" fill="white" fontFamily="sans-serif" fontWeight="600">Publier</text>
        <path d="M120 100 Q124 95 128 100 Q132 95 136 100 Q136 106 128 110 Q120 106 120 100Z" fill="#D85A30" opacity="0.5"/>
      </g>

      {/* Floating tags */}
      <g opacity="0.07">
        {["#coaching","#leads","#ROI","#socialmedia","#freelance"].map((tag, i) => (
          <g key={i} transform={`translate(${600+i*130}, ${150+i*60})`}>
            <rect x="0" y="0" width={tag.length*6+20} height="22" rx="11" fill="none" stroke="#185FA5" strokeWidth="1"/>
            <text x={(tag.length*6+20)/2} y="15" textAnchor="middle" fontSize="9" fill="#185FA5" fontFamily="sans-serif">{tag}</text>
          </g>
        ))}
      </g>

      {/* Grid dots */}
      {Array.from({ length: 9 }).map((_, row) =>
        Array.from({ length: 16 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 96 + 48} cy={row * 92 + 46} r="1.2" fill="#185FA5" opacity="0.03"/>
        ))
      )}
    </svg>
  );
}

// Proof BG — rising chart, stars, testimonial bubbles
function ProofBgSVG() {
  return (
    <svg className="section-bg-svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="pbg1" cx="70%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#0F6E56" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#0F6E56" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="800" fill="url(#pbg1)"/>

      {/* Rising graph big */}
      <g transform="translate(900, 100)" opacity="0.06" fill="none">
        <polyline points="0,200 60,170 120,150 180,100 240,80 300,40 360,10"
          stroke="#0F6E56" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <polygon points="0,200 0,220 380,220 380,200 360,10 300,40 240,80 180,100 120,150 60,170"
          fill="#0F6E56" opacity="0.15"/>
        {[0,60,120,180,240,300,360].map((x, i) => {
          const ys = [200,170,150,100,80,40,10];
          return <circle key={i} cx={x} cy={ys[i]} r="5" fill="#0F6E56" opacity="0.6"/>;
        })}
      </g>

      {/* Stars rating */}
      <g transform="translate(80, 500)" opacity="0.08">
        {[0,1,2,3,4].map(i => (
          <path key={i} transform={`translate(${i*36}, 0)`}
            d="M16 0 L20 12 L32 12 L22 19 L26 31 L16 24 L6 31 L10 19 L0 12 L12 12 Z"
            fill="#D85A30"/>
        ))}
        <text x="90" y="50" fontSize="14" fill="#D85A30" fontFamily="sans-serif" fontWeight="700" opacity="0.7">5.0 / 5</text>
      </g>

      {/* Speech bubble */}
      <g transform="translate(60, 200)" opacity="0.06">
        <rect x="0" y="0" width="200" height="70" rx="14" fill="#185FA5"/>
        <polygon points="20,70 30,90 50,70" fill="#185FA5"/>
        <rect x="14" y="14" width="120" height="8" rx="4" fill="white"/>
        <rect x="14" y="28" width="80" height="6" rx="3" fill="white" opacity="0.6"/>
        <rect x="14" y="40" width="100" height="6" rx="3" fill="white" opacity="0.4"/>
      </g>

      {/* Second speech bubble */}
      <g transform="translate(1200, 350)" opacity="0.06">
        <rect x="0" y="0" width="160" height="60" rx="14" fill="#0F6E56"/>
        <polygon points="130,60 140,80 150,60" fill="#0F6E56"/>
        <rect x="12" y="12" width="90" height="7" rx="3" fill="white"/>
        <rect x="12" y="25" width="60" height="5" rx="2" fill="white" opacity="0.6"/>
        <rect x="12" y="36" width="80" height="5" rx="2" fill="white" opacity="0.4"/>
      </g>

      {/* Trophy */}
      <g transform="translate(1340, 600)" opacity="0.07">
        <rect x="20" y="60" width="40" height="8" rx="3" fill="#D85A30"/>
        <rect x="28" y="44" width="24" height="20" rx="2" fill="#D85A30"/>
        <path d="M10 0 Q10 40 40 40 Q70 40 70 0 Z" fill="none" stroke="#D85A30" strokeWidth="2.5"/>
        <line x1="10" y1="14" x2="0" y2="14" stroke="#D85A30" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="70" y1="14" x2="80" y2="14" stroke="#D85A30" strokeWidth="2.5" strokeLinecap="round"/>
      </g>

      {/* Grid dots */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 16 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 96 + 48} cy={row * 100 + 50} r="1.2" fill="#0F6E56" opacity="0.03"/>
        ))
      )}
    </svg>
  );
}

// Why Me BG — map with pin Madagascar, scales
function WhyMeBgSVG() {
  return (
    <svg className="section-bg-svg" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="wmbg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#185FA5" stopOpacity="0.04"/>
          <stop offset="100%" stopColor="#185FA5" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="700" fill="url(#wmbg)"/>

      {/* World map simplified outline */}
      <g opacity="0.05" fill="none" stroke="#185FA5" strokeWidth="1">
        {/* Europe roughly */}
        <ellipse cx="680" cy="200" rx="80" ry="60"/>
        {/* Africa roughly */}
        <ellipse cx="700" cy="380" rx="70" ry="110"/>
        {/* Americas */}
        <ellipse cx="360" cy="280" rx="90" ry="130"/>
        {/* Asia */}
        <ellipse cx="950" cy="250" rx="130" ry="80"/>
        {/* Madagascar */}
        <ellipse cx="760" cy="420" rx="12" ry="22" fill="#185FA5" opacity="0.15"/>
      </g>

      {/* Pin Madagascar */}
      <g transform="translate(748, 390)" opacity="0.15">
        <path d="M12 0 C5 0 0 5 0 12 C0 20 12 30 12 30 C12 30 24 20 24 12 C24 5 19 0 12 0Z" fill="#D85A30"/>
        <circle cx="12" cy="12" r="5" fill="white"/>
      </g>

      {/* Connection lines from Madagascar to France/Belgium/Canada */}
      <g opacity="0.06" stroke="#185FA5" strokeWidth="1.5" strokeDasharray="5 4" fill="none">
        <path d="M760 405 Q700 300 685 220"/>
        <path d="M760 405 Q650 280 380 240"/>
        <path d="M760 405 Q900 300 950 230"/>
      </g>

      {/* Destination pins */}
      <g opacity="0.1">
        {/* Paris */}
        <circle cx="685" cy="218" r="6" fill="#185FA5"/>
        <text x="695" y="222" fontSize="9" fill="#185FA5" fontFamily="sans-serif">Paris</text>
        {/* Canada */}
        <circle cx="380" cy="238" r="6" fill="#185FA5"/>
        <text x="390" y="242" fontSize="9" fill="#185FA5" fontFamily="sans-serif">Montréal</text>
        {/* Brussels */}
        <circle cx="690" cy="202" r="5" fill="#185FA5"/>
      </g>

      {/* Scale / balance */}
      <g transform="translate(1240, 400)" opacity="0.07">
        <line x1="50" y1="0" x2="50" y2="80" stroke="#185FA5" strokeWidth="2"/>
        <line x1="10" y1="30" x2="90" y2="30" stroke="#185FA5" strokeWidth="2"/>
        <line x1="10" y1="30" x2="10" y2="60" stroke="#185FA5" strokeWidth="1.5"/>
        <line x1="90" y1="30" x2="90" y2="55" stroke="#185FA5" strokeWidth="1.5"/>
        <rect x="-5" y="60" width="30" height="12" rx="4" fill="#0F6E56" opacity="0.5"/>
        <rect x="75" y="55" width="30" height="12" rx="4" fill="#D85A30" opacity="0.5"/>
        <text x="5" y="70" fontSize="7" fill="white" fontFamily="sans-serif" fontWeight="600" opacity="0.9">ROI</text>
        <text x="78" y="65" fontSize="7" fill="white" fontFamily="sans-serif" fontWeight="600" opacity="0.9">Coût</text>
      </g>

      {/* Grid dots */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 18 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 84 + 42} cy={row * 88 + 44} r="1.2" fill="#185FA5" opacity="0.03"/>
        ))
      )}
    </svg>
  );
}

// Contact BG — envelope, phone, calendar booking
function ContactBgSVG() {
  return (
    <svg className="section-bg-svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="cbg" cx="80%" cy="20%" r="50%">
          <stop offset="0%" stopColor="#D85A30" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="#D85A30" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="800" fill="url(#cbg)"/>

      {/* Envelope top right */}
      <g transform="translate(1220, 60)" opacity="0.08">
        <rect x="0" y="0" width="160" height="110" rx="12" fill="none" stroke="#185FA5" strokeWidth="2"/>
        <polyline points="0,0 80,65 160,0" fill="none" stroke="#185FA5" strokeWidth="2"/>
        <line x1="0" y1="110" x2="60" y2="55" stroke="#185FA5" strokeWidth="1.5"/>
        <line x1="160" y1="110" x2="100" y2="55" stroke="#185FA5" strokeWidth="1.5"/>
      </g>

      {/* Phone top left */}
      <g transform="translate(60, 100)" opacity="0.08">
        <rect x="0" y="0" width="70" height="120" rx="14" fill="none" stroke="#185FA5" strokeWidth="2"/>
        <rect x="8" y="12" width="54" height="90" rx="8" fill="#185FA5" opacity="0.08"/>
        <circle cx="35" cy="110" r="5" fill="none" stroke="#185FA5" strokeWidth="1.5"/>
        <rect x="22" y="5" width="26" height="4" rx="2" fill="#185FA5" opacity="0.3"/>
        {/* Screen content */}
        <rect x="12" y="20" width="46" height="6" rx="3" fill="#185FA5" opacity="0.3"/>
        <rect x="12" y="32" width="30" height="5" rx="2" fill="#185FA5" opacity="0.2"/>
        <rect x="12" y="50" width="46" height="28" rx="6" fill="#D85A30" opacity="0.2"/>
        <text x="35" y="68" textAnchor="middle" fontSize="9" fill="#D85A30" fontFamily="sans-serif" fontWeight="600" opacity="0.8">Audit gratuit</text>
      </g>

      {/* Calendar booking */}
      <g transform="translate(100, 580)" opacity="0.07">
        <rect x="0" y="0" width="180" height="140" rx="12" fill="none" stroke="#0F6E56" strokeWidth="1.5"/>
        <rect x="0" y="0" width="180" height="32" rx="12" fill="#0F6E56" opacity="0.3"/>
        <rect x="0" y="18" width="180" height="14" fill="#0F6E56" opacity="0.3"/>
        <text x="90" y="21" textAnchor="middle" fontSize="10" fill="white" fontFamily="sans-serif" fontWeight="600">Réserver un créneau</text>
        {[0,1,2].map(row => [0,1,2,3].map(col => (
          <rect key={`${row}-${col}`} x={col*42+10} y={row*32+40} width="34" height="24" rx="6"
            fill={row===0&&col===2 ? "#0F6E56" : "none"}
            stroke="#0F6E56" strokeWidth="0.8" opacity={row===0&&col===2 ? 0.5 : 0.3}/>
        )))}
        <text x="77" y="56" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif" fontWeight="600" opacity="0.9">15</text>
      </g>

      {/* Send / arrow */}
      <g transform="translate(1340, 500)" opacity="0.07">
        <path d="M0 40 L60 0 L40 60 L30 35 Z" fill="#D85A30"/>
        <line x1="30" y1="35" x2="0" y2="40" stroke="#D85A30" strokeWidth="1" strokeLinecap="round"/>
      </g>

      {/* Grid dots */}
      {Array.from({ length: 9 }).map((_, row) =>
        Array.from({ length: 16 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 96 + 48} cy={row * 90 + 45} r="1.2" fill="#185FA5" opacity="0.03"/>
        ))
      )}
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Résultats", href: "#resultats" },
    { label: "Pourquoi moi", href: "#pourquoi" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      backgroundColor: C.bg,
      borderBottom: scrolled ? `0.5px solid ${C.border}` : "0.5px solid transparent",
      boxShadow: scrolled ? "0 1px 14px rgba(0,0,0,0.055)" : "none",
      transition: "border-color 0.25s, box-shadow 0.25s",
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            backgroundColor: C.blue, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13,
          }}>RB</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.dark }}>
            Rigeot B.
          </span>
        </a>

        <div className="nav-desktop">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: C.gray, textDecoration: "none", transition: "color 0.18s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.dark)}
              onMouseLeave={e => (e.currentTarget.style.color = C.gray)}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{
            backgroundColor: C.coral, color: "#fff",
            padding: "9px 20px", borderRadius: 8,
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700,
            textDecoration: "none", transition: "opacity 0.18s, transform 0.18s",
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
          >
            Audit gratuit
          </a>
        </div>

        <button className="nav-burger" onClick={() => setMobileOpen(o => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }} aria-label="Menu">
          {mobileOpen
            ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 3l16 16M19 3L3 19" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/></svg>
            : <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h16" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/></svg>
          }
        </button>
      </div>

      {mobileOpen && (
        <div style={{ backgroundColor: C.bg, borderTop: `0.5px solid ${C.border}`, padding: "12px 24px 24px" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ display: "block", padding: "13px 0", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, color: C.dark, textDecoration: "none", borderBottom: `0.5px solid ${C.border}` }}
            >{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)}
            style={{ display: "block", marginTop: 18, textAlign: "center", backgroundColor: C.coral, color: "#fff", padding: "14px", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, textDecoration: "none" }}
          >Réserver mon audit gratuit →</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="section-bg-wrapper" style={{ paddingTop: 140, paddingBottom: 100, backgroundColor: C.bg, textAlign: "center" }}>
      <HeroBgSVG />
      <div className="section-content" style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px" }}>
        <FadeIn>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            backgroundColor: C.blueMuted, color: C.blue,
            padding: "6px 14px", borderRadius: 20, marginBottom: 30,
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885 3.91 10.51l.59-3.44L2 4.635l3.455-.505L7 1z" fill={C.blue}/>
            </svg>
            Garantie résultat 60 jours
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(30px, 5.5vw, 56px)", lineHeight: 1.08,
            color: C.dark, marginBottom: 22,
          }}>
            Vos réseaux sociaux vous coûtent combien de clients par&nbsp;mois&nbsp;?
          </h1>
        </FadeIn>

        <FadeIn delay={160}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(16px, 2vw, 19px)",
            color: C.gray, lineHeight: 1.68,
            maxWidth: 620, margin: "0 auto 40px",
          }}>
            Je transforme la présence sociale des coachs et formateurs francophones en pipeline de leads qualifiés — avec des résultats mesurables chaque mois ou je travaille gratuitement.
          </p>
        </FadeIn>

        <FadeIn delay={230}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 60 }}>
            <a href="#contact" style={{
              backgroundColor: C.coral, color: "#fff",
              padding: "15px 30px", borderRadius: 10,
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
              textDecoration: "none", transition: "opacity 0.18s, transform 0.18s",
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
            >
              Réserver mon audit gratuit →
            </a>
            <a href="#services" style={{
              border: `1.5px solid ${C.border}`, color: C.dark,
              padding: "15px 30px", borderRadius: 10,
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500,
              textDecoration: "none", backgroundColor: "transparent",
              transition: "border-color 0.18s",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = C.blue)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
            >
              Voir mes services
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={310}>
          <div className="hero-stats" style={{ maxWidth: 700, margin: "0 auto" }}>
            {[
              { value: "+214%", label: "Croissance audience moyenne en 90 jours" },
              { value: "8–15", label: "Leads qualifiés générés par mois" },
              { value: "3,8×", label: "ROI moyen constaté à 6 mois" },
            ].map((s, i) => (
              <div key={i} style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
                border: `0.5px solid ${C.border}`,
                borderRadius: 12, padding: "22px 14px",
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 30, color: C.blue, marginBottom: 5 }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.gray, lineHeight: 1.45 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Problem ──────────────────────────────────────────────────────────────────
function ProblemSection() {
  const pains = [
    { icon: "📭", title: "Vous publiez régulièrement…", desc: "…mais aucun client ne vient de vos réseaux. Votre contenu existe, mais il ne déclenche aucun acte d'achat." },
    { icon: "📊", title: "Votre CM vous envoie des rapports…", desc: "…de likes et d'abonnés, jamais de leads. Des chiffres flatteurs qui ne se traduisent pas en chiffre d'affaires." },
    { icon: "❓", title: "Vous ne savez pas…", desc: "…si vos réseaux vous rapportent quoi que ce soit. Impossible de mesurer le retour sur investissement réel." },
  ];

  return (
    <section id="probleme" className="section-bg-wrapper" style={{ backgroundColor: C.bgAlt, padding: "88px 24px" }}>
      <ProblemBgSVG />
      <div className="section-content" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", color: C.dark, marginBottom: 12 }}>
            Vous vous reconnaissez&nbsp;?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.gray, margin: 0 }}>
            Si vous avez répondu oui à au moins une de ces situations, vous n'êtes pas seul.
          </p>
        </FadeIn>

        <div className="pain-grid" style={{ marginBottom: 48 }}>
          {pains.map((p, i) => (
            <FadeIn key={i} delay={i * 90}>
              <div style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(6px)",
                border: `0.5px solid ${C.border}`,
                borderRadius: 12, padding: 28, height: "100%",
              }}>
                <div style={{ fontSize: 34, marginBottom: 14 }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.gray, lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div style={{ backgroundColor: C.blue, borderRadius: 14, padding: "28px 36px", maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(17px, 2.5vw, 21px)", color: "#fff", lineHeight: 1.45, margin: 0 }}>
              "Il n'y a pas de problème de contenu.<br/>Il y a un problème de <em>système</em>."
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Solution ─────────────────────────────────────────────────────────────────
function SolutionSection() {
  const steps = [
    { num: "01", icon: "🔍", title: "Audit & Stratégie", desc: "Analyse complète de votre présence, de votre audience et de vos concurrents.", detail: "Livrable : rapport PDF + feuille de route 90 jours." },
    { num: "02", icon: "✍️", title: "Production & Conversion", desc: "Contenu scénarisé selon votre tunnel de vente. Chaque post a un rôle précis.", detail: "Attirer, convaincre ou convertir — rien n'est laissé au hasard." },
    { num: "03", icon: "📈", title: "Mesure & Optimisation", desc: "Dashboard partagé en temps réel. Rapport mensuel avec leads générés et CA attribuable.", detail: "Optimisation continue basée sur les données, pas les intuitions." },
  ];

  return (
    <section id="methode" className="section-bg-wrapper" style={{ backgroundColor: C.bg, padding: "88px 24px" }}>
      <SolutionBgSVG />
      <div className="section-content" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", backgroundColor: C.blueMuted, color: C.blue, padding: "5px 13px", borderRadius: 20, marginBottom: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>
            Ma méthode exclusive
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", color: C.dark, margin: 0 }}>
            La méthode Social Revenue Engine
          </h2>
        </FadeIn>

        <div className="step-grid">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 110}>
              <div style={{
                border: `0.5px solid ${C.border}`, borderRadius: 12, padding: 32,
                backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: C.blueMuted, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.blue, marginBottom: 18 }}>{s.num}</div>
                <div style={{ fontSize: 30, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 19, color: C.dark, marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.gray, lineHeight: 1.65, marginBottom: 10 }}>{s.desc}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.blue, lineHeight: 1.55, fontWeight: 500, margin: 0 }}>{s.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  const services = [
    { name: "LinkedIn B2B Lead Machine", price: "300", popular: false, items: ["Réécriture complète profil LinkedIn","3 posts LinkedIn/semaine (12/mois)","1 article LinkedIn long format/mois","Séquence de prospection semi-automatisée","Rapport hebdomadaire + projection leads","Session debriefing 30 min/mois"] },
    { name: "Combo Organique", subtitle: "Social Revenue Engine", price: "350", popular: true, items: ["Audit stratégique + rapport PDF","12 posts/mois sur 2 plateformes","4 Reels/Shorts scénarisés/mois","2 carrousels LinkedIn haute-portée/mois","1 Newsletter mensuelle (capture de leads)","Rapport mensuel ROI détaillé"] },
    { name: "Visibility-to-Sales Accelerator", price: "450", popular: false, items: ["Audit tunnel de vente complet","16 posts/mois (Awareness + Nurturing + Conversion)","4 scripts Reels/TikToks orientés vente","Séquence email de bienvenue (5 mails)","UTM tracking + Dashboard Google Sheets","Rapport ROI mensuel avec CA attribuable"] },
  ];

  return (
    <section id="services" className="section-bg-wrapper" style={{ backgroundColor: C.bgAlt, padding: "88px 24px" }}>
      <ServicesBgSVG />
      <div className="section-content" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", color: C.dark, marginBottom: 12 }}>
            Choisissez votre niveau d'accompagnement
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.gray, margin: 0 }}>
            3 formules conçues pour générer des leads, pas des vanity metrics.
          </p>
        </FadeIn>

        <div className="service-grid">
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 90}>
              <div style={{
                backgroundColor: s.popular ? C.blue : "rgba(255,255,255,0.92)",
                backdropFilter: "blur(6px)",
                border: s.popular ? `0.5px solid ${C.blue}` : `0.5px solid ${C.border}`,
                borderRadius: 14, padding: 32, position: "relative",
              }}>
                {s.popular && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", backgroundColor: C.coral, color: "#fff", padding: "5px 16px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                    ⭐ Le plus populaire
                  </div>
                )}
                <div style={{ marginBottom: 18 }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.2, color: s.popular ? "#fff" : C.dark, marginBottom: 4 }}>{s.name}</h3>
                  {s.subtitle && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: s.popular ? "rgba(255,255,255,0.65)" : C.gray, margin: 0 }}>{s.subtitle}</p>}
                </div>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 38, color: s.popular ? "#fff" : C.dark }}>À partir de {s.price}€</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: s.popular ? "rgba(255,255,255,0.6)" : C.gray, display: "block", marginTop: 2 }}>/mois — sans engagement annuel</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {s.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CheckIcon white={s.popular} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: s.popular ? "rgba(255,255,255,0.9)" : C.dark, lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" style={{
                  display: "block", textAlign: "center",
                  backgroundColor: s.popular ? C.coral : "transparent",
                  border: s.popular ? "none" : `1.5px solid ${C.blue}`,
                  color: s.popular ? "#fff" : C.blue,
                  padding: "13px 20px", borderRadius: 10,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
                  textDecoration: "none", transition: "opacity 0.18s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >Démarrer maintenant →</a>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={180}>
          <p style={{ textAlign: "center", marginTop: 26, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.gray }}>
            Tous les tarifs sont en euros HT · Onboarding personnalisé inclus dans chaque formule
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Social Proof ─────────────────────────────────────────────────────────────
function SocialProofSection() {
  const testimonials = [
    { quote: "Avant, mes réseaux me coûtaient du temps sans retour. Aujourd'hui je génère en moyenne 8 leads qualifiés par mois grâce à une stratégie claire. C'est le meilleur investissement de l'année.", name: "Sophie M.", role: "Coach Business", city: "Paris", initials: "SM" },
    { quote: "J'étais sceptique à l'idée de travailler avec un freelance à distance. Les résultats ont effacé tous mes doutes dès le premier mois.", name: "Marc T.", role: "Formateur en ligne", city: "Bruxelles", initials: "MT" },
  ];

  return (
    <section id="resultats" className="section-bg-wrapper" style={{ backgroundColor: C.bg, padding: "88px 24px" }}>
      <ProofBgSVG />
      <div className="section-content" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", color: C.dark, margin: 0 }}>
            Ce que génère une stratégie orientée ROI
          </h2>
        </FadeIn>

        <FadeIn>
          <div style={{ backgroundColor: "rgba(248,247,244,0.92)", backdropFilter: "blur(6px)", border: `0.5px solid ${C.border}`, borderRadius: 14, padding: "36px 38px", marginBottom: 28 }}>
            <div style={{ display: "inline-block", backgroundColor: C.greenMuted, color: C.green, padding: "4px 12px", borderRadius: 20, marginBottom: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>
              Étude de cas réelle
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(18px, 2.5vw, 22px)", color: C.dark, marginBottom: 26, lineHeight: 1.3 }}>
              Coach business francophone — 0 à 2 800 abonnés en 90 jours
            </h3>
            <div className="stat-mini">
              {[
                { value: "+1455%", label: "Croissance en 90 jours" },
                { value: "23", label: "Leads générés (mois 3)" },
                { value: "4", label: "Clients signés" },
                { value: "2 800", label: "Nouveaux abonnés" },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: "rgba(255,255,255,0.9)", border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "18px 14px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, color: C.green, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.gray, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="proof-grid">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 90}>
              <div style={{ border: `0.5px solid ${C.border}`, borderRadius: 12, padding: 28, backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)", height: "100%" }}>
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" style={{ display: "block", marginBottom: 18 }}>
                  <path d="M0 22V13.6C0 9.6 1.1 6.5 3.3 4.2 5.5 1.4 8.9 0 13.5 0v4.2C10.3 4.2 8 5.1 6.7 6.8 5.8 8.1 5.4 9.5 5.4 11H11V22H0ZM17 22V13.6C17 9.6 18.1 6.5 20.3 4.2 22.5 1.4 25.9 0 30.5 0v4.2C27.3 4.2 25 5.1 23.7 6.8 22.8 8.1 22.4 9.5 22.4 11H28V22H17Z" fill={C.border}/>
                </svg>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.dark, lineHeight: 1.68, marginBottom: 22, fontStyle: "italic" }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: C.blue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: C.dark }}>{t.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.gray }}>{t.role} · {t.city}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Me ───────────────────────────────────────────────────────────────────
function WhyMeSection() {
  const rows = [
    { label: "Promesse", them: '"Je gère vos réseaux"', me: '"Je génère vos leads"' },
    { label: "Rapport", them: "Likes et abonnés", me: "Leads et CA attribuable" },
    { label: "Tarif", them: "800–1 500 €/mois", me: "300–550 €/mois" },
    { label: "Garantie", them: "Aucune", me: "60 jours ou gratuit" },
    { label: "Posture", them: "Exécutant", me: "Stratège partenaire" },
  ];

  return (
    <section id="pourquoi" className="section-bg-wrapper" style={{ backgroundColor: C.bgAlt, padding: "88px 24px" }}>
      <WhyMeBgSVG />
      <div className="section-content" style={{ maxWidth: 860, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", color: C.dark, marginBottom: 12 }}>
            Pourquoi travailler avec moi plutôt qu'un CM en France&nbsp;?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.gray, margin: 0 }}>
            Une comparaison honnête, critère par critère.
          </p>
        </FadeIn>

        <FadeIn>
          <div style={{ border: `0.5px solid ${C.border}`, borderRadius: 14, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)" }}>
            <div className="compare-row" style={{ backgroundColor: C.blue, padding: "14px 28px" }}>
              {["Critère", "CM classique", "Rigeot B."].map((h, i) => (
                <div key={i} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", textAlign: i === 0 ? "left" : "center" }}>{h}</div>
              ))}
            </div>
            {rows.map((row, i) => (
              <div key={i} className="compare-row" style={{ padding: "17px 28px", borderBottom: i < rows.length - 1 ? `0.5px solid ${C.border}` : "none", backgroundColor: i % 2 === 0 ? "transparent" : "rgba(248,247,244,0.5)", alignItems: "center" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: C.dark }}>{row.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.gray, textAlign: "center" }}>{row.them}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.green, fontWeight: 600, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="6" stroke={C.green} strokeWidth="1"/>
                    <path d="M3.5 6.5l2 2 4-4" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {row.me}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: "Pourquoi vos tarifs sont moins élevés qu'en France ?", a: "Je suis basé à Madagascar, ce qui me permet d'avoir des charges inférieures à un prestataire européen. Mon expertise et mes outils sont identiques — votre investissement est simplement plus rentable." },
    { q: "Comment fonctionne la garantie 60 jours ?", a: "Si après 60 jours de collaboration vous ne constatez aucun lead mesurable attribuable à votre présence sociale, je continue à travailler gratuitement jusqu'à ce que les résultats soient au rendez-vous." },
    { q: "Vous occupez-vous de la publicité payante ?", a: "Le Visibility-to-Sales Accelerator inclut la gestion de campagnes Meta Ads. Le budget publicitaire reste à votre charge (recommandé : 50–150 €/mois minimum)." },
    { q: "Combien de temps avant de voir les premiers résultats ?", a: "Les premiers leads apparaissent généralement entre le J+14 et le J+30. La croissance significative est visible à partir du 2e mois. Le ROI complet se mesure à 3 mois." },
    { q: "Comment se passe le suivi et la communication ?", a: "Rapport mensuel partagé en temps réel, session de debriefing mensuelle sur Google Meet, disponible par email et WhatsApp Business du lundi au vendredi." },
  ];

  return (
    <section id="faq" style={{ backgroundColor: C.bg, padding: "88px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", color: C.dark, margin: 0 }}>
            Questions fréquentes
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 55}>
              <div style={{ border: `0.5px solid ${open === i ? C.blue : C.border}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s" }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: C.dark, lineHeight: 1.4 }}>{faq.q}</span>
                  <ChevronIcon open={open === i} />
                </button>
                {open === i && (
                  <div style={{ padding: "0 24px 22px" }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.gray, lineHeight: 1.68, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ prenom: "", email: "", plateforme: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.prenom.trim()) e.prenom = "Ce champ est requis";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Adresse email invalide";
    if (!form.plateforme) e.plateforme = "Veuillez sélectionner une plateforme";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const field = (hasError: boolean): React.CSSProperties => ({
    width: "100%", padding: "12px 16px",
    border: `0.5px solid ${hasError ? C.coral : C.border}`,
    borderRadius: 8, outline: "none",
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.dark,
    backgroundColor: "rgba(255,255,255,0.85)", boxSizing: "border-box",
    transition: "border-color 0.18s",
  });

  const contacts = [
    { icon: "✉️", label: "Email", value: "contact@rigeot.mg", href: "mailto:contact@rigeot.mg" },
    { icon: "💬", label: "WhatsApp Business", value: "+261 34 00 000 00", href: "https://wa.me/261340000000" },
    { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/rigeot", href: "#" },
  ];

  return (
    <section id="contact" className="section-bg-wrapper" style={{ backgroundColor: C.bgAlt, padding: "88px 24px" }}>
      <ContactBgSVG />
      <div className="section-content" style={{ maxWidth: 980, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", color: C.dark, marginBottom: 14 }}>
            Commençons par 15 minutes
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: C.gray, lineHeight: 1.65, maxWidth: 550, margin: "0 auto 18px" }}>
            Un audit gratuit de votre présence sociale — sans engagement, sans pitch agressif.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, backgroundColor: C.greenMuted, color: C.green, padding: "7px 15px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600 }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="6" stroke={C.green} strokeWidth="1.2"/>
              <path d="M3.5 6.5l2 2 4-4" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Réponse garantie sous 24h
          </div>
        </FadeIn>

        <div className="contact-grid">
          <FadeIn>
            <div style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", border: `0.5px solid ${C.border}`, borderRadius: 14, padding: 36 }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "36px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 18 }}>🎉</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: C.dark, marginBottom: 12 }}>Demande bien reçue !</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.gray, lineHeight: 1.65 }}>
                    Je reviens vers vous sous 24h avec l'analyse de votre présence sociale et les prochaines étapes concrètes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { key: "prenom", label: "Prénom *", type: "text", placeholder: "Votre prénom" },
                    { key: "email", label: "Email *", type: "email", placeholder: "votre@email.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: "block", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: C.dark }}>{f.label}</label>
                      <input type={f.type} value={(form as any)[f.key]}
                        onChange={e => { setForm(prev => ({ ...prev, [f.key]: e.target.value })); setErrors(er => ({ ...er, [f.key]: "" })); }}
                        placeholder={f.placeholder} style={field(!!(errors as any)[f.key])}
                        onFocus={e => (e.currentTarget.style.borderColor = C.blue)}
                        onBlur={e => (e.currentTarget.style.borderColor = (errors as any)[f.key] ? C.coral : C.border)}
                      />
                      {(errors as any)[f.key] && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.coral, marginTop: 5 }}>{(errors as any)[f.key]}</p>}
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: C.dark }}>Plateforme principale *</label>
                    <select value={form.plateforme} onChange={e => { setForm(f => ({ ...f, plateforme: e.target.value })); setErrors(er => ({ ...er, plateforme: "" })); }} style={field(!!errors.plateforme)}>
                      <option value="">Sélectionnez votre plateforme…</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="tiktok">TikTok</option>
                      <option value="facebook">Facebook</option>
                      <option value="autre">Autre</option>
                    </select>
                    {errors.plateforme && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.coral, marginTop: 5 }}>{errors.plateforme}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: C.dark }}>Message <span style={{ color: C.gray, fontWeight: 400 }}>(optionnel)</span></label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Décrivez brièvement votre situation…" rows={4}
                      style={{ ...field(false), resize: "vertical" as const }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.blue)}
                      onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                    />
                  </div>
                  <button type="submit" style={{ backgroundColor: C.coral, color: "#fff", padding: "14px 24px", borderRadius: 10, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "opacity 0.18s, transform 0.18s" }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
                  >Réserver mon audit gratuit →</button>
                </form>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 19, color: C.dark, marginBottom: 16 }}>Contacts directs</h3>
                {contacts.map((c, i) => (
                  <a key={i} href={c.href} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", borderRadius: 10, border: `0.5px solid ${C.border}`, backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)", textDecoration: "none", marginBottom: 10, transition: "border-color 0.18s" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = C.blue)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
                  >
                    <span style={{ fontSize: 20 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.gray, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.blue, fontWeight: 600 }}>{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ backgroundColor: "rgba(238,244,255,0.9)", backdropFilter: "blur(4px)", border: `0.5px solid ${C.blue}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>🛡️</div>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: C.blue, marginBottom: 8 }}>Garantie résultat 60 jours</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.dark, lineHeight: 1.65, margin: 0 }}>
                  Si vous ne constatez aucun lead mesurable après 60 jours, je continue à travailler gratuitement jusqu'aux résultats.
                </p>
              </div>

              <div style={{ border: `0.5px solid ${C.border}`, borderRadius: 12, padding: 20, backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>🌍</span>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: C.dark, marginBottom: 4 }}>Basé à Madagascar</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.gray, lineHeight: 1.55 }}>Clients actifs en France, Belgique, Suisse et Canada. Disponible du lun. au ven.</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ backgroundColor: C.dark, padding: "32px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className="footer-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, backgroundColor: C.blue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11 }}>RB</div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              © 2026 Rigeot Bonaventure — Community Manager Freelance · Madagascar
            </span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["LinkedIn", "Instagram", "WhatsApp"].map(s => (
              <a key={s} href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.18s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ServicesSection />
        <SocialProofSection />
        <WhyMeSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Props { isOpen: boolean; onClick: () => void; }

function randBlink() { return 2600 + Math.random() * 3200; }
function randDouble() { return Math.random() < 0.28; }

const SIZE = "clamp(120px, 20vw, 180px)";

/* ─── Inline SVG Robot ────────────────────────────────────────────────────── */
function RobotSVG({ blinking, reduced }: { blinking: boolean; reduced: boolean }) {
  return (
    <svg viewBox="0 0 200 265" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" style={{ width: "100%", height: "auto", overflow: "visible" }}>
      <defs>
        <linearGradient id="rg-body" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/><stop offset="55%" stopColor="#edf3fb"/><stop offset="100%" stopColor="#c6d4e8"/>
        </linearGradient>
        <linearGradient id="rg-arm" x1="25%" y1="0%" x2="75%" y2="100%">
          <stop offset="0%" stopColor="#f6fafe"/><stop offset="100%" stopColor="#c8d6ea"/>
        </linearGradient>
        <linearGradient id="rg-leg" x1="25%" y1="0%" x2="75%" y2="100%">
          <stop offset="0%" stopColor="#f0f5fc"/><stop offset="100%" stopColor="#c4d2e6"/>
        </linearGradient>
        <linearGradient id="rg-head" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/><stop offset="45%" stopColor="#eef4fd"/><stop offset="100%" stopColor="#c0ceea"/>
        </linearGradient>
        <linearGradient id="rg-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#58baff"/><stop offset="55%" stopColor="#1978d8"/><stop offset="100%" stopColor="#0c52a0"/>
        </linearGradient>
        <linearGradient id="rg-chest" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2282e2"/><stop offset="100%" stopColor="#0d3f8a"/>
        </linearGradient>
        <radialGradient id="rg-screen" cx="32%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#0e2540"/><stop offset="100%" stopColor="#040e1c"/>
        </radialGradient>
        <linearGradient id="rg-ant" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#40dcff"/><stop offset="100%" stopColor="#0098cc"/>
        </linearGradient>
        <radialGradient id="rg-spec" cx="35%" cy="25%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.62)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>

      {/* LEGS */}
      <motion.g
        animate={reduced ? undefined : { y: [0,-1.2,0,-0.6,0] }}
        transition={{ duration:4.2, repeat:Infinity, ease:"easeInOut" }}
      >
        <rect x="54" y="198" width="38" height="46" rx="12" fill="url(#rg-leg)" stroke="#cdd9ee" strokeWidth="0.8"/>
        <rect x="108" y="198" width="38" height="46" rx="12" fill="url(#rg-leg)" stroke="#cdd9ee" strokeWidth="0.8"/>
        <ellipse cx="73" cy="201" rx="12" ry="8" fill="url(#rg-blue)"/>
        <ellipse cx="127" cy="201" rx="12" ry="8" fill="url(#rg-blue)"/>
        <circle cx="73" cy="218" r="7" fill="url(#rg-blue)"/>
        <circle cx="127" cy="218" r="7" fill="url(#rg-blue)"/>
        <rect x="54" y="237" width="38" height="8" rx="4" fill="url(#rg-blue)"/>
        <rect x="108" y="237" width="38" height="8" rx="4" fill="url(#rg-blue)"/>
        <rect x="43" y="241" width="60" height="20" rx="10" fill="url(#rg-leg)" stroke="#cdd9ee" strokeWidth="0.8"/>
        <rect x="97" y="241" width="60" height="20" rx="10" fill="url(#rg-leg)" stroke="#cdd9ee" strokeWidth="0.8"/>
        <circle cx="63" cy="254" r="4.5" fill="url(#rg-blue)" opacity="0.7"/>
        <circle cx="137" cy="254" r="4.5" fill="url(#rg-blue)" opacity="0.7"/>
      </motion.g>

      {/* LEFT ARM — pivot shoulder (38, 124) */}
      <motion.g
        style={{ transformOrigin:"38px 124px" }}
        initial={{ rotate: 5 }}
        animate={reduced ? undefined : { rotate:[5,10,3,-1,5] }}
        transition={{ duration:5.8, repeat:Infinity, ease:"easeInOut" }}
      >
        <circle cx="38" cy="124" r="14" fill="url(#rg-blue)"/>
        <rect x="26" y="124" width="24" height="52" rx="11" fill="url(#rg-arm)" stroke="#c8d6ea" strokeWidth="0.8"/>
        <circle cx="38" cy="178" r="12" fill="url(#rg-blue)"/>
        <rect x="27" y="176" width="22" height="36" rx="9" fill="url(#rg-arm)" stroke="#c8d6ea" strokeWidth="0.8"/>
        <rect x="26" y="209" width="24" height="6" rx="3" fill="url(#rg-blue)"/>
        <rect x="24" y="213" width="28" height="20" rx="9" fill="url(#rg-arm)" stroke="#c8d6ea" strokeWidth="0.8"/>
      </motion.g>

      {/* BODY — breathing pivot (100, 155) */}
      <motion.g
        style={{ transformOrigin:"100px 155px" }}
        animate={reduced ? undefined : { scaleY:[1,1.016,1,1.008,1], y:[0,-0.8,0,-0.4,0] }}
        transition={{ duration:3.8, repeat:Infinity, ease:"easeInOut" }}
      >
        <rect x="38" y="110" width="124" height="92" rx="22" fill="url(#rg-body)" stroke="#dde8f5" strokeWidth="0.8"/>
        <rect x="38" y="110" width="124" height="92" rx="22" fill="url(#rg-spec)"/>
        <ellipse cx="68" cy="200" rx="14" ry="9" fill="url(#rg-blue)"/>
        <ellipse cx="132" cy="200" rx="14" ry="9" fill="url(#rg-blue)"/>
        <path d="M52 152 Q100 162 148 152" stroke="#b4c4dc" strokeWidth="1" fill="none" opacity="0.55"/>
        <path d="M44 170 Q100 180 156 170" stroke="#b4c4dc" strokeWidth="1" fill="none" opacity="0.4"/>
        {/* Chest panel */}
        <rect x="64" y="126" width="72" height="60" rx="13" fill="url(#rg-chest)"/>
        <rect x="66" y="128" width="68" height="56" rx="11" fill="none" stroke="#00ccf5" strokeWidth="1.2" opacity="0.75"/>
        {/* Chip */}
        <rect x="80" y="140" width="40" height="40" rx="5" fill="#0a327a" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="86" y="146" width="28" height="28" rx="3" fill="#1258a8"/>
        <circle cx="92" cy="152" r="2" fill="#00d4ff" opacity="0.9"/>
        <circle cx="101" cy="152" r="2" fill="#00d4ff" opacity="0.9"/>
        <circle cx="110" cy="152" r="2" fill="#00d4ff" opacity="0.9"/>
        <circle cx="92" cy="161" r="2" fill="#00d4ff" opacity="0.9"/>
        <circle cx="101" cy="161" r="2" fill="#00d4ff" opacity="0.9"/>
        <circle cx="110" cy="161" r="2" fill="#00d4ff" opacity="0.9"/>
        <circle cx="92" cy="170" r="2" fill="#00d4ff" opacity="0.9"/>
        <circle cx="101" cy="170" r="2" fill="#00d4ff" opacity="0.9"/>
        <circle cx="110" cy="170" r="2" fill="#00d4ff" opacity="0.9"/>
        <rect x="74" y="149" width="6" height="3" rx="1.5" fill="#00b8e8"/>
        <rect x="74" y="157" width="6" height="3" rx="1.5" fill="#00b8e8"/>
        <rect x="74" y="165" width="6" height="3" rx="1.5" fill="#00b8e8"/>
        <rect x="120" y="149" width="6" height="3" rx="1.5" fill="#00b8e8"/>
        <rect x="120" y="157" width="6" height="3" rx="1.5" fill="#00b8e8"/>
        <rect x="120" y="165" width="6" height="3" rx="1.5" fill="#00b8e8"/>
        <rect x="88" y="134" width="6" height="6" rx="1.5" fill="#00b8e8"/>
        <rect x="100" y="134" width="6" height="6" rx="1.5" fill="#00b8e8"/>
        <rect x="88" y="180" width="6" height="6" rx="1.5" fill="#00b8e8"/>
        <rect x="100" y="180" width="6" height="6" rx="1.5" fill="#00b8e8"/>
      </motion.g>

{/* RIGHT ARM (raised/waving) — pivot shoulder (162, 124) */}
<motion.g
  style={{ transformOrigin:"162px 124px" }}
   initial={{ rotate: -100 }}
   animate={reduced ? undefined : { rotate:[-100,-106,-98,-104,-100] }}
   transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut", repeatDelay:3.5 }}
>
  <circle cx="162" cy="124" r="14" fill="url(#rg-blue)"/>
  <rect x="150" y="124" width="24" height="52" rx="11" fill="url(#rg-arm)" stroke="#c8d6ea" strokeWidth="0.8"/>
{/* Forearm and hand with wrist rotation */}
<motion.g
  style={{ transformOrigin:"162px 178px" }}
  animate={reduced ? undefined : { rotate:[0,6,-4,5,-2,0] }}
  transition={{ duration:1.6, repeat:Infinity, ease:"easeInOut", repeatDelay:2 }}
>
  <circle cx="162" cy="178" r="12" fill="url(#rg-blue)"/>
  <rect x="151" y="176" width="22" height="36" rx="9" fill="url(#rg-arm)" stroke="#c8d6ea" strokeWidth="0.8"/>
  {/* Hand palm - rounded shape */}
  <path d="M150 209 h24 a3 3 0 0 1 3 3 v6 a3 3 0 0 1 -3 3 h-24 a3 3 0 0 1 -3 -3 v-6 a3 3 0 0 1 3 -3 z"
    fill="url(#rg-arm)" stroke="#c8d6ea" strokeWidth="0.8"/>
  {/* Fingers with gentle curves */}
  <g fill="url(#rg-arm)" stroke="#c8d6ea" strokeWidth="0.8">
    <path d="M154 209 C154 190, 158 190, 158 209"/>
    <path d="M162 209 C162 185, 166 185, 166 209"/>
    <path d="M170 209 C170 190, 174 190, 174 209"/>
    <path d="M178 209 C178 195, 182 195, 182 209"/>
    {/* Thumb */}
    <path d="M144 225 C144 215, 150 215, 150 225"/>
  </g>
</motion.g>
</motion.g>

      {/* HEAD — tilt pivot at bottom-center (100, 102) */}
      <motion.g
        style={{ transformOrigin:"100px 102px" }}
        animate={reduced ? undefined : { rotate:[0,2.8,0.4,-2.2,0,1.6,0] }}
        transition={{ duration:7.8, repeat:Infinity, ease:"easeInOut" }}
      >
        <rect x="82" y="98" width="36" height="16" rx="7" fill="url(#rg-blue)"/>
        <rect x="30" y="36" width="18" height="34" rx="9" fill="url(#rg-blue)"/>
        <rect x="152" y="36" width="18" height="34" rx="9" fill="url(#rg-blue)"/>
        <rect x="44" y="20" width="112" height="82" rx="22" fill="url(#rg-head)" stroke="#dde8f5" strokeWidth="0.8"/>
        <ellipse cx="76" cy="38" rx="22" ry="14" fill="white" opacity="0.42"/>
        <rect x="57" y="30" width="86" height="62" rx="13" fill="url(#rg-screen)"/>
        {/* Open eyes */}
        <motion.g animate={{ opacity: blinking ? 0 : 1 }} transition={{ duration:0.07 }}>
          <path d="M68 59 Q79 44 90 59" stroke="#00e5ff" strokeWidth="3.8" fill="none" strokeLinecap="round"/>
          <path d="M110 59 Q121 44 132 59" stroke="#00e5ff" strokeWidth="3.8" fill="none" strokeLinecap="round"/>
          <path d="M74 74 Q100 88 126 74" stroke="#00e5ff" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </motion.g>
        {/* Closed eyes */}
        <motion.g animate={{ opacity: blinking ? 1 : 0 }} transition={{ duration:0.07 }}>
          <rect x="68" y="54" width="22" height="5" rx="2.5" fill="#00e5ff"/>
          <rect x="110" y="54" width="22" height="5" rx="2.5" fill="#00e5ff"/>
        </motion.g>
        <line x1="100" y1="20" x2="100" y2="8" stroke="#1060c0" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="100" cy="5" r="7" fill="url(#rg-ant)"/>
        <circle cx="100" cy="5" r="4" fill="#80eeff" opacity="0.55"/>
      </motion.g>
    </svg>
  );
}

/* ─── Main Export ─────────────────────────────────────────────────────────── */
export default function RobotMascot({ isOpen, onClick }: Props) {
  const shouldReduce = useReducedMotion();
  const [blinking, setBlinking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hovered, setHovered] = useState(false);
  const blinkRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleBlink = useCallback(() => {
    blinkRef.current = setTimeout(() => {
      setBlinking(true);
      setTimeout(() => {
        setBlinking(false);
        if (randDouble()) {
          setTimeout(() => {
            setBlinking(true);
            setTimeout(() => { setBlinking(false); scheduleBlink(); }, 130);
          }, 130);
        } else { scheduleBlink(); }
      }, 145);
    }, randBlink());
  }, []);

  const scheduleTooltip = useCallback((delay = 8000) => {
    tooltipRef.current = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
        scheduleTooltip(16000 + Math.random() * 8000);
      }, 3200);
    }, delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    scheduleBlink();
    scheduleTooltip();
    return () => {
      if (blinkRef.current) clearTimeout(blinkRef.current);
      if (tooltipRef.current) clearTimeout(tooltipRef.current);
    };
  }, [scheduleBlink, scheduleTooltip]);

  useEffect(() => { if (isOpen) setShowTooltip(false); }, [isOpen]);

  const glow = hovered
    ? "drop-shadow(0 0 24px rgba(0,210,255,0.95)) drop-shadow(0 4px 22px rgba(0,100,255,0.5))"
    : "drop-shadow(0 0 14px rgba(0,185,255,0.72)) drop-shadow(0 3px 14px rgba(0,60,200,0.38))";

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="mascot-root"
          initial={{ opacity:0, scale:0.7, y:30 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:0.7, y:30 }}
          transition={{ type:"spring", stiffness:260, damping:22 }}
          style={{ position:"fixed", bottom:"12px", right:"12px", zIndex:50,
            display:"flex", flexDirection:"column", alignItems:"center", pointerEvents:"auto" }}
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.div key="tooltip"
                initial={{ opacity:0, y:10, scale:0.85 }}
                animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, y:10, scale:0.85 }}
                transition={{ duration:0.22 }}
                style={{ background:"linear-gradient(135deg,#0c1d45,#1b3568)", color:"#fff",
                  fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.04em",
                  padding:"7px 16px", borderRadius:"22px", marginBottom:"10px",
                  whiteSpace:"nowrap", pointerEvents:"none", userSelect:"none",
                  boxShadow:"0 6px 28px rgba(0,0,0,.4), 0 0 0 1px rgba(0,200,255,.3)" }}
              >
                💬 Ask AIM Assistant
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="Open AIM College Assistant"
            style={{ background:"transparent", border:"none", padding:0, cursor:"pointer",
              outline:"none", WebkitTapHighlightColor:"transparent", touchAction:"manipulation",
              width:SIZE, display:"block", filter:glow, transition:"filter 0.35s ease" }}
          >
            <motion.div whileTap={{ scale:0.93 }}
              transition={{ type:"spring", stiffness:400, damping:25 }}>
              <RobotSVG blinking={blinking} reduced={!!shouldReduce} />
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Props { isOpen: boolean; onClick: () => void; }

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function randBlink() { return 2800 + Math.random() * 3000; }
function randDouble() { return Math.random() < 0.28; }

/* ── SVG Robot HEAD ONLY ─────────────────────────────────────────────────── */
function RobotHeadSVG({ blinking, reduced }: { blinking: boolean; reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 120 130"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      <defs>
        {/* Pearl-white ceramic shell gradient */}
        <radialGradient id="rh-shell" cx="35%" cy="22%" r="75%">
          <stop offset="0%"   stopColor="#ffffff"/>
          <stop offset="55%"  stopColor="#eef4fd"/>
          <stop offset="100%" stopColor="#bfceea"/>
        </radialGradient>

        {/* Ear nub gradient */}
        <linearGradient id="rh-ear" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stopColor="#f4f8ff"/>
          <stop offset="100%" stopColor="#c0cfea"/>
        </linearGradient>

        {/* Dark navy face display */}
        <radialGradient id="rh-screen" cx="30%" cy="25%" r="72%">
          <stop offset="0%"   stopColor="#0e2540"/>
          <stop offset="100%" stopColor="#040e1c"/>
        </radialGradient>

        {/* Cyan eye iris glow */}
        <radialGradient id="rh-iris" cx="38%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#7ff4ff"/>
          <stop offset="55%"  stopColor="#00d4f5"/>
          <stop offset="100%" stopColor="#0096c7"/>
        </radialGradient>

        {/* Eye pupil depth */}
        <radialGradient id="rh-pupil" cx="35%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#001a2e"/>
          <stop offset="100%" stopColor="#000d18"/>
        </radialGradient>

        {/* Antenna shaft */}
        <linearGradient id="rh-ant" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#38c8f0"/>
          <stop offset="100%" stopColor="#0087b8"/>
        </linearGradient>

        {/* Shell gloss specular */}
        <radialGradient id="rh-spec" cx="32%" cy="18%" r="52%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.68)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>

        {/* Screen inner gloss */}
        <radialGradient id="rh-screenSpec" cx="25%" cy="20%" r="55%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.08)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>

        {/* Glow filters */}
        <filter id="rh-eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="rh-antGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="rh-screenGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── HEAD GROUP — tilt pivot at neck base (60, 108) ── */}
      <motion.g
        style={{ transformOrigin: "60px 108px" }}
        animate={reduced ? undefined : {
          rotate: [0, 2.5, 0.3, -2.0, 0, 1.4, -0.5, 0],
        }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* ── EAR NUBS (left & right side decorations) ── */}
        <ellipse cx="16" cy="72" rx="8" ry="13" fill="url(#rh-ear)"
          stroke="#cdd9ee" strokeWidth="0.7" transform="rotate(-10 16 72)"/>
        <ellipse cx="104" cy="72" rx="8" ry="13" fill="url(#rh-ear)"
          stroke="#cdd9ee" strokeWidth="0.7" transform="rotate(10 104 72)"/>
        {/* Ear accent rings */}
        <ellipse cx="16" cy="72" rx="4" ry="7" fill="none"
          stroke="#00c4ef" strokeWidth="0.8" opacity="0.55"
          transform="rotate(-10 16 72)"/>
        <ellipse cx="104" cy="72" rx="4" ry="7" fill="none"
          stroke="#00c4ef" strokeWidth="0.8" opacity="0.55"
          transform="rotate(10 104 72)"/>

        {/* ── MAIN HEAD SHELL (rounded rectangle) ── */}
        <rect x="20" y="28" width="80" height="82" rx="26"
          fill="url(#rh-shell)" stroke="#dde8f5" strokeWidth="0.9"/>
        {/* Shell specular gloss */}
        <rect x="20" y="28" width="80" height="82" rx="26" fill="url(#rh-spec)"/>
        {/* Shell bottom ridge */}
        <rect x="28" y="100" width="64" height="10" rx="5"
          fill="#d8e5f5" opacity="0.6"/>

        {/* ── NECK CONNECTOR ── */}
        <rect x="45" y="108" width="30" height="14" rx="7"
          fill="#c4d4ea" stroke="#b8cbde" strokeWidth="0.7"/>
        <rect x="50" y="111" width="20" height="4" rx="2" fill="#a8bdd8" opacity="0.6"/>

        {/* ── DARK FACE DISPLAY SCREEN ── */}
        <rect x="28" y="38" width="64" height="60" rx="16"
          fill="url(#rh-screen)" filter="url(#rh-screenGlow)"/>
        {/* Screen inner gloss reflection */}
        <rect x="28" y="38" width="64" height="60" rx="16" fill="url(#rh-screenSpec)"/>
        {/* Screen bezel ring */}
        <rect x="28" y="38" width="64" height="60" rx="16"
          fill="none" stroke="#00c4ef" strokeWidth="0.8" opacity="0.35"/>

        {/* ── EYES GROUP ── */}
        <motion.g
          animate={{ opacity: blinking ? 0 : 1 }}
          transition={{ duration: 0.065 }}
        >
          {/* Left eye — iris */}
          <circle cx="46" cy="64" r="11" fill="url(#rh-iris)"
            filter="url(#rh-eyeGlow)"/>
          {/* Left eye — pupil */}
          <circle cx="46" cy="64" r="6.5" fill="url(#rh-pupil)"/>
          {/* Left eye — inner glow ring */}
          <circle cx="46" cy="64" r="9" fill="none"
            stroke="#00e5ff" strokeWidth="1.1" opacity="0.7"/>
          {/* Left eye — specular dot */}
          <circle cx="42.5" cy="60.5" r="2.2" fill="white" opacity="0.55"/>

          {/* Right eye — iris */}
          <circle cx="74" cy="64" r="11" fill="url(#rh-iris)"
            filter="url(#rh-eyeGlow)"/>
          {/* Right eye — pupil */}
          <circle cx="74" cy="64" r="6.5" fill="url(#rh-pupil)"/>
          {/* Right eye — inner glow ring */}
          <circle cx="74" cy="64" r="9" fill="none"
            stroke="#00e5ff" strokeWidth="1.1" opacity="0.7"/>
          {/* Right eye — specular dot */}
          <circle cx="70.5" cy="60.5" r="2.2" fill="white" opacity="0.55"/>

          {/* ── SMILE ── */}
          <path d="M43 83 Q60 93 77 83"
            stroke="#00e5ff" strokeWidth="2.2" fill="none"
            strokeLinecap="round" opacity="0.85"
            filter="url(#rh-eyeGlow)"/>
        </motion.g>

        {/* Closed eyes (blink) */}
        <motion.g
          animate={{ opacity: blinking ? 1 : 0 }}
          transition={{ duration: 0.065 }}
        >
          <rect x="36" y="61" width="20" height="5" rx="2.5" fill="#00e5ff" opacity="0.9"/>
          <rect x="64" y="61" width="20" height="5" rx="2.5" fill="#00e5ff" opacity="0.9"/>
          {/* Smile kept visible while blinking */}
          <path d="M43 83 Q60 93 77 83"
            stroke="#00e5ff" strokeWidth="2.2" fill="none"
            strokeLinecap="round" opacity="0.75"/>
        </motion.g>

        {/* ── ANTENNA SHAFT ── */}
        <line x1="60" y1="28" x2="60" y2="13"
          stroke="url(#rh-ant)" strokeWidth="2.8" strokeLinecap="round"/>
        {/* Antenna base ring */}
        <ellipse cx="60" cy="28" rx="5" ry="3" fill="#c8daf0" stroke="#aabdd8" strokeWidth="0.7"/>

        {/* ── ANTENNA TIP (glowing cyan orb) ── */}
        <motion.g
          filter="url(#rh-antGlow)"
          animate={reduced ? undefined : {
            opacity: [0.85, 1, 0.85, 0.92, 0.85],
            scale: [1, 1.18, 1, 1.1, 1],
          }}
          style={{ transformOrigin: "60px 10px" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="60" cy="10" r="6.5" fill="url(#rh-ant)" opacity="0.9"/>
          <circle cx="60" cy="10" r="4.5" fill="#80eeff" opacity="0.6"/>
          <circle cx="58.2" cy="8.2" r="1.5" fill="white" opacity="0.7"/>
        </motion.g>

      </motion.g>
    </svg>
  );
}

/* ── Inner mascot — only rendered after client hydration ─────────────────── */
function MascotInner({ isOpen, onClick }: Props) {
  /*
   * useReducedMotion() calls window.matchMedia internally.
   * This is safe here because MascotInner is only ever mounted
   * inside a useEffect-gated `mounted` check (see RobotMascot below),
   * so it NEVER runs on the server.
   */
  const shouldReduce = useReducedMotion();
  const [blinking, setBlinking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const blinkRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * Mobile bottom offset — safe here because MascotInner is client-only.
   * On viewports ≤768px the mascot rises ~70px to avoid overlapping footer
   * text ("Managed by: ..."). env(safe-area-inset-bottom) handles iOS home bar.
   */
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const bottomOffset = isMobile
    ? "calc(86px + env(safe-area-inset-bottom, 0px))"
    : "16px";

  /*
   * Scroll-hide on mobile — hides mascot immediately when the user starts
   * scrolling; fades back in 1.5 s after the last scroll event.
   * Prevents the mascot from floating over form fields and footer content.
   * Desktop is unaffected (listener not attached when !isMobile).
   */
  const [scrollHidden, setScrollHidden] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!isMobile) {
      // Ensure mascot is visible if user resizes from mobile → desktop
      setScrollHidden(false);
      return;
    }
    const onScroll = () => {
      setScrollHidden(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setScrollHidden(false), 1500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [isMobile]);

  /* Blink scheduler */
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

  /* Tooltip scheduler — suppressed on mobile to avoid covering form fields */
  const scheduleTooltip = useCallback((delay = 7000) => {
    tooltipRef.current = setTimeout(() => {
      // Only show tooltip on desktop (>768 px); skip entirely on mobile.
      if (!isOpen && window.innerWidth > 768) setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
        scheduleTooltip(15000 + Math.random() * 8000);
      }, 3000);
    }, delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    scheduleBlink();
    scheduleTooltip();
    return () => {
      if (blinkRef.current)  clearTimeout(blinkRef.current);
      if (tooltipRef.current) clearTimeout(tooltipRef.current);
    };
  }, [scheduleBlink, scheduleTooltip]);

  useEffect(() => { if (isOpen) setShowTooltip(false); }, [isOpen]);

  useEffect(() => {
    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (!isMobile()) return;
      setMobileVisible(false);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setMobileVisible(true), 1500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const form = document.querySelector("form");
    if (!form) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setFormVisible(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.2 }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  /* Cyan glow — brighter on hover; slightly reduced intensity */
  const glowFilter = hovered
    ? "drop-shadow(0 0 14px rgba(0,210,255,0.80)) drop-shadow(0 0 28px rgba(0,150,255,0.45)) drop-shadow(0 3px 10px rgba(0,0,0,0.25))"
    : "drop-shadow(0 0 8px rgba(0,200,255,0.55)) drop-shadow(0 0 18px rgba(0,120,255,0.28)) drop-shadow(0 2px 8px rgba(0,0,0,0.18))";

  return (
    <AnimatePresence>
      {!isOpen && !(typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches && (!mobileVisible || formVisible)) && (
        <motion.div
          key="mascot-root"
          initial={{ opacity: 0, scale: 0.65, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.65, y: 30 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          style={{
            position: "fixed",
            bottom: bottomOffset,
            right: "16px",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            /* Fade out while scrolling on mobile; desktop always visible */
            opacity: isMobile && scrollHidden ? 0 : 1,
            pointerEvents: isMobile && scrollHidden ? "none" : "auto",
            transition: "opacity 0.25s ease",
          }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, y: 8, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "linear-gradient(135deg,#0c1d45,#1a3568)",
                  color: "#fff",
                  fontSize: "0.67rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  marginBottom: "8px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  userSelect: "none",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.38), 0 0 0 1px rgba(0,200,255,0.28)",
                }}
              >
                💬 Ask AIM Assistant
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating animation wrapper */}
          <motion.div
            animate={shouldReduce ? undefined : {
              y: [0, -6, -1, -8, 0, -4, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Click button */}
            <button
              id="aim-mascot-button"
              onClick={onClick}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              aria-label="Open AIM College Assistant"
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
                /* Head size ~17.5% smaller than original; min 66px keeps tap target ≥48px */
                width: "clamp(66px, 11.5vw, 91px)",
                display: "block",
                filter: glowFilter,
                transition: "filter 0.3s ease",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
              >
                <RobotHeadSVG blinking={blinking} reduced={!!shouldReduce} />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main Export ─────────────────────────────────────────────────────────── */
/*
 * HYDRATION FIX:
 * `useReducedMotion()` (Framer Motion v13) calls `initPrefersReducedMotion()`
 * which accesses `window.matchMedia` — a browser-only API.
 * On the server `prefersReducedMotion.current` is `null`.
 * On the client it initializes to `true` | `false`.
 * This creates a server/client mismatch in the initial useState value,
 * which React 19 reports as a hydration error on the nearest DOM ancestor
 * (the <body> element in layout.tsx, line 66).
 *
 * Solution: render nothing on the server; mount MascotInner only after
 * the client has fully hydrated (useEffect fires after hydration).
 * This is the canonical SSR-safe pattern for browser-API-dependent components.
 */
export default function RobotMascot({ isOpen, onClick }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing on the server — prevents any SSR/client mismatch.
  if (!mounted) return null;

  return <MascotInner isOpen={isOpen} onClick={onClick} />;
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

/** Random blink gap: 2.5 – 6 s */
function randBlinkDelay() {
  return 2500 + Math.random() * 3500;
}

// ─── Eye positions (% relative to the robot image square) ────────────────────
// Transparent PNG analysis:
//   Face visor (dark screen): top 16–37 %, left 27–73 %
//   Cyan arc-eyes (upper visor): top ~19–28 %
//   Single blink bar covering both: top 19 %, left 28 %, w 42 %, h 9 %
const EYE = { top: "20%", left: "28%", width: "42%", height: "9%", bg: "#010f1e" };
// ─────────────────────────────────────────────────────────────────────────────

export default function RobotMascot({ isOpen, onClick }: Props) {
  const shouldReduce = useReducedMotion();

  const [blinking,    setBlinking]    = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hovered,     setHovered]     = useState(false);

  const blinkRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Eye-blink scheduler ──────────────────────────────────────────────────
  const scheduleBlink = () => {
    blinkRef.current = setTimeout(() => {
      setBlinking(true);
      setTimeout(() => { setBlinking(false); scheduleBlink(); }, 155);
    }, randBlinkDelay());
  };

  // ── Tooltip scheduler (first at 7 s, then every 14–22 s) ─────────────────
  const scheduleTooltip = (delay = 7000) => {
    tooltipRef.current = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
        scheduleTooltip(14000 + Math.random() * 8000);
      }, 3200);
    }, delay);
  };

  useEffect(() => {
    scheduleBlink();
    scheduleTooltip();
    return () => {
      if (blinkRef.current)   clearTimeout(blinkRef.current);
      if (tooltipRef.current) clearTimeout(tooltipRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (isOpen) setShowTooltip(false); }, [isOpen]);

  // ── drop-shadow glow — follows transparent PNG silhouette exactly ─────────
  const glow = hovered
    ? "drop-shadow(0 0 16px rgba(0,220,255,1.0)) drop-shadow(0 0 36px rgba(0,160,255,0.75)) drop-shadow(0 8px 20px rgba(0,0,0,0.35))"
    : "drop-shadow(0 0  9px rgba(0,200,255,0.80)) drop-shadow(0 0 22px rgba(0,140,255,0.50)) drop-shadow(0 6px 16px rgba(0,0,0,0.25))";

  // ── Framer Motion float (disabled for prefers-reduced-motion) ─────────────
  const floatAnim       = shouldReduce ? {} : { y: [0, -14, 0], rotate: [-2, 2, -2] };
  const floatTransition = { duration: 3.6, repeat: Infinity, ease: "easeInOut" as const };

  // Robot display size — large enough to read as a character, not an icon
  const SIZE = "clamp(100px, 14vw, 130px)";

  return (
    <>
      <style>{`
        @keyframes rm-halo {
          0%,100%{ opacity:.45; transform:scaleX(1)    scaleY(1);   }
          50%    { opacity:.80; transform:scaleX(1.50) scaleY(1.35);}
        }
        @keyframes rm-ring {
          0%  { transform:scale(.75); opacity:.65; }
          100%{ transform:scale(2.50); opacity:0;  }
        }
        @media(prefers-reduced-motion:reduce){
          .rm-halo,.rm-ring{ animation:none!important; }
        }
      `}</style>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="mascot-root"
            initial={{ opacity: 0, scale: 0.5, y: 48 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{   opacity: 0, scale: 0.5, y: 48  }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{
              position:      "fixed",
              bottom:        "16px",
              right:         "16px",
              zIndex:        50,
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              pointerEvents: "auto",
            }}
          >
            {/* ── Speech-bubble tooltip ─────────────────────────────────── */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  key="tooltip"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0,  scale: 1   }}
                  exit={{   opacity: 0, y: 10, scale: 0.8  }}
                  transition={{ duration: 0.22 }}
                  style={{
                    position:      "relative",
                    background:    "linear-gradient(135deg,#0c1d45,#1b3568)",
                    color:         "#fff",
                    fontSize:      "0.68rem",
                    fontWeight:    700,
                    letterSpacing: "0.04em",
                    padding:       "7px 16px",
                    borderRadius:  "22px",
                    marginBottom:  "10px",
                    whiteSpace:    "nowrap",
                    boxShadow:     "0 6px 28px rgba(0,0,0,.42), 0 0 0 1px rgba(0,200,255,.30)",
                    pointerEvents: "none",
                    userSelect:    "none",
                  }}
                >
                  💬 Ask AIM Assistant
                  {/* Downward tail */}
                  <span
                    aria-hidden="true"
                    style={{
                      position:    "absolute",
                      bottom:      "-6px",
                      left:        "50%",
                      transform:   "translateX(-50%)",
                      width:       0,
                      height:      0,
                      borderLeft:  "7px solid transparent",
                      borderRight: "7px solid transparent",
                      borderTop:   "7px solid #1b3568",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Free-floating robot button (no container background) ────── */}
            <button
              onClick={onClick}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              aria-label="Open AIM College Assistant"
              aria-expanded={false}
              style={{
                background:              "transparent",
                border:                  "none",
                padding:                 0,
                margin:                  0,
                cursor:                  "pointer",
                display:                 "flex",
                flexDirection:           "column",
                alignItems:              "center",
                outline:                 "none",
                WebkitTapHighlightColor: "transparent",
                touchAction:             "manipulation",
              }}
            >
              {/* Float + rotate (outer) */}
              <motion.div
                animate={floatAnim}
                transition={floatTransition}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                {/* Tap-scale (inner) */}
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  {/* Robot image wrapper
                      drop-shadow follows the transparent silhouette exactly,
                      producing a clean neon halo around the character only.   */}
                  <div
                    style={{
                      position:   "relative",
                      width:      SIZE,
                      height:     SIZE,
                      filter:     glow,
                      transition: "filter 0.35s ease",
                    }}
                  >
                    <Image
                      src="/images/aim-chatbot-robot.png"
                      alt="AIM College Assistant robot mascot"
                      fill
                      sizes="(max-width:480px) 100px, 130px"
                      style={{ objectFit: "contain", pointerEvents: "none" }}
                      priority
                    />

                    {/* ── Eye-blink overlay ──────────────────────────────────
                        Dark bar matching face visor colour (#010f1e).
                        Covers both cyan arc-eyes during the 155 ms blink.
                        Coordinates from alpha-channel-verified image analysis:
                          top 20 %, left 28 %, width 42 %, height 9 %         */}
                    {blinking && (
                      <div
                        aria-hidden="true"
                        style={{
                          position:      "absolute",
                          top:           EYE.top,
                          left:          EYE.left,
                          width:         EYE.width,
                          height:        EYE.height,
                          background:    EYE.bg,
                          borderRadius:  "3px",
                          pointerEvents: "none",
                          zIndex:        3,
                        }}
                      />
                    )}
                  </div>

                  {/* ── Ambient ground-glow / contact shadow ───────────────── */}
                  <div
                    className="rm-halo"
                    style={{
                      width:         "70px",
                      height:        "13px",
                      background:    "radial-gradient(ellipse at center, rgba(0,200,255,0.50) 0%, transparent 72%)",
                      borderRadius:  "50%",
                      animation:     "rm-halo 2.8s ease-in-out infinite",
                      marginTop:     "4px",
                      flexShrink:    0,
                      pointerEvents: "none",
                    }}
                  />
                </motion.div>
              </motion.div>
            </button>

            {/* ── Pulse rings centred on contact shadow ─────────────────── */}
            <div
              style={{
                position:      "absolute",
                bottom:        "0px",
                left:          "50%",
                transform:     "translateX(-50%)",
                width:         "64px",
                height:        "64px",
                pointerEvents: "none",
              }}
            >
              {[0, 1.2].map((delay, i) => (
                <div
                  key={i}
                  className="rm-ring"
                  style={{
                    position:     "absolute",
                    inset:        0,
                    borderRadius: "50%",
                    border:       "2px solid rgba(0,195,255,0.60)",
                    animation:    `rm-ring 2.4s ${delay}s ease-out infinite`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

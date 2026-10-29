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
// Image analysis:
//   Face visor (dark screen): top 16-37%, left 27-73%
//   Cyan arc-eyes live in upper portion of visor: top 19-28%
//   Combined eye strip:        top 19%, left 28%, width 42%, height 9%
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

  // ── Tooltip scheduler ────────────────────────────────────────────────────
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

  // ── Float animation (disabled if user prefers reduced motion) ───────────
  const floatAnim       = shouldReduce ? {} : { y: [0, -13, 0], rotate: [-1.8, 1.8, -1.8] };
  const floatTransition = { duration: 3.6, repeat: Infinity, ease: "easeInOut" as const };

  // ── Stage size: robot displayed at this size ─────────────────────────────
  // 130 px desktop, fluid down to 100 px on narrow mobile
  const ROBOT_SIZE = "clamp(100px, 14vw, 130px)";

  return (
    <>
      <style>{`
        @keyframes rm-halo {
          0%,100%{ opacity:.50; transform:scaleX(1)   scaleY(1);   }
          50%    { opacity:.85; transform:scaleX(1.45) scaleY(1.30);}
        }
        @keyframes rm-ring {
          0%  { transform:scale(.80); opacity:.70; }
          100%{ transform:scale(2.40); opacity:0;  }
        }
        @keyframes rm-badge-pulse {
          0%,100%{ box-shadow: 0 0 0 0 rgba(0,200,255,.50); }
          50%    { box-shadow: 0 0 0 6px rgba(0,200,255,0);  }
        }
        @media(prefers-reduced-motion:reduce){
          .rm-halo,.rm-ring,.rm-badge{ animation:none!important; }
        }
      `}</style>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="mascot-root"
            initial={{ opacity: 0, scale: 0.55, y: 40 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.55, y: 40  }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{
              position:       "fixed",
              bottom:         "16px",
              right:          "16px",
              zIndex:         50,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              pointerEvents:  "auto",
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
                    boxShadow:     "0 6px 28px rgba(0,0,0,.40), 0 0 0 1px rgba(0,200,255,.30)",
                    pointerEvents: "none",
                    userSelect:    "none",
                  }}
                >
                  💬 Ask AIM Assistant
                  <span
                    aria-hidden="true"
                    style={{
                      position:    "absolute",
                      bottom:      "-6px",
                      left:        "50%",
                      transform:   "translateX(-50%)",
                      width:        0,
                      height:       0,
                      borderLeft:  "7px solid transparent",
                      borderRight: "7px solid transparent",
                      borderTop:   "7px solid #1b3568",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Robot button ───────────────────────────────────────────── */}
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
              {/* Framer Motion float + rotate wrapper */}
              <motion.div
                animate={floatAnim}
                transition={floatTransition}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                {/* Tap-scale wrapper */}
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  {/* ── Robot stage: dark oval backdrop + glow ring ───────
                      The robot PNG has a white background so we place it on
                      a dark circular stage that:
                        1. Provides a themed backdrop on BOTH light and dark pages
                        2. Contains the blue neon glow rings naturally
                        3. Creates a "floating platform" 3D feel               */}
                  <div
                    style={{
                      position:     "relative",
                      width:        ROBOT_SIZE,
                      height:       ROBOT_SIZE,
                      borderRadius: "50%",
                      // Deep navy/midnight background — theme-matches AIM branding
                      background:   "radial-gradient(circle at 38% 38%, #0e2252 0%, #060d1f 100%)",
                      // Blue neon glow that follows the circular stage
                      boxShadow:    hovered
                        ? "0 0 0 2px rgba(0,200,255,.75), 0 0 28px 8px rgba(0,200,255,.70), 0 0 60px 18px rgba(0,130,255,.40)"
                        : "0 0 0 2px rgba(0,190,255,.45), 0 0 18px 5px rgba(0,190,255,.50), 0 0 44px 12px rgba(0,120,255,.28)",
                      transition:   "box-shadow 0.35s ease",
                      overflow:     "hidden",  // clip robot to circle boundary
                    }}
                  >
                    {/* Robot image — sized slightly larger than stage so it
                        overflows the circle naturally (head + antenna peeks out).
                        overflow:visible on the parent stage + overflow:hidden
                        gives the right crop.
                        We use a wrapper with overflow:visible to let the robot
                        visually overflow the circle at top. */}
                    <div
                      style={{
                        position: "absolute",
                        // Robot overflows stage by ~15% at top so head is visible,
                        // and robot is centered in the stage
                        top:      "-14%",
                        left:     "0%",
                        width:    "100%",
                        height:   "114%",
                        overflow: "visible",
                      }}
                    >
                      <Image
                        src="/images/aim-chatbot-robot.png"
                        alt="AIM College Assistant robot mascot"
                        fill
                        sizes={`(max-width:480px) 100px, 130px`}
                        style={{
                          objectFit:     "contain",
                          pointerEvents: "none",
                        }}
                        priority
                      />

                      {/* ── Eye-blink overlay ────────────────────────────
                          Dark bar matching the face visor colour, covers
                          the two cyan arc-eyes when blinking.
                          Coordinates verified against the robot image:
                            top  : 20 % from image top
                            left : 28 %
                            width: 42 %
                            height: 9 %                                  */}
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
                  </div>

                  {/* ── Ambient ground glow / contact shadow ─────────────── */}
                  <div
                    className="rm-halo"
                    style={{
                      width:         "76px",
                      height:        "14px",
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

            {/* ── Radial pulse rings (emanate from stage edge) ─────────── */}
            <div
              style={{
                position:      "absolute",
                // Aligned with the circular stage centre
                bottom:        "20px",
                left:          "50%",
                transform:     "translateX(-50%)",
                width:         "70px",
                height:        "70px",
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
                    border:       "2px solid rgba(0,195,255,0.65)",
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

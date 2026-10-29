"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface RobotMascotProps {
  isOpen: boolean;
  onClick: () => void;
}

/** Returns a random blink interval between 2.5 s and 6 s */
function randomBlinkDelay() {
  return 2500 + Math.random() * 3500;
}

export default function RobotMascot({ isOpen, onClick }: RobotMascotProps) {
  const [blinking, setBlinking] = useState(false);
  const blinkTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Schedule the next blink
  const scheduleBlink = () => {
    blinkTimeout.current = setTimeout(() => {
      setBlinking(true);
      // Eye-close lasts 180 ms, then reopen
      setTimeout(() => {
        setBlinking(false);
        scheduleBlink();
      }, 180);
    }, randomBlinkDelay());
  };

  useEffect(() => {
    scheduleBlink();
    return () => {
      if (blinkTimeout.current) clearTimeout(blinkTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Keyframe animations injected into document head via style tag */}
      <style>{`
        @keyframes robot-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes robot-glow-pulse {
          0%, 100% { box-shadow: 0 0 22px 6px rgba(0,149,255,0.55), 0 0 48px 12px rgba(0,149,255,0.22); }
          50%       { box-shadow: 0 0 36px 12px rgba(0,200,255,0.75), 0 0 72px 24px rgba(0,200,255,0.30); }
        }
        @keyframes robot-hover-scale {
          to { transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .robot-float       { animation: none !important; }
          .robot-glow-pulse  { animation: none !important; }
        }
      `}</style>

      <motion.button
        onClick={onClick}
        aria-label="Open AIM College Assistant"
        aria-expanded={isOpen}
        className="robot-glow-pulse"
        style={{
          position: "fixed",
          bottom: "1.25rem",
          right: "1.25rem",
          zIndex: 50,
          width: "76px",
          height: "76px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 35%, #1a3a6e 0%, #0a1628 100%)",
          border: "2px solid rgba(0,180,255,0.6)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          outline: "none",
          animation: "robot-glow-pulse 2.4s ease-in-out infinite",
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
          userSelect: "none",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Floating robot wrapper */}
        <div
          className="robot-float"
          style={{
            animation: "robot-float 3.2s ease-in-out infinite",
            width: "60px",
            height: "60px",
            position: "relative",
          }}
        >
          <Image
            src="/images/aim-chatbot-robot.png"
            alt="AIM College Assistant robot"
            fill
            sizes="60px"
            style={{ objectFit: "contain", pointerEvents: "none" }}
            priority
          />

          {/* Eye-blink overlay — two semi-transparent dark rectangles that cover
              the glowing arc-eyes on the robot image when blinking.
              Positioned carefully over the face area of the robot. */}
          {blinking && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                // These coordinates target the face/eye region of the robot image.
                // Adjust top/left/width/height if needed after visual review.
                top: "22%",
                left: "22%",
                width: "56%",
                height: "18%",
                display: "flex",
                gap: "10%",
                pointerEvents: "none",
              }}
            >
              {/* Left eye blink bar */}
              <div
                style={{
                  flex: 1,
                  background: "#010d1e",
                  borderRadius: "4px",
                  opacity: 0.92,
                }}
              />
              {/* Right eye blink bar */}
              <div
                style={{
                  flex: 1,
                  background: "#010d1e",
                  borderRadius: "4px",
                  opacity: 0.92,
                }}
              />
            </div>
          )}
        </div>

        {/* Notification pulse ring — shows when chat is closed */}
        {!isOpen && (
          <motion.span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              border: "2px solid rgba(0,200,255,0.7)",
              pointerEvents: "none",
            }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </>
  );
}

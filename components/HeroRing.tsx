"use client";

import { useEffect, useRef } from "react";

interface HeroRingProps {
  readinessValue: number;
  label: string;
}

export default function HeroRing({ readinessValue, label }: HeroRingProps) {
  const arcRef = useRef<SVGCircleElement>(null);

  // r=52, circumference = 2π×52 ≈ 326.7
  const circumference = 2 * Math.PI * 52;
  const targetOffset = circumference * (1 - readinessValue / 100);

  useEffect(() => {
    const arc = arcRef.current;
    if (!arc) return;

    const timer = setTimeout(() => {
      arc.classList.add("animate");
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-ring-wrapper" role="img" aria-label={`${label} readiness: ${readinessValue}%`}>
      <svg
        className="readiness-ring"
        viewBox="0 0 120 120"
        width="160"
        height="160"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="rgba(168, 197, 218, 0.12)"
          strokeWidth="4"
        />
        {/* Arc */}
        <circle
          ref={arcRef}
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="#7B2FBE"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          transform="rotate(-90 60 60)"
          className="ring-arc"
          style={{ "--target-offset": `${targetOffset}` } as React.CSSProperties}
        />
        {/* Center text */}
        <text
          x="60"
          y="55"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="18"
          fill="#F2F4F5"
        >
          {readinessValue}%
        </text>
        <text
          x="60"
          y="70"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill="#A8C5DA"
          letterSpacing="2"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

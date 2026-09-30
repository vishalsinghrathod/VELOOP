import React from 'react';
import styles from './LevelBadgeGraphic.module.css';

/**
 * LevelBadgeGraphic: A handcrafted, high-end 3D metallic vector emblem for user levels.
 * Supports tiers: bronze (1), silver (2), cobalt (3), amethyst (4), gold (5), emerald (6), ruby (7), diamond (8).
 */
export default function LevelBadgeGraphic({ 
  level = 5, 
  size = 110, 
  animated = true, 
  showTierBanner = true,
  glow = true,
  className = ''
}) {
  const levelNum = Number(level) || 1;
  const levelStr = String(levelNum).padStart(2, '0');
  const uid = React.useId().replace(/:/g, '');

  // Determine tier metadata
  const getTierMeta = (lvl) => {
    switch (lvl) {
      case 1:
        return {
          name: 'NOVICE',
          ribbonColor: '#92400e',
          gradPrimary: ['#ca8a04', '#78350f', '#451a03'],
          rimColor: '#d97706',
          glowColor: 'rgba(180, 83, 9, 0.4)',
          textColor: '#fef08a'
        };
      case 2:
        return {
          name: 'EXPLORER',
          ribbonColor: '#475569',
          gradPrimary: ['#cbd5e1', '#64748b', '#334155'],
          rimColor: '#94a3b8',
          glowColor: 'rgba(148, 163, 184, 0.4)',
          textColor: '#f8fafc'
        };
      case 3:
        return {
          name: 'ACHIEVER',
          ribbonColor: '#1d4ed8',
          gradPrimary: ['#38bdf8', '#2563eb', '#1e3a8a'],
          rimColor: '#60a5fa',
          glowColor: 'rgba(56, 189, 248, 0.45)',
          textColor: '#e0f2fe'
        };
      case 4:
        return {
          name: 'CHAMPION',
          ribbonColor: '#7e22ce',
          gradPrimary: ['#c084fc', '#9333ea', '#581c87'],
          rimColor: '#d8b4fe',
          glowColor: 'rgba(168, 85, 247, 0.45)',
          textColor: '#f3e8ff'
        };
      case 5:
        return {
          name: 'ELITE',
          ribbonColor: '#b45309',
          gradPrimary: ['#fef08a', '#f59e0b', '#78350f'],
          rimColor: '#fde047',
          glowColor: 'rgba(245, 158, 11, 0.55)',
          textColor: '#ffffff'
        };
      case 6:
        return {
          name: 'MASTER',
          ribbonColor: '#047857',
          gradPrimary: ['#6ee7b7', '#10b981', '#064e3b'],
          rimColor: '#34d399',
          glowColor: 'rgba(16, 185, 129, 0.55)',
          textColor: '#ecfdf5'
        };
      case 7:
        return {
          name: 'VOYAGER',
          ribbonColor: '#b91c1c',
          gradPrimary: ['#fca5a5', '#dc2626', '#7f1d1d'],
          rimColor: '#f87171',
          glowColor: 'rgba(239, 68, 68, 0.55)',
          textColor: '#fef2f2'
        };
      case 8:
      default:
        return {
          name: 'LEGEND',
          ribbonColor: '#4338ca',
          gradPrimary: ['#e0e7ff', '#818cf8', '#312e81'],
          rimColor: '#a5b4fc',
          glowColor: 'rgba(129, 140, 248, 0.6)',
          textColor: '#ffffff'
        };
    }
  };

  const meta = getTierMeta(levelNum);
  const width = size;
  const height = Math.round(size * 1.12);

  return (
    <div 
      className={`${styles.badgeRoot} ${animated ? styles.animated : ''} ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {glow && (
        <div 
          className={styles.ambientGlow}
          style={{ background: `radial-gradient(circle, ${meta.glowColor} 0%, rgba(0,0,0,0) 70%)` }}
        />
      )}

      {/* Rotating ray sparkles for high tiers */}
      {animated && levelNum >= 4 && (
        <div className={styles.rotatingRays}>
          <div className={styles.ray} style={{ borderColor: meta.rimColor }} />
        </div>
      )}

      <svg 
        viewBox="0 0 100 112" 
        className={styles.svgGraphic}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Edge Outer Gradient */}
          <linearGradient id={`${uid}-edge`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={meta.gradPrimary[0]} />
            <stop offset="45%" stopColor={meta.gradPrimary[1]} />
            <stop offset="100%" stopColor={meta.gradPrimary[2]} />
          </linearGradient>

          {/* Core Dark Plate Gradient */}
          <radialGradient id={`${uid}-core`} cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#1e2338" />
            <stop offset="60%" stopColor="#131627" />
            <stop offset="100%" stopColor="#0a0c16" />
          </radialGradient>

          {/* Shimmer Light Reflection */}
          <linearGradient id={`${uid}-shimmer`} x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Ribbon Gradient */}
          <linearGradient id={`${uid}-ribbon`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={meta.rimColor} />
            <stop offset="50%" stopColor={meta.gradPrimary[1]} />
            <stop offset="100%" stopColor={meta.ribbonColor} />
          </linearGradient>

          {/* Drop Shadows and Filters */}
          <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.65" />
          </filter>

          <filter id={`${uid}-innerGlow`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
            <feFlood floodColor={meta.rimColor} floodOpacity="0.4" />
            <feComposite in2="shadowDiff" operator="in" />
            <feComposite in2="SourceGraphic" operator="over" />
          </filter>
        </defs>

        {/* Outer Shadowed Hexagon Base */}
        <path
          d="M 50 3 L 88 23 L 88 68 L 50 88 L 12 68 L 12 23 Z"
          fill={`url(#${uid}-edge)`}
          filter={`url(#${uid}-shadow)`}
          stroke={meta.rimColor}
          strokeWidth="1.5"
        />

        {/* Chamfered Outer Bevel */}
        <path
          d="M 50 7 L 84 25 L 84 65 L 50 84 L 16 65 L 16 25 Z"
          fill={`url(#${uid}-core)`}
          stroke={meta.rimColor}
          strokeWidth="1"
          strokeOpacity="0.6"
        />

        {/* Concentric Inner Geometric Accent */}
        <path
          d="M 50 12 L 80 28 L 80 62 L 50 79 L 20 62 L 20 28 Z"
          fill="none"
          stroke={`url(#${uid}-edge)`}
          strokeWidth="1.2"
          strokeDasharray="2 3"
          opacity="0.75"
        />

        {/* Top Specular Glaze Triangle */}
        <path
          d="M 50 8 L 82 26 L 50 48 L 18 26 Z"
          fill={`url(#${uid}-shimmer)`}
          pointerEvents="none"
        />

        {/* Top Wing / Crown Crest Motif */}
        <g transform="translate(50, 22)">
          {/* Central Star or Diamond */}
          <polygon
            points="0,-6 2,-1 7,-1 3,2 4,7 0,4 -4,7 -3,2 -7,-1 -2,-1"
            fill={meta.rimColor}
            filter={`url(#${uid}-innerGlow)`}
          />
          {/* Subtle Accent Dots */}
          <circle cx="-14" cy="2" r="1.5" fill={meta.rimColor} opacity="0.8" />
          <circle cx="14" cy="2" r="1.5" fill={meta.rimColor} opacity="0.8" />
        </g>

        {/* Level Tag Label */}
        <text
          x="50"
          y="38"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="800"
          letterSpacing="1.8"
          fill={meta.rimColor}
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
        >
          LEVEL
        </text>

        {/* Giant Engraved Level Number */}
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontSize="24"
          fontWeight="900"
          letterSpacing="-0.5"
          fill="#ffffff"
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{
            filter: `drop-shadow(0 2px 5px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 10px ${meta.glowColor})`
          }}
        >
          {levelStr}
        </text>

        {/* Bottom Tier Ribbon Banner */}
        {showTierBanner && (
          <g transform="translate(0, 78)">
            {/* Ribbon Background Wings */}
            <path
              d="M 10 9 L 24 16 L 24 3 Z"
              fill={meta.ribbonColor}
              opacity="0.85"
            />
            <path
              d="M 90 9 L 76 16 L 76 3 Z"
              fill={meta.ribbonColor}
              opacity="0.85"
            />

            {/* Front Ribbon Plaque */}
            <path
              d="M 20 2 L 80 2 L 76 17 L 24 17 Z"
              fill={`url(#${uid}-ribbon)`}
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeOpacity="0.4"
              filter={`url(#${uid}-shadow)`}
            />

            {/* Ribbon Text */}
            <text
              x="50"
              y="13"
              textAnchor="middle"
              fontSize="7"
              fontWeight="900"
              letterSpacing="1.2"
              fill="#ffffff"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.95)' }}
            >
              {meta.name}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

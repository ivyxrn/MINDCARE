import React from 'react';
import mindcareMarkImg from '../assets/mincare_mark.png';
import mindcareLogoFullImg from '../assets/mincare_logo.png';

/**
 * MINDCARE Official Logo Mark - Tree inside a circular outline
 * Directly sourced and extracted from the original mincare_logo.png asset.
 * Preserves the exact original artwork geometry:
 * - Circular outline
 * - Dual-hemisphere brain-shaped tree canopy
 * - Internal branch structures and sulci negative space
 * - Trunk and flared pedestal base
 */
export const MindcareMark = ({
  size = 28,
  className = '',
  alt = 'MINDCARE logo mark',
}) => (
  <img
    src={mindcareMarkImg}
    alt={alt}
    className={`mindcare-mark-img ${className}`}
    style={{
      width: size,
      height: size,
      display: 'block',
      objectFit: 'contain',
      pointerEvents: 'none',
      userSelect: 'none',
    }}
  />
);

/**
 * MindcareLogo - Branded icon badge container
 * Displays the exact original tree-circle artwork inside the standard
 * rounded container matching the application's header and navigation specs.
 */
export const MindcareLogo = ({
  className = '',
  size = 38,
  bgColor = '#F5E8D8',
  ariaLabel = 'MINDCARE logo',
}) => (
  <div
    className={`mindcare-logo-box leaf-logo-box ${className}`}
    style={{
      width: size,
      height: size,
      minWidth: size,
      borderRadius: Math.round(size * 0.28),
      backgroundColor: bgColor,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
    }}
    role="img"
    aria-label={ariaLabel}
  >
    <MindcareMark size={Math.round(size * 0.74)} alt="" />
  </div>
);

/**
 * MindcareFullLogo - Original full logo image including tree mark and MINDCARE wordmark
 */
export const MindcareFullLogo = ({
  width = 'auto',
  height = 40,
  className = '',
  alt = 'MINDCARE',
}) => (
  <img
    src={mindcareLogoFullImg}
    alt={alt}
    className={`mindcare-full-logo-img ${className}`}
    style={{
      width,
      height,
      display: 'block',
      objectFit: 'contain',
    }}
  />
);

// Backward compatibility export so existing imports across all screens work seamlessly
export const LeafLogo = MindcareLogo;

/**
 * ShieldIcon - Privacy guarantee icon
 */
export const ShieldIcon = ({ size = 16, color = '#8DA89E' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ minWidth: size, flexShrink: 0, marginTop: '2px' }}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/**
 * SunIcon - Delicate minimalist sun for card header
 */
export const SunIcon = ({ size = 20, color = '#C2896D' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="2" x2="12" y2="4.5" />
    <line x1="12" y1="19.5" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4.5" y2="12" />
    <line x1="19.5" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
    <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
    <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
    <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
  </svg>
);

/**
 * FlowerBotanical - Prominent botanical line-art flower matching the prototype
 * 8 radiating rounded petals, center core, vertical stem, and elegant curved chalice base leaves
 */
export const FlowerBotanical = ({ width = 74, height = 112, color = '#183D36' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 76 114"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Center Core Circle */}
    <circle cx="38" cy="36" r="7" stroke={color} strokeWidth="2.4" />

    {/* 8 Radiating Rounded Petals */}
    {/* 1. Top (12 o'clock) */}
    <path
      d="M38 29C34.5 22 34.5 12 38 12C41.5 12 41.5 22 38 29Z"
      stroke={color}
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    {/* 2. Top-Right (1:30) */}
    <path
      d="M43 31C49 26 56 21 58.5 23.5C61 26 56 33 50.5 37"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* 3. Right (3 o'clock) */}
    <path
      d="M45 36C52 32.5 62 32.5 62 36C62 39.5 52 39.5 45 36Z"
      stroke={color}
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    {/* 4. Bottom-Right (4:30) */}
    <path
      d="M43 41C49 46 56 51 53.5 53.5C51 56 44 51 39.5 45"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* 5. Bottom (6 o'clock) */}
    <path
      d="M38 43C41.5 50 41.5 60 38 60C34.5 60 34.5 50 38 43Z"
      stroke={color}
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    {/* 6. Bottom-Left (7:30) */}
    <path
      d="M33 41C27 46 20 51 17.5 48.5C15 46 22 39 27.5 37"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* 7. Left (9 o'clock) */}
    <path
      d="M31 36C24 32.5 14 32.5 14 36C14 39.5 24 39.5 31 36Z"
      stroke={color}
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    {/* 8. Top-Left (10:30) */}
    <path
      d="M33 31C27 26 20 21 22.5 18.5C25 16 32 23 36.5 27"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Central Vertical Stem */}
    <path
      d="M38 60V102"
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
    />

    {/* Base Botanical Leaves curving upward from base */}
    {/* Left Leaf */}
    <path
      d="M38 102C26 102 18 92 18 80C26 78 35 88 38 100"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right Leaf */}
    <path
      d="M38 102C50 102 58 92 58 80C50 78 41 88 38 100"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * SimpleHeartOutline - Simple outlined heart matching the text weight
 */
export const SimpleHeartOutline = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ display: 'inline-block', verticalAlign: '-1px' }}
  >
    <path d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.566z" />
  </svg>
);

/**
 * TranslateIcon - Standard 文A translation symbol at top-left of language cards
 */
export const TranslateIcon = ({ size = 20, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 5.5h7M7.5 3v2.5M5 10.5c1.2-1.5 2.2-3 2.5-5M6.5 8c1.3 1.8 2.8 3.2 4 4"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 20.5l3.5-9 3.5 9M14.7 16.8h4.6"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * AaIcon - Typography scaling icon
 */
export const AaIcon = ({ size = 20, color = '#183D36' }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'baseline',
      fontSize: size,
      fontWeight: 700,
      fontFamily: 'var(--font-sans)',
      color: color,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      minWidth: size * 1.2,
    }}
    aria-hidden="true"
  >
    <span>A</span>
    <span style={{ fontSize: '0.78em' }}>a</span>
  </span>
);

/**
 * SpeakerIcon - Voice assistance icon
 */
export const SpeakerIcon = ({ size = 20, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

/**
 * ContrastIcon - Higher contrast concentric icon matching prototype
 */
export const ContrastIcon = ({ size = 20, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
);

export const HomeNavIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
  </svg>
);

export const ActivitiesNavIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9.5 2a4 4 0 0 0-4 4 4 4 0 0 0 .5 2 4 4 0 0 0-2 3.5 4 4 0 0 0 2 3.5 4 4 0 0 0-.5 2 4 4 0 0 0 4 4 4 4 0 0 0 2.5-1M14.5 2a4 4 0 0 1 4 4 4 4 0 0 1-.5 2 4 4 0 0 1 2 3.5 4 4 0 0 1-2 3.5 4 4 0 0 1 .5 2 4 4 0 0 1-4 4 4 4 0 0 1-2.5-1M12 4v16" />
  </svg>
);

export const ProgressNavIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export const BellNavIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const HelpNavIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
  </svg>
);

export const GearNavIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const SignOutNavIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const CloudIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

export const SparkleIcon = ({ size = 15, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
  </svg>
);

export const CheckCircleIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

export const RibbonIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

export const ChevronRightIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const TargetFocusIcon = ({ size = 24, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="12" cy="12" r="5.5" />
    <circle cx="12" cy="12" r="1.5" fill={color} stroke="none" />
  </svg>
);

export const WavesPatternIcon = ({ size = 24, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2.5 7.5C5.5 5.5 8 5.5 11 7.5C14 9.5 16.5 9.5 19.5 7.5C20.5 6.8 21.2 6.5 21.5 6.5" />
    <path d="M2.5 12.5C5.5 10.5 8 10.5 11 12.5C14 14.5 16.5 14.5 19.5 12.5C20.5 11.8 21.2 11.5 21.5 11.5" />
    <path d="M2.5 17.5C5.5 15.5 8 15.5 11 17.5C14 19.5 16.5 19.5 19.5 17.5C20.5 16.8 21.2 16.5 21.5 16.5" />
  </svg>
);

export const RoutineOrderIcon = ({ size = 24, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m3 6 1.8 1.8 3.2-3.2" />
    <path d="M12 6h9" />
    <path d="m3 12 1.8 1.8 3.2-3.2" />
    <path d="M12 12h9" />
    <path d="m3 18 1.8 1.8 3.2-3.2" />
    <path d="M12 18h9" />
  </svg>
);

export const LightbulbIcon = ({ size = 20, color = '#D48D75' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 18h6" />
    <path d="M10 21h4" />
    <path d="M15 14c.8-.8 1.4-1.7 1.7-2.7a5.5 5.5 0 1 0-9.4 0c.3 1 .9 1.9 1.7 2.7.5.5.8 1.2 1 2h4c.2-.8.5-1.5 1-2z" />
  </svg>
);

export const ConcentricTargetIcon = ({ size = 16, color = '#385C50' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill={color} stroke="none" />
  </svg>
);

export const ClockOutlineIcon = ({ size = 22, color = '#385C50' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const ArrowLeftIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const CheckmarkLargeIcon = ({ size = 26, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.2" />
    <polyline points="7.5 12 10.5 15 16.5 9" />
  </svg>
);

export const PillCapsuleIcon = ({ size = 24, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
    <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
  </svg>
);

export const WaterDropIcon = ({ size = 24, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

export const ForkKnifeIcon = ({ size = 24, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 2v20M21 2v4a3 3 0 0 1-3 3M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2M7 2v20M7 2v7" />
  </svg>
);

export const WalkingActivityIcon = ({ size = 24, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="13" cy="4" r="2" />
    <path d="M7 21l3-7 2 3v5M17 21l-3-6-2 1M8 13l3-3 3 2 4-2" />
  </svg>
);

export const FamilyHeartIcon = ({ size = 24, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const NoteReminderIcon = ({ size = 24, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

export const CalendarMedicalIcon = ({ size = 24, color = '#183D36', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2.5" ry="2.5" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="12" y1="13" x2="12" y2="19" strokeWidth="2.2" />
    <line x1="9" y1="16" x2="15" y2="16" strokeWidth="2.2" />
  </svg>
);

export const MedicalAppointmentIcon = CalendarMedicalIcon;

export const MoreDotsIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
    <circle cx="5" cy="12" r="2" />
  </svg>
);

export const PlusIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const MicrophoneIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

export const PlayOutlineIcon = ({ size = 22, color = '#183D36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const LockIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const LoginDoorIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

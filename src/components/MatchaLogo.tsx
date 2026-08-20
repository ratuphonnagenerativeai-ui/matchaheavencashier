import React from 'react';

interface MatchaLogoProps {
  variant?: 'full-vertical' | 'full-horizontal' | 'icon-only' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean;
  className?: string;
}

export const MatchaLogo: React.FC<MatchaLogoProps> = ({
  variant = 'full-horizontal',
  size = 'md',
  inverted = false,
  className = ''
}) => {
  // Brand color palette strictly matching the uploaded Matcha Heaven logo
  const bowlColor = inverted ? '#F6F4EC' : '#47623A';
  const leafColor = inverted ? '#C8DE9E' : '#8A9E66';
  const liquidBgColor = inverted ? '#58704A' : '#728A55';
  const rippleLineColor = inverted ? '#2A3A22' : '#F6F4EC';
  const bgGapColor = inverted ? '#25351E' : '#FAF8F2';
  const accentBrown = inverted ? '#E5C9A9' : '#8C6A4A';
  const darkTextColor = inverted ? '#FFFFFF' : '#1F2B18';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: { title: 'text-sm tracking-[0.22em]', sub: 'text-[8px] tracking-[0.28em]', tag: 'text-[7px]' },
    md: { title: 'text-lg tracking-[0.24em]', sub: 'text-[10px] tracking-[0.3em]', tag: 'text-[8px]' },
    lg: { title: 'text-2xl sm:text-3xl tracking-[0.26em]', sub: 'text-xs tracking-[0.34em]', tag: 'text-[10px]' },
    xl: { title: 'text-3xl sm:text-4xl tracking-[0.28em]', sub: 'text-sm tracking-[0.36em]', tag: 'text-xs' }
  };

  // Ultra-precise vector rendition matching the exact Leaf & Bowl logo artwork
  const IconSVG = (
    <svg
      viewBox="0 0 200 200"
      className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105 shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="matcha-heaven-mark">
        {/* 1. Concentric Matcha Liquid Ripples inside bowl opening */}
        <g id="matcha-liquid-ripples">
          {/* Base liquid surface ellipse */}
          <ellipse
            cx="98"
            cy="106"
            rx="56"
            ry="11"
            fill={liquidBgColor}
          />

          {/* Outer Ripple Wave */}
          <ellipse
            cx="98"
            cy="106"
            rx="46"
            ry="8.5"
            stroke={rippleLineColor}
            strokeWidth="1.8"
            strokeOpacity="0.9"
            fill="none"
          />

          {/* Middle Ripple Wave */}
          <ellipse
            cx="98"
            cy="106"
            rx="32"
            ry="5.8"
            stroke={rippleLineColor}
            strokeWidth="1.6"
            strokeOpacity="0.8"
            fill="none"
          />

          {/* Inner Center Ripple */}
          <ellipse
            cx="98"
            cy="106"
            rx="18"
            ry="3.2"
            stroke={rippleLineColor}
            strokeWidth="1.4"
            strokeOpacity="0.75"
            fill="none"
          />
        </g>

        {/* 2. Left Section of Chawan Bowl with 3D Inner Rim */}
        {/* Left Bowl Outer Body */}
        <path
          d="M40 92C38 122 62 154 94 158C95 158 96 157 96 156C93 145 91 130 92 114C92 113 91 112 90 112C68 110 50 102 44 94C42 91 40 91 40 92Z"
          fill={bowlColor}
        />

        {/* Left Bowl Upper Rim Crescent (giving 3D ceramic depth) */}
        <path
          d="M40 92C44 80 62 74 88 74C87 77 86 81 86 85C66 85 50 88 44 94C41 96 40 94 40 92Z"
          fill={bowlColor}
        />

        {/* 3. Right Section of Chawan Bowl */}
        <path
          d="M102 116C102 132 108 147 114 154C138 148 156 126 156 94C156 92 154 92 153 94C144 104 124 112 104 114C102 114 102 115 102 116Z"
          fill={bowlColor}
        />

        {/* 4. Elegant Tea Leaf (Rising upward from the bowl) */}
        <path
          d="M93 118C92 90 92 56 112 28C117 21 123 16 128 12C128 13 129 14 129 16C138 34 148 58 138 82C129 104 114 116 99 122C95 124 93 122 93 118Z"
          fill={leafColor}
        />

        {/* 5. Central Leaf Vein and Dividing White Stem Line */}
        {/* Leaf Central Spine */}
        <path
          d="M127 15C118 36 108 64 102 96C99 110 97 125 100 142C102 150 106 156 110 160"
          stroke={bgGapColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Secondary Delicate Leaf Vein Highlight */}
        <path
          d="M107 72C118 64 128 54 133 42"
          stroke={bgGapColor}
          strokeWidth="1.5"
          strokeOpacity="0.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{IconSVG}</div>;
  }

  // Circular Badge version as shown in "VERSI BADGE"
  if (variant === 'badge') {
    return (
      <div className={`relative inline-flex flex-col items-center justify-center p-6 rounded-full border-2 border-[#47623A]/40 bg-[#FAF8F2] shadow-sm ${className}`}>
        <div className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#47623A] mb-1 font-serif">
          MATCHA HEAVEN
        </div>
        <div className="my-1">
          {IconSVG}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[#8C6A4A] text-[8px]">•</span>
          <span className="text-[9px] font-bold tracking-[0.3em] text-[#8C6A4A]">CAFÉ</span>
          <span className="text-[#8C6A4A] text-[8px]">•</span>
        </div>
      </div>
    );
  }

  // Vertical Stack version as shown in "VERSI VERTIKAL"
  if (variant === 'full-vertical') {
    return (
      <div className={`group flex flex-col items-center text-center ${className}`}>
        {IconSVG}
        <div className="mt-3 space-y-1">
          <h1
            className={`font-serif-brand font-bold uppercase tracking-[0.24em] ${textSizes[size].title}`}
            style={{ color: darkTextColor, fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            MATCHA HEAVEN
          </h1>
          
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-6 sm:w-8" style={{ backgroundColor: accentBrown }} />
            <span
              className={`font-serif font-medium uppercase tracking-[0.32em] ${textSizes[size].sub}`}
              style={{ color: accentBrown }}
            >
              CAFÉ
            </span>
            <div className="h-[1px] w-6 sm:w-8" style={{ backgroundColor: accentBrown }} />
          </div>

          <p
            className={`font-serif italic tracking-wide text-stone-500 pt-0.5 ${textSizes[size].tag}`}
            style={{ color: inverted ? '#D4E2CA' : '#6A7D5E' }}
          >
            "Taste the calm, sip the matcha."
          </p>
        </div>
      </div>
    );
  }

  // Default: Full Horizontal version as shown in "VERSI HORIZONTAL"
  return (
    <div className={`group inline-flex items-center gap-3 ${className}`}>
      {IconSVG}
      <div className="flex flex-col">
        <span
          className={`font-serif-brand font-bold uppercase tracking-[0.22em] leading-tight ${textSizes[size].title}`}
          style={{ color: darkTextColor, fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          MATCHA HEAVEN
        </span>

        <div className="flex items-center gap-2 mt-0.5">
          <div className="h-[1px] w-4" style={{ backgroundColor: accentBrown }} />
          <span
            className={`font-serif font-medium uppercase tracking-[0.3em] ${textSizes[size].sub}`}
            style={{ color: accentBrown }}
          >
            CAFÉ
          </span>
          <div className="h-[1px] w-4" style={{ backgroundColor: accentBrown }} />
        </div>

        {size !== 'sm' && (
          <span
            className={`font-serif italic text-stone-500 tracking-wide text-[9px] mt-0.5 hidden sm:block ${textSizes[size].tag}`}
            style={{ color: inverted ? '#D4E2CA' : '#6A7D5E' }}
          >
            Taste the calm, sip the matcha.
          </span>
        )}
      </div>
    </div>
  );
};

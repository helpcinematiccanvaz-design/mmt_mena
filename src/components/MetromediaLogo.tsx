import React from 'react';

interface MetromediaLogoProps {
  className?: string;
  iconSize?: number;
  textColor?: 'light' | 'dark';
}

export default function MetromediaLogo({ className = '', iconSize = 40, textColor = 'light' }: MetromediaLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Halftone Dot Tower Circular Logo */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Solid Blue Corporate Circle */}
        <circle cx="50" cy="50" r="46" fill="#004BFF" />
        
        {/* Stylized Halftone Tower (Pyramid of tilted white ellipses) */}
        <g style={{ mixBlendMode: 'normal' }}>
          {/* Row 1 (top-most) */}
          <ellipse cx="47" cy="25" rx="1.8" ry="3" transform="rotate(-35 47 25)" fill="white" />
          
          {/* Row 2 */}
          <ellipse cx="46.5" cy="31" rx="2.6" ry="4.2" transform="rotate(-35 46.5 31)" fill="white" />
          <ellipse cx="51.5" cy="29" rx="1.8" ry="3" transform="rotate(-35 51.5 29)" fill="white" />
          
          {/* Row 3 */}
          <ellipse cx="46" cy="38" rx="3.6" ry="5.8" transform="rotate(-35 46 38)" fill="white" />
          <ellipse cx="52.5" cy="35" rx="2.8" ry="4.5" transform="rotate(-35 52.5 35)" fill="white" />
          <ellipse cx="58.5" cy="32.5" rx="1.8" ry="3" transform="rotate(-35 58.5 32.5)" fill="white" />
          
          {/* Row 4 */}
          <ellipse cx="45" cy="47" rx="4.6" ry="7.2" transform="rotate(-35 45 47)" fill="white" />
          <ellipse cx="53" cy="43" rx="3.8" ry="6" transform="rotate(-35 53 43)" fill="white" />
          <ellipse cx="61" cy="39" rx="2.8" ry="4.5" transform="rotate(-35 61 39)" fill="white" />
          <ellipse cx="68" cy="36" rx="1.8" ry="3" transform="rotate(-35 68 36)" fill="white" />
          
          {/* Row 5 */}
          <ellipse cx="44" cy="57" rx="5.6" ry="8.8" transform="rotate(-35 44 57)" fill="white" />
          <ellipse cx="53.5" cy="52" rx="4.6" ry="7.2" transform="rotate(-35 53.5 52)" fill="white" />
          <ellipse cx="62.5" cy="47" rx="3.6" ry="5.8" transform="rotate(-35 62.5 47)" fill="white" />
          <ellipse cx="71" cy="43" rx="2.6" ry="4.2" transform="rotate(-35 71 43)" fill="white" />
          <ellipse cx="78" cy="40" rx="1.8" ry="3" transform="rotate(-35 78 40)" fill="white" />
          
          {/* Row 6 (Bottom/Base) */}
          <ellipse cx="42.5" cy="68" rx="6.6" ry="10.2" transform="rotate(-35 42.5 68)" fill="white" />
          <ellipse cx="53.5" cy="62" rx="5.6" ry="8.8" transform="rotate(-35 53.5 62)" fill="white" />
          <ellipse cx="64" cy="56" rx="4.6" ry="7.2" transform="rotate(-35 64 56)" fill="white" />
          <ellipse cx="73.5" cy="51" rx="3.6" ry="5.8" transform="rotate(-35 73.5 51)" fill="white" />
          <ellipse cx="81.5" cy="47" rx="2.2" ry="3.5" transform="rotate(-35 81.5 47)" fill="white" />
        </g>
      </svg>

      {/* Typography with clean fonts and sizes matching the logo image */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`text-base font-black tracking-[0.11em] uppercase font-sans ${
            textColor === 'light' ? 'text-white' : 'text-[#004BFF]'
          }`}
          style={{ letterSpacing: '0.08em' }}
        >
          METROMEDIA
        </span>
        <span
          className={`text-[9px] font-bold tracking-[0.16em] uppercase mt-0.5 font-sans ${
            textColor === 'light' ? 'text-gray-300' : 'text-[#5C6E8D]'
          }`}
          style={{ letterSpacing: '0.14em' }}
        >
          TECHNOLOGIES MENA
        </span>
      </div>
    </div>
  );
}

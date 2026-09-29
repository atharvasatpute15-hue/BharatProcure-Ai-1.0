import React from 'react';

interface WorldMapSvgProps {
  width?: number;
  height?: number;
  className?: string;
}

/**
 * High-fidelity stylized SVG world map background with continents,
 * lat/long graticules, and geographic landmarks.
 */
export const WorldMapSvg: React.FC<WorldMapSvgProps> = ({
  width = 1000,
  height = 500,
  className = ''
}) => {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-full select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Ocean Background Gradient */}
        <radialGradient id="oceanGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0B1329" />
          <stop offset="70%" stopColor="#070D1E" />
          <stop offset="100%" stopColor="#030712" />
        </radialGradient>

        {/* India Highlight Glow */}
        <radialGradient id="indiaGlow" cx="71%" cy="38%" r="18%">
          <stop offset="0%" stopColor="rgba(249, 115, 22, 0.22)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.08)" />
          <stop offset="100%" stopColor="rgba(3, 7, 18, 0)" />
        </radialGradient>

        {/* Landmass Shading Pattern */}
        <pattern id="landGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.75" fill="#334155" opacity="0.4" />
        </pattern>

        {/* Pulse filter for active points */}
        <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Base Ocean Canvas */}
      <rect width={width} height={height} fill="url(#oceanGlow)" />
      <rect width={width} height={height} fill="url(#indiaGlow)" />

      {/* Graticule Grid Lines (Latitudes & Longitudes) */}
      <g stroke="#1E293B" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6">
        {/* Equator (0°) */}
        <line x1="0" y1="277" x2={width} y2="277" stroke="#334155" strokeWidth="1" strokeDasharray="6 4" />
        {/* Tropic of Cancer (23.5°N) */}
        <line x1="0" y1="190" x2={width} y2="190" />
        {/* Tropic of Capricorn (23.5°S) */}
        <line x1="0" y1="365" x2={width} y2="365" />
        {/* Arctic Circle (66.5°N) */}
        <line x1="0" y1="50" x2={width} y2="50" opacity="0.3" />

        {/* Longitude lines */}
        <line x1="166" y1="0" x2="166" y2={height} opacity="0.4" /> {/* -120° W */}
        <line x1="333" y1="0" x2="333" y2={height} opacity="0.4" /> {/* -60° W */}
        <line x1="500" y1="0" x2="500" y2={height} stroke="#334155" strokeWidth="1" /> {/* 0° Prime Meridian */}
        <line x1="666" y1="0" x2="666" y2={height} opacity="0.4" /> {/* +60° E */}
        <line x1="833" y1="0" x2="833" y2={height} opacity="0.4" /> {/* +120° E */}
      </g>

      {/* Continents & Landmasses (Detailed stylised geometric paths for world geography) */}
      <g fill="#1E293B" stroke="#334155" strokeWidth="1" opacity="0.95">
        
        {/* North America & Greenland */}
        {/* Greenland */}
        <path d="M400,20 L445,25 L450,60 L420,75 L385,60 L395,30 Z" fill="#1A2438" />
        
        {/* North America Mainland */}
        <path
          d="M120,45 L160,35 L220,38 L250,55 L285,45 L320,65 L300,95 L270,105 L260,135 L245,150 
             L255,175 L230,195 L215,190 L195,215 L180,240 L165,245 L155,225 L145,195 L125,170 
             L110,130 L100,85 L120,45 Z"
          fill="#1A2438"
        />
        {/* Alaska */}
        <path d="M70,50 L115,45 L110,90 L80,95 L65,75 Z" fill="#1A2438" />
        {/* Central America & Caribbean */}
        <path d="M195,215 L225,230 L235,245 L220,265 L210,250 L190,225 Z" fill="#1A2438" />
        <circle cx="245" cy="235" r="3" fill="#334155" />
        <circle cx="260" cy="245" r="2.5" fill="#334155" />

        {/* South America */}
        <path
          d="M225,270 L255,275 L285,295 L315,310 L330,345 L320,385 L305,430 L290,460 L280,480 
             L270,470 L272,420 L260,380 L245,340 L230,305 L225,270 Z"
          fill="#1A2438"
        />

        {/* Europe */}
        <path
          d="M480,95 L510,80 L540,85 L565,115 L550,135 L525,145 L500,165 L475,160 L465,135 L470,110 Z"
          fill="#1E2A40"
        />
        {/* Scandinavia */}
        <path d="M515,45 L545,40 L555,80 L535,100 L515,80 Z" fill="#1E2A40" />
        {/* British Isles */}
        <path d="M465,95 L480,85 L485,110 L470,120 Z" fill="#1E2A40" />
        <path d="M455,100 L462,95 L464,110 L457,112 Z" fill="#1E2A40" />
        {/* Mediterranean Islands */}
        <circle cx="505" cy="170" r="2" fill="#334155" />
        <circle cx="525" cy="175" r="2.5" fill="#334155" />

        {/* Africa */}
        <path
          d="M465,175 L520,175 L565,195 L610,240 L595,275 L580,315 L565,365 L550,410 L525,435 
             L505,410 L495,355 L470,300 L445,255 L445,215 L465,175 Z"
          fill="#192337"
        />
        {/* Madagascar */}
        <path d="M605,370 L620,385 L610,430 L598,410 Z" fill="#192337" />

        {/* Asia Mainland (Russia, Central Asia, East Asia) */}
        <path
          d="M565,85 L630,70 L720,65 L820,70 L870,85 L890,115 L865,140 L840,165 L800,185 L765,195 
             L730,195 L690,185 L645,175 L600,170 L570,135 Z"
          fill="#1C273D"
        />
        {/* Middle East & Arabian Peninsula */}
        <path d="M580,180 L625,185 L660,205 L650,250 L615,255 L585,225 Z" fill="#1A253A" />

        {/* Southeast Asia Mainland & Indochina */}
        <path d="M740,205 L780,210 L805,245 L785,270 L765,240 Z" fill="#1C273D" />
        
        {/* Indonesian Archipelago & Philippines */}
        <path d="M780,285 L820,290 L850,295 L840,305 L795,300 Z" fill="#1C273D" />
        <path d="M820,230 L835,245 L830,270 L815,255 Z" fill="#1C273D" />

        {/* Japan */}
        <path d="M880,130 L895,145 L885,175 L870,165 Z" fill="#1E2A40" />

        {/* Australia & New Zealand */}
        <path
          d="M820,350 L870,335 L915,360 L925,410 L890,445 L840,435 L810,395 Z"
          fill="#192337"
        />
        <path d="M940,430 L955,440 L945,465 L930,455 Z" fill="#192337" />
      </g>

      {/* Prominently Highlighted India Peninsula */}
      <g>
        {/* Subtle glow filter behind India */}
        <path
          d="M685,160 L735,160 L755,185 L735,215 L715,270 L695,230 L675,195 Z"
          fill="rgba(249, 115, 22, 0.12)"
          filter="url(#glowFilter)"
        />
        {/* India Polygon Contour */}
        <path
          d="M682,160 
             L700,145 
             L725,148 
             L740,165 
             L760,180 
             L748,198 
             L735,212 
             L720,248 
             L713,275 
             L705,250 
             L695,225 
             L675,200 
             L670,180 
             Z"
          fill="#25334E"
          stroke="#F97316"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Sri Lanka */}
        <circle cx="718" cy="285" r="3.5" fill="#25334E" stroke="#F97316" strokeWidth="1" />
      </g>

      {/* Coordinates Axis labels */}
      <g fill="#475569" fontSize="9" fontFamily="monospace">
        <text x="8" y="274" opacity="0.7">0° EQUATOR</text>
        <text x="8" y="187" opacity="0.5">23.5°N TROPIC OF CANCER</text>
        <text x="8" y="362" opacity="0.5">23.5°S TROPIC OF CAPRICORN</text>
        <text x="495" y="492" textAnchor="middle" opacity="0.7">0° PRIME MERIDIAN</text>
        <text x="715" y="138" fill="#F97316" fontWeight="bold" textAnchor="middle">
          BHARAT (INDIA) HUB
        </text>
      </g>
    </svg>
  );
};

/**
 * Detailed high-resolution SVG map of India for zoomed national network inspection
 */
export const IndiaMapSvg: React.FC<{ width?: number; height?: number; className?: string }> = ({
  width = 900,
  height = 650,
  className = ''
}) => {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-full select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="indiaBgGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="60%" stopColor="#0B132B" />
          <stop offset="100%" stopColor="#050914" />
        </radialGradient>

        <linearGradient id="indiaLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#1E2D4A" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>

        <pattern id="dotPattern" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#3B82F6" opacity="0.12" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width={width} height={height} fill="url(#indiaBgGlow)" />
      <rect width={width} height={height} fill="url(#dotPattern)" />

      {/* Subtle State Region Polygons & National Border Contour */}
      <g stroke="#3B82F6" strokeWidth="1.2" opacity="0.8" fill="url(#indiaLandGradient)">
        {/* Main India Shape Outline (North Himalayas down to Kanyakumari) */}
        <path
          d="
            M 300, 60
            C 340, 45, 380, 50, 400, 75
            C 425, 95, 470, 110, 500, 115
            C 530, 120, 580, 110, 610, 130
            C 640, 150, 690, 155, 730, 160
            C 760, 165, 800, 185, 810, 210
            C 815, 230, 790, 250, 760, 240
            C 730, 235, 710, 255, 680, 260
            C 650, 265, 630, 290, 635, 330
            C 640, 360, 600, 390, 580, 420
            C 560, 450, 530, 490, 510, 540
            C 490, 580, 460, 620, 440, 640
            C 420, 620, 380, 570, 350, 520
            C 320, 470, 290, 420, 270, 370
            C 250, 320, 210, 295, 170, 290
            C 140, 285, 120, 260, 150, 240
            C 180, 220, 220, 230, 240, 200
            C 260, 170, 270, 110, 300, 60
            Z
          "
          stroke="#F97316"
          strokeWidth="2.2"
        />

        {/* State boundary divider accents */}
        <path d="M 270, 370 Q 380, 360 500, 350" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <path d="M 350, 520 Q 420, 480 540, 460" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <path d="M 240, 200 Q 380, 210 550, 220" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <path d="M 300, 140 Q 420, 150 635, 190" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <path d="M 400, 260 Q 450, 380 440, 560" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" fill="none" />

        {/* Sri Lanka */}
        <ellipse cx="460" cy="670" rx="16" ry="24" stroke="#F97316" strokeWidth="1.2" fill="#1E293B" />
        {/* Andaman & Nicobar */}
        <g stroke="#F97316" strokeWidth="1" fill="#1E293B">
          <circle cx="780" cy="510" r="3" />
          <circle cx="785" cy="530" r="2.5" />
          <circle cx="790" cy="555" r="3.5" />
          <circle cx="795" cy="580" r="2" />
        </g>
        {/* Lakshadweep */}
        <g stroke="#F97316" strokeWidth="1" fill="#1E293B">
          <circle cx="280" cy="560" r="2" />
          <circle cx="285" cy="580" r="2.5" />
          <circle cx="290" cy="600" r="2" />
        </g>
      </g>

      {/* Water Body Labels */}
      <g fill="#475569" fontSize="11" fontFamily="sans-serif" fontWeight="600" letterSpacing="1.5">
        <text x="130" y="440" opacity="0.6">ARABIAN SEA</text>
        <text x="660" y="440" opacity="0.6">BAY OF BENGAL</text>
        <text x="380" y="695" opacity="0.6">INDIAN OCEAN</text>
        <text x="310" y="40" opacity="0.5">NORTHERN HIMALAYAN ZONE</text>
      </g>
    </svg>
  );
};

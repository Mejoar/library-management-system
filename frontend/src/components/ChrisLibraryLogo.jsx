import React from 'react';

const ChrisLibraryLogo = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: { width: 80, height: 28 },
    medium: { width: 120, height: 40 },
    large: { width: 160, height: 56 }
  };

  const { width, height } = sizes[size] || sizes.medium;

  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 120 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#2563eb', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#1d4ed8', stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="bookGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#f8fafc', stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="bookGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#dbeafe', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#bfdbfe', stopOpacity:1}} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.15"/>
          </filter>
        </defs>
        
        {/* Logo container background */}
        <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#bgGradient)" filter="url(#shadow)"/>
        
        {/* Stack of books */}
        {/* Book 1 (back) */}
        <rect x="8" y="10" width="16" height="22" rx="1.5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.5"/>
        
        {/* Book 2 (middle) */}
        <rect x="6" y="8" width="16" height="22" rx="1.5" fill="url(#bookGradient2)" stroke="#2563eb" strokeWidth="0.6"/>
        
        {/* Book 3 (front) */}
        <rect x="4" y="6" width="16" height="22" rx="1.5" fill="url(#bookGradient1)" stroke="#1d4ed8" strokeWidth="0.8"/>
        
        {/* Book details on front book */}
        <line x1="7" y1="10" x2="17" y2="10" stroke="#94a3b8" strokeWidth="0.6"/>
        <line x1="7" y1="13" x2="16" y2="13" stroke="#94a3b8" strokeWidth="0.6"/>
        <line x1="7" y1="16" x2="15" y2="16" stroke="#94a3b8" strokeWidth="0.6"/>
        <line x1="7" y1="19" x2="14" y2="19" stroke="#94a3b8" strokeWidth="0.6"/>
        
        {/* Stylized "C" for Chris */}
        <path d="M14 22 C11 22, 9 23.5, 9 25.5 C9 27.5, 11 29, 14 29" stroke="#2563eb" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        
        {/* Small decorative elements */}
        <circle cx="28" cy="12" r="1.5" fill="#60a5fa" opacity="0.6"/>
        <circle cx="31" cy="18" r="1.2" fill="#93c5fd" opacity="0.8"/>
        <circle cx="8" cy="34" r="1.2" fill="#dbeafe" opacity="0.7"/>
        
        {/* Text: "Chris Library" */}
        <text x="48" y="18" fontFamily="Inter, Arial, sans-serif" fontSize="14" fontWeight="700" fill="#1f2937">Chris</text>
        <text x="48" y="32" fontFamily="Inter, Arial, sans-serif" fontSize="12" fontWeight="500" fill="#6b7280">Library</text>
        
        {/* Decorative line */}
        <line x1="45" y1="22" x2="110" y2="22" stroke="#e5e7eb" strokeWidth="1"/>
        
        {/* Small book icon after text */}
        <rect x="94" y="24" width="8" height="10" rx="1" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5"/>
        <line x1="96" y1="26" x2="100" y2="26" stroke="#9ca3af" strokeWidth="0.4"/>
        <line x1="96" y1="28" x2="99" y2="28" stroke="#9ca3af" strokeWidth="0.4"/>
        <line x1="96" y1="30" x2="98" y2="30" stroke="#9ca3af" strokeWidth="0.4"/>
      </svg>
    </div>
  );
};

export default ChrisLibraryLogo;


import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  // Add onClick prop to support interactions from parent components
  onClick?: () => void;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "", size = 'md', onClick }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  return (
    <div 
      className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}
      // Apply the onClick handler to the root div of the logo component
      onClick={onClick}
    >
      {/* Watercolor Splash SVG */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-md">
        <defs>
          <filter id="watercolor">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
          </filter>
        </defs>
        <path 
          d="M50 10 C 65 10, 85 25, 90 50 C 95 75, 75 90, 50 90 C 25 90, 5 75, 10 50 C 15 25, 35 10, 50 10" 
          fill="#3AC1E6" 
          filter="url(#watercolor)"
          opacity="0.8"
        />
        <path 
          d="M50 15 C 60 15, 80 30, 85 50 C 90 70, 70 85, 50 85 C 30 85, 10 70, 15 50 C 20 30, 40 15, 50 15" 
          fill="#55D9E2" 
          filter="url(#watercolor)"
          opacity="0.6"
        />
      </svg>
      
      {/* White Logo Text */}
      <span 
        className="relative z-10 logo-font text-white select-none italic"
        style={{ 
          fontSize: size === 'xl' ? '3rem' : size === 'lg' ? '2rem' : size === 'md' ? '1.5rem' : '1rem',
          transform: 'rotate(-5deg)'
        }}
      >
        Kyvue
      </span>
    </div>
  );
};

export default BrandLogo;

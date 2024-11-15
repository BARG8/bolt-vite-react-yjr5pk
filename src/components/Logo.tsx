import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <h1 className="text-2xl font-bold tracking-tight">
        <span className="text-orange-500">L</span>
        <span className="text-orange-500 relative inline-block">
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
          </span>
          o
        </span>
        <span className="text-orange-500">callyt</span>
      </h1>
    </div>
  );
};

export default Logo;
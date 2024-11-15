import React from 'react';

interface CategoryIconProps {
  type: 'coffee' | 'restaurant' | 'bakery';
  label: string;
  bgColor: string;
  icon: string;
}

const CategoryIcon = ({ type, label, bgColor, icon }: CategoryIconProps) => {
  return (
    <button className="flex flex-col items-center justify-center w-20">
      <div className={`w-16 h-16 ${bgColor} rounded-2xl p-2 shadow-sm flex items-center justify-center`}>
        <img 
          src={icon} 
          alt={label}
          className="w-10 h-10 object-contain"
        />
      </div>
      <span className="text-xs text-gray-700 mt-2 font-medium">{label}</span>
    </button>
  );
};

export default CategoryIcon;
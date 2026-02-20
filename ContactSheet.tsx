import React from 'react';
import { Info } from 'lucide-react';

interface HeaderProps {
  onInfoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onInfoClick }) => {
  return (
    <header className="flex items-center justify-between px-6 py-6 w-full max-w-md mx-auto">
      <button 
        onClick={onInfoClick}
        className="p-3 rounded-full hover:bg-[#e2e3dd] active:scale-95 transition-all duration-300 ease-md-emphasized text-[#44473f]" 
        aria-label="About Contact.me"
      >
        <Info className="w-6 h-6" />
      </button>
      
      <h1 className="text-[22px] font-normal text-[#1b1c17] tracking-tight">Contact.me</h1>
      
      <div className="w-10 h-10 rounded-full bg-[#e2e3dd] text-[#44473f] flex items-center justify-center font-medium text-sm shadow-sm">
        EB
      </div>
    </header>
  );
};

export default Header;
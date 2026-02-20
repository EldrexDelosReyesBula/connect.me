import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LinkCardProps, CardVariant } from '../types';

const LinkCard: React.FC<LinkCardProps> = ({ variant, title, description, icon: Icon, onClick }) => {
  
  const getStyles = (variant: CardVariant) => {
    switch (variant) {
      case CardVariant.ACADEMIC:
        return {
          // Tonal Container (Green)
          container: "bg-[#dce8d6] text-[#121f0e] hover:bg-[#cedcc8]",
          iconBg: "bg-[#c3eed0]", // Primary Container
          arrowBg: "bg-[#ffffff]/50",
          iconColor: "text-[#0e1f11]"
        };
      case CardVariant.PERSONAL:
        return {
          // Tonal Container (Orange/Peach)
          container: "bg-[#ffe0cc] text-[#2e1500] hover:bg-[#ffdcc5]",
          iconBg: "bg-[#ffdbc0]",
          arrowBg: "bg-[#ffffff]/50",
          iconColor: "text-[#2e1500]"
        };
      case CardVariant.NGL:
        return {
          // Filled Container (Red/Pink for emphasis)
          container: "bg-[#ffb4ab] text-[#690005] hover:bg-[#ffb4ab]/90",
          iconBg: "bg-[#ffdad6]",
          arrowBg: "bg-[#ffffff]/40",
          iconColor: "text-[#410002]"
        };
      case CardVariant.WRITE_MESSAGE:
        return {
          // Outlined Card style but with strong border
          container: "bg-[#fdfdf6] text-[#1b1c17] border border-[#74796d] hover:bg-[#f4f4eb]",
          iconBg: "bg-[#bbf7d0]", // Primary Container
          arrowBg: "bg-[#e2e3dd]",
          iconColor: "text-[#002204]"
        };
      default:
        return {
          container: "bg-[#e2e3dd]",
          iconBg: "bg-white",
          arrowBg: "bg-[#c6c8c0]",
          iconColor: "text-black"
        };
    }
  };

  const styles = getStyles(variant);

  return (
    <button 
      onClick={onClick}
      className={`w-full relative group rounded-[28px] p-6 text-left transition-all duration-500 ease-md-emphasized transform hover:scale-[1.02] active:scale-[0.96] active:shadow-none hover:shadow-lg ${styles.container}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${styles.iconBg} ${styles.iconColor} transition-colors duration-300`}>
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
        
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.arrowBg} text-current opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
           <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
      
      <div>
        <h3 className="text-[22px] font-normal leading-tight mb-1 tracking-tight">{title}</h3>
        <p className="text-sm opacity-70 font-medium leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* State Layer (Overlay for interaction feedback) */}
      <div className="absolute inset-0 rounded-[28px] bg-black opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};

export default LinkCard;
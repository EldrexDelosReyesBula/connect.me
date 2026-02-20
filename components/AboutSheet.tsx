import React, { useState } from 'react';
import { X, Copy, Check, Clock, Lock, ExternalLink } from 'lucide-react';
import { CardVariant } from '../types';

interface ContactSheetProps {
  isOpen: boolean;
  onClose: () => void;
  type: CardVariant | null;
}

const ContactSheet: React.FC<ContactSheetProps> = ({ isOpen, onClose, type }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !type) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const getConfig = () => {
    switch (type) {
      case CardVariant.ACADEMIC:
        return {
          title: 'Academic Contact',
          email: 'ebula251056@navotaspolytechniccollege.edu.ph',
          emailLabel: 'Academic Email',
          description: 'Student at Navotas Polytechnic College',
          responseTime: 'I usually respond within 24 hours.',
          themeColor: 'bg-[#bbf7d0] text-[#002204]', // Primary Container
          buttonText: 'Send Email',
          showLogos: true,
          isNgl: false
        };
      case CardVariant.PERSONAL:
        return {
          title: 'Personal Contact',
          email: 'eldrexdelosreyesbula@gmail.com',
          emailLabel: 'Email Address',
          description: 'Personal Email Address',
          responseTime: 'I usually respond within 24 hours.',
          themeColor: 'bg-[#ffdbc0] text-[#2e1500]', // Peach Container
          buttonText: 'Send Email',
          showLogos: false,
          isNgl: false
        };
      case CardVariant.NGL:
        return {
          title: 'NGL Anonymous',
          email: 'https://ngl.link/eldrex.me',
          emailLabel: 'NGL Link',
          description: 'Send anonymous messages',
          subHeadline: 'Ask Me Anything',
          responseTime: '100% Anonymous. No sign-up.',
          themeColor: 'bg-[#ffdad6] text-[#410002]', // Red Container
          buttonText: 'Open NGL',
          showLogos: false,
          isNgl: true
        };
      default:
        return null;
    }
  };

  const config = getConfig();
  if (!config) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1b1c17]/40 backdrop-blur-sm transition-opacity duration-500 ease-md-standard"
        onClick={handleBackdropClick}
      />

      {/* Sheet/Modal - MD3 Elevation Level 3 */}
      <div className="relative w-full max-w-[420px] bg-[#f4f4eb] rounded-t-[28px] sm:rounded-[28px] p-6 shadow-2xl transform transition-transform animate-in slide-in-from-bottom-20 duration-500 ease-md-emphasized flex flex-col items-center overflow-hidden">
        
        {/* Drag Handle */}
        <div className="w-8 h-1 bg-[#74796d]/40 rounded-full mb-6 sm:hidden"></div>

        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-[22px] font-normal text-[#1b1c17]">{config.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-[#e2e3dd] rounded-full hover:bg-[#c6c8c0] transition-colors"
          >
            <X className="w-6 h-6 text-[#44473f]" />
          </button>
        </div>

        {/* Dynamic Visual Content */}
        <div className="flex items-center justify-center mb-6">
          {config.isNgl ? (
            <div className="w-24 h-24 rounded-[28px] bg-[#ffb4ab] flex items-center justify-center shadow-md transform rotate-3">
               <div className="text-[#690005]">
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
               </div>
            </div>
          ) : config.showLogos ? (
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white overflow-hidden shadow-sm flex items-center justify-center">
                <img src="https://navotaspolytechniccollege.edu.ph/wp-content/themes/yootheme/cache/d3/s5-d3060735.webp" alt="ICS" className="w-full h-full object-contain p-2" />
              </div>
              <div className="w-20 h-20 rounded-[24px] border-4 border-[#f4f4eb] shadow-lg z-10 -mx-4 overflow-hidden">
                 <img src="https://eldrex.landecs.org/squad/eldrex.png" alt="Profile" className="w-full h-full object-cover grayscale contrast-125" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white overflow-hidden shadow-sm flex items-center justify-center">
                <img src="https://navotaspolytechniccollege.edu.ph/wp-content/themes/yootheme/cache/66/Favicon-66de9ae4.webp" alt="NPC" className="w-full h-full object-contain p-2" />
              </div>
            </div>
          ) : (
             <div className="w-24 h-24 rounded-[28px] border-4 border-[#f4f4eb] shadow-lg overflow-hidden">
                 <img src="https://eldrex.landecs.org/squad/eldrex.png" alt="Profile" className="w-full h-full object-cover grayscale contrast-125" />
             </div>
          )}
        </div>

        <h3 className="text-2xl font-normal text-[#1b1c17] text-center mb-1">
            {config.subHeadline || 'Eldrex Delos Reyes Bula'}
        </h3>
        <p className="text-sm text-[#44473f] text-center mb-8 px-4 leading-relaxed">
            {config.description}
        </p>

        {/* MD3 Filled Input Style Container */}
        <div className="w-full space-y-4">
            <div className="group relative">
                <div className="flex items-center gap-3 p-4 bg-[#e2e3dd] rounded-t-[16px] rounded-b-[4px] border-b border-[#74796d] group-hover:bg-[#d5d6d0] transition-colors">
                    <div className="flex-1 min-w-0">
                        <label className="block text-xs font-medium text-[#44473f] mb-0.5">
                            {config.emailLabel}
                        </label>
                        <p className="text-sm font-medium text-[#1b1c17] truncate select-all">
                            {config.email}
                        </p>
                    </div>
                    <button 
                        onClick={() => handleCopy(config.email)}
                        className={`p-3 rounded-full transition-all active:scale-95 ${config.isNgl ? 'bg-[#ffb4ab] text-[#690005]' : 'bg-[#bbf7d0] text-[#002204]'}`}
                    >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Info Card - Surface Variant */}
            <div className={`p-4 rounded-[20px] flex gap-4 ${config.isNgl ? 'bg-[#ffdad6]/50' : 'bg-[#c3eed0]/30'}`}>
                <div className={`p-2 rounded-full h-fit ${config.isNgl ? 'bg-[#ffdad6] text-[#410002]' : 'bg-[#bbf7d0] text-[#002204]'}`}>
                    {config.isNgl ? <Lock className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div>
                    <h4 className="text-sm font-bold text-[#1b1c17] mb-0.5">
                        {config.isNgl ? 'Anonymous' : 'Response Time'}
                    </h4>
                    <p className="text-sm text-[#44473f] leading-relaxed">
                        {config.responseTime}
                    </p>
                </div>
            </div>
        </div>

        {/* MD3 Buttons */}
        <div className="w-full flex gap-3 mt-8">
            <button 
                onClick={onClose}
                className="flex-1 h-12 rounded-full text-[#002204] font-medium hover:bg-[#dce8d6] transition-colors border border-[#74796d]/20"
            >
                Cancel
            </button>
            <button 
                onClick={() => {
                    if (config.isNgl) {
                        window.open(config.email, '_blank');
                    } else {
                        window.location.href = `mailto:${config.email}`;
                    }
                }}
                className={`flex-1 h-12 rounded-full font-medium transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 ${config.themeColor}`}
            >
                {config.buttonText}
                {config.isNgl && <ExternalLink className="w-4 h-4" />}
            </button>
        </div>

      </div>
    </div>
  );
};

export default ContactSheet;

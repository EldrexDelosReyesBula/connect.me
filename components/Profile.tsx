import React, { useState, useEffect } from 'react';

const Profile: React.FC = () => {
  const [coverUrl, setCoverUrl] = useState("https://eldrex.landecs.org/post/eld-cover.gif");

  useEffect(() => {
    // Logic to change cover every 5 hours based on time of day
    const updateCover = () => {
      const hours = new Date().getHours();
      // Divide day into 5-hour blocks. Even blocks get image 1, odd blocks get image 2.
      // 0-4 (0), 5-9 (1), 10-14 (2 -> 0), 15-19 (3 -> 1), 20-23 (4 -> 0)
      const index = Math.floor(hours / 5) % 2;
      
      const url = index === 0 
        ? "https://eldrex.landecs.org/post/eld-cover.gif" 
        : "https://eldrex.landecs.org/post/eld-cover2.gif";
      
      setCoverUrl(url);
    };

    updateCover();
    // Check every minute just in case the hour boundary is crossed while open
    const interval = setInterval(updateCover, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mb-10 text-center px-4 w-full">
      <style>
        {`
          @keyframes breathe {
            0%, 100% { transform: scale(1.1); opacity: 0.4; }
            50% { transform: scale(1.15); opacity: 0.3; }
          }
          .animate-breathe {
            animation: breathe 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* Cover Image */}
      <div className="w-full h-36 rounded-[32px] overflow-hidden shadow-sm relative z-0 mb-[-64px] transition-all duration-700 ease-in-out">
        <img 
          key={coverUrl} // Force re-render fade when url changes
          src={coverUrl} 
          alt="Cover" 
          className="w-full h-full object-cover animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>
      
      {/* Profile Image Container - Floating animation removed */}
      <div className="relative group mb-4 z-10">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[#bbf7d0] rounded-[32px] animate-breathe blur-2xl"></div>
        
        {/* Image Container with Border */}
        <div className="relative w-36 h-36 rounded-[32px] overflow-hidden border-[4px] border-[#fdfdf6] shadow-xl z-10 bg-[#e2e3dd] transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) hover:scale-105 active:scale-95">
          <img 
            src="https://eldrex.landecs.org/squad/eldrex.png" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <h2 className="text-[32px] font-display leading-tight font-medium text-[#1b1c17] tracking-tight mt-2 animate-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-backwards" style={{animationDelay: '100ms'}}>
        Eldrex Delos Reyes Bula
      </h2>
      
      <p className="mt-3 text-[16px] text-[#44473f] font-normal leading-relaxed max-w-[280px] animate-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-backwards" style={{animationDelay: '200ms'}}>
        “When nothing moves, everything begins”
      </p>
    </div>
  );
};

export default Profile;
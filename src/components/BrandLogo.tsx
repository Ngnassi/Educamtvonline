import React from 'react';

interface BrandLogoProps {
  simplified?: boolean;
  className?: string;
}

export default function BrandLogo({ simplified = false, className = "" }: BrandLogoProps) {
  return (
    <div className={`flex flex-col items-start ${className} select-none`}>
      {/* Upper Logo Graphic section */}
      <div className="flex items-center gap-1.5">
        {/* Antennas & TV frame */}
        <div className="relative flex items-center justify-center w-12 h-10 bg-slate-900 border border-slate-700 rounded-md shadow-inner">
          {/* Antennas */}
          <div className="absolute -top-3 left-1/4 w-0.5 h-4 bg-slate-400 origin-bottom transform -rotate-25 rounded-full" />
          <div className="absolute -top-3 right-1/4 w-0.5 h-4 bg-slate-400 origin-bottom transform rotate-25 rounded-full" />
          <div className="absolute -top-3.5 left-1/4 w-1.5 h-1.5 bg-slate-300 rounded-full -translate-x-0.5" />
          <div className="absolute -top-3.5 right-1/4 w-1.5 h-1.5 bg-slate-300 rounded-full translate-x-0.5" />

          {/* Screen Content: Tricolor Spark on the right */}
          {!simplified && (
            <div className="absolute -right-4 -top-3 w-10 h-10 pointer-events-none overflow-visible z-10">
              {/* Cameroon Flag Stripes Arc */}
              <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-12">
                <path d="M10,90 Q50,10 90,20" fill="none" stroke="#007A5E" strokeWidth="8" />
                <path d="M10,95 Q50,15 90,25" fill="none" stroke="#FCD116" strokeWidth="8" />
                <path d="M10,100 Q50,20 90,30" fill="none" stroke="#CE1126" strokeWidth="8" />
                {/* Gold Star */}
                <polygon points="75,12 78,18 85,19 80,24 81,31 75,27 69,31 70,24 65,19 72,18" fill="#FCD116" />
              </svg>
            </div>
          )}

          {/* EDU Lettering in miniature screen */}
          <div className="flex items-center justify-center font-bold text-[9px] gap-0.5">
            <span className="text-[#007A5E]">E</span>
            <span className="text-[#FCD116]">D</span>
            <span className="text-[#CE1126]">U</span>
          </div>
        </div>

        {/* Lettrage coloré EDUCAM */}
        <div className="flex items-baseline font-black tracking-tight text-2xl">
          <span className="text-[#007A5E] drop-shadow-md">E</span>
          <span className="text-[#FCD116] drop-shadow-md">D</span>
          <span className="text-[#CE1126] drop-shadow-md">U</span>
          <span className="text-[#0055A5] drop-shadow-md">C</span>
          <span className="text-[#0055A5] drop-shadow-md">A</span>
          <span className="text-[#0055A5] drop-shadow-md">M</span>
          
          {/* TV Badge */}
          <div className="ml-1 relative inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 text-white font-extrabold text-xs px-1.5 py-0.5 rounded-sm shadow-md border border-red-500">
            <span>TV</span>
            {/* White play triangle integrated */}
            <div className="ml-0.5 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-white" />
          </div>
        </div>
      </div>

      {/* Baseline "Apprendre le Cameroun en chantant" in small capitals */}
      {!simplified && (
        <div className="mt-1 flex flex-col w-full">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-0.5 bg-[#007A5E] rounded-full" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-300">
              Apprendre le Cameroun en chantant
            </span>
          </div>
          
          {/* Three stylized people in open book emblem */}
          <div className="mt-1 flex items-center gap-1.5 bg-slate-900/30 px-1.5 py-0.5 rounded border border-slate-800/40">
            {/* Styled book-open SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5 text-blue-400" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007A5E]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#CE1126]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCD116]" />
            </div>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
              Apprendre • Chanter • Mémoriser • Réussir
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

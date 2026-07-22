import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Heart, Clock } from 'lucide-react';
import { Program } from '../types';

interface MustWatchProps {
  programs: Program[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onProgramSelect: (program: Program, isLiveMode: boolean) => void;
  activeProgramId: string;
}

export default function MustWatch({
  programs,
  favorites,
  onToggleFavorite,
  onProgramSelect,
  activeProgramId
}: MustWatchProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      // initial check
      checkScroll();
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [programs]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full select-none" id="must-watch-carousel-section">
      {/* Title + Buttons Row */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
          À NE PAS MANQUER
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all bg-white/5 ${
              canScrollLeft ? 'text-white hover:bg-white/10' : 'text-slate-600 opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all bg-white/5 ${
              canScrollRight ? 'text-white hover:bg-white/10' : 'text-slate-600 opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {programs.map((prog) => {
          const isFavorite = favorites.includes(prog.id);
          const isCurrent = prog.id === activeProgramId;

          return (
            <div
              key={prog.id}
              className={`min-w-[260px] sm:min-w-[300px] max-w-[300px] bg-white/5 border rounded-2xl p-2 transition-all duration-200 hover:scale-[1.01] hover:border-white/20 group relative flex flex-col justify-between ${
                isCurrent ? 'border-amber-500/60 ring-1 ring-amber-500/30' : 'border-white/10'
              }`}
            >
              {/* Image Section */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={prog.thumbnailUrl}
                  alt={prog.title}
                  className="w-full h-full object-cover opacity-85 transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Duration Tag */}
                {prog.duration && (
                  <span className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-bold text-slate-200 px-1.5 py-0.5 rounded border border-slate-800">
                    {prog.duration}
                  </span>
                )}

                {/* Favorite toggle Button overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(prog.id);
                  }}
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-colors border shadow-sm cursor-pointer z-10 ${
                    isFavorite
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>

                {/* Hover Play Button */}
                <div 
                  onClick={() => onProgramSelect(prog, false)}
                  className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-md shadow-amber-500/20 transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <Play className="w-5 h-5 text-slate-950 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Text Section */}
              <div className="mt-2.5 px-1.5 pb-1 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#007A5E]">
                      {prog.category}
                    </span>
                    <span className="text-[10px] text-slate-500">•</span>
                    {prog.time && (
                      <span className="text-[9px] font-bold text-slate-400 font-mono">
                        DIFF. {prog.time}
                      </span>
                    )}
                  </div>
                  <h4 
                    onClick={() => onProgramSelect(prog, false)}
                    className="text-xs sm:text-sm font-extrabold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer leading-tight"
                  >
                    {prog.title}
                  </h4>
                </div>
                
                {/* Presenter / Info row */}
                {prog.presenter && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate">Par {prog.presenter}</span>
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[9px]">
                      {prog.ageRange || '6-12 ans'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

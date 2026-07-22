import React from 'react';
import { Calendar, PlayCircle, Clock } from 'lucide-react';
import { Program } from '../types';

interface DailyProgramProps {
  programsToday: Program[];
  programsTomorrow: Program[];
  programsWeek: Program[];
  activeProgramId: string;
  onProgramSelect: (program: Program, isLiveMode: boolean) => void;
  activeTab: 'today' | 'tomorrow' | 'week';
  onTabChange: (tab: 'today' | 'tomorrow' | 'week') => void;
}

export default function DailyProgram({
  programsToday,
  programsTomorrow,
  programsWeek,
  activeProgramId,
  onProgramSelect,
  activeTab,
  onTabChange
}: DailyProgramProps) {

  // Helper to get category tag styles based on category name
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Éducation':
        return 'bg-blue-900/40 text-blue-400 border border-blue-500/30';
      case 'Culture':
        return 'bg-orange-900/40 text-orange-400 border border-orange-500/30';
      case 'Musique':
        return 'bg-purple-900/40 text-purple-400 border border-purple-500/30';
      case 'Documentaires':
        return 'bg-green-900/40 text-green-400 border border-green-500/30';
      case 'Histoire':
        return 'bg-red-950/40 text-red-400 border border-red-800/30';
      case 'Géographie':
        return 'bg-teal-900/40 text-teal-400 border border-teal-500/30';
      case 'Jeunesse':
        return 'bg-amber-900/40 text-amber-400 border border-amber-500/30';
      case 'Tourisme':
        return 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30';
      default:
        return 'bg-slate-900 text-slate-400';
    }
  };

  const getActiveProgramsList = () => {
    if (activeTab === 'tomorrow') return programsTomorrow;
    if (activeTab === 'week') return programsWeek;
    return programsToday;
  };

  const programsToRender = getActiveProgramsList();

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col h-full select-none" id="program-schedule-sidebar">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-yellow-400" />
        <h3 className="font-extrabold text-sm sm:text-base tracking-wider text-yellow-400 uppercase">
          PROGRAMME DU JOUR
        </h3>
      </div>

      {/* Tabs list (Aujourd'hui / Demain / Cette semaine) */}
      <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl mb-4 border border-white/10">
        <button
          onClick={() => onTabChange('today')}
          className={`flex-1 text-center py-2 text-[10px] md:text-xs font-black uppercase rounded-lg tracking-wider transition-colors cursor-pointer ${
            activeTab === 'today'
              ? 'bg-white/20 text-white border border-white/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Aujourd'hui
        </button>
        <button
          onClick={() => onTabChange('tomorrow')}
          className={`flex-1 text-center py-2 text-[10px] md:text-xs font-black uppercase rounded-lg tracking-wider transition-colors cursor-pointer ${
            activeTab === 'tomorrow'
              ? 'bg-white/20 text-white border border-white/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Demain
        </button>
        <button
          onClick={() => onTabChange('week')}
          className={`flex-1 text-center py-2 text-[10px] md:text-xs font-black uppercase rounded-lg tracking-wider transition-colors cursor-pointer ${
            activeTab === 'week'
              ? 'bg-white/20 text-white border border-white/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Cette semaine
        </button>
      </div>

      {/* Chronological list of programs */}
      <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[440px] pr-1 scrollbar-thin scrollbar-thumb-slate-800">
        {programsToRender.map((prog) => {
          const isCurrentlyActive = activeTab === 'today' && prog.id === activeProgramId;
          return (
            <div
              key={prog.id}
              onClick={() => onProgramSelect(prog, activeTab === 'today')}
              className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                isCurrentlyActive
                  ? 'bg-red-600/20 border-red-600/45 text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {/* Hour info */}
              <div className="flex flex-col items-center justify-center min-w-[50px] shrink-0 border-r border-slate-800/80 pr-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 mb-0.5" />
                <span className="text-[11px] font-mono font-bold tracking-tight text-slate-200">
                  {prog.time}
                </span>
              </div>

              {/* Thumbnail of program */}
              <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-slate-800/80">
                <img
                  src={prog.thumbnailUrl}
                  alt={prog.title}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                {isCurrentlyActive && (
                  <div className="absolute inset-0 bg-red-600/35 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  </div>
                )}
              </div>

              {/* Title & category details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold leading-tight truncate text-slate-100">
                  {prog.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${getCategoryStyles(prog.category)}`}>
                    {prog.category}
                  </span>
                  {prog.duration && (
                    <span className="text-[9px] font-mono text-slate-500 font-medium">
                      {prog.duration}
                    </span>
                  )}
                </div>
              </div>

              {/* Live Play Action Icon if active */}
              {isCurrentlyActive && (
                <div className="shrink-0 text-red-500 animate-pulse">
                  <PlayCircle className="w-5 h-5 fill-current" />
                </div>
              )}
            </div>
          );
        })}

        {programsToRender.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-xs font-semibold">
            Aucun programme programmé pour cette période.
          </div>
        )}
      </div>

      {/* Button footer */}
      <button 
        onClick={() => onTabChange('week')}
        className="mt-4 border border-white/10 hover:bg-white/5 text-yellow-400 font-bold text-[10px] md:text-xs py-2.5 rounded-xl uppercase tracking-widest transition-colors flex items-center justify-center gap-1 cursor-pointer"
      >
        Voir le programme complet →
      </button>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import BrandLogo from './BrandLogo';
import { Menu, X, Radio, Clock, Cloud, CloudOff, Play, CheckCircle, Wifi, WifiOff, Download, ChevronRight } from 'lucide-react';
import { Program } from '../types';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  onNavigateHome: () => void;
  isOnline?: boolean;
  isOfflineSimulated?: boolean;
  setIsOfflineSimulated?: (val: boolean) => void;
  downloadedProgramIds?: string[];
  allPrograms?: Program[];
  onPlayProgram?: (program: Program) => void;
}

export default function Header({ 
  onMenuToggle, 
  isMenuOpen, 
  onNavigateHome,
  isOnline = true,
  isOfflineSimulated = false,
  setIsOfflineSimulated = () => {},
  downloadedProgramIds = [],
  allPrograms = [],
  onPlayProgram = () => {}
}: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const [showCacheDropdown, setShowCacheDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCacheDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    // Capitalize first letter
    const str = date.toLocaleDateString('fr-FR', options);
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1B3A] border-b border-white/10 shadow-xl px-4 md:px-6 h-20 flex items-center justify-between select-none">
      <div className="w-full flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="cursor-pointer transition-transform hover:scale-[1.02]" onClick={onNavigateHome}>
          {/* Desktop Logo */}
          <BrandLogo simplified={false} className="hidden md:flex" />
          {/* Mobile Logo: Simplified to save space */}
          <BrandLogo simplified={true} className="flex md:hidden scale-90 origin-left" />
        </div>

        {/* Center: Mission Title (Hidden on Mobile) */}
        <div className="hidden lg:flex flex-col items-center text-center">
          <h1 className="text-lg xl:text-xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-300">
            LA TÉLÉ ÉDUCATIVE DES ENFANTS DU CAMEROUN
          </h1>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-[#007A5E] bg-[#007A5E]/10 px-2 py-0.5 rounded-full border border-[#007A5E]/30">Apprendre</span>
            <span className="text-[10px] uppercase font-bold text-[#CE1126] bg-[#CE1126]/10 px-2 py-0.5 rounded-full border border-[#CE1126]/30">Chanter</span>
            <span className="text-[10px] uppercase font-bold text-[#FCD116] bg-[#FCD116]/10 px-2 py-0.5 rounded-full border border-[#FCD116]/30">Mémoriser</span>
            <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded-full border border-sky-400/30">Réussir</span>
          </div>
        </div>

        {/* Right: Date, Connection, Live Indicator & Mobile Menu Burger */}
        <div className="flex items-center gap-3">
          {/* Live Indicator + Time info (desktop & tablet) */}
          <div className="hidden sm:flex flex-col items-end text-right font-mono text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(time)}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans mt-0.5">{formatDate(time)}</span>
          </div>

          {/* Connection Indicator (Cloud Icon) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowCacheDropdown(!showCacheDropdown)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                isOnline 
                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-red-500/10 border-red-500/25 text-red-400 hover:bg-red-500/20 animate-pulse'
              }`}
              title={isOnline ? "Connexion active - Gérer le cache" : "Hors-ligne - Gérer le cache"}
            >
              {isOnline ? (
                <Cloud className="w-4 h-4 text-emerald-400 animate-pulse" />
              ) : (
                <CloudOff className="w-4 h-4 text-red-400" />
              )}
              <span className="hidden md:inline text-[10px] font-black uppercase tracking-wider">
                {isOnline ? 'En Ligne' : 'Hors-Ligne'}
              </span>
              {/* Count bubble */}
              {downloadedProgramIds.length > 0 && (
                <span className="bg-amber-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {downloadedProgramIds.length}
                </span>
              )}
            </button>

            {/* THE DROPDOWN POPOVER PANEL */}
            {showCacheDropdown && (
              <div className="absolute right-0 mt-2.5 w-80 bg-[#0B1B3A] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 space-y-3.5 animate-fade-in text-left">
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="font-extrabold text-xs text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                    {isOnline ? <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> : <WifiOff className="w-3.5 h-3.5 text-red-400" />}
                    Réseau & Cache Local
                  </span>
                  <button 
                    onClick={() => setShowCacheDropdown(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Connection Status & Simulation Switch */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Simuler Hors-ligne</span>
                    <button
                      onClick={() => setIsOfflineSimulated(!isOfflineSimulated)}
                      className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                        isOfflineSimulated ? 'bg-red-500' : 'bg-slate-800'
                      }`}
                    >
                      <div className={`bg-white w-4.5 h-4.5 rounded-full shadow transform transition-transform duration-200 ${
                        isOfflineSimulated ? 'translate-x-4.5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                  <p className="text-[9px] text-slate-400 leading-normal">
                    {isOfflineSimulated 
                      ? 'Simulé hors-ligne : la lecture est restreinte aux cours déjà téléchargés.' 
                      : 'Activer pour tester le fonctionnement autonome sans connexion d\'ici.'}
                  </p>
                </div>

                {/* List of cached items */}
                <div className="space-y-2">
                  <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase block">
                    📚 Leçons Téléchargées ({downloadedProgramIds.length})
                  </span>
                  
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {downloadedProgramIds.map(id => {
                      const prog = allPrograms.find(p => p.id === id);
                      if (!prog) return null;
                      return (
                        <div 
                          key={id}
                          className="bg-white/5 border border-white/5 hover:border-white/10 rounded-xl p-2 flex items-center justify-between gap-3 group transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <span className="text-[8px] font-bold text-amber-400 uppercase tracking-wider block">
                              {prog.category}
                            </span>
                            <h5 className="text-[11px] font-extrabold text-slate-100 truncate mt-0.5" title={prog.title}>
                              {prog.title}
                            </h5>
                            <span className="text-[9px] text-slate-400 font-mono">
                              Durée : {prog.duration}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              onPlayProgram(prog);
                              setShowCacheDropdown(false);
                            }}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-1.5 rounded-lg transition-transform hover:scale-105 shrink-0"
                            title="Lire la leçon"
                          >
                            <Play className="w-3 h-3 fill-current" />
                          </button>
                        </div>
                      );
                    })}

                    {downloadedProgramIds.length === 0 && (
                      <div className="text-center py-6 bg-white/5 rounded-xl border border-dashed border-white/10 space-y-1">
                        <Download className="w-6 h-6 text-slate-600 mx-auto animate-bounce" />
                        <p className="text-[10px] text-slate-400 font-bold">Aucune leçon en cache</p>
                        <p className="text-[9px] text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                          Ajoutez des leçons en cliquant sur l'icône de téléchargement dans le replay ou l'accueil.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Badge En Direct (blinking pulse) */}
          <div className="flex items-center bg-red-600/15 border border-red-500/40 rounded-full px-2.5 py-1 text-red-400 font-bold text-[10px] md:text-xs tracking-wider uppercase shadow-sm">
            <span className="relative flex h-2 w-2 mr-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            EN DIRECT
          </div>

          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden flex items-center justify-center p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}

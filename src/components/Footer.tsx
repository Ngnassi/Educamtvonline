import React from 'react';
import { Megaphone, Facebook, Youtube, Flame, CheckCircle, ChevronRight } from 'lucide-react';

interface FooterProps {
  onOpenEduApp: (appId: 'educam1' | 'educam2') => void;
  onOpenAbout: () => void;
  facebookPageUrl?: string;
}

export default function Footer({ onOpenEduApp, onOpenAbout, facebookPageUrl = 'https://www.facebook.com/share/1anhA4PrMX/' }: FooterProps) {
  
  // Simulated announcements for the Info Flash ticker
  const flashNews = [
    "Journée Internationale des Musées : Visitez nos musées, découvrez notre histoire et préservez notre patrimoine. 🏛️",
    "Nouveau ! L'application EDUCAM2 intègre le jeu de calcul rapide et la chanson des 10 régions ! 🇨🇲",
    "Soutenez le Projet 'Les Enfants du Cameroun' par Ngnassi Gueu Sylvin pour équiper les écoles rurales en fournitures. 🎒",
    "Karaoké National : Participez au grand concours national de chants patriotiques en envoyant votre vidéo ! 🎤"
  ];

  return (
    <footer className="w-full bg-[#07132a] border-t border-white/10 mt-12 select-none">
      
      {/* 8.1 Bandeau "INFO FLASH" (France 24 style single-line loop) */}
      <div className="bg-[#030a16] border-y border-white/5 text-white px-3 py-2 flex items-center gap-3 overflow-hidden shadow-lg">
        {/* Compact, space-saving red badge */}
        <div className="flex items-center gap-1.5 shrink-0 bg-red-600 px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-black uppercase tracking-widest text-white shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0" />
          <span>FLASH</span>
        </div>
        
        {/* Single-line continuous flex marquee */}
        <div className="flex-1 overflow-hidden relative flex items-center h-5">
          <div className="flex gap-16 whitespace-nowrap animate-marquee-flex shrink-0">
            {flashNews.map((news, idx) => (
              <span key={`news-${idx}`} className="inline-flex items-center gap-2 shrink-0 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 block shrink-0" />
                <span className="text-slate-100 text-xs sm:text-sm font-semibold leading-none">{news}</span>
              </span>
            ))}
            {/* Duplicate for seamless infinite loop */}
            {flashNews.map((news, idx) => (
              <span key={`dup-${idx}`} className="inline-flex items-center gap-2 shrink-0 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 block shrink-0" />
                <span className="text-slate-100 text-xs sm:text-sm font-semibold leading-none">{news}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Block */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-start">
        
        {/* Left/Center Column: Brand and motto */}
        <div className="space-y-3.5 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            {/* Styled Logo Emblem */}
            <div className="flex gap-1 bg-[#0B1B3A] border border-white/10 p-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-[#007A5E]" />
              <span className="w-2 h-2 rounded-full bg-[#CE1126]" />
              <span className="w-2 h-2 rounded-full bg-[#FCD116]" />
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-200 tracking-wider uppercase">
              LES ENFANTS DU CAMEROUN
            </h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Projet éducatif fondé par Ngnassi Gueu Sylvin visant la promotion de l'excellence académique à travers le bilinguisme et la pédagogie musicale.
          </p>
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            Apprendre • Chanter • Mémoriser • Réussir
          </div>
        </div>

        {/* Middle Column: Suivez-nous social icons */}
        <div className="space-y-4 flex flex-col items-center">
          <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest text-center">
            SUIVEZ-NOUS
          </h4>
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
              title="Facebook"
            >
              <Facebook className="w-5 h-5 fill-current" />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
              title="YouTube"
            >
              <Youtube className="w-5 h-5 fill-current" />
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 text-slate-200 hover:bg-white hover:text-slate-950 flex items-center justify-center transition-all shadow-sm cursor-pointer"
              title="TikTok"
            >
              {/* Simple flame / music note representation for tiktok */}
              <Flame className="w-5 h-5 fill-current" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-pink-600/10 border border-pink-500/30 text-pink-400 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
          <button
            onClick={onOpenAbout}
            className="text-[11px] font-bold text-slate-400 hover:text-amber-400 underline cursor-pointer"
          >
            Découvrir l'association →
          </button>
        </div>

        {/* Right Column: Nos applications éducatives */}
        <div className="space-y-4 flex flex-col items-center md:items-end">
          <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest">
            NOS APPLICATIONS ÉDUCATIVES
          </h4>
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full max-w-xs sm:max-w-none">
            {/* EDUCAM1 */}
            <button
              onClick={() => onOpenEduApp('educam1')}
              className="flex-1 flex items-center justify-between px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-left text-xs text-slate-300 font-bold"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                <span>EDUCAM1 (Maths & Français)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            {/* EDUCAM2 */}
            <button
              onClick={() => onOpenEduApp('educam2')}
              className="flex-1 flex items-center justify-between px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-left text-xs text-slate-300 font-bold"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>EDUCAM2 (Sciences & Chansons)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

      </div>

      {/* Rights statement bar */}
      <div className="border-t border-slate-900/80 bg-black/40 py-4 px-4 text-center text-[10px] text-slate-500">
        <span>© 2026 EDUCAM TV Online • Projet éducatif pour la jeunesse camerounaise • Tous droits réservés.</span>
      </div>

    </footer>
  );
}

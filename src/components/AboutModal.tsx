import React from 'react';
import { X, Heart, Shield, Globe, Award, Sparkles, BookOpen, Music } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#081329] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-8 animate-fade-in">
        
        {/* Banner with Cameroon background decoration */}
        <div className="relative bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] px-5 py-6 text-white text-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10">
            <h3 className="text-xl font-black tracking-wider uppercase">
              EDUCAM TV ONLINE
            </h3>
            <p className="text-xs text-yellow-200 uppercase font-bold tracking-widest mt-1">
              « Apprendre le Cameroun en chantant »
            </p>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6 text-slate-300">
          
          {/* Section 1: Intro */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span>LE PROJET "LES ENFANTS DU CAMEROUN"</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              Fondé par <strong>Ngnassi Gueu Sylvin</strong>, le projet <strong>« Les Enfants du Cameroun »</strong> est une initiative éducative pionnière qui vise à moderniser le soutien scolaire et la transmission culturelle au Cameroun.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              Notre devise, <strong>Apprendre • Chanter • Mémoriser • Réussir</strong>, reflète notre méthode pédagogique : utiliser le rythme, la mélodie et l'éducation bilingue (Français/Anglais) pour ancrer durablemement les connaissances scolaires.
            </p>
          </div>

          {/* Section 2: Values (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#007A5E]/20 text-[#007A5E] shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Soutien Scolaire Innovant</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Calculs, orthographe, histoire et géographie présentés de manière ludique.</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-900/20 text-purple-400 shrink-0">
                <Music className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Karaoké National</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Chansons éducatives pour apprendre en s'amusant et développer la confiance en soi.</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-900/20 text-amber-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Citoyenneté & Valeurs</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Sensibilisation à la protection de l'environnement, au patriotisme et au bilinguisme.</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-teal-900/20 text-teal-400 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Inclusion & Égalité</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Un contenu accessible à toutes les familles et enseignants, même en zones reculées.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Call to Action / Contact */}
          <div className="bg-[#0f244a]/40 border border-slate-800 p-4 rounded-xl text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-black uppercase">
              <Heart className="w-4 h-4 fill-current text-red-500 animate-pulse" />
              <span>Soutenez l'association</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Aidez-nous à équiper plus de classes du primaire en matériels audio, livrets chantés et cartes scolaires géographiques.
            </p>
            <div className="flex gap-2 justify-center pt-1.5">
              <a
                href="mailto:lesenfantsducameroun2026@gmail.com"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-lg transition-colors inline-block"
              >
                Nous contacter
              </a>
              <button
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2 rounded-lg transition-colors border border-slate-700"
              >
                Fermer
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="bg-slate-950/60 border-t border-slate-800/80 px-6 py-3 text-center text-[10px] text-slate-500">
          <span>© 2026 Les Enfants du Cameroun • Fondateur : Ngnassi Gueu Sylvin</span>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Award, 
  Trophy, 
  Play, 
  Pause, 
  Star, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  BookOpen, 
  Music, 
  CheckCircle, 
  Sparkles, 
  Home, 
  Map, 
  Settings, 
  User, 
  Info, 
  Calendar, 
  ChevronRight,
  Search,
  Check,
  Phone,
  MessageCircle,
  HelpCircle,
  Flame,
  Milestone
} from 'lucide-react';

interface EduAppsModalProps {
  appId: 'educam1' | 'educam2' | null;
  onClose: () => void;
}

export default function EduAppsModal({ appId, onClose }: EduAppsModalProps) {
  if (!appId) return null;

  // Language state FR/EN
  const [lang, setLang] = useState<'FR' | 'EN'>('FR');

  // Interactive state variables
  // EDUCAM1 simulated app tabs: 'accueil', 'regions', 'quiz', 'fiches', 'about', 'reglages'
  const [edu1ActiveTab, setEdu1ActiveTab] = useState<string>('accueil');
  const [edu1PlayingSong, setEdu1PlayingSong] = useState<string | null>(null);
  const [edu1SelectedRegion, setEdu1SelectedRegion] = useState<string | null>(null);
  const [edu1QuizAnswered, setEdu1QuizAnswered] = useState<boolean>(false);
  const [edu1QuizSelected, setEdu1QuizSelected] = useState<string | null>(null);

  // EDUCAM2 simulated app tabs: 'accueil', 'quiz', 'carte', 'moi', 'about'
  const [edu2ActiveTab, setEdu2ActiveTab] = useState<string>('accueil');
  const [edu2PlayingAudio, setEdu2PlayingAudio] = useState<boolean>(false);
  const [edu2ChallengeType, setEdu2ChallengeType] = useState<'modes' | 'categories' | 'regions'>('modes');
  const [edu2SelectedDefi, setEdu2SelectedDefi] = useState<string | null>(null);

  // 10 regions info for Atlas and Cards
  const CAMEROON_REGIONS = [
    { id: 'adamaoua', name: 'Adamaoua', chefLieu: 'Ngaoundéré', color: 'fill-teal-500 hover:fill-teal-400', textColor: 'text-teal-400', greeting: 'Jam bandu !', description: 'Le château d\'eau du Cameroun, riche en élevages et hauts plateaux.' },
    { id: 'centre', name: 'Centre', chefLieu: 'Yaoundé', color: 'fill-emerald-500 hover:fill-emerald-400', textColor: 'text-emerald-400', greeting: 'Mbelem !', description: 'La colline parfumée, abritant Yaoundé, la capitale politique.' },
    { id: 'est', name: 'Est', chefLieu: 'Bertoua', color: 'fill-amber-500 hover:fill-amber-400', textColor: 'text-amber-400', greeting: 'Mbolo !', description: 'Région forestière immense, abritant la réserve du Dja.' },
    { id: 'extreme_nord', name: 'Extrême-Nord', chefLieu: 'Maroua', color: 'fill-yellow-500 hover:fill-yellow-400', textColor: 'text-yellow-400', greeting: 'Jam bandu !', description: 'Maroua l\'artisanale, parc de Waza et montagnes d\'Alantika.' },
    { id: 'littoral', name: 'Littoral', chefLieu: 'Douala', color: 'fill-blue-500 hover:fill-blue-400', textColor: 'text-blue-400', greeting: 'A nyo !', description: 'Douala la vibrante, poumon économique et fleuve Wouri.' },
    { id: 'nord', name: 'Nord', chefLieu: 'Garoua', color: 'fill-pink-500 hover:fill-pink-400', textColor: 'text-pink-400', greeting: 'Jam bandu !', description: 'Le fleuve Bénoué, berceau du coton et parcs nationaux.' },
    { id: 'nord_ouest', name: 'Nord-Ouest', chefLieu: 'Bamenda', color: 'fill-purple-500 hover:fill-purple-400', textColor: 'text-purple-400', greeting: 'A-li-ah !', description: 'Hauts sommets montagneux, pays du Fon et des chefferies.' },
    { id: 'ouest', name: 'Ouest', chefLieu: 'Bafoussam', color: 'fill-red-500 hover:fill-red-400', textColor: 'text-red-400', greeting: 'O gha !', description: 'Pays Bamiléké, collines fertiles et danses Ben-Skin rythmées.' },
    { id: 'sud', name: 'Sud', chefLieu: 'Ebolowa', color: 'fill-sky-500 hover:fill-sky-400', textColor: 'text-sky-400', greeting: 'Mbolo !', description: 'Forêts denses, plages de Kribi et chutes de la Lobé.' },
    { id: 'sud_ouest', name: 'Sud-Ouest', chefLieu: 'Buea', color: 'fill-indigo-500 hover:fill-indigo-400', textColor: 'text-indigo-400', greeting: 'A-lo-buh !', description: 'Le majestueux Mont Cameroun, plages de sable noir de Limbe.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-slate-950/85 backdrop-blur-md select-none overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-4">
        
        {/* Device Top bezel simulating a premium phone simulator frame */}
        <div className="bg-[#050e1e] px-4 py-3 border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-black text-slate-300 uppercase tracking-wider">
              {appId === 'educam1' ? 'PROMOTION COMPAGNON : EDUCAM 1' : 'PROMOTION COMPAGNON : EDUCAM 2'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="Quitter le simulateur"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content body simulating the smartphone frame screen */}
        <div className="p-3 sm:p-5 bg-gradient-to-b from-[#091835] to-[#040b17] flex-1">
          {/* Simulated Phone camera notch */}
          <div className="w-28 h-4.5 bg-black rounded-full mx-auto mb-3.5 flex items-center justify-center gap-1">
            <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
            <div className="w-8 h-1 bg-slate-900 rounded-full" />
          </div>

          {/* VIEWPORT SCREEN CHASSIS */}
          <div className="bg-[#FBF8F3] text-slate-900 rounded-3xl border-4 border-slate-800 aspect-[10/16] max-h-[640px] flex flex-col justify-between overflow-hidden shadow-inner relative">
            
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-1.5 text-[9px] font-mono text-slate-500 border-b border-slate-100 bg-white z-20 shrink-0">
              <span className="font-bold">EDUCAM-NETWORK</span>
              <div className="flex items-center gap-1">
                <span>4G 📶</span>
                <span>100% 🔋</span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 1. APP: EDUCAM1 SIMULATOR (SCREENSHOTS 1, 2, 3, 4, 8) */}
            {/* ------------------------------------------------------------- */}
            {appId === 'educam1' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                
                {/* 1.1 EDUCAM1 APP HEADER BAR (BILINGUAL) */}
                <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-slate-200 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-emerald-700 rounded-lg flex items-center justify-center text-white text-xs font-black">
                      E1
                    </div>
                    <span className="font-black text-sm text-[#007A5E] tracking-tight">Educam1</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    {/* Language pill selection */}
                    <button 
                      onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
                      className="bg-slate-100 px-2 py-1 rounded-full text-[9px] font-black text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      {lang} | {lang === 'FR' ? 'EN' : 'FR'}
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-600">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 1.2 EDUCAM1 DYNAMIC VIEWPORT VIEWS */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">

                  {/* VIEW A: ACCUEIL (SCREENSHOT 1 & 2 combined) */}
                  {edu1ActiveTab === 'accueil' && (
                    <div className="space-y-4 animate-fade-in">
                      
                      {/* Greeting hand element */}
                      <div className="text-center space-y-1">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-xl">
                          👋
                        </div>
                        <h3 className="text-lg font-black tracking-tight text-slate-800">
                          {lang === 'FR' ? 'Mbolo ! Bienvenue !' : 'Mbolo ! Welcome !'}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-slate-500 leading-tight max-w-xs mx-auto">
                          {lang === 'FR' 
                            ? 'Découvre les 10 régions du Cameroun à travers leurs musiques, leurs capitales et leurs histoires.' 
                            : 'Discover the 10 regions of Cameroon through their music, capitals, and histories.'}
                        </p>
                      </div>

                      {/* Music box Player (Screenshot 1) */}
                      <div className="bg-[#007A5E] text-white p-3.5 rounded-2xl shadow-sm space-y-3">
                        <span className="text-[8px] font-black tracking-widest text-emerald-100 bg-[#005c46] px-2 py-0.5 rounded uppercase">
                          {lang === 'FR' ? 'CHANSON OFFICIELLE' : 'OFFICIAL SONG'}
                        </span>
                        
                        {/* Player 1 */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold leading-tight">
                            {lang === 'FR' ? 'Les 10 Régions du Cameroun' : 'The 10 Regions of Cameroon'}
                          </h4>
                          
                          {/* Play simulated controls */}
                          <div className="bg-white/10 rounded-xl p-2 flex items-center justify-between gap-2">
                            <button 
                              onClick={() => setEdu1PlayingSong(edu1PlayingSong === 'regions' ? null : 'regions')}
                              className="w-7 h-7 rounded-full bg-white text-[#007A5E] flex items-center justify-center hover:scale-105 transition-transform"
                            >
                              {edu1PlayingSong === 'regions' ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />}
                            </button>
                            <span className="text-[9px] font-mono font-semibold">
                              {edu1PlayingSong === 'regions' ? '0:18 / 3:14' : '0:00 / 3:14'}
                            </span>
                            {/* Animated sound wave lines */}
                            <div className="flex items-end gap-0.5 h-3.5">
                              {[1, 2, 3, 4, 5].map((w) => (
                                <div 
                                  key={w} 
                                  className={`w-0.5 bg-white rounded-full transition-all duration-300 ${
                                    edu1PlayingSong === 'regions' ? 'animate-pulse h-3' : 'h-1.5'
                                  }`} 
                                  style={{ animationDelay: `${w * 150}ms` }}
                                />
                              ))}
                            </div>
                            <Volume2 className="w-3.5 h-3.5 text-emerald-200" />
                          </div>
                        </div>

                        {/* Player 2 */}
                        <div className="space-y-2 pt-2 border-t border-emerald-600/50">
                          <h4 className="text-xs font-bold leading-tight">
                            {lang === 'FR' ? 'Sites touristiques du Cameroun' : 'Touristic Sites of Cameroon'}
                          </h4>
                          
                          {/* Play simulated controls */}
                          <div className="bg-white/10 rounded-xl p-2 flex items-center justify-between gap-2">
                            <button 
                              onClick={() => setEdu1PlayingSong(edu1PlayingSong === 'tourisme' ? null : 'tourisme')}
                              className="w-7 h-7 rounded-full bg-white text-[#007A5E] flex items-center justify-center hover:scale-105 transition-transform"
                            >
                              {edu1PlayingSong === 'tourisme' ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />}
                            </button>
                            <span className="text-[9px] font-mono font-semibold">
                              {edu1PlayingSong === 'tourisme' ? '0:08 / 3:04' : '0:00 / 3:04'}
                            </span>
                            <div className="flex items-end gap-0.5 h-3.5">
                              {[1, 2, 3, 4, 5].map((w) => (
                                <div 
                                  key={w} 
                                  className={`w-0.5 bg-white rounded-full transition-all duration-300 ${
                                    edu1PlayingSong === 'tourisme' ? 'animate-pulse h-3' : 'h-1.5'
                                  }`} 
                                  style={{ animationDelay: `${w * 150}ms` }}
                                />
                              ))}
                            </div>
                            <Volume2 className="w-3.5 h-3.5 text-emerald-200" />
                          </div>
                        </div>
                      </div>

                      {/* Direct Links section block (Screenshot 2) */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                          {lang === 'FR' ? 'EXPLORER LES MODULES' : 'EXPLORE MODULES'}
                        </span>
                        
                        {/* Explorer les régions (Green button) */}
                        <button 
                          onClick={() => setEdu1ActiveTab('regions')}
                          className="w-full bg-[#007A5E] hover:bg-[#005c46] text-white p-3 rounded-xl flex items-center justify-between text-left transition-transform hover:scale-[1.01]"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-white/10 rounded-lg text-white">
                              <Map className="w-4 h-4" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold">{lang === 'FR' ? 'Explorer les régions' : 'Explore regions'}</h5>
                              <p className="text-[9px] text-emerald-100 line-clamp-1">Capitales, ethnies et chansons traditionnelles.</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-emerald-200" />
                        </button>

                        {/* Jouer au Quiz (Red button) */}
                        <button 
                          onClick={() => setEdu1ActiveTab('quiz')}
                          className="w-full bg-[#CE1126] hover:bg-[#a60d1d] text-white p-3 rounded-xl flex items-center justify-between text-left transition-transform hover:scale-[1.01]"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-white/10 rounded-lg text-white">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold">{lang === 'FR' ? 'Jouer au Quiz' : 'Play the Quiz'}</h5>
                              <p className="text-[9px] text-red-100 line-clamp-1">Vérifie tes connaissances sur notre beau pays !</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-red-200" />
                        </button>

                        {/* Fiches Flash (Yellow button) */}
                        <button 
                          onClick={() => setEdu1ActiveTab('fiches')}
                          className="w-full bg-[#FCD116] hover:bg-[#dfb70a] text-slate-950 p-3 rounded-xl flex items-center justify-between text-left transition-transform hover:scale-[1.01]"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-black/10 rounded-lg text-slate-950">
                              <Music className="w-4 h-4" />
                            </div>
                            <div>
                              <h5 className="text-xs font-black">{lang === 'FR' ? 'Fiches Flash' : 'Flash Cards'}</h5>
                              <p className="text-[9px] text-amber-900 font-bold line-clamp-1">Cartes interactives avec audios ethniques phares.</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-amber-900" />
                        </button>
                      </div>

                    </div>
                  )}

                  {/* VIEW B: REGIONS / ATLAS NATIONAL INTERACTIF (SCREENSHOT 8) */}
                  {edu1ActiveTab === 'regions' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-1">
                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest block">CARTE INTERACTIVE</span>
                        <h3 className="text-sm font-black text-slate-800">Cartographie Muette Nationale</h3>
                        <p className="text-[10px] text-slate-500 leading-tight">
                          Relevez le défi : situez les 10 régions du Cameroun sur une carte vierge !
                        </p>
                      </div>

                      {/* Map controls mock bar */}
                      <div className="flex gap-2 justify-between">
                        <div className="flex gap-1">
                          <button className="bg-slate-100 p-1.5 rounded border border-slate-200 text-slate-600">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            className="bg-slate-100 p-1.5 rounded border border-slate-200 text-slate-600"
                            onClick={() => setEdu1SelectedRegion(null)}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex gap-1.5 bg-slate-100 p-0.5 rounded border">
                          <span className="text-[9px] font-bold px-2 py-1 bg-white rounded shadow-sm">Carte Réelle</span>
                          <span className="text-[9px] text-slate-500 px-2 py-1">Vierge</span>
                        </div>
                      </div>

                      {/* Interactive stylized Map layout simulating Screenshot 8 */}
                      <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-200 flex flex-col items-center">
                        <span className="text-[8px] font-bold text-slate-400 uppercase mb-2">CLIQUEZ SUR UNE RÉGION POUR ÉCOUTER LA COMPTINE</span>
                        
                        {/* Simple clickable region pills representation of Cameroon */}
                        <div className="grid grid-cols-2 gap-2 w-full">
                          {CAMEROON_REGIONS.map((reg) => {
                            const isSelected = edu1SelectedRegion === reg.id;
                            return (
                              <button
                                key={reg.id}
                                onClick={() => setEdu1SelectedRegion(reg.id)}
                                className={`p-2 rounded-xl text-left border text-xs transition-colors flex items-center justify-between ${
                                  isSelected 
                                    ? 'bg-[#007A5E] text-white border-emerald-600 shadow-md'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                <div>
                                  <span className="font-extrabold block leading-none">{reg.name}</span>
                                  <span className={`text-[8px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                                    Chef-lieu: {reg.chefLieu}
                                  </span>
                                </div>
                                <span className="text-[10px] bg-black/10 px-1 rounded font-mono font-bold">
                                  🇨🇲
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Region Info Board detail */}
                      {edu1SelectedRegion && (
                        <div className="bg-white p-3 rounded-xl border border-slate-200 animate-fade-in space-y-1">
                          {(() => {
                            const reg = CAMEROON_REGIONS.find(r => r.id === edu1SelectedRegion)!;
                            return (
                              <>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-black text-[#007A5E] uppercase">RÉGION : {reg.name}</span>
                                  <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                    Salutation : "{reg.greeting}"
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                                  {reg.description}
                                </p>
                              </>
                            );
                          })()}
                        </div>
                      )}

                    </div>
                  )}

                  {/* VIEW C: QUIZ (SCREENSHOT 3) */}
                  {edu1ActiveTab === 'quiz' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          CM1 / CM2 QUIZ
                        </span>
                        <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                          1 / 10
                        </span>
                      </div>

                      {/* Green loading bar progress */}
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 w-1/10 rounded-full" />
                      </div>

                      {/* Quiz Question Card */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm text-center">
                        <h4 className="text-sm font-black text-slate-800 leading-snug">
                          Quelle est la capitale de la région du Centre (et aussi la capitale politique du Cameroun) ?
                        </h4>

                        <div className="space-y-2 pt-2">
                          {['Douala', 'Yaoundé', 'Garoua', 'Bafoussam'].map((opt) => {
                            const isSelected = edu1QuizSelected === opt;
                            const isCorrect = opt === 'Yaoundé';
                            let btnStyle = "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";
                            
                            if (edu1QuizAnswered) {
                              if (isCorrect) {
                                btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 font-bold";
                              } else if (isSelected) {
                                btnStyle = "border-red-500 bg-red-500/10 text-red-700";
                              } else {
                                btnStyle = "border-slate-100 opacity-40 text-slate-400";
                              }
                            } else if (isSelected) {
                              btnStyle = "border-amber-400 bg-amber-50 text-amber-700 font-bold";
                            }

                            return (
                              <button
                                key={opt}
                                disabled={edu1QuizAnswered}
                                onClick={() => {
                                  setEdu1QuizSelected(opt);
                                  setEdu1QuizAnswered(true);
                                }}
                                className={`w-full text-center py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Explanation response feedback */}
                      {edu1QuizAnswered && (
                        <div className="bg-[#007A5E]/5 border border-emerald-500/20 p-3.5 rounded-xl text-center space-y-2 animate-fade-in">
                          <p className="text-xs font-bold text-slate-800">
                            {edu1QuizSelected === 'Yaoundé' 
                              ? '🎉 Excellent ! Yaoundé est bien la capitale politique, bâtie sur sept collines.' 
                              : '💡 Ah, c\'est Yaoundé ! Douala est la capitale économique.'}
                          </p>
                          <button 
                            onClick={() => {
                              setEdu1QuizAnswered(false);
                              setEdu1QuizSelected(null);
                            }}
                            className="bg-[#007A5E] hover:bg-[#005c46] text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg"
                          >
                            Suivant
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* VIEW D: FICHES FLASH */}
                  {edu1ActiveTab === 'fiches' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-1">
                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest block">RÉVISION MUSICALE</span>
                        <h3 className="text-sm font-black text-slate-800">Fiches Flash des 10 Régions</h3>
                        <p className="text-[10px] text-slate-500 leading-tight">
                          Parcourez les fiches de révision et mémorisez les langues ainsi que les traditions phares.
                        </p>
                      </div>

                      {/* Interactive cards list */}
                      <div className="space-y-2">
                        {CAMEROON_REGIONS.slice(0, 5).map((reg) => (
                          <div key={reg.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                            <div className="space-y-0.5">
                              <span className="text-xs font-extrabold text-slate-800">{reg.name}</span>
                              <p className="text-[10px] text-slate-400 font-medium">Chef-lieu: {reg.chefLieu} • Salutation: "{reg.greeting}"</p>
                            </div>
                            <button 
                              onClick={() => {
                                alert(`Simulateur : Lecture du chant éducatif pour la région de ${reg.name} en langue vernaculaire.`);
                              }}
                              className="p-1.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-500 hover:bg-amber-100"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* VIEW E: ABOUT / À PROPOS DE L'APPLICATION (SCREENSHOT 4 & 9) */}
                  {edu1ActiveTab === 'about' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="text-center">
                        <span className="text-[8px] font-black tracking-widest text-slate-400 uppercase">À propos de l'application</span>
                        <div className="w-16 h-16 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-2xl flex items-center justify-center text-white text-lg font-black mx-auto mt-2 shadow-md">
                          EDUCAM1
                        </div>
                        <h3 className="text-sm font-black text-slate-800 uppercase mt-1.5">Les Enfants du Cameroun</h3>
                        <p className="text-[11px] text-slate-500 italic font-medium">« Apprendre le Cameroun en chantant »</p>
                      </div>

                      {/* App core badges row */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {['APPRENDRE', 'CHANTER', 'MÉMORISER', 'RÉUSSIR'].map((badge, idx) => {
                          const colors = ['bg-[#007A5E] text-white', 'bg-[#CE1126] text-white', 'bg-[#FCD116] text-slate-900', 'bg-teal-700 text-white'];
                          return (
                            <span key={idx} className={`${colors[idx]} text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase`}>
                              {badge}
                            </span>
                          );
                        })}
                      </div>

                      {/* Founder Personal Card from Screenshot 9 */}
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 shrink-0">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 font-extrabold block leading-none">FONDATEUR</span>
                            <span className="text-xs font-bold text-slate-800">Ngnassi Gueu Sylvin</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400">📍</span>
                            <span>Douala, Cameroun — Siège de l'initiative</span>
                          </div>
                          
                          {/* Phones & WhatsApp lines */}
                          <div className="pt-1.5 border-t border-slate-50/60 space-y-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">TELEPHONES & WHATSAPP</span>
                            <div className="flex items-center gap-1 text-slate-700 font-bold">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>+237 641 81 65 78</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-700 font-bold">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>+237 679 03 15 29</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Support association block */}
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-center space-y-1">
                        <h4 className="text-[10px] font-black text-amber-800 uppercase">Soutenez le Projet Éducatif</h4>
                        <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                          Aidez-nous à doter les écoles de kits d'écoute. Écrivez-nous directement par mail ou WhatsApp.
                        </p>
                      </div>

                    </div>
                  )}

                </div>

                {/* 1.3 EDUCAM1 NAV BAR (SCREENSHOT 1 BOTTOM NAV BAR) */}
                <div className="bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shrink-0 z-10 shadow-lg">
                  {[
                    { id: 'accueil', label: 'Accueil', icon: Home },
                    { id: 'regions', label: 'Régions', icon: Map },
                    { id: 'quiz', label: 'Quiz', icon: BookOpen },
                    { id: 'fiches', label: 'Fiches', icon: Music },
                    { id: 'about', label: 'À propos', icon: Info }
                  ].map((item) => {
                    const IconComp = item.icon;
                    const isActive = edu1ActiveTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setEdu1ActiveTab(item.id);
                          setEdu1PlayingSong(null);
                        }}
                        className={`flex flex-col items-center justify-center py-0.5 px-2.5 rounded-lg transition-colors cursor-pointer min-h-[38px] ${
                          isActive ? 'text-[#007A5E] font-black scale-102' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span className="text-[8px] font-bold mt-0.5 uppercase tracking-wide">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 2. APP: EDUCAM2 SIMULATOR (SCREENSHOTS 5, 6, 7) */}
            {/* ------------------------------------------------------------- */}
            {appId === 'educam2' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                
                {/* 2.1 EDUCAM2 APP HEADER BAR */}
                <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-slate-200 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center text-white text-xs font-black">
                      E2
                    </div>
                    <span className="font-black text-sm text-amber-500 tracking-tight">Educam2</span>
                  </div>
                  
                  <button className="p-1 text-slate-400 hover:text-slate-600">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>

                {/* 2.2 EDUCAM2 DYNAMIC VIEWPORT VIEWS */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">

                  {/* VIEW A: ACCUEIL (SCREENSHOT 5) */}
                  {edu2ActiveTab === 'accueil' && (
                    <div className="space-y-4 animate-fade-in">
                      
                      {/* Top banner with rich green gradient */}
                      <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-4 rounded-2xl shadow-sm space-y-3 relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 opacity-10 translate-x-3 translate-y-3">
                          <Map className="w-24 h-24" />
                        </div>
                        
                        <div className="flex justify-between items-start">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-extrabold uppercase text-emerald-300 tracking-widest block">BONJOUR 👋</span>
                            <h4 className="text-base font-black leading-tight text-white">Educam2</h4>
                            <p className="text-[10px] text-emerald-100">Découvre le Cameroun en jouant</p>
                          </div>
                          <button 
                            onClick={() => setEdu2PlayingAudio(!edu2PlayingAudio)}
                            className={`p-1.5 rounded-full text-white cursor-pointer transition-colors ${
                              edu2PlayingAudio ? 'bg-amber-500' : 'bg-white/10 hover:bg-white/20'
                            }`}
                          >
                            {edu2PlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Progress Widget */}
                        <div className="space-y-1.5 pt-2 border-t border-emerald-700/50">
                          <div className="flex justify-between text-[9px] font-bold text-emerald-200">
                            <span>Niveau 4</span>
                            <span>249 / 480 XP</span>
                          </div>
                          {/* Progress yellow line */}
                          <div className="h-1.5 w-full bg-slate-950/40 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 w-[52%] rounded-full" />
                          </div>
                        </div>

                        {/* Stats mini rectangles */}
                        <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                          <div className="bg-white/10 p-1.5 rounded-xl border border-white/5">
                            <span className="text-xs font-black block leading-none text-amber-300">25</span>
                            <span className="text-[7px] font-bold uppercase tracking-wider text-emerald-200 block mt-0.5">Réponses</span>
                          </div>
                          <div className="bg-white/10 p-1.5 rounded-xl border border-white/5">
                            <span className="text-xs font-black block leading-none text-amber-300">45%</span>
                            <span className="text-[7px] font-bold uppercase tracking-wider text-emerald-200 block mt-0.5">Précision</span>
                          </div>
                          <div className="bg-white/10 p-1.5 rounded-xl border border-white/5">
                            <span className="text-xs font-black block leading-none text-amber-300">5</span>
                            <span className="text-[7px] font-bold uppercase tracking-wider text-emerald-200 block mt-0.5">Meill. Série</span>
                          </div>
                        </div>
                      </div>

                      {/* Défis rapides Grid */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Défis Rapides</span>
                          <span className="text-[9px] font-bold text-emerald-600 hover:underline cursor-pointer">Voir tout</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: 'Défi du jour', icon: Calendar, color: 'text-amber-500 bg-amber-50' },
                            { name: 'Défi de la semaine', icon: Calendar, color: 'text-emerald-500 bg-emerald-50' },
                            { name: 'Contre la montre', icon: Flame, color: 'text-red-500 bg-red-50' },
                            { name: 'Défi surprise', icon: Sparkles, color: 'text-indigo-500 bg-indigo-50' }
                          ].map((defi, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setEdu2ActiveTab('quiz');
                                setEdu2SelectedDefi(defi.name);
                              }}
                              className="p-3 bg-white border border-slate-100 rounded-2xl text-center space-y-1.5 hover:bg-slate-50 transition-colors cursor-pointer hover:scale-[1.01]"
                            >
                              <div className={`w-8 h-8 rounded-full ${defi.color} flex items-center justify-center mx-auto`}>
                                <defi.icon className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-extrabold text-slate-700 block leading-tight">{defi.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* VIEW B: CHOOSE CHALLENGE / CHOISIS TON DÉFI (SCREENSHOT 6) */}
                  {edu2ActiveTab === 'quiz' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-1 text-center">
                        <h3 className="text-sm font-black text-slate-800">Choisis ton défi</h3>
                        <p className="text-[10px] text-slate-400 font-medium leading-none">12 modes de jeu, 50 catégories, 10 régions</p>
                      </div>

                      {/* Segmented buttons: Modes, Catégories, Régions */}
                      <div className="flex gap-1.5 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                        {(['modes', 'categories', 'regions'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setEdu2ChallengeType(type)}
                            className={`flex-1 text-center py-1 text-[10px] font-bold rounded-lg transition-colors capitalize ${
                              edu2ChallengeType === type
                                ? 'bg-[#007A5E] text-white shadow-sm font-extrabold'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {type === 'modes' ? 'Modes' : type === 'categories' ? 'Catégories' : 'Régions'}
                          </button>
                        ))}
                      </div>

                      {/* List of Game options */}
                      <div className="space-y-2 max-h-[320px] overflow-y-auto">
                        {[
                          { id: 'classic', code: 'Q', title: 'Quiz classique', desc: '10 questions, à ton rythme.', color: 'bg-emerald-100 text-emerald-800' },
                          { id: 'timer', code: 'C', title: 'Contre la montre', desc: '15 secondes par question.', color: 'bg-red-100 text-red-800' },
                          { id: 'sudden', code: 'M', title: 'Mort subite', desc: 'Une erreur et c\'est fini !', color: 'bg-purple-100 text-purple-800' },
                          { id: 'daily', code: 'D', title: 'Défi quotidien', desc: 'Le même défi pour tous chaque jour.', color: 'bg-amber-100 text-amber-800' },
                          { id: 'weekly', code: 'W', title: 'Défi hebdomadaire', desc: '15 questions, une fois par semaine.', color: 'bg-sky-100 text-sky-800' }
                        ].map((defi) => (
                          <button
                            key={defi.id}
                            onClick={() => {
                              alert(`Simulateur : Lancement du défi "${defi.title}" dans Educam2 ! Préparez-vous à tester votre précision.`);
                            }}
                            className="w-full bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${defi.color} flex items-center justify-center font-mono font-black text-xs shrink-0`}>
                                {defi.code}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-800">{defi.title}</h4>
                                <p className="text-[9px] text-slate-400">{defi.desc}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>
                        ))}
                      </div>

                    </div>
                  )}

                  {/* VIEW C: MY PROGRESSION (SCREENSHOT 7) */}
                  {edu2ActiveTab === 'moi' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Green background progression header card */}
                      <div className="bg-gradient-to-br from-[#007A5E] to-[#005c46] text-white p-4 rounded-2xl shadow-sm space-y-3">
                        <span className="text-[9px] font-extrabold uppercase text-emerald-300 tracking-widest block">MON PROFIL</span>
                        <h4 className="text-base font-black leading-none text-white">Ma progression</h4>
                        
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="text-3xl font-black text-amber-300 leading-none">4</span>
                          <span className="text-[10px] text-emerald-100 font-semibold">Niveau 4 • 969 XP total</span>
                        </div>
                        
                        {/* Progress slider loader bar */}
                        <div className="h-1.5 w-full bg-slate-950/40 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 w-[60%] rounded-full" />
                        </div>
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { val: '45%', title: 'Précision', detail: 'De vos réponses d\'apprentissage' },
                          { val: '5', title: 'Meilleure série', detail: 'De bonnes réponses consécutives' },
                          { val: '25', title: 'Bonnes réponses', detail: 'Au total accumulé' },
                          { val: '9', title: 'Parties', detail: 'Modes de jeux complétés' }
                        ].map((stat, idx) => (
                          <div key={idx} className="bg-white border border-slate-100 p-3 rounded-xl">
                            <span className="text-xs text-slate-400 block leading-tight font-bold">{stat.title}</span>
                            <span className="text-xl font-black text-slate-800 block mt-1 leading-none">{stat.val}</span>
                            <span className="text-[8px] text-slate-400 block mt-1">{stat.detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Badges section pill widgets (Screenshot 7) */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Badges obtenus</span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { name: 'Premiers pas', active: true },
                            { name: 'Centurion', active: false },
                            { name: 'Sans faute', active: true },
                            { name: 'Série de 10', active: false },
                            { name: 'Assidu 7 jours', active: false }
                          ].map((badge, idx) => (
                            <span 
                              key={idx} 
                              className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase ${
                                badge.active 
                                  ? 'bg-amber-100 border border-amber-300 text-amber-800' 
                                  : 'bg-slate-100 border border-slate-200 text-slate-400'
                              }`}
                            >
                              {badge.name}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* VIEW D: ABOUT / CREDENTIALS CONTACT */}
                  {edu2ActiveTab === 'about' && (
                    <div className="space-y-4 animate-fade-in text-center p-2">
                      <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white text-base font-mono font-black mx-auto shadow-md">
                        E2
                      </div>
                      <h3 className="text-sm font-black text-slate-800 uppercase mt-2">EDUCAM2</h3>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Sciences, Musiques & Traditions — Le jeu mobile éducatif conçu pour tous les enfants du Cameroun par <strong>Ngnassi Gueu Sylvin</strong>.
                      </p>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-left text-[10px] text-slate-500 space-y-2">
                        <span className="text-[9px] font-black text-[#007A5E] uppercase tracking-widest block">INFORMATIONS DU PROJET</span>
                        <p className="leading-relaxed text-slate-600">
                          EDUCAM2 permet d'explorer les régions, de tester sa rapidité mentale, de chanter le calcul mental et de mémoriser l'atlas cartographique du pays de façon hautement ludique.
                        </p>
                        <div className="pt-2 border-t border-slate-100 space-y-1">
                          <span className="block font-bold text-slate-700">📍 Siège: Douala, Cameroun</span>
                          <span className="block font-bold text-slate-700">📞 WhatsApp: +237 641 81 65 78</span>
                        </div>
                      </div>

                      <a
                        href="https://wa.me/237641816578"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-[#007A5E] text-white font-extrabold text-[10px] px-4 py-2 rounded-xl uppercase tracking-wider"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Discuter avec l'équipe</span>
                      </a>
                    </div>
                  )}

                </div>

                {/* 2.3 EDUCAM2 BOTTOM NAV BAR (SCREENSHOT 5 BOTTOM NAV BAR) */}
                <div className="bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shrink-0 z-10 shadow-lg">
                  {[
                    { id: 'accueil', label: 'Accueil', icon: Home },
                    { id: 'quiz', label: 'Défis', icon: Trophy },
                    { id: 'moi', label: 'Moi', icon: User },
                    { id: 'about', label: 'À propos', icon: Info }
                  ].map((item) => {
                    const IconComp = item.icon;
                    const isActive = edu2ActiveTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setEdu2ActiveTab(item.id);
                          setEdu2SelectedDefi(null);
                        }}
                        className={`flex flex-col items-center justify-center py-0.5 px-2.5 rounded-lg transition-colors cursor-pointer min-h-[38px] ${
                          isActive ? 'text-amber-500 font-black scale-102' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span className="text-[8px] font-bold mt-0.5 uppercase tracking-wide">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

              </div>
            )}

            {/* Simulated Phone physical bottom home button bar */}
            <div className="bg-white py-1 text-center shrink-0 border-t border-slate-100 flex items-center justify-center">
              <button 
                onClick={() => {
                  // Reset simulator to defaults
                  setEdu1ActiveTab('accueil');
                  setEdu1PlayingSong(null);
                  setEdu1SelectedRegion(null);
                  setEdu1QuizAnswered(false);
                  setEdu1QuizSelected(null);
                  
                  setEdu2ActiveTab('accueil');
                  setEdu2PlayingAudio(false);
                  setEdu2SelectedDefi(null);
                }}
                className="w-12 h-1 bg-slate-400 rounded-full hover:bg-slate-500 transition-colors cursor-pointer"
                title="Bouton Principal"
              />
            </div>

          </div>
        </div>

        {/* Action instruction footer outside simulator */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 text-center space-y-2 shrink-0">
          <p className="text-[11px] text-slate-400">
            {appId === 'educam1' 
              ? 'L\'application EDUCAM1 se concentre sur les calculs, l\'orthographe et l\'initiation bilingue.' 
              : 'L\'application EDUCAM2 propose des aventures de progression, des badges et des fiches d\'ethnies.'}
          </p>
          <div className="flex gap-2 justify-center">
            <a 
              href="https://wa.me/237641816578"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] px-4 py-2 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Nous appeler (+237)</span>
            </a>
            <button 
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] px-4 py-2 rounded-lg transition-colors"
            >
              Fermer le simulateur
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

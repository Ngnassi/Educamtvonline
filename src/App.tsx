import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNavBar from './components/BottomNavBar';
import BurgerMenu from './components/BurgerMenu';
import VideoPlayer from './components/VideoPlayer';
import DailyProgram from './components/DailyProgram';
import CategoryChips from './components/CategoryChips';
import MustWatch from './components/MustWatch';
import EduAppsModal from './components/EduAppsModal';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';

import { CATEGORIES, PROGRAMS_TODAY, PROGRAMS_TOMORROW, PROGRAMS_WEEK, NOTIFICATIONS_INIT, ASSOCIATION_SONGS } from './data';
import { Program, SystemNotification, UserPreferences } from './types';
import { 
  Heart, 
  RotateCcw, 
  Bell, 
  Settings, 
  Search, 
  Tv, 
  BookOpen, 
  PhoneCall, 
  Volume2, 
  Check, 
  X, 
  Play, 
  Info, 
  ArrowRight,
  ExternalLink,
  MessageCircle,
  CloudOff,
  Download,
  Facebook,
  Copy,
  Radio,
  Globe,
  Music,
  Mic,
  Award,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function App() {
  // Navigation tabs: 'accueil', 'direct', 'programme', 'replay', 'categories', 'favoris', 'notifications', 'settings'
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  // Modals
  const [activeEduAppId, setActiveEduAppId] = useState<'educam1' | 'educam2' | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Search & Filters inside lists
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [replayCategoryFilter, setReplayCategoryFilter] = useState<string>('all');

  // Media & preferences
  const [activeProgram, setActiveProgram] = useState<Program>(PROGRAMS_TODAY[0]);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoQuality, setVideoQuality] = useState<'Auto' | '1080p' | '720p' | '480p'>('Auto');

  // Connection and offline states
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isOfflineSimulated, setIsOfflineSimulated] = useState<boolean>(false);
  const [downloadedProgramIds, setDownloadedProgramIds] = useState<string[]>(['p1', 'p4']);

  // Facebook page and stream synchronization configuration
  const [facebookPageUrl, setFacebookPageUrl] = useState<string>('https://www.facebook.com/share/1anhA4PrMX/');
  const [facebookStreamKey, setFacebookStreamKey] = useState<string>('FB-1029384756-live-xyz');
  const [isSyncingFacebook, setIsSyncingFacebook] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<'server' | 'key' | null>(null);

  // Persistence loaded states
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<SystemNotification[]>(NOTIFICATIONS_INIT);
  const [classroomGrade, setClassroomGrade] = useState<'CM1' | 'CM2' | 'Tous'>('Tous');
  const [subtitleSize, setSubtitleSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  // DailyProgram sub-tab ('today' | 'tomorrow' | 'week')
  const [programTab, setProgramTab] = useState<'today' | 'tomorrow' | 'week'>('today');

  // Load state from localStorage on init
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('educam_favorites');
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

      const storedGrade = localStorage.getItem('educam_grade');
      if (storedGrade) setClassroomGrade(storedGrade as 'CM1' | 'CM2' | 'Tous');

      const storedSubs = localStorage.getItem('educam_subs');
      if (storedSubs) setSubtitleSize(storedSubs as 'small' | 'medium' | 'large');

      const storedNotifs = localStorage.getItem('educam_notifs_enabled');
      if (storedNotifs) setNotificationsEnabled(storedNotifs === 'true');

      const storedVolume = localStorage.getItem('educam_volume');
      if (storedVolume) setVolume(Number(storedVolume));

      const storedFbPage = localStorage.getItem('educam_facebook_page_url');
      if (storedFbPage) setFacebookPageUrl(storedFbPage);

      const storedFbKey = localStorage.getItem('educam_facebook_stream_key');
      if (storedFbKey) setFacebookStreamKey(storedFbKey);

      const storedFbSync = localStorage.getItem('educam_facebook_sync_enabled');
      if (storedFbSync) setIsSyncingFacebook(storedFbSync === 'true');
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  // Sync offline status from browser
  useEffect(() => {
    const handleOnline = () => {
      if (!isOfflineSimulated) {
        setIsOnline(true);
      }
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    setIsOnline(navigator.onLine && !isOfflineSimulated);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOfflineSimulated]);

  // Load and initialize downloads cache from localStorage on init
  useEffect(() => {
    try {
      const storedDownloads = localStorage.getItem('educam_downloads');
      if (storedDownloads) {
        setDownloadedProgramIds(JSON.parse(storedDownloads));
      } else {
        localStorage.setItem('educam_downloads', JSON.stringify(['p1', 'p4']));
      }
    } catch (e) {}
  }, []);

  const toggleDownload = (id: string) => {
    setDownloadedProgramIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('educam_downloads', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Save states on change
  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(updated);
    try {
      localStorage.setItem('educam_favorites', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleGradeChange = (grade: 'CM1' | 'CM2' | 'Tous') => {
    setClassroomGrade(grade);
    try {
      localStorage.setItem('educam_grade', grade);
    } catch (e) {}
  };

  const handleSubtitleSizeChange = (size: 'small' | 'medium' | 'large') => {
    setSubtitleSize(size);
    try {
      localStorage.setItem('educam_subs', size);
    } catch (e) {}
  };

  const handleNotifToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    try {
      localStorage.setItem('educam_notifs_enabled', String(enabled));
    } catch (e) {}
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    try {
      localStorage.setItem('educam_volume', String(vol));
    } catch (e) {}
  };

  const handleProgramSelect = (program: Program, liveMode: boolean) => {
    setActiveProgram(program);
    setIsLiveMode(liveMode);
    // Smooth scroll to video player on mobile
    const playerEl = document.getElementById('video-broadcast-center');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleNextProgram = () => {
    // Find index of current in daily programs
    const idx = PROGRAMS_TODAY.findIndex(p => p.id === activeProgram.id);
    if (idx !== -1 && idx < PROGRAMS_TODAY.length - 1) {
      setActiveProgram(PROGRAMS_TODAY[idx + 1]);
    } else {
      setActiveProgram(PROGRAMS_TODAY[0]); // loop back
    }
  };

  // Get next program title
  const getNextProgramTitle = () => {
    const idx = PROGRAMS_TODAY.findIndex(p => p.id === activeProgram.id);
    if (idx !== -1 && idx < PROGRAMS_TODAY.length - 1) {
      return PROGRAMS_TODAY[idx + 1].title;
    }
    return PROGRAMS_TODAY[0].title;
  };

  // Counts
  const favoritesCount = favorites.length;
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Filter programs based on Category Chip click
  const getFilteredPrograms = () => {
    let baseList = PROGRAMS_TODAY;
    if (selectedCategoryId) {
      const categoryName = CATEGORIES.find(c => c.id === selectedCategoryId)?.name.toLowerCase();
      if (categoryName) {
        baseList = PROGRAMS_TODAY.filter(p => p.category.toLowerCase() === categoryName);
      }
    }
    return baseList;
  };

  const filteredProgramsToday = getFilteredPrograms();

  // Combine all programs to allow searching in the "Replay" library
  const allAvailablePrograms = [...ASSOCIATION_SONGS, ...PROGRAMS_TODAY, ...PROGRAMS_TOMORROW, ...PROGRAMS_WEEK];

  const searchedReplays = allAvailablePrograms.filter(prog => {
    const matchesSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (prog.presenter && prog.presenter.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (replayCategoryFilter === 'all') return matchesSearch;
    return matchesSearch && prog.category.toLowerCase() === replayCategoryFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#0B1B3A] text-white flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden pb-16 md:pb-0">
      
      {/* 1. TOP HEADER */}
      <Header 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen} 
        onNavigateHome={() => { setActiveTab('accueil'); setSelectedCategoryId(null); }}
        isOnline={isOnline && !isOfflineSimulated}
        isOfflineSimulated={isOfflineSimulated}
        setIsOfflineSimulated={setIsOfflineSimulated}
        downloadedProgramIds={downloadedProgramIds}
        allPrograms={allAvailablePrograms}
        onPlayProgram={(prog) => {
          handleProgramSelect(prog, false);
          setActiveTab('accueil');
        }}
      />

      {/* 2. BURGER MENU (MOBILE ONLY) */}
      <BurgerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        activeTab={activeTab} 
        onTabChange={(tab) => { setActiveTab(tab); setSelectedCategoryId(null); }}
        favoritesCount={favoritesCount} 
        notificationCount={unreadNotificationsCount} 
        onOpenAbout={() => setIsAboutOpen(true)} 
        onOpenEduApp={(appId) => setActiveEduAppId(appId)} 
      />

      {/* 3. MAIN WORKSPACE GRID */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto items-stretch relative">
        
        {/* 3.1 DESKTOP NAVIGATION SIDEBAR */}
        <div className="hidden md:block">
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={(tab) => { setActiveTab(tab); setSelectedCategoryId(null); }}
            favoritesCount={favoritesCount} 
            notificationCount={unreadNotificationsCount} 
            onOpenAbout={() => setIsAboutOpen(true)} 
            onOpenEduApp={(appId) => setActiveEduAppId(appId)} 
          />
        </div>

        {/* 3.2 DETAILED MAIN CONTENT WORKSPACE */}
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 flex flex-col gap-8 overflow-hidden min-w-0">
          
          {/* Offline Warning Banner */}
          {!(isOnline && !isOfflineSimulated) && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center shrink-0">
                  <CloudOff className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Mode Hors-Ligne Actif</h4>
                  <p className="text-xs text-slate-300">
                    Vous naviguez sans connexion Internet. Seules les leçons téléchargées en cache local ({downloadedProgramIds.length}) sont lisibles.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (downloadedProgramIds.length > 0) {
                    const firstDownloaded = allAvailablePrograms.find(p => p.id === downloadedProgramIds[0]);
                    if (firstDownloaded) {
                      handleProgramSelect(firstDownloaded, false);
                      setActiveTab('accueil');
                    }
                  } else {
                    alert("Aucune leçon téléchargée en cache pour l'instant.");
                  }
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer"
              >
                Consulter les cours disponibles ({downloadedProgramIds.length})
              </button>
            </div>
          )}

          {/* TAB 1: HOME/ACCUEIL VIEW */}
          {activeTab === 'accueil' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* TOP BANNER ADVERTISING EDUCAM APPS */}
              <div className="bg-gradient-to-r from-teal-900/90 via-[#CE1126]/20 to-amber-900/80 border border-amber-500/30 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg relative overflow-hidden group">
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
                
                <div className="space-y-2 relative z-10 text-center md:text-left max-w-xl">
                  <div className="inline-flex items-center gap-1.5 bg-[#007A5E] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm">
                    ✨ NOUVEAUTÉ ÉDUCATIVE
                  </div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                    Téléchargez les applications <span className="text-teal-400">EDUCAM 1 & 2</span> !
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Soutien scolaire en musique pour l'école primaire au Cameroun. Retrouvez des quiz interactifs, des fiches flash illustrées, et la chanson nationale des 10 régions !
                  </p>
                </div>

                <div className="flex gap-2.5 shrink-0 w-full md:w-auto justify-center">
                  <button
                    onClick={() => setActiveEduAppId('educam1')}
                    className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs px-4 py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center gap-1.5 shadow-md shadow-teal-500/20 cursor-pointer"
                  >
                    <span>Lancer EDUCAM1</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveEduAppId('educam2')}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    <span>Lancer EDUCAM2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* VIDEO PLAYER & DAILY PROGRAM ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* 16:9 Live Video Box (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-3">
                  <VideoPlayer 
                    program={activeProgram}
                    isLive={isLiveMode}
                    onNextProgram={handleNextProgram}
                    nextProgramTitle={getNextProgramTitle()}
                    volume={volume}
                    isMuted={isMuted}
                    onVolumeChange={handleVolumeChange}
                    onMuteToggle={() => setIsMuted(!isMuted)}
                    quality={videoQuality}
                    onQualityChange={(q) => setVideoQuality(q)}
                    isOnline={isOnline && !isOfflineSimulated}
                    isDownloaded={downloadedProgramIds.includes(activeProgram.id)}
                    onToggleDownload={() => toggleDownload(activeProgram.id)}
                  />
                </div>

                {/* Daily Schedule Ticker Widget (4 cols) */}
                <div className="lg:col-span-4 h-full">
                  <DailyProgram 
                    programsToday={PROGRAMS_TODAY}
                    programsTomorrow={PROGRAMS_TOMORROW}
                    programsWeek={PROGRAMS_WEEK}
                    activeProgramId={activeProgram.id}
                    onProgramSelect={handleProgramSelect}
                    activeTab={programTab}
                    onTabChange={(tab) => setProgramTab(tab)}
                  />
                </div>

              </div>

              {/* POPULAR CATEGORIES */}
              <CategoryChips 
                categories={CATEGORIES}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
              />

              {/* FILTERED CATEGORY SHOWCASE */}
              {selectedCategoryId && (
                <div className="bg-[#081329] p-5 rounded-2xl border border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black uppercase text-amber-400 tracking-wider">
                      Émissions filtrées : {CATEGORIES.find(c => c.id === selectedCategoryId)?.name}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {filteredProgramsToday.length} émission(s) trouvée(s)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProgramsToday.map(prog => (
                      <div 
                        key={prog.id}
                        onClick={() => handleProgramSelect(prog, true)}
                        className="bg-slate-900/40 hover:bg-slate-900 border border-slate-800 rounded-xl p-3 cursor-pointer transition-all hover:border-slate-700/80 group"
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                          <img src={prog.thumbnailUrl} alt={prog.title} className="w-full h-full object-cover opacity-85" />
                          <div className="absolute bottom-1 right-1 bg-black/60 text-[8px] px-1 rounded font-mono font-bold text-white">
                            {prog.duration}
                          </div>
                        </div>
                        <h5 className="text-xs font-bold truncate group-hover:text-amber-400 transition-colors">{prog.title}</h5>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{prog.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CHANTS DE L'ASSOCIATION: LES CHANSONS PRINCIPALES */}
              <div className="bg-[#081329] border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm">
                      <Award className="w-3 h-3 text-yellow-300 animate-bounce" />
                      <span>Chansons Officielles de l'Association</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
                      <span>Les Chansons Principales d'Educam</span>
                      <Music className="w-5 h-5 text-amber-400 animate-pulse" />
                    </h3>
                    <p className="text-xs text-slate-400 max-w-2xl">
                      Découvrez les chants phares créés par l'association <strong>Les Enfants du Cameroun</strong> pour mémoriser les leçons (mathématiques, langues, civisme) tout en s'amusant. Cliquez sur un chant pour lancer le karaoké interactif et le quiz associé !
                    </p>
                  </div>
                  <div className="bg-[#07132a] border border-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-3 shrink-0 self-start sm:self-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center font-black text-sm">
                      4
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Chants disponibles</span>
                      <span className="text-xs font-black text-white">Apprentissage Festif</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
                  {ASSOCIATION_SONGS.map((song) => {
                    const isFavorite = favorites.includes(song.id);
                    const isPlayingNow = activeProgram.id === song.id;
                    return (
                      <div 
                        key={song.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row justify-between gap-4 cursor-pointer group hover:scale-[1.01] ${
                          isPlayingNow
                            ? 'bg-slate-950 border-amber-500/50 shadow-lg shadow-amber-500/5'
                            : 'bg-[#07132a]/60 border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/40'
                        }`}
                        onClick={() => handleProgramSelect(song, false)}
                      >
                        {/* Song Art & Play Trigger */}
                        <div className="flex gap-3.5 items-start">
                          <div className="relative w-20 aspect-video sm:w-24 rounded-lg overflow-hidden shrink-0 bg-slate-950 shadow-inner">
                            <img src={song.thumbnailUrl} alt={song.title} className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${isPlayingNow ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-white/90 text-slate-950 shadow-md'}`}>
                                <Play className={`w-3.5 h-3.5 fill-current ${isPlayingNow ? 'text-slate-950' : 'text-slate-950 translate-x-0.5'}`} />
                              </div>
                            </div>
                            <span className="absolute bottom-1 right-1 bg-black/85 text-[8px] font-mono font-black px-1 rounded text-white">
                              {song.duration}
                            </span>
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                {song.category}
                              </span>
                              <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                                {song.time}
                              </span>
                            </div>
                            <h4 className={`text-xs sm:text-sm font-extrabold line-clamp-1 transition-colors ${isPlayingNow ? 'text-amber-400' : 'text-slate-100 group-hover:text-amber-400'}`}>
                              {song.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                              {song.description}
                            </p>
                            <span className="text-[9px] text-slate-500 font-bold block">
                              Par {song.presenter} • {song.ageRange}
                            </span>
                          </div>
                        </div>

                        {/* Song Interactive Actions */}
                        <div className="flex sm:flex-col justify-end items-center sm:items-end gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800/60">
                          {/* Heart Icon Toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(song.id);
                            }}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors cursor-pointer ${
                              isFavorite
                                ? 'bg-red-600/20 border-red-500/30 text-red-500'
                                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                            }`}
                            title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                          </button>

                          {/* Quick Sing-along/Lyrics Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProgramSelect(song, false);
                              // Smooth scroll to video player top
                              window.scrollTo({ top: 120, behavior: 'smooth' });
                            }}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all uppercase cursor-pointer"
                          >
                            <Mic className="w-3 h-3" />
                            <span>Chanter</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CAROUSEL SECTION: À NE PAS MANQUER */}
              <MustWatch 
                programs={PROGRAMS_TODAY}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onProgramSelect={handleProgramSelect}
                activeProgramId={activeProgram.id}
              />

              {/* CONTACT DETAILS & PROMOTION BANNER */}
              <div className="bg-[#081329] border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#007A5E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CE1126]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FCD116]" />
                    <h4 className="font-extrabold text-sm text-slate-200 tracking-wider uppercase">
                      PROJET ÉDUCATIF « LES ENFANTS DU CAMEROUN »
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Une œuvre patriotique conçue pour tous les élèves du primaire au Cameroun. Portée par le fondateur <strong>Ngnassi Gueu Sylvin</strong>, l'association équipe les classes en technologies audio pour chanter et apprendre les capitales, les fleuves, et l'excellence bilingue !
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400 font-medium">
                    <span>📍 Siège : Douala, Cameroun</span>
                    <span>📞 WhatsApp : +237 641 81 65 78 / +237 679 03 15 29</span>
                  </div>
                </div>
                <div className="md:col-span-4 flex flex-col gap-2">
                  <a
                    href="https://wa.me/237641816578"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#007A5E] hover:bg-[#007A5E]/80 text-white font-black text-xs py-3 rounded-xl transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-sm uppercase cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Nous écrire sur WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsAboutOpen(true)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 uppercase border border-slate-700 cursor-pointer"
                  >
                    <Info className="w-4 h-4" />
                    <span>Découvrir l'Association</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LIVE BROADCAST TAB */}
          {activeTab === 'direct' && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto w-full">
              <div className="text-center space-y-2">
                <span className="bg-red-600 text-white font-black text-[10px] tracking-widest px-3 py-1 rounded-full uppercase animate-pulse">
                  EN DIRECT
                </span>
                <h2 className="text-2xl font-black text-white">Chambre de diffusion de la chaîne éducationnelle</h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  Vivez le flux télévisuel programmé d'aujourd'hui en temps réel avec les exercices de karaoké synchronisés.
                </p>
              </div>

              <VideoPlayer 
                program={activeProgram}
                isLive={true}
                onNextProgram={handleNextProgram}
                nextProgramTitle={getNextProgramTitle()}
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={handleVolumeChange}
                onMuteToggle={() => setIsMuted(!isMuted)}
                quality={videoQuality}
                onQualityChange={(q) => setVideoQuality(q)}
                isOnline={isOnline && !isOfflineSimulated}
                isDownloaded={downloadedProgramIds.includes(activeProgram.id)}
                onToggleDownload={() => toggleDownload(activeProgram.id)}
              />

              {/* Interactive Info Board */}
              <div className="bg-[#081329] p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ÉMISSION EN COURS</span>
                  <h3 className="text-lg font-extrabold text-amber-400">{activeProgram.title}</h3>
                  <p className="text-xs text-slate-300 max-w-lg leading-relaxed">{activeProgram.description}</p>
                </div>
                <button
                  onClick={() => setActiveTab('programme')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors border border-slate-700 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Consulter la grille de diffusion
                </button>
              </div>

              {/* Facebook Simultaneous Live Sync Panel & Feed Embed */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                
                {/* Left block: Streaming Info and configuration details */}
                <div className="bg-[#081329] p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                      <Radio className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Diffusion Simultanée Facebook Live</h4>
                      <p className="text-[10px] text-slate-400">Synchronisez la chaîne éducationnelle avec votre page</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cette console vous permet de connecter et de diffuser simultanément le signal de la chaîne de télévision éducative en ligne vers la page Facebook de l'association.
                  </p>

                  {/* Sync Status Banner */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                    isSyncingFacebook 
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${isSyncingFacebook ? 'bg-blue-500 animate-ping' : 'bg-slate-700'} block`} />
                      <span className="text-[11px] font-extrabold uppercase tracking-wide">
                        {isSyncingFacebook ? 'Liaison & Multi-diffusion active' : 'Multi-diffusion en pause'}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-950/50 px-2 py-0.5 rounded border border-white/5">
                      RTMPS
                    </span>
                  </div>

                  {/* Streaming Connection Settings */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Coordonnées de Flux (Pour OBS Studio / Mobile)</span>
                    
                    {/* Server URL */}
                    <div className="bg-slate-950 border border-slate-800/80 p-2.5 rounded-xl flex items-center justify-between gap-3">
                      <div className="truncate flex-1">
                        <span className="text-[9px] font-bold text-slate-500 block uppercase">Serveur RTMP</span>
                        <code className="text-[10px] font-mono text-slate-300 select-all">rtmps://live-api-s.facebook.com:443/rtmp/</code>
                      </div>
                      <button
                        onClick={() => {
                          try {
                            navigator.clipboard.writeText('rtmps://live-api-s.facebook.com:443/rtmp/');
                            setCopiedText('server');
                            setTimeout(() => setCopiedText(null), 2000);
                          } catch (_) {}
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer text-[10px] font-bold shrink-0"
                        title="Copier le serveur"
                      >
                        {copiedText === 'server' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedText === 'server' ? 'Copié' : 'Copier'}</span>
                      </button>
                    </div>

                    {/* Stream Key */}
                    <div className="bg-slate-950 border border-slate-800/80 p-2.5 rounded-xl flex items-center justify-between gap-3">
                      <div className="truncate flex-1">
                        <span className="text-[9px] font-bold text-slate-500 block uppercase">Clé de Flux</span>
                        <code className="text-[10px] font-mono text-slate-300 truncate block">
                          {facebookStreamKey ? `${facebookStreamKey.substring(0, 8)}...` : 'Aucune clé configurée'}
                        </code>
                      </div>
                      <button
                        onClick={() => {
                          try {
                            navigator.clipboard.writeText(facebookStreamKey);
                            setCopiedText('key');
                            setTimeout(() => setCopiedText(null), 2000);
                          } catch (_) {}
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer text-[10px] font-bold shrink-0"
                        title="Copier la clé de flux"
                      >
                        {copiedText === 'key' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedText === 'key' ? 'Copié' : 'Copier'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Setup guide */}
                  <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10 text-[11px] text-slate-300 leading-relaxed space-y-1.5">
                    <span className="font-extrabold text-amber-400 block uppercase text-[10px]">💡 Guide Rapide de liaison</span>
                    <p>
                      1. Copiez l'adresse du serveur et la clé de flux ci-dessus.<br />
                      2. Collez-les dans votre logiciel d'émission (OBS Studio, Streamlabs, ou l'application mobile Facebook).<br />
                      3. Lancez la diffusion sur Facebook : la chaîne TV d'Educam sera relayée sur votre page en simultané !
                    </p>
                  </div>
                </div>

                {/* Right block: Live embedded page timeline */}
                <div className="bg-[#081329] p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                        <Facebook className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">Visualisation en Direct</h4>
                        <p className="text-[10px] text-slate-400">Flux de la page Facebook connectée</p>
                      </div>
                    </div>
                    <a 
                      href={facebookPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors uppercase cursor-pointer shrink-0"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Page ↗</span>
                    </a>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Voici l'affichage interactif de votre page Facebook connectée. Lorsque vous lancez un direct sur Facebook, le flux live s'affichera directement ici pour tous vos visiteurs.
                  </p>

                  {/* Facebook Page Plugin Iframe Embed */}
                  <div className="flex-1 min-h-[300px] bg-slate-950 rounded-xl border border-slate-800 p-1 flex items-center justify-center relative overflow-hidden">
                    <iframe 
                      src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebookPageUrl)}&tabs=timeline,messages&width=360&height=300&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                      width="100%" 
                      height="300" 
                      style={{ border: 'none', overflow: 'hidden' }} 
                      scrolling="no" 
                      frameBorder="0" 
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      className="w-full rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCHEDULE / PROGRAMME TV */}
          {activeTab === 'programme' && (
            <div className="space-y-6 animate-fade-in max-w-3xl mx-auto w-full">
              <div className="text-center space-y-1.5">
                <h2 className="text-2xl font-black text-white">Grille Complète des Programmes TV</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Planifiez vos cours et séances de karaoké pour la maison ou la classe.
                </p>
              </div>

              <DailyProgram 
                programsToday={PROGRAMS_TODAY}
                programsTomorrow={PROGRAMS_TOMORROW}
                programsWeek={PROGRAMS_WEEK}
                activeProgramId={activeProgram.id}
                onProgramSelect={handleProgramSelect}
                activeTab={programTab}
                onTabChange={(tab) => setProgramTab(tab)}
              />
            </div>
          )}

          {/* TAB 4: REPLAY ARCHIVES */}
          {activeTab === 'replay' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white">Médiathèque Replay : Apprendre à la demande</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Révisez tous vos programmes préférés n'importe quand. Filtrez par matière ou recherchez un cours spécifique.
                </p>
              </div>

              {/* SEARCH BAR & CATEGORY FILTER */}
              <div className="bg-[#081329] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between">
                
                {/* Search Box */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher une leçon, un titre de chanson, un présentateur..." 
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                {/* Dropdown filters */}
                <div className="flex gap-2 shrink-0">
                  <select
                    value={replayCategoryFilter}
                    onChange={(e) => setReplayCategoryFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-300 font-semibold px-4 py-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-amber-500/50"
                  >
                    <option value="all">Toutes les matières</option>
                    <option value="Éducation">Éducation</option>
                    <option value="Culture">Culture</option>
                    <option value="Musique">Musique</option>
                    <option value="Documentaires">Documentaires</option>
                    <option value="Histoire">Histoire</option>
                    <option value="Géographie">Géographie</option>
                    <option value="Jeunesse">Jeunesse</option>
                    <option value="Tourisme">Tourisme</option>
                  </select>
                </div>
              </div>

              {/* SEARCH RESULTS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchedReplays.map((prog) => {
                  const isFavorite = favorites.includes(prog.id);
                  return (
                    <div 
                      key={prog.id}
                      className="bg-slate-900/30 hover:bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col justify-between transition-all group relative cursor-pointer"
                      onClick={() => handleProgramSelect(prog, false)}
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-950">
                        <img src={prog.thumbnailUrl} alt={prog.title} className="w-full h-full object-cover opacity-85 transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute bottom-2 right-2 bg-black/75 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded text-white border border-slate-800">
                          {prog.duration}
                        </span>
                        
                        {/* Bookmark favorite overlay */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(prog.id);
                          }}
                          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-colors border shadow-sm cursor-pointer z-10 ${
                            isFavorite
                              ? 'bg-red-600 border-red-500 text-white'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#007A5E]">{prog.category}</span>
                        <h4 className="text-xs sm:text-sm font-extrabold line-clamp-2 leading-snug group-hover:text-amber-400 transition-colors">{prog.title}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{prog.description}</p>
                      </div>

                      {prog.presenter && (
                        <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 text-[10px] text-slate-500 font-bold flex items-center justify-between">
                          <span>Par {prog.presenter}</span>
                          <span className="bg-slate-800 px-2 py-0.5 rounded uppercase text-[8px] text-slate-300">Replay</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {searchedReplays.length === 0 && (
                  <div className="col-span-full text-center py-16 bg-[#081329] border border-slate-800 rounded-2xl space-y-1.5">
                    <p className="text-sm font-extrabold text-slate-400">Aucune leçon ou émission trouvée</p>
                    <p className="text-xs text-slate-600">Essayez d'autres mots clés ou modifiez vos filtres de matières.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES EXPLORER */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5">
                <h2 className="text-2xl font-black text-white">Matières et Domaines d'Enseignement</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Sélectionnez un domaine pour explorer les cours vidéo et les karaokés associés.
                </p>
              </div>

              <CategoryChips 
                categories={CATEGORIES}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
              />

              {/* Show matching programs based on selection */}
              <div className="bg-[#081329] rounded-2xl border border-slate-800 p-5 space-y-4">
                <h3 className="font-extrabold text-sm text-slate-200 tracking-wider uppercase">
                  {selectedCategoryId 
                    ? `PROGRAMMES POUR : ${CATEGORIES.find(c => c.id === selectedCategoryId)?.name}`
                    : "TOUS LES PROGRAMMES PAR MATIÈRE"
                  }
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allAvailablePrograms
                    .filter(p => !selectedCategoryId || p.category.toLowerCase() === CATEGORIES.find(c => c.id === selectedCategoryId)?.name.toLowerCase())
                    .map(prog => (
                      <div 
                        key={prog.id}
                        onClick={() => handleProgramSelect(prog, false)}
                        className="flex gap-4 p-3.5 bg-slate-900/30 hover:bg-slate-900 border border-slate-800/60 rounded-xl cursor-pointer transition-colors group"
                      >
                        <div className="w-24 aspect-video rounded-lg overflow-hidden shrink-0 bg-slate-950 relative">
                          <img src={prog.thumbnailUrl} alt={prog.title} className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[8px] font-black uppercase text-amber-500 bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.5 rounded">
                            {prog.category}
                          </span>
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-100 group-hover:text-amber-400 mt-1.5 truncate">
                            {prog.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-snug">
                            {prog.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MY FAVORITES (MES FAVORIS) */}
          {activeTab === 'favoris' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5">
                <h2 className="text-2xl font-black text-white">Mon Carnet d'Émissions Favorises</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Retrouvez ici les leçons, les chants ou les comptines que vous avez sauvegardés pour réviser rapidement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {allAvailablePrograms
                  .filter(p => favorites.includes(p.id))
                  .map(prog => (
                    <div 
                      key={prog.id}
                      className="bg-slate-900/30 hover:bg-slate-900 border border-slate-800 rounded-2xl p-3.5 cursor-pointer relative group flex flex-col justify-between"
                      onClick={() => handleProgramSelect(prog, false)}
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-2.5">
                        <img src={prog.thumbnailUrl} alt={prog.title} className="w-full h-full object-cover opacity-85" />
                        
                        {/* Remove favorite button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(prog.id);
                          }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-red-600 border border-red-500 text-white cursor-pointer z-10 hover:scale-105 transition-transform"
                          title="Retirer des favoris"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-[8px] font-black uppercase text-[#007A5E] tracking-widest">{prog.category}</span>
                        <h4 className="text-xs sm:text-sm font-extrabold line-clamp-1 text-slate-100 group-hover:text-amber-400 transition-colors">{prog.title}</h4>
                      </div>
                    </div>
                  ))}

                {favorites.length === 0 && (
                  <div className="col-span-full text-center py-16 bg-[#081329] border border-slate-800 rounded-2xl space-y-2">
                    <Heart className="w-10 h-10 text-slate-700 mx-auto" />
                    <p className="text-sm font-extrabold text-slate-400">Votre carnet de favoris est vide</p>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Cliquez sur le petit cœur rouge sur les cartes d'émissions pour les enregistrer ici.
                    </p>
                    <button
                      onClick={() => setActiveTab('accueil')}
                      className="mt-3 inline-block bg-amber-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-lg hover:bg-amber-400 cursor-pointer"
                    >
                      Découvrir les émissions
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-white">Centre de Notifications</h2>
                  <p className="text-xs text-slate-400">
                    Restez informé des émissions éducatives, des nouvelles leçons et des annonces de l'association.
                  </p>
                </div>
                {notifications.length > 0 && (
                  <button 
                    onClick={clearAllNotifications}
                    className="text-xs text-red-400 hover:text-red-300 font-bold hover:underline"
                  >
                    Tout effacer
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div 
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`p-4 rounded-xl border flex gap-3.5 items-start transition-all cursor-pointer ${
                      n.read 
                        ? 'bg-slate-900/10 border-slate-800/60 text-slate-400' 
                        : 'bg-[#0a1835] border-amber-500/30 text-white shadow-sm'
                    }`}
                  >
                    {/* Badge type */}
                    <div className="mt-1">
                      {!n.read ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block animate-pulse" />
                      ) : (
                        <Check className="w-4 h-4 text-slate-600" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className={`text-xs sm:text-sm font-extrabold ${!n.read ? 'text-slate-100' : 'text-slate-400'}`}>{n.title}</h4>
                        <span className="text-[10px] font-mono text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <div className="text-center py-16 bg-[#081329] border border-slate-800 rounded-2xl space-y-2">
                    <Bell className="w-10 h-10 text-slate-700 mx-auto" />
                    <p className="text-sm font-extrabold text-slate-400">Aucune notification disponible</p>
                    <p className="text-xs text-slate-600">Vous serez notifié dès qu'un nouvel événement ou cours commencera.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS / PARAMÈTRES */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in max-w-xl mx-auto w-full">
              <div className="space-y-1.5">
                <h2 className="text-2xl font-black text-white">Paramètres de l'Application</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Adaptez l'expérience d'écoute et d'apprentissage selon la classe de vos enfants.
                </p>
              </div>

              <div className="bg-[#081329] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
                
                {/* 1. Niveau de classe préconisé */}
                <div className="space-y-2 pb-5 border-b border-slate-800">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Niveau Scolaire Cible</label>
                  <p className="text-[11px] text-slate-500">Adapte l'ordre et le niveau de difficulté des quiz dans le lecteur vidéo.</p>
                  <div className="flex gap-2 mt-2">
                    {(['CM1', 'CM2', 'Tous'] as const).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => handleGradeChange(grade)}
                        className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                          classroomGrade === grade
                            ? 'bg-[#007A5E] border-[#007A5E] text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {grade === 'Tous' ? 'Tout le Primaire (Tous)' : grade}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Taille des sous-titres / Paroles de karaoké */}
                <div className="space-y-2 pb-5 border-b border-slate-800">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Taille du Karaoké / Sous-titres</label>
                  <div className="flex gap-2 mt-2">
                    {(['small', 'medium', 'large'] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => handleSubtitleSizeChange(sz)}
                        className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer capitalize ${
                          subtitleSize === sz
                            ? 'bg-amber-500 border-amber-500 text-slate-950 font-black'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {sz === 'small' ? 'Petit' : sz === 'medium' ? 'Moyen' : 'Grand'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Notifications alertes */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                  <div className="space-y-0.5 max-w-sm">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Alertes de début de cours</label>
                    <p className="text-[11px] text-slate-500">Alerte par vibration/bannière lors de la diffusion des émissions phares.</p>
                  </div>
                  <button
                    onClick={() => handleNotifToggle(!notificationsEnabled)}
                    className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                      notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-950 border border-slate-800'
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-200 ${
                      notificationsEnabled ? 'translate-x-5.5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* 3.5. Liaison Facebook & Diffusion Simultanée */}
                <div className="space-y-3.5 pb-5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Facebook className="w-4.5 h-4.5 text-blue-400" />
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Liaison Page Facebook & TV Live</label>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Associez la page Facebook de votre association pour synchroniser l'affichage de vos émissions en direct, karaokés scolaires et fils d'actualité.
                  </p>
                  
                  <div className="space-y-3 mt-2">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Lien URL de la Page Facebook</span>
                      <input 
                        type="text" 
                        value={facebookPageUrl} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setFacebookPageUrl(val);
                          try {
                            localStorage.setItem('educam_facebook_page_url', val);
                          } catch (_) {}
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                        placeholder="https://www.facebook.com/nomdelapage"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Clé de Flux Live Facebook (Stream Key)</span>
                      <input 
                        type="text" 
                        value={facebookStreamKey} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setFacebookStreamKey(val);
                          try {
                            localStorage.setItem('educam_facebook_stream_key', val);
                          } catch (_) {}
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-mono"
                        placeholder="FB-1029384756-live-xyz"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-bold text-slate-400">Activer la diffusion simultanée</span>
                      <button
                        onClick={() => {
                          const nextVal = !isSyncingFacebook;
                          setIsSyncingFacebook(nextVal);
                          try {
                            localStorage.setItem('educam_facebook_sync_enabled', String(nextVal));
                          } catch (_) {}
                        }}
                        className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                          isSyncingFacebook ? 'bg-blue-500' : 'bg-slate-950 border border-slate-800'
                        }`}
                        title="Activer ou désactiver la synchronisation"
                      >
                        <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${
                          isSyncingFacebook ? 'translate-x-4.5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Reset cache */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Effacer mes données de progression</label>
                  <p className="text-[11px] text-slate-500">Réinitialise vos favoris, l'historique des quiz, et toutes les préférences sauvegardées.</p>
                  <button
                    onClick={() => {
                      if (confirm("Réinitialiser l'application ? Vos favoris seront supprimés.")) {
                        localStorage.clear();
                        setFavorites([]);
                        setClassroomGrade('Tous');
                        setSubtitleSize('medium');
                        setNotificationsEnabled(true);
                        setVolume(85);
                        alert("Données réinitialisées !");
                      }
                    }}
                    className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-colors uppercase w-full cursor-pointer"
                  >
                    Réinitialiser l'application
                  </button>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* 4. BOTTOM FOOTER SECTION (WITH INTEGRATED INFO TICKER) */}
      <Footer 
        onOpenEduApp={(appId) => setActiveEduAppId(appId)} 
        onOpenAbout={() => setIsAboutOpen(true)} 
        facebookPageUrl={facebookPageUrl}
      />

      {/* 5. BOTTOM NAVIGATION BAR (MOBILE ONLY) */}
      <BottomNavBar 
        activeTab={activeTab} 
        onTabChange={(tab) => { setActiveTab(tab); setSelectedCategoryId(null); }} 
        onOpenAbout={() => setIsAboutOpen(true)} 
      />

      {/* 6. EDUCATIONAL APPLICATIONS PROMOTION SIMULATOR MODAL */}
      <EduAppsModal 
        appId={activeEduAppId} 
        onClose={() => setActiveEduAppId(null)} 
      />

      {/* 7. ABOUT THE FOUNDATION MODAL */}
      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />

    </div>
  );
}

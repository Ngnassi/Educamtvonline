import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, HelpCircle, Award, RefreshCw, Trophy, ChevronRight, Music, CloudOff, Download, Check } from 'lucide-react';
import { Program } from '../types';

interface VideoPlayerProps {
  program: Program;
  isLive: boolean;
  onNextProgram: () => void;
  nextProgramTitle: string;
  volume: number;
  isMuted: boolean;
  onVolumeChange: (vol: number) => void;
  onMuteToggle: () => void;
  quality: string;
  onQualityChange: (qual: 'Auto' | '1080p' | '720p' | '480p') => void;
  isOnline?: boolean;
  isDownloaded?: boolean;
  onToggleDownload?: () => void;
}

export default function VideoPlayer({
  program,
  isLive,
  onNextProgram,
  nextProgramTitle,
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
  quality,
  onQualityChange,
  isOnline = true,
  isDownloaded = false,
  onToggleDownload
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15); // initial simulated progress %
  const [lyricsIndex, setLyricsIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slides representing beautiful Cameroon imagery corresponding to the programs
  const slides = [
    { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800', label: 'Forêt équatoriale du Sud' },
    { url: 'https://images.unsplash.com/photo-1540747737956-378724044432?q=80&w=800', label: 'Enfants chantant en classe' },
    { url: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=800', label: 'Faune du parc national de Waza' },
    { url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800', label: 'Fouilles de souvenirs historiques' },
  ];

  // Rotate slideshow images during playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !showQuiz) {
      interval = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % slides.length);
        setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
        
        // Advance lyrics if available
        if (program.lyrics && program.lyrics.length > 0) {
          setLyricsIndex((prev) => (prev + 1) % program.lyrics!.length);
        }
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, showQuiz, program.lyrics]);

  // Handle native video playback if supported
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Fallback to slideshow on block
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, program]);

  // Update volume in native video player
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIdx);
    setIsAnswered(true);
    
    if (optionIdx === program.quiz?.[currentQuestion].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!program.quiz) return;
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentQuestion < program.quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Finished quiz
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowQuiz(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex flex-col w-full" id="video-broadcast-center">
      {/* 16:9 Video Player Container */}
      <div 
        ref={containerRef}
        className="relative aspect-video w-full bg-[#0B1B3A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
      >
        {/* HTML5 video backdrop if playing, else beautiful stylized imagery */}
        <video 
          ref={videoRef}
          src={program.videoUrl}
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          loop
          muted={isMuted}
          playsInline
        />

        {/* Dynamic educational slide images */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={slides[slideshowIndex].url} 
            alt={slides[slideshowIndex].label} 
            className="w-full h-full object-cover opacity-40 transition-all duration-1000 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-[#0B1B3A]/60 to-transparent" />
        </div>

        {/* Corner Watermarks */}
        {/* Left top: DIRECT or REPLAY badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 ${
            isLive ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white block animate-ping" />
            {isLive ? 'EN DIRECT' : 'REPLAY'}
          </span>
          <span className="bg-[#07132a]/80 backdrop-blur-md text-yellow-400 px-2 py-1 rounded text-[10px] font-bold border border-white/10 shadow-md">
            {program.category.toUpperCase()}
          </span>
          {isDownloaded && (
            <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow-md border flex items-center gap-1.5 ${
              !isOnline 
                ? 'bg-emerald-600 border-emerald-500 text-white' 
                : 'bg-[#07132a]/85 border-emerald-500/30 text-emerald-400'
            }`}>
              <Check className="w-3 h-3 text-emerald-300" />
              {!isOnline ? 'LECTURE HORS-LIGNE (CACHE)' : 'DISPONIBLE HORS-LIGNE'}
            </span>
          )}
        </div>

        {/* Right top: Logo watermark */}
        <div className="absolute top-4 right-4 z-20 opacity-80 scale-75 origin-top-right flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
          <span className="font-extrabold text-xs text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-300 to-red-400">EDUCAM</span>
          <span className="bg-red-600 text-white font-bold text-[9px] px-1 rounded-sm">TV</span>
        </div>

        {/* Offline & Not Cached warning overlay */}
        {!isOnline && !isDownloaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-[#07132a]/95 backdrop-blur-md transition-all">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mb-4 animate-pulse">
              <CloudOff className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black tracking-widest text-red-400 uppercase mb-1">
              Mode Hors-Ligne Actif
            </span>
            <h3 className="text-base sm:text-lg font-black text-white max-w-lg leading-tight">
              Cours non disponible hors-ligne
            </h3>
            <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
              « {program.title} » n'est pas encore téléchargé en cache local. Veuillez vous connecter ou sélectionner une leçon déjà disponible hors-ligne depuis l'icône de nuage.
            </p>
            {/* Download helper button simulator */}
            {onToggleDownload && (
              <div className="mt-4 flex flex-wrap gap-2.5 justify-center">
                <button
                  onClick={onToggleDownload}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/25 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger ce cours (Simulé)</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Playback simulation overlay when paused */}
        {!isPlaying && !showQuiz && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-slate-950/70 backdrop-blur-sm transition-all">
            <button 
              onClick={togglePlay}
              className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-full shadow-lg shadow-amber-500/20 hover:scale-105 transition-all mb-4 focus:outline-none"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
            </button>
            <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mb-1">
              PROJET LES ENFANTS DU CAMEROUN
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white max-w-lg leading-tight">
              {program.title}
            </h3>
            <p className="text-xs text-slate-300 max-w-md mt-2 line-clamp-2">
              {program.description}
            </p>
            {program.presenter && (
              <span className="text-[11px] text-slate-400 font-medium mt-1">
                Présenté par {program.presenter} • Pour {program.ageRange || 'tous'}
              </span>
            )}
            <button
              onClick={togglePlay}
              className="mt-4 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs px-5 py-2 rounded-full uppercase tracking-widest transition-all shadow-md hover:shadow-red-600/20 flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Lecture en direct
            </button>
          </div>
        )}

        {/* Screen Visual Elements during Play: Karaoke Subtitle display */}
        {isPlaying && !showQuiz && (
          <div className="absolute inset-x-4 bottom-16 z-10 pointer-events-none text-center">
            {program.lyrics && program.lyrics.length > 0 ? (
              <div className="inline-flex flex-col items-center bg-[#07132a]/90 border border-white/10 px-4 py-2 rounded-xl max-w-xl shadow-2xl">
                <div className="flex items-center gap-1 text-amber-400 text-[10px] font-black uppercase tracking-wider mb-0.5">
                  <Music className="w-3 h-3 animate-bounce" />
                  <span>Karaoké Éducatif</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {program.lyrics[lyricsIndex]}
                </p>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {program.lyrics[(lyricsIndex + 1) % program.lyrics.length]}
                </p>
              </div>
            ) : (
              <div className="inline-block bg-slate-950/65 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-800">
                <p className="text-xs sm:text-sm font-semibold text-slate-300">
                  📍 {slides[slideshowIndex].label}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Interactive Quiz Mode Panel */}
        {showQuiz && program.quiz && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/95 text-white overflow-y-auto">
            {currentQuestion < program.quiz.length ? (
              <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl">
                {/* Header info */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>QUIZ : Apprendre le Cameroun</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    Question {currentQuestion + 1} / {program.quiz.length}
                  </span>
                </div>

                {/* Question */}
                <h4 className="text-sm sm:text-base font-extrabold text-slate-100 mb-4">
                  {program.quiz[currentQuestion].question}
                </h4>

                {/* Options list */}
                <div className="space-y-2 mb-4">
                  {program.quiz[currentQuestion].options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === program.quiz![currentQuestion].correctIndex;
                    let optionStyle = "border-slate-800 bg-slate-950/40 hover:bg-slate-800/40 text-slate-300";

                    if (isAnswered) {
                      if (isCorrect) {
                        optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
                      } else if (isSelected) {
                        optionStyle = "border-red-500 bg-red-500/10 text-red-300";
                      } else {
                        optionStyle = "border-slate-800 opacity-50 text-slate-500";
                      }
                    } else if (isSelected) {
                      optionStyle = "border-amber-500 bg-amber-500/10 text-amber-300";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswered && isCorrect && (
                          <span className="bg-emerald-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Juste</span>
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Faux</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation text & continue button */}
                {isAnswered && (
                  <div className="space-y-3">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/50 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                      <span className="font-bold text-amber-400 block mb-0.5">Le savais-tu ?</span>
                      {program.quiz[currentQuestion].explanation}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <span>
                          {currentQuestion === program.quiz!.length - 1 ? "Terminer" : "Suivant"}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Score results summary */
              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-2xl">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                  <Trophy className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-white mb-1">Félicitations !</h4>
                <p className="text-xs text-slate-400 mb-4">Tu as fini le quiz pour {program.title}</p>
                
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Score Final</span>
                  <span className="text-3xl font-black text-amber-400">{score} / {program.quiz.length}</span>
                  <span className="text-xs text-slate-300 block mt-1">
                    {score === program.quiz.length ? "Parfait ! Tu es un vrai champion camerounais 🇨🇲" : "Super effort ! Continue de chanter pour mémoriser."}
                  </span>
                </div>

                <div className="flex gap-2.5 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Recommencer
                  </button>
                  <button
                    onClick={() => { setShowQuiz(false); setIsPlaying(true); }}
                    className="bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors shadow-md"
                  >
                    Retour à l'émission
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Video Player Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 flex flex-col gap-2 z-10 transition-transform translate-y-1 group-hover:translate-y-0">
          {/* Progress Slider bar */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 select-none">
              {isPlaying ? '03:15' : '00:00'}
            </span>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden relative cursor-pointer group/bar">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-all"
                style={{ width: `${isPlaying ? progress : 0}%` }}
              />
              <div 
                className="absolute w-3 h-3 bg-amber-400 rounded-full top-1/2 -translate-y-1/2 -translate-x-1.5 opacity-0 group-hover/bar:opacity-100 transition-opacity"
                style={{ left: `${isPlaying ? progress : 0}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400 select-none">
              {program.duration}
            </span>
          </div>

          {/* Buttons and toggles row */}
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="text-slate-300 hover:text-white transition-colors"
                title={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              {/* Volume */}
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={onMuteToggle}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 hidden sm:inline"
                />
              </div>

              {/* Launch Quiz module if available */}
              {program.quiz && (
                <button
                  onClick={() => { setShowQuiz(true); setIsPlaying(false); }}
                  className="bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-950 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md transition-all flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Jouer au Quiz ({program.quiz.length} Q)</span>
                </button>
              )}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3 relative">
              {/* Download toggle button */}
              {onToggleDownload && (
                <button
                  onClick={onToggleDownload}
                  className={`p-1.5 rounded-lg transition-all border cursor-pointer ${
                    isDownloaded 
                      ? 'text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border-emerald-500/30' 
                      : 'text-slate-400 hover:text-white bg-white/5 border-white/10'
                  }`}
                  title={isDownloaded ? "Retirer du cache local" : "Télécharger pour regarder hors-ligne"}
                >
                  <Download className={`w-3.5 h-3.5 ${isDownloaded ? 'text-emerald-400 animate-pulse' : ''}`} />
                </button>
              )}

              {/* Settings button */}
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="text-slate-300 hover:text-white transition-colors"
                title="Qualité et Réglages"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Quality Selection Panel Dropup */}
              {showSettings && (
                <div className="absolute right-0 bottom-8 z-30 bg-slate-900 border border-slate-800 rounded-xl p-2 w-32 shadow-xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase px-2 py-1 block">QUALITÉ</span>
                  {(['Auto', '1080p', '720p', '480p'] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => { onQualityChange(q); setShowSettings(false); }}
                      className={`w-full text-left px-2 py-1 text-xs font-bold rounded hover:bg-slate-800 ${
                        quality === q ? 'text-amber-400 bg-slate-950/40' : 'text-slate-400'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Fullscreen button */}
              <button 
                onClick={toggleFullscreen}
                className="text-slate-300 hover:text-white transition-colors"
                title="Plein écran"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Under-player ticker "Bandeau INFOS" */}
      <div className="mt-3.5 w-full bg-[#07132a] border border-white/10 rounded-xl px-4 py-2.5 flex items-center overflow-hidden gap-3 shadow-md">
        <span className="bg-red-600 text-white font-extrabold text-[10px] tracking-widest px-2.5 py-0.5 rounded uppercase shrink-0">
          INFOS
        </span>
        <div className="flex-1 overflow-hidden relative h-5 select-none text-xs text-slate-300 flex items-center">
          {/* Scrolling text marquee */}
          <div className="animate-marquee whitespace-nowrap flex gap-8">
            <span>Bienvenue sur EduCam TV Online, la télévision éducative des enfants du Cameroun !</span>
            <span className="text-amber-400 font-semibold">Prochainement : {nextProgramTitle || 'La suite de nos programmes éducatifs'}</span>
            <span className="text-teal-400 font-semibold">Soutenez le projet du président fondateur Ngnassi Gueu Sylvin !</span>
          </div>
        </div>
      </div>
    </div>
  );
}

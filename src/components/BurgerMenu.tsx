import React from 'react';
import { X, Home, Radio, Calendar, RotateCcw, Grid, Heart, Bell, Info, CheckCircle2, Settings } from 'lucide-react';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  favoritesCount: number;
  notificationCount: number;
  onOpenAbout: () => void;
  onOpenEduApp: (appId: 'educam1' | 'educam2') => void;
}

export default function BurgerMenu({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  favoritesCount,
  notificationCount,
  onOpenAbout,
  onOpenEduApp
}: BurgerMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'direct', label: 'En Direct', icon: Radio, badge: 'LIVE', badgeColor: 'bg-red-600' },
    { id: 'programme', label: 'Programme TV', icon: Calendar },
    { id: 'replay', label: 'Replay', icon: RotateCcw },
    { id: 'categories', label: 'Catégories', icon: Grid },
    { id: 'favoris', label: 'Mes Favoris', icon: Heart, count: favoritesCount },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: notificationCount, countColor: 'bg-red-500' },
    { id: 'about', label: 'À propos', icon: Info, action: onOpenAbout },
  ];

  const appItems = [
    { id: 'educam1', label: 'EDUCAM1 (Maths & Français)', icon: CheckCircle2, badge: '1', badgeColor: 'bg-teal-500', action: () => onOpenEduApp('educam1') },
    { id: 'educam2', label: 'EDUCAM2 (Sciences & Chansons)', icon: CheckCircle2, badge: '2', badgeColor: 'bg-amber-500', action: () => onOpenEduApp('educam2') },
  ];

  const handleItemClick = (item: any) => {
    onClose();
    if (item.action) {
      item.action();
    } else {
      onTabChange(item.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
      />

      {/* Sliding Menu Drawer */}
      <div className="relative w-80 max-w-full bg-[#07132a] h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto z-10 animate-slide-in">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <span className="font-extrabold text-sm text-slate-200 uppercase tracking-widest">Navigation</span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Nav Links */}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-colors text-left cursor-pointer min-h-[44px] ${
                    isActive 
                      ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${item.countColor || 'bg-slate-700'}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* App Quick Links */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 block">Applications</span>
            <div className="space-y-1">
              {appItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onClose();
                    item.action();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors text-left cursor-pointer min-h-[44px]"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="pt-4 border-t border-white/10 mt-6 text-center">
          <button
            onClick={() => handleItemClick({ id: 'settings' })}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-left cursor-pointer ${
              activeTab === 'settings' ? 'bg-white/10 text-white' : 'text-slate-400'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Paramètres de l'application</span>
          </button>
          <div className="mt-4 text-[10px] text-slate-500">
            « Apprendre le Cameroun en chantant »
          </div>
        </div>
      </div>
    </div>
  );
}

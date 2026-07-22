import React from 'react';
import { 
  Home, 
  Radio, 
  Calendar, 
  RotateCcw, 
  Grid, 
  Heart, 
  Bell, 
  Info, 
  CheckCircle2, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  favoritesCount: number;
  notificationCount: number;
  onOpenAbout: () => void;
  onOpenEduApp: (appId: 'educam1' | 'educam2') => void;
}

export default function Sidebar({ 
  activeTab, 
  onTabChange, 
  favoritesCount, 
  notificationCount,
  onOpenAbout,
  onOpenEduApp
}: SidebarProps) {

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
    { id: 'educam1', label: 'EDUCAM1', icon: CheckCircle2, badge: '1', badgeColor: 'bg-teal-500', action: () => onOpenEduApp('educam1') },
    { id: 'educam2', label: 'EDUCAM2', icon: CheckCircle2, badge: '2', badgeColor: 'bg-amber-500', action: () => onOpenEduApp('educam2') },
  ];

  const settingItem = { id: 'settings', label: 'Paramètres', icon: Settings };

  const handleItemClick = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      onTabChange(item.id);
    }
  };

  return (
    <aside className="w-56 bg-[#07132a] border-r border-white/10 flex flex-col justify-between shrink-0 p-4 select-none h-[calc(100vh-80px)] sticky top-[80px] overflow-y-auto">
      {/* Menu items */}
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 block mb-2">MENU PRINCIPAL</span>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 group text-left ${
                    isActive 
                      ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-lg' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Badge or count display */}
                  {item.badge && (
                    <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse ${item.badgeColor}`}>
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
          </nav>
        </div>

        {/* Educational Apps Section */}
        <div>
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 block mb-2">APPLICATIONS</span>
          <nav className="space-y-1">
            {appItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all duration-150 group text-left"
                >
                  <div className="flex items-center gap-3">
                    <IconComp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings */}
        <div>
          <nav className="space-y-1">
            <button
              onClick={() => onTabChange(settingItem.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === settingItem.id
                  ? 'bg-slate-800 text-white border-l-2 border-amber-500'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{settingItem.label}</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Brand footer block "LES ENFANTS DU CAMEROUN" */}
      <div className="mt-8 pt-4 border-t border-white/10">
        <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3.5 text-center shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400/5 rounded-full blur-xl group-hover:bg-yellow-400/10 transition-colors" />
          <div className="flex justify-center mb-1.5">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007A5E] shadow-sm shadow-[#007A5E]/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CE1126] shadow-sm shadow-[#CE1126]/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FCD116] shadow-sm shadow-[#FCD116]/40" />
            </div>
          </div>
          <h4 className="text-[11px] font-black text-yellow-400 tracking-wider uppercase mb-0.5">
            Les Enfants du Cameroun
          </h4>
          <p className="text-[9px] text-slate-400 italic mb-1.5">
            « Bâtir l'avenir par la culture et le chant »
          </p>
          <div className="inline-block bg-yellow-400/15 text-yellow-400 font-black text-[8px] px-2 py-0.5 rounded-full tracking-widest border border-yellow-400/30 uppercase">
            Soutien Scolaire
          </div>
        </div>
      </div>
    </aside>
  );
}

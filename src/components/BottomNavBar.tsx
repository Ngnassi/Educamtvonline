import React from 'react';
import { Home, Radio, Calendar, Grid, User } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAbout: () => void;
}

export default function BottomNavBar({ activeTab, onTabChange, onOpenAbout }: BottomNavBarProps) {
  
  const navItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'direct', label: 'Direct', icon: Radio },
    { id: 'programme', label: 'Programme', icon: Calendar },
    { id: 'categories', label: 'Catégories', icon: Grid },
    { id: 'about', label: 'Profil', icon: User, action: onOpenAbout } // mapped 'Profil' to About/Association info
  ];

  const handleItemClick = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      onTabChange(item.id);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#07132a] border-t border-white/10 py-1.5 px-3 flex items-center justify-around z-40 shadow-xl select-none pb-safe-bottom">
      {navItems.map((item) => {
        const IconComp = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all duration-150 min-h-[44px] min-w-[44px] cursor-pointer ${
              isActive 
                ? 'text-amber-400 font-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <IconComp className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
            <span className="text-[9px] font-bold tracking-wider mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

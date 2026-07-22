import React from 'react';
import { BookOpen, Compass, Music, Film, Library, Globe, Sparkles, MapPin, LucideIcon } from 'lucide-react';
import { CategoryItem } from '../types';

interface CategoryChipsProps {
  categories: CategoryItem[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

// Map strings to actual Lucide component functions safely
const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Compass,
  Music,
  Film,
  Library,
  Globe,
  Sparkles,
  MapPin,
};

export default function CategoryChips({
  categories,
  selectedCategoryId,
  onSelectCategory
}: CategoryChipsProps) {
  return (
    <div className="w-full select-none" id="popular-categories-row">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
          CATÉGORIES POPULAIRES
        </h3>
        {selectedCategoryId && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-[11px] font-bold text-amber-400 hover:underline"
          >
            Voir tout ×
          </button>
        )}
      </div>

      {/* Grid on mobile, flex row wrapping on desktop */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3">
        {categories.map((cat) => {
          const IconComp = iconMap[cat.iconName] || BookOpen;
          const isSelected = selectedCategoryId === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`flex items-center gap-2 px-3.5 py-3 rounded-xl border transition-all duration-200 cursor-pointer ${cat.bgClass} ${
                isSelected 
                  ? 'ring-2 ring-offset-2 ring-offset-[#050e1e] ring-amber-400 font-extrabold scale-[1.02]' 
                  : 'font-bold'
              }`}
            >
              <div className={`p-1.5 rounded-lg text-white ${cat.colorClass}`}>
                <IconComp className="w-4 h-4" />
              </div>
              <span className={`text-xs uppercase tracking-wider ${cat.textClass}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

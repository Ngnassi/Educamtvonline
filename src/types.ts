export interface Program {
  id: string;
  title: string;
  time: string; // e.g., "08:00"
  duration: string; // e.g., "15:45"
  category: 'Éducation' | 'Culture' | 'Musique' | 'Documentaires' | 'Histoire' | 'Géographie' | 'Jeunesse' | 'Tourisme';
  description: string;
  videoUrl: string; // fallback real video or identifier
  thumbnailUrl: string; // image placeholder or generated visual
  presenter?: string;
  ageRange?: string; // e.g., "6-12 ans"
  lyrics?: string[]; // For karaoke / educational singing
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
  colorClass: string; // e.g., "bg-blue-600"
  bgClass: string; // e.g., "bg-blue-900/40 border-blue-500/30"
  textClass: string; // e.g., "text-blue-400"
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'live' | 'alert' | 'program' | 'edu';
}

export interface UserPreferences {
  favorites: string[]; // List of program IDs
  quality: 'Auto' | '1080p' | '720p' | '480p';
  volume: number; // 0 to 100
  isMuted: boolean;
  notificationsEnabled: boolean;
  subtitleSize: 'small' | 'medium' | 'large';
  classroomGrade: 'CM1' | 'CM2' | 'Tous';
}

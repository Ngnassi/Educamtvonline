import { Program, CategoryItem, SystemNotification } from './types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'education',
    name: 'ÉDUCATION',
    iconName: 'BookOpen',
    colorClass: 'bg-blue-600',
    bgClass: 'bg-blue-950/40 border-blue-500/20 hover:border-blue-500/50',
    textClass: 'text-blue-400'
  },
  {
    id: 'culture',
    name: 'CULTURE',
    iconName: 'Compass',
    colorClass: 'bg-orange-600',
    bgClass: 'bg-orange-950/40 border-orange-500/20 hover:border-orange-500/50',
    textClass: 'text-orange-400'
  },
  {
    id: 'musique',
    name: 'MUSIQUE',
    iconName: 'Music',
    colorClass: 'bg-purple-600',
    bgClass: 'bg-purple-950/40 border-purple-500/20 hover:border-purple-500/50',
    textClass: 'text-purple-400'
  },
  {
    id: 'documentaires',
    name: 'DOCUMENTAIRES',
    iconName: 'Film',
    colorClass: 'bg-green-600',
    bgClass: 'bg-green-950/40 border-green-500/20 hover:border-green-500/50',
    textClass: 'text-green-400'
  },
  {
    id: 'histoire',
    name: 'HISTOIRE',
    iconName: 'Library',
    colorClass: 'bg-[#8B0000]', // Bordeaux / Dark red
    bgClass: 'bg-red-950/40 border-red-800/20 hover:border-red-800/50',
    textClass: 'text-red-400'
  },
  {
    id: 'geographie',
    name: 'GÉOGRAPHIE',
    iconName: 'Globe',
    colorClass: 'bg-teal-600',
    bgClass: 'bg-teal-950/40 border-teal-500/20 hover:border-teal-500/50',
    textClass: 'text-teal-400'
  },
  {
    id: 'jeunesse',
    name: 'JEUNESSE',
    iconName: 'Sparkles',
    colorClass: 'bg-amber-500',
    bgClass: 'bg-amber-950/40 border-amber-500/20 hover:border-amber-500/50',
    textClass: 'text-amber-400'
  },
  {
    id: 'tourisme',
    name: 'TOURISME',
    iconName: 'MapPin',
    colorClass: 'bg-emerald-500',
    bgClass: 'bg-emerald-950/40 border-emerald-500/20 hover:border-emerald-500/50',
    textClass: 'text-emerald-400'
  }
];

export const PROGRAMS_TODAY: Program[] = [
  {
    id: 'p1',
    title: 'Les Dix Régions du Cameroun en Chanson',
    time: '08:00',
    duration: '15:45',
    category: 'Éducation',
    description: 'Une chanson rythmée pour retenir les 10 régions du Cameroun, leurs chefs-lieux et leurs spécificités culturelles.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-kids-playing-in-a-sunny-park-42656-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540747737956-378724044432?q=80&w=600&auto=format&fit=crop',
    presenter: 'Momo & Sali',
    ageRange: 'Tous âges',
    lyrics: [
      "Refrain : Adamaoua, Centre, Est et Extrême-Nord,",
      "Littoral, Nord, Nord-Ouest et l'Ouest encore,",
      "Le Sud et le Sud-Ouest, chantons tous en accord !",
      "Dix régions magnifiques, le Cameroun est fort !",
      "Couplet 1 : À l'Adamaoua, le château d'eau c'est Ngaoundéré,",
      "Au Centre, Yaoundé la colline parfumée,",
      "À l'Est, Bertoua et ses forêts dorées,",
      "À l'Extrême-Nord, Maroua et son artisanat coloré !"
    ],
    quiz: [
      {
        question: "Combien de régions compte le Cameroun ?",
        options: ["8 régions", "10 régions", "12 régions", "15 régions"],
        correctIndex: 1,
        explanation: "Le Cameroun compte 10 régions administratives depuis le décret présidentiel de 2008."
      },
      {
        question: "Quel est le chef-lieu de la région de l'Adamaoua ?",
        options: ["Maroua", "Ngaoundéré", "Garoua", "Bertoua"],
        correctIndex: 1,
        explanation: "Ngaoundéré est le chef-lieu de l'Adamaoua, souvent surnommé le château d'eau du Cameroun."
      }
    ]
  },
  {
    id: 'p2',
    title: 'Culture et Traditions Camerounaises',
    time: '09:00',
    duration: '22:10',
    category: 'Culture',
    description: 'À la découverte des danses traditionnelles, des costumes et des mets des quatre grandes aires culturelles du pays.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-african-tribal-dancer-performing-outdoors-41581-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523816572-a1a23d1a67b8?q=80&w=600&auto=format&fit=crop',
    presenter: 'Tata Solange',
    ageRange: '8-15 ans',
    lyrics: [
      "Dansons le Bikutsi au Centre et au Sud,",
      "Le Makossa au Littoral, c'est l'habitude !",
      "Le Ben-Skin à l'Ouest avec gratitude,",
      "Et la danse des gourdes au Nord avec plénitude !"
    ],
    quiz: [
      {
        question: "Quelle danse traditionnelle est originaire de la région de l'Ouest ?",
        options: ["Le Makossa", "Le Bikutsi", "Le Ben-Skin", "L'Assiko"],
        correctIndex: 2,
        explanation: "Le Ben-Skin est une danse traditionnelle très rythmée originaire de l'Ouest du Cameroun."
      },
      {
        question: "Quelles sont les quatre grandes aires culturelles du Cameroun ?",
        options: [
          "Fang-Beti, Sawa, Grassfields, Soudano-Sahélienne",
          "Nord, Sud, Est, Ouest",
          "Bamiléké, Douala, Ewondo, Peul",
          "Anglophone, Francophone, Pygmée, Sahélienne"
        ],
        correctIndex: 0,
        explanation: "Le Cameroun est divisé en 4 aires culturelles : Fang-Beti (forêt), Sawa (côte), Grassfields (hauts plateaux), et Soudano-Sahélienne (sahel)."
      }
    ]
  },
  {
    id: 'p3',
    title: 'Voyage au cœur du Cameroun',
    time: '10:00',
    duration: '18:30',
    category: 'Documentaires',
    description: 'Une aventure extraordinaire à travers les réserves naturelles, du Mont Cameroun aux chutes de la Lobé à Kribi.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-mighty-waterfall-in-forest-42295-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop',
    presenter: 'Ngnassi Gueu Sylvin',
    ageRange: 'Tous âges',
    lyrics: [
      "Du Mont Cameroun qui touche les nuages,",
      "Aux plages de Kribi et ses beaux rivages,",
      "Le parc de Waza offre un fier paysage,",
      "Protégeons notre faune, c'est notre héritage !"
    ],
    quiz: [
      {
        question: "Quelle est la particularité des chutes de la Lobé à Kribi ?",
        options: [
          "Elles sont les plus hautes d'Afrique",
          "Elles se jettent directement dans l'océan Atlantique",
          "Elles sont formées d'eau thermale chaude",
          "Elles abritent des crocodiles sacrés"
        ],
        correctIndex: 1,
        explanation: "Les chutes de la Lobé sont uniques au monde car ce fleuve se jette en cascade directement dans l'océan Atlantique."
      },
      {
        question: "Quelle est l'altitude approximative du Mont Cameroun, le plus haut sommet du pays ?",
        options: ["3 070 mètres", "4 095 mètres", "5 100 mètres", "2 800 mètres"],
        correctIndex: 1,
        explanation: "Le Mont Cameroun (Char des Dieux) culmine à environ 4 095 mètres d'altitude."
      }
    ]
  },
  {
    id: 'p4',
    title: 'Cours de Mathématiques : CM1 - CM2',
    time: '11:00',
    duration: '25:40',
    category: 'Éducation',
    description: 'Maîtriser les multiplications, les fractions et la géométrie de base de façon simple, ludique et interactive.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-teacher-writing-on-blackboard-in-classroom-34255-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
    presenter: 'Maître Amadou',
    ageRange: '9-11 ans',
    lyrics: [
      "Deux fois deux font quatre, c'est évident !",
      "Quatre fois quatre font seize, en souriant !",
      "Pour diviser un gâteau, pense aux fractions !",
      "Les maths c'est magique, faisons attention !"
    ],
    quiz: [
      {
        question: "Combien font 7 multiplié par 8 ?",
        options: ["54", "56", "64", "48"],
        correctIndex: 1,
        explanation: "7 x 8 = 56. Une table à réviser en chantant !"
      },
      {
        question: "Dans une fraction, comment appelle-t-on le nombre situé sous la barre ?",
        options: ["Le numérateur", "Le diviseur", "Le dénominateur", "Le quotient"],
        correctIndex: 2,
        explanation: "Le dénominateur indique en combien de parts l'unité est divisée, alors que le numérateur (au-dessus) indique le nombre de parts prises."
      }
    ]
  },
  {
    id: 'p5',
    title: 'Pause Musicale : Chansons Éducatives',
    time: '12:00',
    duration: '12:15',
    category: 'Musique',
    description: 'Chantons en chœur les comptines patriotiques et écologiques pour grandir citoyen et protecteur de la nature.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-little-girl-playing-toy-piano-and-singing-40348-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    presenter: 'Chorale des Enfants',
    ageRange: 'Tous âges',
    lyrics: [
      "Cameroun, ô berceau de nos ancêtres,",
      "Va debout et jaloux de ta liberté !",
      "Comme un soleil ton drapeau doit paraître,",
      "Un symbole de foi et d'unité !"
    ],
    quiz: [
      {
        question: "Quel est l'auteur des paroles de l'Hymne national du Cameroun ?",
        options: ["Samuel Minkyo Bamba", "René Jam Afane", "Manu Dibango", "Francis Bebey"],
        correctIndex: 1,
        explanation: "René Jam Afane a écrit les paroles de l'hymne national 'O Cameroun, berceau de nos ancêtres' tandis que la musique a été composée par Samuel Minkyo Bamba."
      }
    ]
  },
  {
    id: 'p6',
    title: 'Histoire du Cameroun : Le temps des royaumes',
    time: '13:00',
    duration: '20:15',
    category: 'Histoire',
    description: 'Une plongée captivante dans le passé, des royaumes Bamoun, Douala et Tikar aux sultanats du septentrion.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-old-man-showing-book-with-drawings-to-child-41710-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop',
    presenter: 'Professeur Fon',
    ageRange: '10-18 ans',
    lyrics: [
      "Le roi Njoya, inventeur génial d'un alphabet,",
      "Écrivait l'histoire que son peuple chérissait,",
      "Dans son palais somptueux à Foumban érigé,",
      "Le royaume Bamoun rayonne à jamais !"
    ],
    quiz: [
      {
        question: "Quel roi célèbre du royaume Bamoun a inventé une écriture originale appelée 'Shumom' ?",
        options: ["Roi Mbombo Njoya", "Sultan Ibrahim Njoya", "Roi Nsangu", "Roi Ncharé"],
        correctIndex: 1,
        explanation: "Le Sultan/Roi Ibrahim Njoya a inventé à la fin du XIXe siècle l'écriture Shumom, un alphabet original pour sauvegarder l'histoire de son peuple."
      },
      {
        question: "Dans quelle ville se situe le magnifique Palais des Rois Bamoun ?",
        options: ["Bafoussam", "Foumban", "Dschang", "Yaoundé"],
        correctIndex: 1,
        explanation: "Le Palais des Rois Bamoun se situe à Foumban, chef-lieu du département du Noun."
      }
    ]
  }
];

export const PROGRAMS_TOMORROW: Program[] = [
  {
    id: 't1',
    title: 'Les Animaux de la Savane et de la Forêt',
    time: '08:00',
    duration: '18:20',
    category: 'Jeunesse',
    description: 'Une exploration ludique pour identifier les éléphants, lions, gorilles et oiseaux du Cameroun.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-elephants-walking-in-the-savanna-42400-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=600&auto=format&fit=crop',
    presenter: 'Momo & Sali'
  },
  {
    id: 't2',
    title: 'Initiation aux Langues Nationales',
    time: '09:30',
    duration: '20:10',
    category: 'Éducation',
    description: 'Apprendre à saluer, compter et chanter dans quelques langues locales comme le Duala, Ewondo, Medumba et Fufulde.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bilingual-preschool-teacher-with-kids-42402-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
    presenter: 'Tata Solange'
  },
  {
    id: 't3',
    title: 'Géographie : Les Fleuves du Cameroun',
    time: '11:00',
    duration: '14:50',
    category: 'Géographie',
    description: 'Le cours sur la Sanaga, le Wouri, le Noun, le Logone et le fleuve Congo-Ogooué en s\'amusant.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-winding-river-42296-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop',
    presenter: 'Maître Amadou'
  }
];

export const PROGRAMS_WEEK: Program[] = [
  {
    id: 'w1',
    title: 'Émission Spéciale : Le Projet "Les Enfants du Cameroun"',
    time: 'Mercredi 14:00',
    duration: '35:00',
    category: 'Documentaires',
    description: 'Ngnassi Gueu Sylvin présente la vision du projet pour éduquer en chantant et équiper les écoles rurales.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-happy-smiling-african-school-children-classroom-41614-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
    presenter: 'Ngnassi Gueu Sylvin'
  },
  {
    id: 'w2',
    title: 'Grand Concours National de Chansons Éducatives',
    time: 'Vendredi 16:00',
    duration: '45:00',
    category: 'Musique',
    description: 'Les chorales scolaires de tout le Cameroun s\'affrontent en chanson pour célébrer la fraternité et le bilinguisme.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-audience-clapping-at-a-theatre-performance-41584-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
    presenter: 'Chorale des Enfants'
  }
];

export const ASSOCIATION_SONGS: Program[] = [
  {
    id: 's1',
    title: 'Chant Officiel : Les Enfants du Cameroun',
    time: 'Chant Phare',
    duration: '04:15',
    category: 'Musique',
    description: 'L\'hymne de solidarité et d\'espoir créé par l\'association pour encourager l\'apprentissage de tous les enfants.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-happy-smiling-african-school-children-classroom-41614-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
    presenter: 'Ngnassi Gueu Sylvin',
    ageRange: 'Tous âges',
    lyrics: [
      "Nous sommes les enfants du Cameroun, unis et forts,",
      "Du Nord au Sud, de l'Est à l'Ouest, chantons en accord !",
      "L'éducation est notre flambeau, notre trésor,",
      "Pour bâtir un pays prospère et plein de valeurs !"
    ],
    quiz: [
      {
        question: "Quel est le but principal de l'association 'Les Enfants du Cameroun' ?",
        options: [
          "Promouvoir le sport professionnel",
          "Soutenir l'éducation et équiper les écoles rurales",
          "Développer l'industrie du cinéma",
          "Organiser des voyages à l'étranger"
        ],
        correctIndex: 1,
        explanation: "L'association 'Les Enfants du Cameroun' oeuvre principalement pour la scolarisation, le bilinguisme et l'équipement des écoles en milieu rural."
      }
    ]
  },
  {
    id: 's2',
    title: 'Chanson du Civisme : Citoyen Solidaire',
    time: 'Éducation civique',
    duration: '03:45',
    category: 'Éducation',
    description: 'Apprendre les valeurs de citoyenneté, de respect des emblèmes nationaux et de solidarité humaine en chanson.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-kids-playing-in-a-sunny-park-42656-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540747737956-378724044432?q=80&w=600&auto=format&fit=crop',
    presenter: 'Chorale des Enfants',
    ageRange: '6-12 ans',
    lyrics: [
      "Respecter le drapeau, la patrie et la loi,",
      "Aider son prochain chaque jour avec joie.",
      "Le civisme commence par toi et par moi,",
      "Faisons rayonner le Cameroun de foi !"
    ],
    quiz: [
      {
        question: "Qu'est-ce que le civisme ?",
        options: [
          "Le respect des règles de vie en société et de sa patrie",
          "L'étude scientifique des étoiles",
          "L'art de dessiner des bandes dessinées",
          "La pratique intensive du football"
        ],
        correctIndex: 0,
        explanation: "Le civisme désigne le dévouement du citoyen pour sa patrie et le respect des règles collectives et d'autrui."
      }
    ]
  },
  {
    id: 's3',
    title: 'Le Karaoké des Tables de Multiplication',
    time: 'Mathématiques amusantes',
    duration: '05:10',
    category: 'Éducation',
    description: 'Chanter pour retenir les tables de multiplication sans effort avec des rythmes entraînants !',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-teacher-writing-on-blackboard-in-classroom-34255-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
    presenter: 'Maître Amadou',
    ageRange: '7-11 ans',
    lyrics: [
      "Les tables de multiplication en musique,",
      "C'est fantastique et super pratique !",
      "Cinq fois cinq font vingt-cinq, c'est magique,",
      "Six fois six font trente-six, c'est logique !"
    ],
    quiz: [
      {
        question: "Combien font 9 fois 9 ?",
        options: ["72", "81", "90", "64"],
        correctIndex: 1,
        explanation: "9 x 9 = 81. Bravo, vous maîtrisez la table de 9 !"
      }
    ]
  },
  {
    id: 's4',
    title: 'L\'Hymne du Bilinguisme : Français & English',
    time: 'Langues et Union',
    duration: '04:30',
    category: 'Culture',
    description: 'Célébrer la double richesse linguistique du Cameroun à travers un chant bilingue joyeux et entraînant.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bilingual-preschool-teacher-with-kids-42402-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
    presenter: 'Tata Solange',
    ageRange: 'Tous âges',
    lyrics: [
      "Living in harmony, hand in hand,",
      "Chantons ensemble pour notre beau pays.",
      "Bilingues et fiers de notre héritage,",
      "We are the children, strong and wise !"
    ],
    quiz: [
      {
        question: "Quelles sont les deux langues officielles du Cameroun ?",
        options: [
          "Le Français et l'Espagnol",
          "Le Français et l'Anglais",
          "L'Anglais et l'Allemand",
          "Le Français et l'Ewondo"
        ],
        correctIndex: 1,
        explanation: "Le Cameroun est officiellement bilingue anglais-français depuis son indépendance et sa réunification."
      }
    ]
  }
];

export const NOTIFICATIONS_INIT: SystemNotification[] = [
  {
    id: 'n1',
    title: 'Émission En Direct !',
    message: 'Le grand documentaire "Voyage au cœur du Cameroun" vient de commencer.',
    time: 'À l\'instant',
    read: false,
    type: 'live'
  },
  {
    id: 'n2',
    title: 'Nouvelle App disponible',
    message: 'EDUCAM1 (Maths & Français pour primaire) est mis à jour. Téléchargez les cours hors-ligne !',
    time: 'Il y a 2 heures',
    read: false,
    type: 'edu'
  },
  {
    id: 'n3',
    title: 'Message du Fondateur',
    message: 'Ngnassi Gueu Sylvin vous remercie pour votre engagement envers l\'éducation de nos enfants.',
    time: 'Hier',
    read: true,
    type: 'alert'
  }
];

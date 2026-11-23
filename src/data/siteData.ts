export type PageId =
  | 'accueil'
  | 'services'
  | 'service-chauffage'
  | 'service-climatisation'
  | 'service-sanitaire'
  | 'service-ventilation'
  | 'service-industriel'
  | 'service-entretien'
  | 'realisations'
  | 'rendez-vous'
  | 'contact';

export interface ChantierPhoto {
  src: string;
  alt: string;
  legende: string;
  width: number;
  height: number;
  serviceId: ServiceId;
}

export type ServiceId =
  | 'chauffage'
  | 'climatisation'
  | 'sanitaire'
  | 'ventilation'
  | 'industriel'
  | 'entretien';

export interface ServiceItem {
  id: ServiceId;
  pageId: PageId;
  num: string;
  nom: string;
  phrase: string;
  titre: string;
  resume: string;
  texte: string;
  prestations: string[];
  note: string;
  heroPhoto?: string;
  heroAlt?: string;
  faq: Array<{ question: string; answer: string }>;
}

export const ETS_CONFIG = {
  nom: 'ETS Chipeaux',
  responsable: 'Thomas Chipeaux',
  adresse: '10 rue des Vignes, 25420 Bart, France',
  tel: '07 69 97 35 06',
  telHref: 'tel:+33769973506',
  email: 'tchipeaux@icloud.com',
  mailHref: 'mailto:tchipeaux@icloud.com',
  instagram: 'https://www.instagram.com/etschipeaux/',
  instagramHandle: '@etschipeaux',
  secteur: 'Interventions dans tout le pays de Montbéliard',
  siret: '934 668 930 00019',
  ape: '43.22B',
  communes: [
    'Bart',
    'Montbéliard',
    'Sochaux',
    'Audincourt',
    'Valentigney',
    'Bethoncourt',
    'Grand-Charmont',
    'Étupes',
    'Seloncourt',
    'Hérimoncourt',
    'Beaucourt',
    'Delle',
  ],
};

export const MARQUES = [
  { nom: 'GREE', logo: '/assets/marques/gree.svg', url: 'https://www.gree.fr/' },
  { nom: 'Daikin', logo: '/assets/marques/daikin.svg', url: 'https://www.daikin.fr/' },
  { nom: 'Mitsubishi Electric', logo: null, url: 'https://www.mitsubishielectric.fr/' },
  { nom: 'Atlantic', logo: '/assets/marques/atlantic.svg', url: 'https://www.atlantic.fr/' },
  { nom: 'Toshiba', logo: '/assets/marques/toshiba.svg', url: 'https://www.toshiba.fr/' },
  { nom: 'Panasonic', logo: '/assets/marques/panasonic.svg', url: 'https://www.panasonic.com/fr/' },
  { nom: 'Viessmann', logo: '/assets/marques/viessmann.svg', url: 'https://www.viessmann.fr/' },
  { nom: 'Frisquet', logo: '/assets/marques/frisquet.svg', url: 'https://www.frisquet.com/' },
  { nom: 'De Dietrich', logo: '/assets/marques/de-dietrich.svg', url: 'https://www.dedietrich-thermique.fr/' },
  { nom: 'Saunier Duval', logo: null, url: 'https://www.saunierduval.fr/' },
  { nom: 'Bosch', logo: '/assets/marques/bosch.svg', url: 'https://www.bosch.fr/' },
];

export const ALL_PHOTOS: ChantierPhoto[] = [
  // Chauffage (6)
  {
    src: '/assets/chantiers/chauffage-pompe-chaleur-bosch.jpg',
    alt: "Unité extérieure d'une pompe à chaleur Bosch installée en façade, au-dessus d'un lit de galets",
    legende: 'Pompe à chaleur Bosch',
    width: 768,
    height: 1024,
    serviceId: 'chauffage',
  },
  {
    src: '/assets/chantiers/chauffage-pompe-chaleur-ecodan.jpg',
    alt: 'Unité extérieure Mitsubishi Electric Ecodan posée sur plots béton contre une façade',
    legende: 'Pompe à chaleur Ecodan',
    width: 768,
    height: 1024,
    serviceId: 'chauffage',
  },
  {
    src: '/assets/chantiers/chauffage-radiateur-electrique.jpg',
    alt: 'Radiateur installé sous une fenêtre dans une pièce carrelée',
    legende: 'Radiateur posé et raccordé',
    width: 768,
    height: 1024,
    serviceId: 'chauffage',
  },
  {
    src: '/assets/chantiers/chauffage-plancher-chauffant-pose.jpg',
    alt: "Réseau de tubes d'un plancher chauffant hydraulique posé en spirale, avant coulage de la chape",
    legende: "Réseau de tubes d'un plancher chauffant hydraulique posé en spirale, avant coulage de la chape",
    width: 778,
    height: 1024,
    serviceId: 'chauffage',
  },
  {
    src: '/assets/chantiers/chauffage-veranda-plancher-chauffant.jpg',
    alt: "Véranda : plancher chauffant hydraulique en cours de pose, vue de l'extérieur",
    legende: "Véranda : plancher chauffant hydraulique en cours de pose, vue de l'extérieur",
    width: 781,
    height: 1024,
    serviceId: 'chauffage',
  },
  {
    src: '/assets/chantiers/chauffage-collecteur-plancher.jpg',
    alt: 'Collecteur de plancher chauffant hydraulique, avec débitmètres, vannes et boîtier de régulation',
    legende: 'Collecteur de plancher chauffant hydraulique',
    width: 775,
    height: 1024,
    serviceId: 'chauffage',
  },
  // Climatisation (3)
  {
    src: '/assets/chantiers/climatisation-panasonic-r32.jpg',
    alt: 'Unité extérieure de climatisation Panasonic R32 installée sur une terrasse carrelée',
    legende: 'Unité extérieure Panasonic R32',
    width: 1024,
    height: 768,
    serviceId: 'climatisation',
  },
  {
    src: '/assets/chantiers/climatisation-unite-exterieure-daikin.jpg',
    alt: "Unité extérieure Daikin installée en façade, avec l'étiquette ETS Chipeaux",
    legende: 'Unité extérieure Daikin',
    width: 768,
    height: 1024,
    serviceId: 'climatisation',
  },
  {
    src: '/assets/chantiers/climatisation-carottage-facade.jpg',
    alt: "Percement d'une façade au carottier, sous l'avancée de toit",
    legende: 'Percement de façade au carottier',
    width: 768,
    height: 1024,
    serviceId: 'climatisation',
  },
  // Sanitaire (5)
  {
    src: '/assets/chantiers/sanitaire-fuite-raccord-encastre.jpg',
    alt: "Fuite d'eau sous pression au niveau d'un raccord encastré, dans une cloison ouverte lors d'un dépannage",
    legende: 'Fuite sur raccord encastré',
    width: 768,
    height: 1024,
    serviceId: 'sanitaire',
  },
  {
    src: '/assets/chantiers/sanitaire-sortie-douche-carrelage.jpg',
    alt: "Sortie d'eau filetée encastrée dans le carrelage d'une salle de bains",
    legende: 'Sortie encastrée en carrelage',
    width: 768,
    height: 1024,
    serviceId: 'sanitaire',
  },
  {
    src: '/assets/chantiers/sanitaire-wc-mosaique.jpg',
    alt: 'WC suspendu installé devant un mur en mosaïque noire, dans une pièce en cours de finition',
    legende: 'WC posé et raccordé',
    width: 768,
    height: 1024,
    serviceId: 'sanitaire',
  },
  {
    src: '/assets/chantiers/sanitaire-canalisation-pe-tranchee.jpg',
    alt: "Canalisation d'eau posée dans une tranchée avant remblaiement",
    legende: 'Canalisation enterrée',
    width: 768,
    height: 1024,
    serviceId: 'sanitaire',
  },
  {
    src: '/assets/chantiers/sanitaire-fuite-canalisation-tranchee.jpg',
    alt: "Rupture d'une canalisation enterrée dans une tranchée en cours d'excavation",
    legende: 'Recherche et réparation de fuite',
    width: 768,
    height: 1024,
    serviceId: 'sanitaire',
  },
  // Industriel (5)
  {
    src: '/assets/chantiers/industriel-nourrice-prefabriquee.jpg',
    alt: 'Nourrice de tuyauterie avec vannes, pompe et échangeur, assemblée en atelier',
    legende: 'Nourrice assemblée en atelier',
    width: 768,
    height: 1024,
    serviceId: 'industriel',
  },
  {
    src: '/assets/chantiers/industriel-atelier-pont-roulant.jpg',
    alt: "Levage d'un module de tuyauterie au pont roulant dans l'atelier",
    legende: 'Levage d’un module en atelier',
    width: 768,
    height: 1024,
    serviceId: 'industriel',
  },
  {
    src: '/assets/chantiers/industriel-coudes-calorifuges-local-technique.jpg',
    alt: 'Réseau de tuyauteries calorifugées et vannes en local technique',
    legende: 'Réseau de tuyauteries calorifugées et vannes en local technique',
    width: 777,
    height: 1024,
    serviceId: 'industriel',
  },
  {
    src: '/assets/chantiers/industriel-reseau-valve-local-technique.jpg',
    alt: 'Réseau de tuyauteries calorifugées et vannes en local technique',
    legende: 'Réseau de tuyauteries calorifugées et vannes en local technique',
    width: 780,
    height: 1024,
    serviceId: 'industriel',
  },
  {
    src: '/assets/chantiers/industriel-collecteur-local-technique.jpg',
    alt: 'Réseau de tuyauteries calorifugées et vannes en local technique',
    legende: 'Réseau de tuyauteries calorifugées et vannes en local technique',
    width: 784,
    height: 1024,
    serviceId: 'industriel',
  },
  // Entretien (1)
  {
    src: '/assets/chantiers/entretien-unite-exterieure-nettoyage.jpg',
    alt: 'Unité extérieure ouverte en cours de nettoyage : échangeur et hélice dégagés, mousse nettoyante appliquée',
    legende: 'Nettoyage d’une unité extérieure',
    width: 576,
    height: 1024,
    serviceId: 'entretien',
  },
];

export const HOME_PREVIEW_FILES = [
  'chauffage-plancher-chauffant-pose.jpg',
  'chauffage-veranda-plancher-chauffant.jpg',
  'chauffage-pompe-chaleur-bosch.jpg',
  'climatisation-unite-exterieure-daikin.jpg',
  'industriel-nourrice-prefabriquee.jpg',
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'chauffage',
    pageId: 'service-chauffage',
    num: '01',
    nom: 'Chauffage',
    phrase: 'Chaudières, pompes à chaleur, planchers chauffants',
    titre: "Chauffage & production d'eau chaude",
    resume:
      'Chaudières gaz et fioul, pompes à chaleur, planchers chauffants et radiateurs : une installation adaptée à votre bâtiment, fiable et suivie dans le temps.',
    texte:
      "Une installation de chauffage bien dimensionnée, c'est un logement confortable et une facture d'énergie maîtrisée. Nous étudions votre besoin, remplaçons votre chaudière vieillissante et mettons votre système en service dans les règles.",
    prestations: [
      'Installation et remplacement de chaudière gaz et fioul',
      'Pompes à chaleur Air/Eau et systèmes hybrides',
      'Plancher chauffant hydraulique et collecteurs régulés',
      'Pose et remplacement de radiateurs',
      'Désembouage et équilibrage des circuits',
      'Entretien annuel obligatoire et dépannage 7j/7',
    ],
    note:
      'Besoin de remplacer votre chaudière ou de passer à une pompe à chaleur ? Nous dimensionnons votre installation sur place et établissons un devis gratuit.',
    heroPhoto: '/assets/chantiers/chauffage-pompe-chaleur-bosch.jpg',
    heroAlt: "Unité extérieure d'une pompe à chaleur Bosch installée par ETS Chipeaux",
    faq: [
      {
        question: 'Quel système choisir entre chaudière gaz et pompe à chaleur ?',
        answer:
          "Cela dépend de l'isolation du logement, des émetteurs existants (radiateurs haute température ou plancher chauffant) et de vos objectifs de consommation. Nous étudions votre installation lors de la visite technique.",
      },
      {
        question: 'Assurez-vous le désembouage du plancher chauffant ?',
        answer:
          'Oui, nous réalisons le désembouage hydrodynamique des planchers chauffants et circuits de radiateurs pour rétablir la circulation et préserver les échangeurs.',
      },
    ],
  },
  {
    id: 'climatisation',
    pageId: 'service-climatisation',
    num: '02',
    nom: 'Climatisation',
    phrase: 'Mono-split, multi-split, gainable et réversible',
    titre: 'Climatisation & systèmes réversibles',
    resume:
      "Vous rafraîchir l'été et, en version réversible, vous chauffer l'hiver. Mono-split, multi-split ou gainable : une pose propre et une mise en service contrôlée.",
    texte:
      'Nous dimensionnons et installons des systèmes Inverter discrets et silencieux pour les chambres, pièces de vie, vérandas et bureaux professionnels.',
    prestations: [
      'Climatisation mono-split et multi-split',
      'Systèmes gainables intégrés en faux-plafond',
      'Pompes à chaleur réversibles air/air',
      'Percement soigné, liaisons frigorifiques isolées',
      "Mise en service et contrôle d'étanchéité",
      'Entretien annuel et rechargement de fluide',
    ],
    note:
      'Une climatisation bien entretenue garantit un air sain et préserve le rendement du compresseur.',
    heroPhoto: '/assets/chantiers/climatisation-unite-exterieure-daikin.jpg',
    heroAlt: "Unité extérieure Daikin posée en façade avec l'étiquette ETS Chipeaux",
    faq: [
      {
        question: 'Une climatisation réversible peut-elle chauffer en hiver ?',
        answer:
          'Oui. Les systèmes air/air modernes maintiennent leur performance calorifique même par températures négatives, avec un coût électrique très inférieur aux convecteurs.',
      },
    ],
  },
  {
    id: 'sanitaire',
    pageId: 'service-sanitaire',
    num: '03',
    nom: 'Plomberie & sanitaire',
    phrase: "Réseaux d'eau, salles de bains, recherche de fuites",
    titre: 'Plomberie générale & sanitaire',
    resume:
      'Installation, entretien et réparation de vos équipements sanitaires, pour la maison comme pour les locaux professionnels.',
    texte:
      'De la création complète de réseaux hydrocâblés à la rénovation de salle de bains ou au dépannage urgent sur canalisation enterrée ou encastrée, nous intervenons proprement et durablement.',
    prestations: [
      "Création et rénovation de réseaux d'eau chaude et froide",
      'Installation complète de salles de bains et douches',
      'Pose de WC suspendus, robinetterie et receveurs',
      'Remplacement de chauffe-eau et ballons thermodynamiques',
      'Recherche de fuite et réparation sur canalisation',
      'Raccordements extérieurs et tranchées sanitaires',
    ],
    note:
      "Fuite d'eau ou panne de chauffe-eau ? Appelez directement le 07 69 97 35 06 pour une intervention rapide.",
    heroPhoto: '/assets/chantiers/sanitaire-wc-mosaique.jpg',
    heroAlt: 'WC suspendu installé devant un mur en mosaïque noire par ETS Chipeaux',
    faq: [
      {
        question: 'Intervenez-vous en urgence pour une fuite d’eau ?',
        answer:
          'Oui, nous intervenons 7j/7 sur les fuites actives, ruptures de canalisations, raccords encastrés et chauffe-eau percés.',
      },
    ],
  },
  {
    id: 'ventilation',
    pageId: 'service-ventilation',
    num: '04',
    nom: 'Ventilation',
    phrase: "VMC simple et double flux, traitement d'air",
    titre: "Ventilation & traitement d'air",
    resume:
      "Maîtrise complète des systèmes de renouvellement et de traitement d'air pour garantir confort, salubrité et qualité de l'air intérieur.",
    texte:
      'Un air correctement renouvelé protège votre santé et évite les problèmes de condensation et de moisissures tout en limitant les déperditions thermiques.',
    prestations: [
      'Installation de VMC simple flux hygroréglable',
      'VMC double flux à récupération de chaleur',
      'Extraction et ventilation de locaux professionnels',
      'Nettoyage, désinfection et réglage des bouches',
      'Maintenance de caissons et gaines de ventilation',
    ],
    note:
      "Nous associons l'étude de ventilation à vos projets de chauffage ou de rénovation pour garantir un bâtiment sain.",
    faq: [
      {
        question: 'Pourquoi entretenir sa VMC régulièrement ?',
        answer:
          "L'encrassement des bouches et du caisson réduit le débit d'extraction, augmente le bruit et favorise l'humidité dans les pièces d'eau.",
      },
    ],
  },
  {
    id: 'industriel',
    pageId: 'service-industriel',
    num: '05',
    nom: 'Tuyauterie industrielle',
    phrase: 'Réseaux de process et de fluides, préfabrication',
    titre: 'Tuyauterie industrielle & tuyauterie de process',
    resume:
      'Tuyauterie de process, réseaux de fluides et raccordements sur sites industriels, plateformes logistiques et ateliers de production.',
    texte:
      'Nous intervenons sur sites industriels, plateformes logistiques et ateliers de production : préfabrication en atelier, pose et assemblage sur site, modification et extension de réseaux de fluides.',
    prestations: [
      'Préfabrication en atelier',
      'Pose et assemblage sur site',
      "Raccordement d'équipements industriels",
      'Réseaux chauffage et eau glacée',
      'Distribution de fluides industriels',
      "Modification et extension d'installations",
      'Chauffage et ventilation de locaux professionnels',
      'Sanitaires collectifs',
    ],
    note:
      'Un projet industriel ou tertiaire ? Décrivez-nous votre besoin : nous étudions la faisabilité technique et vous transmettons une proposition détaillée, planifiée avec votre exploitation.',
    heroPhoto: '/assets/chantiers/industriel-nourrice-prefabriquee.jpg',
    heroAlt: 'Nourrice de tuyauterie avec vannes, pompe et échangeur, préfabriquée et assemblée en atelier',
    faq: [
      {
        question: "Intervenez-vous pendant l'exploitation du site ?",
        answer:
          "Oui. Nous planifions les interventions avec vos équipes afin de limiter l'impact sur la production : travail par phases, plages horaires adaptées et, lorsque c'est nécessaire, interventions en dehors des heures d'exploitation.",
      },
      {
        question: 'Réalisez-vous des travaux pour des collectivités et des gestionnaires de biens ?',
        answer:
          "Oui. Nous travaillons pour des professionnels, des entreprises, des collectivités et des gestionnaires de biens, avec devis détaillé et planification adaptée à l'exploitation du site.",
      },
      {
        question: 'Prenez-vous en charge la modification de réseaux existants ?',
        answer:
          'Oui : modification, extension, remplacement de tronçons et raccordement de nouveaux équipements sur des réseaux existants, en atelier comme sur site.',
      },
    ],
  },
  {
    id: 'entretien',
    pageId: 'service-entretien',
    num: '06',
    nom: 'Entretien & dépannage',
    phrase: 'Entretien annuel, contrats et dépannage 7j/7',
    titre: 'Entretien & dépannage',
    resume:
      'Une installation entretenue consomme moins, dure plus longtemps et tombe moins souvent en panne. Dépannage tous appareils, toutes marques.',
    texte:
      'Une chaudière ou une climatisation encrassée perd en rendement et s’use prématurément. Nous assurons l’entretien annuel réglementaire avec attestation ainsi que le dépannage rapide 7 jours sur 7.',
    prestations: [
      'Démontage, nettoyage et décrassage du corps de chauffe',
      'Contrôle du brûleur, du gicleur et des électrodes',
      'Mesure et réglage de la combustion et contrôle CO',
      'Vérification des dispositifs de sécurité et étanchéité',
      "Remise de l'attestation d'entretien réglementaire",
      "Contrats d'entretien climatisation et dépannage 7j/7",
    ],
    note:
      "L'entretien annuel de votre chaudière est obligatoire. Appelez-nous pour planifier votre visite.",
    heroPhoto: '/assets/chantiers/entretien-unite-exterieure-nettoyage.jpg',
    heroAlt: "Nettoyage complet d'une unité extérieure de climatisation par ETS Chipeaux",
    faq: [
      {
        question: 'Remettez-vous une attestation après l’entretien ?',
        answer:
          "Oui, nous vous remettons systématiquement l'attestation d'entretien réglementaire valable auprès de votre assurance.",
      },
    ],
  },
];

export const HOME_FAQ = [
  {
    question: 'Le devis est-il vraiment gratuit ?',
    answer:
      'Oui. Le devis est gratuit et sans engagement, après une étude de votre projet. Vous savez précisément ce qui est installé, à quel prix, avant tout démarrage des travaux.',
  },
  {
    question: 'Sous quel délai pouvez-vous intervenir ?',
    answer:
      'Nous intervenons rapidement dans le pays de Montbéliard, y compris en dépannage. Pour toute urgence (panne de chauffage en hiver, panne de climatisation en été), appelez directement le 07 69 97 35 06.',
  },
  {
    question: 'Intervenez-vous chez les particuliers et chez les professionnels ?',
    answer:
      'Les deux. Nous travaillons pour les particuliers (maisons, appartements) comme pour les professionnels et les industriels : bureaux, plateformes logistiques, ateliers et sites de production.',
  },
  {
    question: 'À quelle fréquence faut-il entretenir sa chaudière ?',
    answer:
      "Un entretien chaque année est obligatoire et recommandé pour garder une installation performante, sûre et économique. Nous vous remettons l'attestation d'entretien après l'intervention.",
  },
  {
    question: 'Une pompe à chaleur peut-elle aussi rafraîchir en été ?',
    answer:
      "Oui. Les systèmes réversibles assurent le chauffage en hiver et le rafraîchissement en été, avec une seule installation. C'est une solution particulièrement confortable pour les vérandas et les extensions vitrées.",
  },
  {
    question: 'Quelles zones couvrez-vous ?',
    answer:
      'Nous intervenons principalement dans le pays de Montbéliard et ses alentours : Bart, Montbéliard, Sochaux, Audincourt, Valentigney, Bethoncourt, Grand-Charmont, Étupes, Seloncourt, Hérimoncourt, Beaucourt, Delle et les communes voisines.',
  },
  {
    question: 'Puis-je avoir un rendez-vous en dehors des heures de bureau ?',
    answer:
      "Nous nous adaptons à votre disponibilité, y compris en dehors des horaires habituels lorsque c'est possible. Indiquez le créneau qui vous convient dans le formulaire de rendez-vous, nous vous confirmerons le rendez-vous.",
  },
];

export const HOME_ETAPES = [
  {
    num: '01',
    titre: 'Contact',
    texte: 'Par téléphone, par mail ou via le formulaire en ligne, vous nous décrivez votre besoin.',
  },
  {
    num: '02',
    titre: 'Visite & étude',
    texte: "Nous analysons votre logement ou votre local pour dimensionner l'installation.",
  },
  {
    num: '03',
    titre: 'Devis gratuit',
    texte: 'Une proposition claire, détaillée et sans engagement.',
  },
  {
    num: '04',
    titre: 'Installation & mise en service',
    texte: "Pose soignée, essais, réglages et explications d'utilisation.",
  },
];

export const HOME_AVIS = [
  {
    texte:
      'Entreprise compétente et professionnelle. Installation et mise en service de climatisation réalisées très proprement.',
    auteur: 'Bernard B.',
  },
  {
    texte:
      'Très bon chauffagiste, ponctuel et professionnel. Le travail a été fait proprement et efficacement, avec de bons conseils en plus. Je recommande sans hésiter !',
    auteur: 'Jordan E.',
  },
  {
    texte:
      "Très satisfait de l'intervention d'ETS Chipeaux. Il a rapidement résolu mon problème de thermostat.",
    auteur: 'Axel L.',
  },
];

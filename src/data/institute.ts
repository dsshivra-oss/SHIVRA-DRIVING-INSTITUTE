export interface CourseCategory {
  id: string;
  index: string;
  title: string;
  filterGroup: 'four-wheeler' | 'two-wheeler' | 'road-skills';
  categoryLabel: string;
  availabilityNote: string;
  description: string;
  focusAreas: string[];
  whatsappMessage: string;
}

export interface TrainingPillar {
  index: string;
  title: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

export const BUSINESS_INFO = {
  name: 'Shivra Driving Institute',
  type: 'Driving School',
  phone: '9994904424',
  formattedPhone: '+91 99949 04424',
  telHref: 'tel:+919994904424',
  whatsappBase: 'https://wa.me/919994904424',
  address:
    'Coimbatore Road, Opposite Panchayat Union Office, Annur, Odderpalayam, Tamil Nadu 641653, India',
  shortAddress: 'Coimbatore Road, Opp. Panchayat Union Office, Annur – 641653',
  landmark: 'Opposite Panchayat Union Office',
  locality: 'Annur, Odderpalayam, Coimbatore District',
  googleBusinessProfileUrl:
    'https://business.google.com/n/14186314732275652368/profile?fid=1626212142279181936',
  googleMapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Shivra+Driving+Institute+Coimbatore+Road+Annur+Tamil+Nadu+641653',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `${BUSINESS_INFO.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    id: 'four-wheeler-practical',
    index: '01',
    title: 'Four-Wheeler Practical Driving',
    filterGroup: 'four-wheeler',
    categoryLabel: 'Suggested Course Category',
    availabilityNote: 'Enquire to confirm vehicle & batch availability',
    description:
      'Structured hands-on car driving sessions covering smooth clutch control, gear transitions, steering judgement, and steady traffic driving.',
    focusAreas: [
      'Clutch, brake & accelerator coordination',
      'Steering discipline and mirror checks',
      'Urban & Coimbatore Road traffic awareness',
    ],
    whatsappMessage:
      'Hello Shivra Driving Institute, I would like to enquire about Four-Wheeler Practical Driving classes in Annur.',
  },
  {
    id: 'two-wheeler-training',
    index: '02',
    title: 'Two-Wheeler & Gearless Training',
    filterGroup: 'two-wheeler',
    categoryLabel: 'Suggested Course Category',
    availabilityNote: 'Enquire to confirm training slot availability',
    description:
      'Balanced riding fundamentals for beginners learning two-wheeler control, slow-speed turning, braking distance, and everyday road safety.',
    focusAreas: [
      'Posture, balance & smooth throttle control',
      'Controlled slow-speed turns & stops',
      'Helmet safety & everyday traffic positioning',
    ],
    whatsappMessage:
      'Hello Shivra Driving Institute, I would like to enquire about Two-Wheeler Driving classes in Annur.',
  },
  {
    id: 'refresher-highway',
    index: '03',
    title: 'Refresher & Road Confidence Sessions',
    filterGroup: 'road-skills',
    categoryLabel: 'Suggested Course Category',
    availabilityNote: 'Enquire to confirm customised session options',
    description:
      'Targeted practice sessions designed for learners who already know the basics and want calmer confidence in busier Annur and highway traffic.',
    focusAreas: [
      'Lane discipline & overtaking judgement',
      'Junctions, roundabouts & merging',
      'Defensive spacing in mixed traffic',
    ],
    whatsappMessage:
      'Hello Shivra Driving Institute, I would like to enquire about Refresher Driving sessions in Annur.',
  },
  {
    id: 'parking-maneuvers',
    index: '04',
    title: 'Parking & Precision Maneuvers',
    filterGroup: 'four-wheeler',
    categoryLabel: 'Suggested Course Category',
    availabilityNote: 'Enquire to confirm practical ground availability',
    description:
      'Focused practice on reverse positioning, parallel and angled parking, narrow-street navigation, and smooth slope starts.',
    focusAreas: [
      'Reverse & parallel parking alignment',
      'Side-mirror & blind-spot judgement',
      'Controlled incline & slow-crawl handling',
    ],
    whatsappMessage:
      'Hello Shivra Driving Institute, I would like to enquire about Parking and Precision Maneuver training.',
  },
  {
    id: 'road-signs-rules',
    index: '05',
    title: 'Traffic Rules & Road-Sign Guidance',
    filterGroup: 'road-skills',
    categoryLabel: 'Suggested Course Category',
    availabilityNote: 'Enquire for current learner guidance details',
    description:
      'Clear orientation on Indian traffic signage, right-of-way rules, road markings, and safe defensive driving habits.',
    focusAreas: [
      'Mandatory, cautionary & informatory signs',
      'Right-of-way & intersection etiquette',
      'Defensive anticipation & hazard awareness',
    ],
    whatsappMessage:
      'Hello Shivra Driving Institute, I would like to know more about road-sign guidance and beginner classes in Annur.',
  },
];

export const WHY_CHOOSE_PILLARS: TrainingPillar[] = [
  {
    index: '01',
    title: 'Patient, Calm Instruction',
    description:
      'First-time learners receive composed, step-by-step coaching tailored to build steady comfort behind the wheel without unnecessary pressure.',
  },
  {
    index: '02',
    title: 'Practical Road Emphasis',
    description:
      'Training prioritizes real-world observation—mirror checks, safe braking distances, lane positioning, and calm decision-making on local roads.',
  },
  {
    index: '03',
    title: 'Direct Learner Support',
    description:
      'Reach the institute directly by phone or WhatsApp to clarify batch timings, training tracks, and what to expect before your first session.',
  },
  {
    index: '04',
    title: 'Central Annur Convenience',
    description:
      'Located right on Coimbatore Road opposite the Panchayat Union Office in Annur, making daily commute and landmark navigation straightforward.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'hero-road',
    src: '/src/assets/images/hero_driving_school_1795245742021.jpg',
    alt: 'Best Driving School in Annur – Hatchback road practice along open Coimbatore corridor',
    caption: 'Open-road driving practice in clear morning visibility',
    category: 'On-Road Practice',
  },
  {
    id: 'instructor-cabin',
    src: '/src/assets/images/about_instructor_training_1795245742033.jpg',
    alt: 'Driving Classes in Annur – Patient instructor guiding learner in car cabin',
    caption: 'Guided cabin instruction with step-by-step steering feedback',
    category: 'Instructor Support',
  },
  {
    id: 'steering-control',
    src: '/src/assets/images/gallery_steering_control_1795245741945.jpg',
    alt: 'Driving Institute near Coimbatore – Proper 9-and-3 steering hand posture and mirror check',
    caption: 'Hand positioning, instrument awareness, and side-mirror checks',
    category: 'Car Control',
  },
  {
    id: 'parking-practice',
    src: '/src/assets/images/gallery_parking_practice_1795245743575.jpg',
    alt: 'Driving Classes in Annur – Reverse and parallel parking drill between safety cones',
    caption: 'Precision parking drills between cone markers',
    category: 'Maneuvers',
  },
  {
    id: 'two-wheeler-track',
    src: '/src/assets/images/gallery_two_wheeler_training_1795245743994.jpg',
    alt: 'Best Driving School in Annur – Helmeted two-wheeler balance and control practice',
    caption: 'Balanced two-wheeler handling with protective helmet gear',
    category: 'Two-Wheeler',
  },
];

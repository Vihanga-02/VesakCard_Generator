export type Language = 'si' | 'en'
export type CardTheme = 'dark' | 'light'

/** Left image panel: 45% of card width, full height; card is 3:2 → ratio 27:40 */
export const VESAK_CARD_IMAGE_SIZE = { width: 810, height: 1200 } as const

export interface Poem {
  id: string
  titleSi: string
  titleEn: string
  textSi: string[]
  textEn: string[]
}

export interface CardImage {
  id: string
  src: string
  alt: string
  label: string
}

export const POEMS: Poem[] = [
  {
    id: 'moon-light',
    titleSi: 'පුන්සඳ සහ බුදු ගුණ',
    titleEn: 'The Light of the Full Moon',
    textSi: [
      'බුදු සිරිපා සිහිවෙනවා ...',
      'සැදැහැ සිතින් දිලිසෙනවා ...',
      'වෙසක් සඳ එළිය මැද ...',
      'සතුට සැනසුම පිරෙනවා ...',
    ],
    textEn: [
      'Birth, Enlightenment, and Passing away,',
      'We honor the Buddha on this holy day.',
      'May your heart be calm, your spirit bright,',
      'Under the sacred Vesak full moon\'s light.',
    ],
  },
  {
    id: 'three-sacred',
    titleSi: 'තෙමඟුල සිහිපත් කිරීම',
    titleEn: 'The Triple Blessing',
    textSi: [
      'ඉපදීමය බුදුවීමය පිරිනිවනය ...',
      'තෙමඟුල සිහි කෙරෙන පින්බර පෝය දින ...',
      'මෙත් මල් පිපී ලොව සැමටම සුවය දෙන ...',
      'වේවා වෙසක් මංගල්‍යය පින් පිරෙන ...',
    ],
    textEn: [
      'Lanterns glow with colors bright,',
      'Filling the world with peaceful light.',
      'May kindness bloom and sorrows cease,',
      'Wishing you a Vesak of joy and peace.',
    ],
  },
  {
    id: 'peace-compassion',
    titleSi: 'මෙත් සිතුවිලි',
    titleEn: 'A Wish for Peace & Compassion',
    textSi: [
      'වෙසක් පහන් දළු සිත් තුළ දැල්වේවා ...',
      'ලොව හැම සතට මෙත් කරුණාවම ලැබේවා ...',
      'වෛරය ක්‍රෝධය සිත්වලින් දුරුවේවා ...',
      'සාමය සතුට හැම නිවසක රජවේවා ...',
    ],
    textEn: [
      'Like the lotus rising pure and clean,',
      'May your mind remain calm and serene.',
      'Let love and compassion guide your way,',
      'On this blessed and holy Vesak Day.',
    ],
  },
]

export const DEFAULT_VESAK_IMAGES: CardImage[] = [
  {
    id: 'buddha-moon',
    src: '/images/vesak10.png',
    alt: 'Buddha silhouette with full moon',
    label: 'Buddha & Moon',
  },
  {
    id: 'lanterns',
    src: '/images/vesak6.png',
    alt: 'Colorful vesak lanterns',
    label: 'Buddha & Lanterns',
  },
  {
    id: 'lotus-pond',
    src: '/images/vesak5.png',
    alt: 'Lotus flowers in pond',
    label: 'Sacred Lotus',
  },
  {
    id: 'bodhi-tree',
    src: '/images/vesak9.png',
    alt: 'Bodhi tree with light',
    label: 'Bodhi Tree',
  },
]

export const UI_TEXT = {
  si: {
    title: 'Vesak Card',
    subtitle: 'Designer',
    tagline: 'සිත් ආලෝකමත් වේවා!',
    step1: 'පින්තූරය තෝරන්න',
    step2: 'සුභ පැතුම් කවිය',
    step3: 'යවන්නා',
    step4: 'ලබන්නා',
    uploadLabel: 'ඔබේ පින්තූරයක් එකතු කරන්න',
    uploadSizeHint: `(${VESAK_CARD_IMAGE_SIZE.width} × ${VESAK_CARD_IMAGE_SIZE.height} px)`,
    fromPlaceholder: 'ඔබේ නම',
    toPlaceholder: 'ලබන්නාගේ නම',
    fromLabel: 'විසින්:',
    toLabel: 'වෙත:',
    downloadBtn: 'Download වෙසක් කාඩ්',
    preview: 'Live Preview',
    selectPoem: 'කවිය තෝරන්න',
    customPoem: 'ඔබේ කවිය ලියන්න',
    customPoemPlaceholder: 'ඔබේ සිතුවිලි මෙහි ලියන්න...',
    happyVesak: 'දහම් සිසිලස පිරේවා !',
    cardBack: 'කාඩ් පිටුපස',
    selectImage: 'පින්තූරය තෝරන්න',
    orUpload: 'හෝ ඔබේ පින්තූරය',
    stampText: 'මුද්දරය ගගේ ගියා',
    themeDark: 'Dark',
    themeLight: 'Light',
  },
  en: {
    title: 'Vesak Card',
    subtitle: 'Designer',
    tagline: 'Sacred Light of Dhamma',
    step1: 'Choose Image',
    step2: 'Select Blessing',
    step3: 'From',
    step4: 'To',
    uploadLabel: 'Upload Your Image',
    uploadSizeHint: `(${VESAK_CARD_IMAGE_SIZE.width} × ${VESAK_CARD_IMAGE_SIZE.height} px)`,
    fromPlaceholder: 'Your name',
    toPlaceholder: "Recipient's name",
    fromLabel: 'From:',
    toLabel: 'To:',
    downloadBtn: 'Download Vesak Card',
    preview: 'Live Preview',
    selectPoem: 'Choose a Poem',
    customPoem: 'Write Your Own',
    customPoemPlaceholder: 'Write your Vesak blessing here...',
    happyVesak: 'Happy Vesak !',
    cardBack: 'Card Back',
    selectImage: 'Select Image',
    orUpload: 'or Upload Yours',
    stampText: 'Stamp set adrift',
    themeDark: 'Dark',
    themeLight: 'Light',
  },
}

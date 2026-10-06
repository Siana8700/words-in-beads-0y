export const SLOGAN = "Every bead tells a story"

export const LINKS = {
  instagram:
    "https://www.instagram.com/words.in.beads?stkn=ZTR4YWdranF6YWNm&utm_source=qr",
  tiktok: "https://www.tiktok.com/@.words.in.beads?_r=1&_t=ZN-99aZcNjZC8U",
  // Директно към Instagram съобщения за индивидуална поръчка
  instagramDM: "https://ig.me/m/words.in.beads",
  email: "sianaborisova870@gmail.com",
}

export const CARE_NOTE =
  "За да запазите блясъка на вашите бижута, избягвайте контакт с вода и парфюми."

export type Variant = {
  name: string
  image: string
  alt: string
}

export type Category = {
  slug: string
  title: string
  tagline: string
  description: string
  price: string
  priceEur: number
  personalizable?: boolean
  cover: string
  coverAlt: string
  variants: Variant[]
}

// Фиксиран курс на БНБ: 1 EUR = 1.95583 BGN
export const EUR_TO_BGN = 1.95583

export function formatEur(eur: number) {
  return `€${eur.toFixed(2)}`
}

export function formatBgn(eur: number) {
  return `${(eur * EUR_TO_BGN).toFixed(2)} лв.`
}

export function formatPrice(eur: number) {
  return `${formatEur(eur)} / ${formatBgn(eur)}`
}

export const CATEGORIES: Category[] = [
  {
    slug: "grivni-s-poslanie",
    title: "Гривни с послание",
    tagline: "Персонализирани гривни с букви и имена",
    description:
      "Изберете дума, име или послание, което носи смисъл за вас. Всяка гривна се плете на ръка с миниатюрни мъниста и златисти акценти, за да носите своята история винаги със себе си. Идеален подарък за скъп човек или малко напомняне за самите вас.",
    price: "€5.00",
    priceEur: 5,
    personalizable: true,
    cover: "/images/message-1.png",
    coverAlt: "Гривна с послание в черно, бяло и златисто в керамична купичка",
    variants: [
      {
        name: "Вариант 1 — Класик",
        image: "/images/message-1.png",
        alt: "Гривна с послание в черно, бяло и златисто",
      },
      {
        name: "Вариант 2 — Пастел",
        image: "/images/message-2.png",
        alt: "Гривна с послание в лилаво, бяло и златисто с перла",
      },
    ],
  },
  {
    slug: "crystal-dream",
    title: "Crystal Dream",
    tagline: "Фасетирани кристали и метални елементи",
    description:
      "Изящен модел с фасетирани кристали, които улавят светлината, съчетани с фини метални елементи в топъл розово-златист оттенък. Романтична и деликатна гривна, която добавя блясък към всяко ежедневие и специален повод.",
    price: "€7.00",
    priceEur: 7,
    cover: "/images/crystal-dream.png",
    coverAlt: "Гривна Crystal Dream с розови фасетирани кристали върху сатен",
    variants: [
      {
        name: "Crystal Dream — Rose",
        image: "/images/crystal-dream.png",
        alt: "Гривна Crystal Dream с розови фасетирани кристали",
      },
    ],
  },
  {
    slug: "aura",
    title: "Aura",
    tagline: "Фини двуредни плетени гривни",
    description:
      "Нежни двуредни гривни, изплетени на ръка с прецизност. Комбинацията от мъниста и златисти детайли създава лек, изчистен силует, който стои чудесно самостоятелно или наложено с други модели.",
    price: "€6.00",
    priceEur: 6,
    cover: "/images/aura-1.png",
    coverAlt: "Двуредна плетена гривна Aura в кремаво и златисто",
    variants: [
      {
        name: "Вариант 1 — Pearl",
        image: "/images/aura-1.png",
        alt: "Двуредна плетена гривна Aura в кремаво и златисто",
      },
      {
        name: "Вариант 2 — Emerald",
        image: "/images/aura-2.png",
        alt: "Двуредна плетена гривна Aura в зелено и златисто",
      },
    ],
  },
]

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)
}

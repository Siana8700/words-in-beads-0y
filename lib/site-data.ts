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

export type PriceOption = {
  id: string
  label: string
  priceEur: number
  /** Number of individual models the customer must pick for this option. */
  pick: number
}

export type Product = {
  slug: string
  title: string
  tagline: string
  description: string
  priceEur: number
  personalizable?: boolean
  cover: string
  coverAlt: string
  variants: Variant[]
  options?: PriceOption[]
  models?: Variant[]
}

export type Category = Product & {
  isNew?: boolean
  products?: Product[]
}

export function lowestPrice(item: Product) {
  if (!item.options?.length) return item.priceEur
  return Math.min(...item.options.map((o) => o.priceEur))
}

export function priceLabel(item: Category) {
  const prices = item.products?.length
    ? item.products.map(lowestPrice)
    : [lowestPrice(item)]
  const min = Math.min(...prices)
  const hasRange = item.products?.length || item.options?.length
  return hasRange ? `от ${formatEur(min)}` : formatEur(min)
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

const AUTUMN_MODELS: Variant[] = [
  {
    name: "Модел 1 — Рубинено сърце",
    image: "/images/autumn-model-1.png",
    alt: "Червена гривна от мъниста със златно сърце",
  },
  {
    name: "Модел 2 — Перла",
    image: "/images/autumn-model-2.png",
    alt: "Кремава перлена гривна със златна верижка",
  },
  {
    name: "Модел 3 — Корал",
    image: "/images/autumn-model-3.png",
    alt: "Коралова гривна от мъниста с бяла перла",
  },
  {
    name: "Модел 4 — Праскова",
    image: "/images/autumn-model-4.png",
    alt: "Гривна от прасковени и прозрачни мъниста",
  },
]

const AUTUMN_COLLECTION: Category = {
  slug: "autumn-collection",
  title: "Есенна колекция",
  tagline: "Топли есенни нюанси",
  description:
    "Топли есенни нюанси — рубинено, кремаво, коралово и прасковено — събрани в нежни гривни, изплетени на ръка. Носете ги заедно като комплект или изберете любимите си модели.",
  priceEur: 3,
  isNew: true,
  cover: "/images/autumn-set.png",
  coverAlt: "Четири есенни гривни от мъниста, наложени на китка с кремав пуловер",
  variants: [],
  products: [
    {
      slug: "autumn-bracelet-set",
      title: "Autumn Bracelet Set",
      tagline: "Комплект от 4 гривни",
      description:
        "Четири нежни гривни в есенни тонове: рубинено червено със златно сърце, кремави перли, корал с перла и прасковено с прозрачни кристали. Вземете целия комплект или съставете свой собствен от любимите си модели.",
      priceEur: 8,
      cover: "/images/autumn-set.png",
      coverAlt: "Четири есенни гривни от мъниста, наложени на китка",
      variants: [
        {
          name: "Пълен комплект",
          image: "/images/autumn-set.png",
          alt: "Четири есенни гривни от мъниста, наложени на китка",
        },
        ...AUTUMN_MODELS,
      ],
      models: AUTUMN_MODELS,
      options: [
        { id: "full-set", label: "Пълен комплект (4 гривни)", priceEur: 8, pick: 0 },
        { id: "single", label: "Единична гривна", priceEur: 3, pick: 1 },
        { id: "bundle-2", label: "Комплект по избор от 2 гривни", priceEur: 6, pick: 2 },
        { id: "bundle-3", label: "Комплект по избор от 3 гривни", priceEur: 7.5, pick: 3 },
      ],
    },
    {
      slug: "autumn-leaf",
      title: "Autumn Leaf",
      tagline: "Гривна със златно листо",
      description:
        "Червени, жълти и бели мъниста, преплетени със златисти акценти и завършени с висулка във формата на златно листо. Като слънчев есенен следобед, събран в една гривна.",
      priceEur: 4,
      cover: "/images/autumn-leaf.png",
      coverAlt: "Гривна от червени, жълти и бели мъниста със златно листо в дървена купичка",
      variants: [
        {
          name: "Autumn Leaf",
          image: "/images/autumn-leaf.png",
          alt: "Гривна от червени, жълти и бели мъниста със златно листо",
        },
      ],
    },
    {
      slug: "autumn-daisy",
      title: "Autumn Daisy",
      tagline: "Плетени цветчета от мъниста",
      description:
        "Нежни маргаритки, изплетени от жълти и кремави мъниста със златист център. Свежа и игрива гривна, която носи усещането за последните цветя на сезона.",
      priceEur: 5,
      cover: "/images/autumn-daisy.png",
      coverAlt: "Гривна с плетени цветчета в жълто и кремаво върху сатен",
      variants: [
        {
          name: "Autumn Daisy",
          image: "/images/autumn-daisy.png",
          alt: "Гривна с плетени цветчета в жълто и кремаво",
        },
      ],
    },
    {
      slug: "amber-glow",
      title: "Amber Glow",
      tagline: "Кехлибарени фасетирани кристали",
      description:
        "Фасетирани кристали в топъл кехлибарен оттенък, съчетани със златисти мъниста и висулка листо. Улавя светлината като есенно слънце и добавя мек блясък към всяка визия.",
      priceEur: 5.5,
      cover: "/images/amber-glow.png",
      coverAlt: "Гривна с кехлибарени кристали и златно листо върху травертин",
      variants: [
        {
          name: "Amber Glow",
          image: "/images/amber-glow.png",
          alt: "Гривна с кехлибарени фасетирани кристали и златисти мъниста",
        },
      ],
    },
  ],
}

export const CATEGORIES: Category[] = [
  AUTUMN_COLLECTION,
  {
    slug: "grivni-s-poslanie",
    title: "Гривни с послание",
    tagline: "Персонализирани гривни с букви и имена",
    description:
      "Изберете дума, име или послание, което носи смисъл за вас. Всяка гривна се плете на ръка с миниатюрни мъниста и златисти акценти, за да носите своята история винаги със себе си. Идеален подарък за скъп човек или малко напомняне за самите вас.",
    priceEur: 4,
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
    priceEur: 6,
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
    priceEur: 5,
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

export function getProduct(categorySlug: string, productSlug: string) {
  return getCategory(categorySlug)?.products?.find((p) => p.slug === productSlug)
}

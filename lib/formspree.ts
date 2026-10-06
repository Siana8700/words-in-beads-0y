/**
 * ============================================================
 *  FORMSPREE НАСТРОЙКА
 *  Поставете вашия Formspree ID тук (частта след /f/ в адреса
 *  https://formspree.io/f/XXXXXXXX). Може да го зададете и чрез
 *  променливата на средата NEXT_PUBLIC_FORMSPREE_ID.
 * ============================================================
 */
export const FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_ID || "maeqqoww"

export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`

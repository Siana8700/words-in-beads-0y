import { EUR_TO_BGN, formatBgn, formatEur } from "@/lib/site-data"
import { FORMSPREE_ENDPOINT } from "@/lib/formspree"

export type OrderItemInput = {
  title: string
  variantName: string
  personalization?: string
  priceEur: number
  quantity: number
}

export type OrderInput = {
  firstName: string
  lastName: string
  phone: string
  email: string
  courier: string
  address: string
  note?: string
  items: OrderItemInput[]
}

export type OrderConfirmation = {
  orderNumber: string
  totalEur: number
  totalBgn: number
}

export const SUBMIT_ERROR_MESSAGE =
  "Възникна грешка при изпращането. Моля, опитайте отново или се свържете с нас по телефона."

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validateOrder(order: OrderInput): string | null {
  if (!order.firstName.trim() || !order.lastName.trim()) {
    return "Моля, попълнете двете имена."
  }
  if (order.phone.replace(/\D/g, "").length < 6) {
    return "Моля, въведете валиден телефон за връзка."
  }
  if (!isEmail(order.email.trim())) {
    return "Моля, въведете валиден имейл адрес."
  }
  if (!order.courier.trim()) {
    return "Моля, изберете куриерска фирма."
  }
  if (!order.address.trim()) {
    return "Моля, въведете град и офис / адрес за доставка."
  }
  if (!order.items.length) {
    return "Количката е празна."
  }
  return null
}

function describeItem(item: OrderItemInput, index: number) {
  const lineTotal = item.priceEur * item.quantity
  const parts = [
    `${index + 1}. ${item.title}`,
    item.variantName ? `   Вариант: ${item.variantName}` : null,
    item.personalization
      ? `   Персонализация (имена/букви): „${item.personalization}“`
      : null,
    `   Количество: ${item.quantity}`,
    `   Единична цена: ${formatEur(item.priceEur)} / ${formatBgn(item.priceEur)}`,
    `   Сума: ${formatEur(lineTotal)} / ${formatBgn(lineTotal)}`,
  ]
  return parts.filter(Boolean).join("\n")
}

export async function submitOrder(
  order: OrderInput,
): Promise<OrderConfirmation> {
  const totalEur = order.items.reduce(
    (sum, i) => sum + i.priceEur * i.quantity,
    0,
  )
  const totalBgn = Number((totalEur * EUR_TO_BGN).toFixed(2))
  const orderNumber = `WIB-${Date.now().toString(36).toUpperCase().slice(-6)}`
  const fullName = `${order.firstName.trim()} ${order.lastName.trim()}`
  const totalLabel = `${formatEur(totalEur)} / ${formatBgn(totalEur)}`

  const payload = {
    _subject: `Нова поръчка ${orderNumber} — ${fullName} (${formatEur(totalEur)})`,
    "Номер на поръчка": orderNumber,
    "Име и Фамилия": fullName,
    "Телефон за връзка": order.phone.trim(),
    email: order.email.trim(),
    "Куриер": order.courier.trim(),
    "Град и офис / адрес за доставка": order.address.trim(),
    "Бележка": order.note?.trim() || "—",
    "Поръчани продукти": order.items.map(describeItem).join("\n\n"),
    "Продукти (данни)": order.items.map((i) => ({
      "Продукт": i.title,
      "Вариант": i.variantName,
      "Персонализация": i.personalization || "—",
      "Количество": i.quantity,
      "Единична цена (EUR)": i.priceEur,
      "Сума (EUR)": Number((i.priceEur * i.quantity).toFixed(2)),
    })),
    "Обща сума за плащане": totalLabel,
  }

  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Formspree responded with ${res.status}`)
  }

  return { orderNumber, totalEur, totalBgn }
}

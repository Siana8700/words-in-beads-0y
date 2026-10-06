"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { formatEur, formatBgn } from "@/lib/site-data"
import {
  SUBMIT_ERROR_MESSAGE,
  submitOrder,
  validateOrder,
  type OrderConfirmation,
  type OrderInput,
} from "@/lib/order"

const COURIERS = ["Еконт", "Спиди", "Български пощи"]

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"

export function CheckoutForm() {
  const { items, totalEur, clear } = useCart()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null,
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isPending) return
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)

    const payload: OrderInput = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      courier: String(data.get("courier") ?? ""),
      address: String(data.get("address") ?? ""),
      note: String(data.get("note") ?? ""),
      items: items.map((i) => ({
        title: i.title,
        variantName: i.variantName,
        personalization: i.personalization,
        priceEur: i.priceEur,
        quantity: i.quantity,
      })),
    }

    const validationError = validateOrder(payload)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsPending(true)
    try {
      const result = await submitOrder(payload)
      setConfirmation(result)
      clear()
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      setError(SUBMIT_ERROR_MESSAGE)
    } finally {
      setIsPending(false)
    }
  }

  if (confirmation) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-border bg-card p-8 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-5 font-serif text-3xl font-semibold text-foreground">
          Благодарим ви!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Поръчката ви беше приета успешно. Ще се свържем с вас за потвърждение.
        </p>
        <div className="mx-auto mt-6 max-w-xs rounded-xl bg-secondary/40 p-4">
          <p className="text-sm text-muted-foreground">Номер на поръчка</p>
          <p className="font-serif text-2xl font-medium text-foreground">
            {confirmation.orderNumber}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Сума за плащане
          </p>
          <p className="font-medium text-foreground">
            {formatEur(confirmation.totalEur)} / {formatBgn(confirmation.totalEur)}
          </p>
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
        >
          Обратно към началото
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="font-serif text-2xl text-foreground">
          Количката е празна
        </p>
        <p className="mt-2 text-muted-foreground">
          Добавете артикули, преди да финализирате поръчка.
        </p>
        <Link
          href="/#catalog"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
        >
          Към продуктите
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium text-foreground">
              Име
            </label>
            <input id="firstName" name="firstName" type="text" autoComplete="given-name" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm font-medium text-foreground">
              Фамилия
            </label>
            <input id="lastName" name="lastName" type="text" autoComplete="family-name" required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-foreground">
              Телефон за връзка
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Имейл
            </label>
            <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="courier" className="text-sm font-medium text-foreground">
              Куриерска фирма
            </label>
            <select id="courier" name="courier" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Изберете куриер
              </option>
              {COURIERS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="address" className="text-sm font-medium text-foreground">
              Град и офис / адрес за доставка
            </label>
            <input id="address" name="address" type="text" autoComplete="street-address" placeholder="напр. София, офис Еконт „Младост 1“" required className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="note" className="text-sm font-medium text-foreground">
            Бележка към поръчката{" "}
            <span className="font-normal text-muted-foreground">(опционално)</span>
          </label>
          <textarea id="note" name="note" rows={3} className={`${inputClass} resize-none`} />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isPending && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
          )}
          {isPending ? "Изпращане..." : "Финализирай поръчката"}
        </button>
      </form>

      <aside className="h-fit rounded-2xl border border-border bg-secondary/25 p-6">
        <h2 className="font-serif text-xl font-medium text-foreground">
          Вашата поръчка
        </h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 text-sm">
              <span className="text-muted-foreground">
                {item.title}
                {item.personalization ? ` — „${item.personalization}“` : ""}
                <span className="text-foreground"> × {item.quantity}</span>
              </span>
              <span className="shrink-0 text-foreground">
                {formatEur(item.priceEur * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
          <span className="font-medium text-foreground">Общо</span>
          <span className="text-right">
            <span className="block font-serif text-2xl font-semibold text-foreground">
              {formatEur(totalEur)}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatBgn(totalEur)}
            </span>
          </span>
        </div>
      </aside>
    </div>
  )
}

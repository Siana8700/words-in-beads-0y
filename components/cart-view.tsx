"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { formatEur, formatBgn } from "@/lib/site-data"

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  )
}

export function CartView() {
  const { items, totalEur, updateQty, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="font-serif text-2xl text-foreground">
          Количката е празна
        </p>
        <p className="mt-2 text-muted-foreground">
          Разгледайте нашите ръчно изработени гривни и добавете любимите си модели.
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
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-serif text-lg text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {item.variantName}
                  </p>
                  {item.personalization && (
                    <p className="mt-1 text-sm text-primary">
                      Послание: „{item.personalization}“
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label="Премахни артикула"
                  className="text-muted-foreground transition-colors hover:text-destructive"
                >
                  <TrashIcon />
                </button>
              </div>

              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="inline-flex items-center rounded-full border border-border">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-l-full text-foreground transition-colors hover:text-primary"
                    aria-label="Намали количеството"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-r-full text-foreground transition-colors hover:text-primary"
                    aria-label="Увеличи количеството"
                  >
                    +
                  </button>
                </div>
                <p className="font-medium text-foreground">
                  {formatEur(item.priceEur * item.quantity)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-2xl border border-border bg-secondary/25 p-6">
        <h2 className="font-serif text-xl font-medium text-foreground">
          Обобщение
        </h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <dt>Междинна сума</dt>
            <dd>{formatEur(totalEur)}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-border pt-3">
            <dt className="font-medium text-foreground">Общо</dt>
            <dd className="text-right">
              <span className="block font-serif text-2xl font-semibold text-foreground">
                {formatEur(totalEur)}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatBgn(totalEur)}
              </span>
            </dd>
          </div>
        </dl>
        <Link
          href="/checkout"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
        >
          Премини към поръчка
        </Link>
        <Link
          href="/#catalog"
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50"
        >
          Продължи пазаруването
        </Link>
      </aside>
    </div>
  )
}

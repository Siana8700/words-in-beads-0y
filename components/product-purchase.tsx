"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { formatPrice, type Category } from "@/lib/site-data"

export function ProductPurchase({ category }: { category: Category }) {
  const { addItem } = useCart()
  const [selected, setSelected] = useState(0)
  const [personalization, setPersonalization] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const variant = category.variants[selected]
  const needsText = Boolean(category.personalizable)
  const missingText = needsText && personalization.trim().length === 0

  function handleAdd() {
    if (missingText) return
    addItem({
      slug: category.slug,
      title: category.title,
      variantName: variant.name,
      image: variant.image,
      priceEur: category.priceEur,
      personalization: needsText ? personalization : undefined,
      quantity,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Gallery */}
      <div className="space-y-4">
        <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="relative aspect-square">
            <Image
              src={variant.image || "/placeholder.svg"}
              alt={variant.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </figure>

        {category.variants.length > 1 && (
          <div className="flex flex-wrap gap-3">
            {category.variants.map((v, i) => (
              <button
                key={v.name}
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
                aria-label={v.name}
                className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors ${
                  selected === i
                    ? "border-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Image
                  src={v.image || "/placeholder.svg"}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details / actions */}
      <div className="flex flex-col">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">
          {category.tagline}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground">
          {category.title}
        </h1>
        <p className="mt-3 font-serif text-2xl font-medium text-secondary-foreground">
          {formatPrice(category.priceEur)}
        </p>

        {category.variants.length > 1 && (
          <div className="mt-6">
            <span className="text-sm font-medium text-foreground">
              Разновидност
            </span>
            <p className="mt-1 text-sm text-muted-foreground">{variant.name}</p>
          </div>
        )}

        {needsText && (
          <div className="mt-6">
            <label
              htmlFor="personalization"
              className="text-sm font-medium text-foreground"
            >
              Напиши желаните букви/име
            </label>
            <input
              id="personalization"
              type="text"
              maxLength={20}
              value={personalization}
              onChange={(e) => setPersonalization(e.target.value)}
              placeholder="напр. SIANA"
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              До 20 символа. Ще изплетем точно това послание за вас.
            </p>
          </div>
        )}

        {/* Quantity */}
        <div className="mt-6">
          <span className="text-sm font-medium text-foreground">Количество</span>
          <div className="mt-2 inline-flex items-center rounded-full border border-border bg-card">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-l-full text-lg text-foreground transition-colors hover:text-primary"
              aria-label="Намали количеството"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              className="flex h-10 w-10 items-center justify-center rounded-r-full text-lg text-foreground transition-colors hover:text-primary"
              aria-label="Увеличи количеството"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleAdd}
            disabled={missingText}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {added ? "Добавено ✓" : "Добави в количката"}
          </button>
          {missingText && (
            <p className="text-xs text-primary">
              Моля, въведете буквите/името за персонализация.
            </p>
          )}
          {added && (
            <Link
              href="/cart"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50"
            >
              Виж количката
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

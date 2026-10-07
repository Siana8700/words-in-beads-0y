"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { formatPrice, type Product } from "@/lib/site-data"

function pluralModels(n: number) {
  return n === 1 ? "1 модел" : `${n} модела`
}

export function ProductPurchase({
  product,
  eyebrow,
}: {
  product: Product
  eyebrow?: string
}) {
  const { addItem } = useCart()
  const [selected, setSelected] = useState(0)
  const [optionId, setOptionId] = useState(product.options?.[0]?.id ?? "")
  const [pickedModels, setPickedModels] = useState<string[]>([])
  const [personalization, setPersonalization] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const variant = product.variants[selected] ?? product.variants[0]
  const option = product.options?.find((o) => o.id === optionId)
  const unitPrice = option?.priceEur ?? product.priceEur
  const pickCount = option?.pick ?? 0
  const models = product.models ?? []

  const needsText = Boolean(product.personalizable)
  const missingText = needsText && personalization.trim().length === 0
  const missingModels = pickCount > 0 && pickedModels.length !== pickCount
  const canAdd = !missingText && !missingModels

  function showVariant(name: string) {
    const index = product.variants.findIndex((v) => v.name === name)
    if (index >= 0) setSelected(index)
  }

  function changeOption(id: string) {
    setOptionId(id)
    const next = product.options?.find((o) => o.id === id)
    setPickedModels((current) => current.slice(0, next?.pick ?? 0))
    if (next?.pick === 0) setSelected(0)
  }

  function toggleModel(name: string) {
    showVariant(name)
    setPickedModels((current) => {
      if (current.includes(name)) return current.filter((m) => m !== name)
      if (pickCount === 1) return [name]
      if (current.length >= pickCount) return current
      return [...current, name]
    })
  }

  function buildVariantName() {
    if (!option) return variant.name
    if (pickCount === 0) return option.label
    const ordered = models
      .map((m) => m.name)
      .filter((name) => pickedModels.includes(name))
    return `${option.label}: ${ordered.join(", ")}`
  }

  function handleAdd() {
    if (!canAdd) return
    const image =
      pickCount === 1
        ? (models.find((m) => m.name === pickedModels[0])?.image ?? variant.image)
        : option
          ? product.cover
          : variant.image
    addItem({
      slug: product.slug,
      title: product.title,
      variantName: buildVariantName(),
      image,
      priceEur: unitPrice,
      personalization: needsText ? personalization : undefined,
      quantity,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
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

        {product.variants.length > 1 && (
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v, i) => (
              <button
                key={v.name}
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
                aria-label={`Покажи снимка: ${v.name}`}
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

      <div className="flex flex-col">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">
          {eyebrow ?? product.tagline}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground">
          {product.title}
        </h1>
        <p
          className="mt-3 font-serif text-2xl font-medium text-secondary-foreground"
          aria-live="polite"
        >
          {formatPrice(unitPrice)}
        </p>

        {product.options && product.options.length > 0 && (
          <div className="mt-6">
            <label
              htmlFor="product-option"
              className="text-sm font-medium text-foreground"
            >
              Изберете опция
            </label>
            <div className="relative mt-2">
              <select
                id="product-option"
                value={optionId}
                onChange={(e) => changeOption(e.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-card py-2.5 pl-4 pr-10 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {product.options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {`${o.label} — €${o.priceEur.toFixed(2)}`}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        )}

        {pickCount > 0 && models.length > 0 && (
          <fieldset className="mt-6">
            <legend className="flex w-full items-baseline justify-between gap-2 text-sm font-medium text-foreground">
              <span>
                {pickCount === 1
                  ? "Изберете модел"
                  : `Изберете ${pluralModels(pickCount)}`}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                {`${pickedModels.length} / ${pickCount}`}
              </span>
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {models.map((m) => {
                const isPicked = pickedModels.includes(m.name)
                const isDisabled =
                  !isPicked && pickCount > 1 && pickedModels.length >= pickCount
                return (
                  <button
                    key={m.name}
                    type="button"
                    role={pickCount === 1 ? "radio" : "checkbox"}
                    aria-checked={isPicked}
                    disabled={isDisabled}
                    onClick={() => toggleModel(m.name)}
                    className={`flex items-center gap-2.5 rounded-xl border-2 bg-card p-2 text-left text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      isPicked
                        ? "border-primary text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={m.image || "/placeholder.svg"}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                    <span className="leading-snug">{m.name}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        )}

        {!product.options && product.variants.length > 1 && (
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
            disabled={!canAdd}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {added ? "Добавено ✓" : "Добави в количката"}
          </button>
          {missingText && (
            <p className="text-xs text-primary">
              Моля, въведете буквите/името за персонализация.
            </p>
          )}
          {missingModels && (
            <p className="text-xs text-primary">
              {`Моля, изберете ${pluralModels(pickCount)}, за да продължите.`}
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

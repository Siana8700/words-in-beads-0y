import Image from "next/image"
import Link from "next/link"
import { CATEGORIES, priceLabel } from "@/lib/site-data"

type CardProps = {
  href: string
  title: string
  tagline: string
  price: string
  cover: string
  coverAlt: string
  cta: string
  badge?: string
}

export function ProductCard({
  href,
  title,
  tagline,
  price,
  cover,
  coverAlt,
  cta,
  badge,
}: CardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={cover || "/placeholder.svg"}
          alt={coverAlt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-primary-foreground shadow-sm">
            {badge}
          </span>
        )}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-4 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          Натисни тук
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-serif text-xl font-medium text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{tagline}</p>
        <span className="mt-2 text-sm font-medium text-primary">{price}</span>
        <span className="mt-2 text-xs font-medium text-primary">{cta}</span>
      </div>
    </Link>
  )
}

export function CatalogGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {CATEGORIES.map((category) => (
        <ProductCard
          key={category.slug}
          href={`/catalog/${category.slug}`}
          title={category.title}
          tagline={category.tagline}
          price={priceLabel(category)}
          cover={category.cover}
          coverAlt={category.coverAlt}
          badge={category.isNew ? "Ново" : undefined}
          cta={
            category.products
              ? "Разгледай колекцията →"
              : "Натисни тук, за да видиш всички разновидности →"
          }
        />
      ))}
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import { CATEGORIES } from "@/lib/site-data"

export function CatalogGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`/catalog/${category.slug}`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={category.cover || "/placeholder.svg"}
              alt={category.coverAlt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-4 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              Натисни тук
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1 p-4">
            <h3 className="font-serif text-xl font-medium text-foreground">
              {category.title}
            </h3>
            <p className="text-sm text-muted-foreground">{category.tagline}</p>
            <span className="mt-2 text-sm font-medium text-primary">
              {category.price}
            </span>
            <span className="mt-2 text-xs font-medium text-primary">
              Натисни тук, за да видиш всички разновидности →
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

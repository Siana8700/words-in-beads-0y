import Image from "next/image"
import { ProductCard } from "@/components/catalog-grid"
import { formatEur, lowestPrice, type Category } from "@/lib/site-data"

export function CollectionView({ category }: { category: Category }) {
  const products = category.products ?? []

  return (
    <div>
      <div className="grid items-center gap-6 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-square">
          <Image
            src={category.cover || "/placeholder.svg"}
            alt={category.coverAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="px-6 pb-6 md:py-6 md:pr-8 md:pl-0">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">
            {category.tagline}
          </p>
          <h1 className="mt-2 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            {category.title}
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {category.description}
          </p>
          <p className="mt-4 text-sm font-medium text-secondary-foreground">
            {`${products.length} модела`}
          </p>
        </div>
      </div>

      <h2 className="mt-10 mb-5 font-serif text-2xl font-medium text-foreground">
        Модели в колекцията
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            href={`/catalog/${category.slug}/${product.slug}`}
            title={product.title}
            tagline={product.tagline}
            price={
              product.options?.length
                ? `от ${formatEur(lowestPrice(product))}`
                : formatEur(product.priceEur)
            }
            cover={product.cover}
            coverAlt={product.coverAlt}
            cta={
              product.options?.length
                ? "Избери комплект или единична гривна →"
                : "Виж детайли →"
            }
          />
        ))}
      </div>
    </div>
  )
}

import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { OrderButtons } from "@/components/order-buttons"
import { ProductPurchase } from "@/components/product-purchase"
import { CATEGORIES, getCategory, getProduct, CARE_NOTE } from "@/lib/site-data"

type Params = Promise<{ slug: string; product: string }>

export function generateStaticParams() {
  return CATEGORIES.flatMap((c) =>
    (c.products ?? []).map((p) => ({ slug: c.slug, product: p.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug, product: productSlug } = await params
  const product = getProduct(slug, productSlug)
  if (!product) return { title: "Words in Beads" }
  return {
    title: `${product.title} — Words in Beads`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug, product: productSlug } = await params
  const category = getCategory(slug)
  const product = getProduct(slug, productSlug)
  if (!category || !product) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-8">
        <Link
          href={`/catalog/${category.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
          {`Назад към ${category.title}`}
        </Link>

        <section className="mt-8">
          <ProductPurchase
            product={product}
            eyebrow={`${category.title} · ${product.tagline}`}
          />
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-medium text-foreground">
            Описание
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </section>

        <aside className="mt-6 rounded-2xl border border-border bg-secondary/25 p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Грижа: </span>
            {CARE_NOTE}
          </p>
        </aside>

        <section className="mt-8">
          <p className="mb-3 text-center text-sm text-muted-foreground">
            Или поръчай директно през социалните мрежи
          </p>
          <OrderButtons title={product.title} />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

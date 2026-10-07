import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { OrderButtons } from "@/components/order-buttons"
import { ProductPurchase } from "@/components/product-purchase"
import { CollectionView } from "@/components/collection-view"
import { CATEGORIES, getCategory, CARE_NOTE } from "@/lib/site-data"

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return { title: "Words in Beads" }
  return {
    title: `${category.title} — Words in Beads`,
    description: category.description,
  }
}

function BackIcon() {
  return (
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
  )
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-8">
        <Link
          href="/#catalog"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <BackIcon />
          Назад към каталога
        </Link>

        {category.products ? (
          <section className="mt-8">
            <CollectionView category={category} />
          </section>
        ) : (
          <>
        <section className="mt-8">
          <ProductPurchase product={category} />
        </section>

        {/* Description */}
        <section className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-medium text-foreground">
            Описание
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {category.description}
          </p>
        </section>
          </>
        )}

        {/* Care note */}
        <aside className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-secondary/25 p-5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          >
            <path d="M12 21c4-3 7-6 7-10a7 7 0 10-14 0c0 4 3 7 7 10z" />
          </svg>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Грижа: </span>
            {CARE_NOTE}
          </p>
        </aside>

        {/* Alternative ordering via social */}
        <section className="mt-8">
          <p className="mb-3 text-center text-sm text-muted-foreground">
            Или поръчай директно през социалните мрежи
          </p>
          <OrderButtons title={category.title} />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LinkButtons } from "@/components/link-buttons"
import { CatalogGrid } from "@/components/catalog-grid"
import { SLOGAN } from "@/lib/site-data"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        {/* Hero */}
        <section className="flex flex-col items-center py-12 text-center">
          <Image
            src="/images/logo.jpeg"
            alt="Words in Beads лого"
            width={176}
            height={176}
            priority
            className="mb-6 h-40 w-40 rounded-full object-cover shadow-sm sm:h-44 sm:w-44"
          />
          <h1 className="sr-only">Words in Beads — {SLOGAN}</h1>
          <p className="mt-1 text-sm uppercase tracking-[0.32em] text-primary">
            {SLOGAN}
          </p>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Ръчно изработени бижута, създадени с внимание към всеки детайл. Всяка
            гривна разказва своя собствена история.
          </p>
        </section>

        {/* Link buttons */}
        <section className="pb-10">
          <LinkButtons />
        </section>

        {/* Catalog */}
        <section id="catalog" className="scroll-mt-24 pb-6">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-3xl font-medium text-foreground">
              Каталог
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Разгледайте четирите ни колекции
            </p>
          </div>
          <CatalogGrid />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

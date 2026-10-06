import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LINKS } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Общи условия — Words in Beads",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <h1 className="font-serif text-4xl font-semibold text-foreground">
          Общи условия
        </h1>
        <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Words in Beads предлага ръчно изработени бижута. Всяко изделие се
            създава индивидуално, поради което са възможни малки разлики в
            цвета и формата спрямо показаните снимки.
          </p>
          <p>
            Поръчки се приемат чрез Instagram, TikTok или имейл. След
            потвърждение на поръчката ще получите информация за начина на
            плащане и доставка.
          </p>
          <p>
            Тъй като изделията са ръчно изработени и често персонализирани,
            замяна или връщане се разглеждат индивидуално. При въпроси се
            свържете с мен на{" "}
            <a
              href={`mailto:${LINKS.email}`}
              className="text-primary underline-offset-4 hover:underline"
            >
              {LINKS.email}
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

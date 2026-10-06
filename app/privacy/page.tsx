import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LINKS } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Поверителност — Words in Beads",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <h1 className="font-serif text-4xl font-semibold text-foreground">
          Политика за поверителност
        </h1>
        <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Личните данни, които споделяте с мен (име, имейл и съобщение), се
            използват единствено за да отговоря на вашето запитване и да
            обработя вашата поръчка.
          </p>
          <p>
            Не споделям вашите данни с трети страни и не ги използвам за
            рекламни цели без вашето съгласие.
          </p>
          <p>
            Ако желаете вашите данни да бъдат изтрити, пишете ми на{" "}
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

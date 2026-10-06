import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { InstagramIcon, TikTokIcon } from "@/components/brand-icons"
import { LINKS } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Контакти — Words in Beads",
  description:
    "Свържи се с Words in Beads в Instagram, TikTok или по имейл, или изпрати бързо запитване.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            Контакти
          </h1>
          <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Имаш въпрос или искаш да поръчаш нещо специално? Пиши ми — отговарям
            с радост.
          </p>
        </div>

        {/* Direct message buttons */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-card px-6 py-5 text-base font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <InstagramIcon className="h-6 w-6" />
            Съобщение в Instagram
          </a>
          <a
            href={LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-card px-6 py-5 text-base font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <TikTokIcon className="h-6 w-6" />
            Съобщение в TikTok
          </a>
        </div>

        {/* Email */}
        <div className="mt-4 rounded-2xl border border-border bg-secondary/30 px-6 py-5 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Имейл за връзка
          </p>
          <a
            href={`mailto:${LINKS.email}`}
            className="mt-1 inline-block font-serif text-xl text-primary underline-offset-4 hover:underline"
          >
            {LINKS.email}
          </a>
        </div>

        {/* Quick inquiry form */}
        <section className="mt-12">
          <h2 className="mb-6 text-center font-serif text-2xl font-medium text-foreground">
            Бързо запитване
          </h2>
          <ContactForm />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

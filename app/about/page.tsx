import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "За мен — Words in Beads",
  description:
    "Здравейте! Аз съм Сиана, създателят на Words in Beads. Запознайте се с историята зад ръчно изработените бижута.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">
            За мен
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-foreground">
            Здравейте, аз съм Сиана
          </h1>
        </header>

        <div className="mt-10 grid items-start gap-8 sm:grid-cols-[minmax(0,240px)_1fr]">
          <figure className="mx-auto w-full max-w-[240px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border shadow-sm">
              <Image
                src="/images/siana.jpeg"
                alt="Сиана, създателят на Words in Beads"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
          </figure>

          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Здравейте! Аз съм на 14 години и любовта ми към ръчно изработените
              неща започна още когато бях съвсем малка. Тогава за първи път
              открих магията на мънистата.
            </p>
            <p>
              Преди време направих първия си опит с малък бизнес, преминах през
              първите си трудности като млад творец и това за малко ме накара да
              спра. Но любовта ми към това изкуство никога не е изчезвала!
            </p>
            <p>
              Днес се завръщам с нови сили, много повече знания, прецизност и
              вдъхновение. Всяка една гривна от{" "}
              <span className="font-medium text-foreground">Words in Beads</span>{" "}
              е изработена с много внимание към детайла, за да ви носи усмивка и
              да разказва вашата собствена история.
            </p>
            <p className="font-serif text-lg text-foreground">
              Благодаря ви, че подкрепяте моята мечта! ❤️
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Разгледай колекцията
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
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

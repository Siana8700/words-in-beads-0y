import Link from "next/link"
import Image from "next/image"
import { LINKS, SLOGAN } from "@/lib/site-data"
import { InstagramIcon, TikTokIcon } from "@/components/brand-icons"

const NAV = [
  { href: "/", label: "Начало" },
  { href: "/#catalog", label: "Продукти" },
  { href: "/about", label: "За мен" },
  { href: "/contact", label: "Контакти" },
]

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.jpeg"
                alt="Words in Beads лого"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <span className="font-serif text-xl font-medium text-foreground">
                Words in Beads
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary">
              {SLOGAN}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Долна навигация">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
              Навигация
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
              Свържи се с мен
            </h2>
            <a
              href={`mailto:${LINKS.email}`}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {LINKS.email}
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Имаш въпрос или искаш да поръчаш нещо специално? Пиши ми —
              отговарям с радост.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 Words in Beads. Всички права запазени.</p>
          <p className="flex items-center gap-3">
            <Link
              href="/terms"
              className="transition-colors hover:text-primary"
            >
              Общи условия
            </Link>
            <span aria-hidden="true">|</span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-primary"
            >
              Поверителност
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

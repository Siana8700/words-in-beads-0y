import Link from "next/link"
import Image from "next/image"
import { SLOGAN } from "@/lib/site-data"
import { CartButton } from "@/components/cart-button"

const NAV = [
  { href: "/", label: "Начало" },
  { href: "/#catalog", label: "Продукти" },
  { href: "/about", label: "За мен" },
  { href: "/contact", label: "Контакти" },
]

export function SiteHeader() {
  return (
    <header className="w-full border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6 py-5 sm:flex-row sm:justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/images/logo.jpeg"
            alt="Words in Beads лого"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="text-center sm:text-left">
            <span className="block font-serif text-2xl font-semibold leading-none tracking-wide text-foreground">
              Words in Beads
            </span>
            <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.28em] text-primary">
              {SLOGAN}
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav aria-label="Основна навигация">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
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
          <CartButton />
        </div>
      </div>
    </header>
  )
}

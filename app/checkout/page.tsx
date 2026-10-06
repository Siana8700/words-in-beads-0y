import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckoutForm } from "@/components/checkout-form"

export const metadata: Metadata = {
  title: "Поръчка — Words in Beads",
  description: "Финализирайте вашата поръчка за ръчно изработени гривни.",
}

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
        <Link
          href="/cart"
          className="text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          ← Обратно към количката
        </Link>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground">
          Поръчка
        </h1>
        <p className="mt-2 text-muted-foreground">
          Попълнете вашите данни за доставка, за да завършим поръчката.
        </p>
        <div className="mt-8">
          <CheckoutForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

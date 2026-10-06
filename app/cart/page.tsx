import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartView } from "@/components/cart-view"

export const metadata: Metadata = {
  title: "Количка — Words in Beads",
  description: "Прегледайте избраните ръчно изработени гривни и преминете към поръчка.",
}

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
        <h1 className="font-serif text-4xl font-semibold text-foreground">
          Количка
        </h1>
        <p className="mt-2 text-muted-foreground">
          Прегледайте избраните артикули и продължете към поръчка.
        </p>
        <div className="mt-8">
          <CartView />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

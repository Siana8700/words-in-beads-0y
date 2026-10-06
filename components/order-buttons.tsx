import { LINKS } from "@/lib/site-data"
import { InstagramIcon, TikTokIcon } from "@/components/brand-icons"

export function OrderButtons({ title }: { title?: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={LINKS.instagramDM}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90"
      >
        <InstagramIcon className="h-5 w-5" />
        Поръчай в Instagram
      </a>
      <a
        href={LINKS.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50"
      >
        <TikTokIcon className="h-5 w-5" />
        Поръчай в TikTok
      </a>
    </div>
  )
}

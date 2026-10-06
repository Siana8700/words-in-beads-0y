import { LINKS } from "@/lib/site-data"
import { InstagramIcon, TikTokIcon } from "@/components/brand-icons"

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2zM18.5 14l.8 2.7 2.7.8-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8.8-2.7z" />
    </svg>
  )
}

export function LinkButtons() {
  const items = [
    {
      label: "TikTok",
      sub: "Гледай процеса на изработка",
      href: LINKS.tiktok,
      icon: <TikTokIcon className="h-5 w-5" />,
    },
    {
      label: "Instagram",
      sub: "Следвай последните колекции",
      href: LINKS.instagram,
      icon: <InstagramIcon className="h-5 w-5" />,
    },
    {
      label: "Направи своя собствена гривна",
      sub: "Собствен дизайн — пиши ми в Instagram",
      href: LINKS.instagramDM,
      icon: <SparkleIcon />,
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/60 text-secondary-foreground">
            {item.icon}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-serif text-lg font-medium leading-snug text-foreground">
              {item.label}
            </span>
            <span className="block truncate text-sm text-muted-foreground">
              {item.sub}
            </span>
          </span>
          <ChevronRight />
        </a>
      ))}
    </div>
  )
}

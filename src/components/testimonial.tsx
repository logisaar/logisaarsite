import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function Testimonial({ className, ...props }: ComponentProps<"figure">) {
  return (
    <figure
      data-slot="testimonial"
      className={cn("flex h-full flex-col", className)}
      {...props}
    />
  )
}

export function TestimonialQuote({
  className,
  ...props
}: ComponentProps<"blockquote">) {
  return (
    <blockquote
      data-slot="testimonial-quote"
      className={cn(
        "grow px-6 py-5 text-sm md:text-base text-pretty text-foreground font-medium",
        className
      )}
      {...props}
    />
  )
}

export function TestimonialAuthor({
  className,
  ...props
}: ComponentProps<"figcaption">) {
  return (
    <figcaption
      data-slot="testimonial-author"
      className={cn(
        "grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-3.5 px-6 pt-2 pb-6 border-t border-border/40",
        className
      )}
      {...props}
    />
  )
}

export function TestimonialAvatar({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="testimonial-avatar"
      className={cn("relative row-span-2 size-10 shrink-0", className)}
      {...props}
    />
  )
}

export function TestimonialAvatarImg({
  className,
  src,
  alt,
  ...props
}: ComponentProps<"img">) {
  return (
    <img
      data-slot="testimonial-avatar-img"
      className={cn("size-10 rounded-full select-none object-cover", className)}
      src={src}
      alt={alt}
      {...props}
    />
  )
}

export function TestimonialAvatarRing({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="testimonial-avatar-ring"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-full ring-1 ring-black/10 dark:ring-white/15",
        className
      )}
      {...props}
    />
  )
}

export function TestimonialAuthorName({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="testimonial-author-name"
      className={cn(
        "flex items-center gap-1.5 text-sm leading-4.5 font-bold text-foreground",
        className
      )}
      {...props}
    />
  )
}

export function TestimonialAuthorTagline({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="testimonial-author-tagline"
      className={cn(
        "text-xs leading-4 text-balance text-muted-foreground mt-0.5",
        className
      )}
      {...props}
    />
  )
}

export function TestimonialVerifiedBadge({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot="testimonial-verified-badge"
      className={cn(
        "flex [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 text-emerald-600 dark:text-emerald-400",
        className
      )}
      aria-hidden
      {...props}
    />
  )
}

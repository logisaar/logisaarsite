import type { HTMLAttributes } from "react"
import type { MarqueeProps as FastMarqueeProps } from "react-fast-marquee"
import FastMarquee from "react-fast-marquee"
import { cn } from "@/lib/utils"

export type MarqueeProps = HTMLAttributes<HTMLDivElement>

export const Marquee = ({ className, ...props }: MarqueeProps) => (
  <div
    className={cn("relative w-full overflow-hidden", className)}
    {...props}
  />
)

export type MarqueeContentProps = FastMarqueeProps

export const MarqueeContent = ({
  loop = 0,
  autoFill = true,
  pauseOnHover = true,
  ...props
}: MarqueeContentProps) => (
  <FastMarquee
    autoFill={autoFill}
    loop={loop}
    pauseOnHover={pauseOnHover}
    {...props}
  />
)

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: "left" | "right"
}

export const MarqueeFade = ({
  className,
  side,
  ...props
}: MarqueeFadeProps) => (
  <div
    data-side={side}
    className={cn(
      "pointer-events-none absolute inset-y-0 z-10 h-full w-28",
      "data-[side=left]:left-0 data-[side=left]:bg-gradient-to-r data-[side=left]:from-background/95 data-[side=left]:to-transparent",
      "data-[side=right]:right-0 data-[side=right]:bg-gradient-to-l data-[side=right]:from-background/95 data-[side=right]:to-transparent",
      className
    )}
    {...props}
  />
)

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div className={cn("mx-4 shrink-0 flex items-stretch", className)} {...props} />
)

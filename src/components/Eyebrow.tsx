import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The one eyebrow style used site-wide: label size, medium weight, green ink, no pill, tracking at most 0.06em. */
export const EYEBROW_CLASS = "text-label font-medium uppercase tracking-[0.06em] text-primary-ink";

const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn(EYEBROW_CLASS, className)}>{children}</p>
);

export default Eyebrow;

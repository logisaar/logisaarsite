import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The fluid type tokens (text-label, text-body-sm, ...) are font sizes, not colours. Without this, tailwind-merge
// reads `text-body` as a colour and drops a real colour class that comes before it (e.g. `text-primary-on text-body`).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["label", "body-sm", "body", "lead", "h3", "h2", "h1", "display"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

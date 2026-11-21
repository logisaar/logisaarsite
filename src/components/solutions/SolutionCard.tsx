import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { whatsappLink } from "@/lib/contact";
import { priceLine, type Solution } from "@/data/solutions";

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--focus-ring))]";

/** The one ready-made solution card, used on /solutions and on the home page. */
const SolutionCard = ({ sol }: { sol: Solution }) => {
  const price = priceLine(sol);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="bg-secondary/60 p-4">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-3 py-2" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <ResponsiveImage
              image={sol.img}
              alt={`${sol.name} screen`}
              sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 90vw"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <span className="absolute left-3 top-3 rounded-full bg-foreground px-3 py-1 text-label font-semibold text-background">{sol.industry}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-h3 font-bold text-foreground">{sol.name}</h3>
        <p className="mt-2 text-body-sm text-muted-foreground">{sol.outcome}</p>
        {/* The whole card is this one link (stretched). The WhatsApp button sits above it. */}
        <Link
          to={sol.path}
          className={`mt-3 inline-flex min-h-[2.75rem] items-center gap-1.5 self-start text-body-sm font-semibold text-primary-ink outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[hsl(var(--focus-ring))]`}
        >
          View details<span className="sr-only"> for {sol.name}</span>
          <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        </Link>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="font-semibold text-foreground">
            {price.from}
            {price.monthly && <span className="block text-body-sm font-normal text-muted-foreground">+ {price.monthly}</span>}
          </p>
          <span className="group/wa relative">
            <a
              href={whatsappLink(sol.wa)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask about ${sol.name} on WhatsApp (opens in a new tab)`}
              className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary/40 text-primary-ink transition-colors hover:bg-primary/10 ${FOCUS}`}
            >
              <MessageCircle size={20} aria-hidden="true" />
            </a>
            <span aria-hidden="true" className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-label text-background opacity-0 transition-opacity group-focus-within/wa:opacity-100 group-hover/wa:opacity-100">
              Ask on WhatsApp
            </span>
          </span>
        </div>
      </div>
    </article>
  );
};

export default SolutionCard;

import { Linkedin } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import { FOUNDER_TITLE, COFOUNDER_TITLE } from "@/data/company";

// No photos, avatars or initials blocks (owner decision): the founders appear by name and role, in text.
// TODO(owner): review the wording of this story. Every fact below comes from what is already public on the site.
const FOUNDERS = [
  { name: "Chinmay Kumar Panda", role: FOUNDER_TITLE, focus: "Leads product, AI engineering and growth.", linkedin: "https://www.linkedin.com/in/chinmay-kumar-panda-80718525b/" },
  { name: "Biswanath Prasanna Satyabrata Kar", role: COFOUNDER_TITLE, focus: "Leads architecture, cloud and engineering operations.", linkedin: "https://www.linkedin.com/in/biswanath-prasanna-satyabrata-kar-79282330a/" },
];

const STORY = [
  { when: "Before Logisaar", text: "Two Computer Science engineers and full-stack developers from Odisha." },
  { when: "Sep 2025", text: "We start Logisaar to build properly made software for businesses close to home." },
  { when: "Early work", text: "Custom web, database and automation projects for local businesses." },
  { when: "Nov 2026", text: "TechXera, which began as a programming club at Nalanda, becomes IKURO." },
  { when: "Next", text: "HeyLane, our neighbourhood app for Bhubaneswar." },
];

/** About: the founders' story, a 5/7 split. Text left (narrative and names), a small timeline right. */
const FoundersStory = () => (
  <section data-logi="Meet the two founders." aria-labelledby="founders-h" className="bg-background py-section">
    <div className="container mx-auto max-w-[75rem] px-gutter">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Eyebrow>Our story</Eyebrow>
          <h2 id="founders-h" className="mt-3 font-display text-h2-page font-bold text-foreground">
            Two engineers, one idea: build it properly
          </h2>
          <div className="mt-6 space-y-4 text-body text-muted-foreground">
            <p>We are two Computer Science engineers and full-stack developers from Odisha. We started Logisaar in September 2025 because the businesses around us deserved software that was built properly, and then looked after.</p>
            <p>Our first projects were custom web, database and automation work for local businesses. Along the way we grew a student programming club at Nalanda, TechXera, into IKURO, and began building HeyLane, a neighbourhood app for Bhubaneswar.</p>
            <p>We still work the same way: listen first, quote clearly, show working software often, and stay after launch.</p>
          </div>
          <ul className="m-0 mt-8 grid list-none gap-6 p-0 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <li key={f.name} className="border-t-2 border-primary pt-4">
                <h3 className="font-display text-h3 font-bold text-foreground">{f.name}</h3>
                <p className="mt-1 text-body-sm font-medium text-primary-ink">{f.role}</p>
                <p className="mt-2 text-body-sm text-muted-foreground">{f.focus}</p>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-[2.75rem] items-center gap-2 text-body-sm font-medium text-foreground underline underline-offset-4 hover:text-primary-ink"
                >
                  <Linkedin size={16} aria-hidden="true" />
                  LinkedIn<span className="sr-only"> profile of {f.name} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <ol className="relative m-0 list-none space-y-7 p-0 pl-8">
            <span aria-hidden="true" className="absolute bottom-2 left-[0.4375rem] top-2 w-0.5 bg-border" />
            {STORY.map((s) => (
              <li key={s.when} className="relative">
                <span aria-hidden="true" className="absolute -left-8 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                <p className="text-label font-semibold uppercase tracking-[0.06em] text-primary-ink">{s.when}</p>
                <p className="mt-1 text-body text-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

export default FoundersStory;

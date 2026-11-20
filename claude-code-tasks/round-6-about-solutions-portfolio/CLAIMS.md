# Claims awaiting proof (round 6, phase 3)

Every claim below was on the site without a source. Until the owner confirms it, the site shows the **safe wording**.
The original text is kept in `src/data/solutions.ts` (`CLAIMS`). To restore one, set `proven: true` on that claim (or turn on `SHOW_PROVEN_CLAIMS` for all).
What counts as proof: a client result the owner can cite, or the provider's own documentation.

| # | Claim key | Where it was | Original claim | Safe wording now | Proof needed |
|---|---|---|---|---|---|
| 1 | `hotel-workload` | /solutions card, Hotel detail hero | Reduce staff workload by 60%. | Cuts manual booking and billing work. | A hotel client's before/after, citable |
| 2 | `hotel-uptime` | Hotel detail FAQ | Daily automated backups and 99.9% uptime | Data is encrypted and hosted on secure cloud servers. Backup and uptime terms are written into your quote. | Hosting provider's SLA and our backup setup |
| 3 | `proposal-speed` | /solutions card | Close clients 3x faster. | Send branded proposals and get them signed online. | A client result |
| 4 | `proposal-3x` | Proposal detail pain point | Interactive proposals get 3x more responses | Plain PDF proposals are easy to ignore. Interactive proposals are easier to read, compare and answer. | A cited study or our own data |
| 5 | `esign-card`, `esign-feature`, `esign-faq-q`, `esign-faq-a` | /solutions card, Proposal detail | Legally valid e-signatures under India's IT Act 2000 | Digital e-signatures | Legal advice and the e-sign provider's documentation (which signature type we use) |
| 6 | `receptionist-llm` | /solutions card tech stack | GPT-4o custom fine-tuning | Works with leading AI models | Confirm what model is actually used and whether it is fine-tuned. List providers only as "works with" |
| 7 | `odia-card`, `odia-feature`, `odia-tier`, `odia-faq` | /solutions card, Receptionist detail (feature, Enterprise tier, FAQ) | Bilingual English + Odia; basic Odia support; full Odia language model in Enterprise | Languages confirmed per project | A working Odia demo and the voice provider's language list |
| 8 | `receptionist-cost-title`, `receptionist-cost-desc` | Receptionist detail pain point | Hiring a receptionist costs ₹15,000+/month; AI does it at a fraction of the cost | A receptionist only works set hours / An AI receptionist answers, books and follows up around the clock, and hands over when a person is needed | Source for the salary figure, and the cost comparison |
| 9 | `automation-card`, `automation-h2` | /solutions card, Automation detail h2 and meta description | Save 20+ hours a week | Takes repetitive office work off your team / give your team their time back | A client measurement |
| 10 | `automation-3x` | Automation detail pain point | Outperform manual-process competitors by 3x in productivity | Teams that automate routine work spend more of their day on customers and growth | A cited study |
| 11 | `lead-card` | /solutions card | Convert leads 24/7. | Follows up with every new lead, fast. | A client conversion result |
| 12 | `lead-78` | Lead Follow-Up detail pain point | 78% of customers buy from whoever responds first | Customers often buy from whoever replies first. | A named source for the 78% figure |
| 13 | `lead-60` | Lead Follow-Up detail pain point | Businesses lose 60% of leads to no follow-up | Many businesses lose leads simply because nobody followed up. | A named source for the 60% figure |
| 14 | `crm-cost` | Custom CRM detail pain point | Salesforce, Zoho and HubSpot cost ₹3,000–₹30,000/month; a custom CRM pays for itself in under a year | Popular CRMs charge a monthly fee per user, every month. A custom CRM is a one-time build that you own. | Current vendor price pages, and a payback calculation |
| 15 | `qr-photos-feature`, `qr-photos-faq` | QR Menu detail (feature, FAQ) | Menus with photos get 30% more orders | Photos make dishes easier to choose. | A named source for the 30% figure |
| 16 | `travel-commission` | Travel detail pain point | OTAs charge 15-20% commission | Booking platforms take a commission on every booking. | The OTAs' published commission rates |

## Also noticed, not changed (owner to decide)

- "One-time fee, full source code ownership, zero monthly licenses" (Custom CRM) and "You own it 100%" (CRM FAQ): these are commercial terms. Confirm they apply to every CRM project.
- "24/7" in the receptionist and lead follow-up descriptions: kept, because it describes how an automated agent runs. Confirm uptime is not promised.
- Detail-page SEO descriptions still carried an old phone number (`+91 78150 14638`). It was removed; contact details now come only from `src/lib/contact.ts`.
- Home hero count-up cards still say "30+ Projects Delivered" and "25+ Happy Clients" (see `TODO(owner)` in `src/data/company.ts`).
- `Portfolio.tsx` and `Location.tsx` still say "15+ projects". They were left untouched because `/portfolio` is hidden and `/location` is out of scope for round 6; they conflict with the 30+ on home.

## Price mismatches found while merging (no price value was changed)

| Where | Found | Resolution |
|---|---|---|
| Home card, AI Receptionist | "From ₹20,000", monthly fee not shown | Detail page has "₹20,000 setup + ₹4,000/mo". Home now reads "From ₹20,000 + ₹4,000/month" from the shared data |
| `/solutions` cards, Lead Follow-Up and Receptionist | "₹5K/mo", "₹4K/mo" | Same values as the detail pages, now written in full from the shared data |
| `/pricing` page vs Custom CRM detail page | Pricing page and its meta description say "Custom CRM from ₹75,000"; the CRM detail page and home say from ₹45,000 | Kept the detail-page value (₹45,000) in the shared data. TODO(owner): decide which is right and fix `/pricing` |
| Home card, Custom CRM | Titled "Custom CRM & Business Automation" | Now "Custom CRM System" like the other pages (name only, price unchanged) |

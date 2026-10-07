# SPAN Engineering and Construction Ltd. — Website Design System and Build Spec

Hand this file to Claude Code as the single source of truth. Anything marked `[CLIENT]` is real content the client must supply. Never invent numbers, names, approvals or testimonials.

---

## 1. Brand summary

- **Who:** SPAN builds residential buildings in Aftabnagar, Dhaka, mostly through deals with landowners, then sells the apartments. 6–7 completed projects, all in one area. Plans to work outside Bangladesh later.
- **Audiences:** (1) landowners deciding whom to trust with their land, (2) apartment buyers.
- **Primary jobs of the site:** earn trust through proof of quality, then get a call, WhatsApp or enquiry.
- **Positioning:** the Aftabnagar specialist. Built here, for here.
- **Voice:** calm, precise, plain. Sentence case everywhere. Short sentences. No hype words ("luxury", "world-class", "premium"). State facts.
- **Name rule:** the brand is **SPAN**. "Engineering and Construction Ltd." is a small descriptor line. The ECL circular mark, if used, is a secondary monogram for favicon, stamps and social avatars only.

### Signature element: the span line

The one memorable thing. A single thin horizontal orange line (2px) that runs between two points, like a structural span between supports.

- On first load of Home it draws across the hero once (about 900ms), then rests.
- Everywhere else it appears as a **static** divider above major section headings and under the header on inner pages.
- Do not animate it again. Do not use it as decoration inside cards or lists.

Everything else stays quiet so this and the photography carry the identity.

---

## 2. Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| `--canvas` | `#FAF9F6` | page background |
| `--surface` | `#FFFFFF` | form fields, lightbox, rare raised areas |
| `--stone` | `#ECE8E1` | borders, dividers, image placeholders |
| `--ink` | `#1F2933` | headings, body text, dark sections, text on orange |
| `--muted` | `#6F6A62` | captions, secondary text (check contrast on canvas) |
| `--amber` | `#FFA500` | brand accent: primary button, span line, focus ring, small icons |
| `--amber-tint` | `#FFF3DB` | soft highlight background, status chip |
| `--amber-text` | `#9A5B00` | orange used as text or link on light backgrounds |

Rules:
- Amber is about 5% of any screen. One primary button per view.
- Never white text on amber. Text on amber is `--ink`.
- Never amber as body text. Use `--amber-text`.
- Dark sections use `--ink` background with `--canvas` text. Maximum two dark sections on any page.
- Minimum contrast: 4.5:1 for body text, 3:1 for large text and UI borders. Verify with a checker and adjust `--muted` if it fails.

### Typography

- **Latin:** Manrope (variable, one file, weights 400–800), self-hosted, `font-display: swap`, preloaded.
- **Bangla:** Noto Sans Bengali (variable), loaded only when the Bangla locale is active.
- No second display typeface. Personality comes from size, weight and tracking.

| Style | Mobile | Desktop | Weight | Tracking | Line height |
|---|---|---|---|---|---|
| Display (hero) | clamp 40px | up to 88px | 700 | -0.03em | 1.02 |
| H1 | 34px | 56px | 700 | -0.025em | 1.08 |
| H2 | 28px | 40px | 700 | -0.02em | 1.15 |
| H3 | 20px | 24px | 600 | -0.01em | 1.25 |
| Body large | 18px | 20px | 400 | 0 | 1.6 |
| Body | 16px | 17px | 400 | 0 | 1.65 |
| Small / caption | 14px | 14px | 500 | 0.005em | 1.5 |

Rules:
- Line length max 68 characters (`max-width: 68ch`).
- Bangla needs about +0.1 line-height and no negative tracking.
- No all-caps labels. No tracked-out eyebrow above every heading. No single accented word inside a headline.
- Tabular numbers (`font-variant-numeric: tabular-nums`) for specs and stats.

### Spacing, radius, elevation

- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 72, 112, 160. Section padding: 72 mobile, 112–160 desktop.
- Radius by role, not one value everywhere: images 4px, buttons and inputs 6px, status chips 999px, lightbox 0.
- Elevation: none by default. Use `1px solid var(--stone)` borders. Only the sticky mobile bar and open menu get a shadow.
- Prefer open layouts (image, then text beneath) over boxed cards.

### Layout

- Container max-width 1240px, side padding 20px mobile, 40px desktop.
- 4-column grid mobile, 12-column desktop, 20px/24px gutters.
- Text is **left aligned**. Centered text only for a single short closing CTA.
- Image ratios: project card 4:5, hero 4:5 mobile and 16:9 desktop, gallery free-form masonry on desktop and single column swipe on mobile.

---

## 3. Components

1. **Header:** transparent over the hero with `--canvas` text, becomes solid canvas with an ink text and a 1px stone bottom border after scrolling 40px. Wordmark left. Desktop links: Projects, For landowners, About, Contact. Right: phone link. Mobile: wordmark and menu button; menu opens as full-screen sheet.
2. **Buttons:** Primary (amber background, ink text, 6px radius, min height 48px). Secondary (1px ink border, transparent). Text link (ink, underline offset 4px, hover underline in amber). Labels say what happens: "View projects", "Talk to us about your land", "Send enquiry".
3. **Project card:** image, then project name (H3), a status chip, then one line "Handover 2024 · 12 apartments · 9 floors" built from real fields. No box, no shadow. Whole card is one link.
4. **Status chip:** Ongoing (amber-tint background, amber-text), Completed (stone background, ink), Upcoming (outline).
5. **Spec list:** two-column definition list, label muted, value ink, hairline dividers. Used on Project detail.
6. **Quality pillar:** an icon (24px line icon, 1.5px stroke), a short title, two lines of proof text. No numbering.
7. **Process steps:** genuinely sequential, so numbered 1–4 is allowed here.
8. **Gallery:** grid with category tabs (Exterior, Interior, Construction, Handover). Lightbox with swipe, keyboard arrows, focus trap, captions.
9. **Enquiry form:** name, phone (required), email (optional), message, hidden project field. Landowner variant adds land location and approximate size. Honeypot field plus Cloudflare Turnstile. Inline validation, specific errors, a clear success state ("Thanks. We will call you within one working day." only if the client confirms this promise).
10. **Sticky mobile action bar:** Call, WhatsApp, Enquire. Appears after the hero, hides on scroll-down and returns on scroll-up. Respect the safe-area inset.
11. **Footer:** dark ink section. Office address, phone, WhatsApp, email, small map link, social links (Facebook, YouTube), copyright. No bank-logo walls.
12. **Map block:** static image or lightweight embed that loads on tap, so it does not hurt performance.

---

## 4. Pages and sections

### Home (6 sections)

```
+--------------------------------------------+
| SPAN                      Projects ... Call |
|                                            |
|   [ full-bleed photo of best building ]    |
|                                            |
|   Homes built to last                      |
|   in Aftabnagar.                           |
|   [View projects]  Talk to us about land   |
|   ======== span line draws ========        |
|   7 projects | since 20XX | N families     |  <- [CLIENT] real numbers, static
+--------------------------------------------+
```

1. **Hero:** headline (placeholder: "Homes built to last in Aftabnagar."), one-line subhead, two actions, key numbers along the bottom edge (static, no count-up).
2. **Featured projects:** 3 large items (one ongoing if available), link to all projects.
3. **Quality promise:** 4 pillars with proof (structure, materials, safety and approvals, timely handover). Each pillar must be backed by `[CLIENT]` specifics such as named engineer, material brands, tests done.
4. **For landowners:** dark ink section. Short pitch, 4 process steps, button to the landowner page.
5. **Landowner partners:** names and projects, only entries with permission. Hide the section if there are none.
6. **Closing CTA and footer:** one headline, call/WhatsApp/enquire, map.

### Projects

Tabs: All, Ongoing, Completed, Upcoming. No location filter now. Grid of project cards, 1 column mobile, 2 tablet, 3 desktop. Sort: ongoing first, then newest completed.

### Project detail

Order: hero image, title and status, key facts strip, summary, spec list, gallery, floor plans, quality details (engineer, materials, approvals), construction updates (ongoing only), location map, enquiry form with the project prefilled, next project link. Add brochure download.

### For landowners

Headline stating what SPAN offers landowners, how a joint venture works (4 steps), documents and legal clarity `[CLIENT]`, handover timeline `[CLIENT]`, FAQs `[CLIENT]`, partner list, landowner enquiry form. Do not state profit-sharing ratios unless the client supplies them.

### About

Company story, founding year `[CLIENT]`, what quality means at SPAN, leadership `[CLIENT]` (name, role, photo, short note), approvals and memberships `[CLIENT]` (only if actually held), short Aftabnagar note.

### Contact

Address, phone, WhatsApp, email, office hours, map, general enquiry form.

---

## 5. Motion

Motion is rare so it means something.

- **One orchestrated moment:** Home hero only. Image fades in with a gentle 1.04 to 1 scale, the headline appears, then the span line draws. Total under 1.4s.
- **Responds to action only elsewhere:** menu open/close, gallery lightbox, accordion open, form success, button press feedback, image hover zoom limited to project cards (scale 1.02).
- Site-wide quiet motion (client-requested, replaces the earlier "no fade-up, no parallax" rule): section content below the fold rises in once with a slight 3D lift (components/ui/MotionLayer), span lines draw in as they appear, project and partner cards lean up to 4deg towards a mouse (no tilt on touch), and the Home hero photo drifts slightly on scroll (CSS scroll timelines only).
- No count-up numbers. No scroll-jacking or smooth-scroll libraries.
- Use CSS transitions where possible. If a library is needed, Motion (Framer Motion) lazily loaded for the hero and lightbox only.
- Honor `prefers-reduced-motion`: replace all movement with instant state changes.

---

## 6. Content model (Payload CMS, PostgreSQL)

All text fields marked (L) are localized with locales `en` and `bn`. Launch in English; keep Bangla enabled in the config from day one.

### Collection: Projects
- `title` (L), `slug`, `status` (ongoing | completed | upcoming), `handoverYear` (number), `featured` (checkbox), `sortOrder` (number)
- `area` (text, default "Aftabnagar"), `city` (default "Dhaka"), `country` (default "Bangladesh"). Kept so future projects outside Aftabnagar need no rebuild. No UI filter yet.
- `addressLine` (L), `blockRoad` (text), `coordinates` (point or lat/lng)
- `landAreaKatha` (number), `floors` (number), `basements` (number), `totalUnits` (number), `unitSizes` (array: label, sqft)
- `facilities` (array: label (L), icon)
- `summary` (L, max 200 chars), `description` (L, rich text)
- `heroImage` (media, required), `gallery` (array: image, caption (L), category exterior | interior | construction | handover)
- `floorPlans` (array: label, file), `brochure` (file), `videoUrl` (text)
- `qualityDetails` (array: label (L), value (L)) e.g. structural engineer, rod brand, cement brand `[CLIENT]`
- `approvals` (array: name, reference no.)
- `constructionUpdates` (array: date, photo, note (L)) shown only for ongoing projects
- `availabilityNote` (L, optional, short)
- `seo` (title (L), description (L), ogImage)
- Validation: published projects require heroImage, summary, status, and at least 3 gallery images.

### Collection: Partners (optional)
- `landownerName`, `project` (relation to Projects), `photo` (optional), `permissionGranted` (checkbox, **must be true to publish**), `note` (L, optional, factual one-liner)

### Collection: Inquiries (private, admin only)
- `type` (buyer | landowner | general), `name`, `phone`, `email`, `message`, `project` (relation, optional), `landLocation`, `landSize` (landowner only)
- `status` (new | contacted | closed), `sourcePage`, `consent` (checkbox), `createdAt`
- On create: email notification to the company and a WhatsApp/click-to-chat link in the admin row. Rate-limit the endpoint.

### Collection: Media
- Required `alt` text (L). Focal point enabled. Auto-generate AVIF and WebP sizes. Upload limit 15 MB, store on Cloudflare R2.

### Globals
- **SiteSettings:** phones, WhatsApp number, email, office address (L), coordinates, office hours (L), Facebook/YouTube/Instagram URLs, `keyNumbers` (projectsDelivered, since year, familiesHoused, sqftBuilt — all editable, all real), company approvals list.
- **HomePage:** hero headline (L), subhead (L), hero image, quality pillars (array: icon, title (L), proof text (L)).
- **LandownerPage:** intro (L), process steps (array: title (L), text (L)), documents list (L), timeline text (L), FAQs (array: question (L), answer (L)).
- **AboutPage:** story (L rich text), quality statement (L), leadership (array: name, role (L), photo, note (L)).

Admin experience: custom dashboard shows counts of projects and new inquiries, plus quick links to "Add project" and "View new inquiries". Use plain labels, add field descriptions and image-size hints, and a live preview link on every project.

---

## 7. Performance, SEO and accessibility

**Performance targets (mobile, 4G):** LCP under 2.5s, CLS under 0.05, INP under 200ms, Lighthouse 95+.
- Static generation with on-demand revalidation when content is published.
- Hero image: responsive `srcset`, AVIF/WebP, preloaded, explicit dimensions. No hero video at launch.
- Lazy-load everything below the first screen. Blur or dominant-color placeholders.
- One font family, subset, preloaded. Minimal client JavaScript; server components by default.
- Cloudflare in front for caching and compression.

**SEO:**
- Per-project pages with unique titles such as "Project name — apartments in Aftabnagar, Dhaka".
- `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph images, `Organization` and `Residence`/`Apartment` structured data (only fields that are true).
- Set up Google Business Profile and link it from the footer.
- `hreflang` when Bangla is enabled.

**Accessibility:** visible focus ring (2px amber with ink offset), full keyboard support, lightbox focus trap, alt text required in the CMS, form labels and error text tied to fields, minimum 44px touch targets, respect reduced motion.

---

## 8. Stack and hosting

- Next.js (App Router), TypeScript, Tailwind CSS, Payload CMS (runs inside the same app), PostgreSQL.
- Images and uploads on Cloudflare R2 via a `cdn.` subdomain.
- Hosting: small VPS in Singapore (Coolify or Docker), Cloudflare proxy in front (SSL Full strict), PostgreSQL on the same server with nightly encrypted backups to R2. Vercel is an option, but its free tier is not for commercial use, so check current terms before choosing it.
- Email: Cloudflare Email Routing for receiving; a transactional sender such as Resend for form notifications, with SPF, DKIM and DMARC records set.
- Domain registered with Cloudflare under the company's email, 2FA on, auto-renew on.
- Check current Payload and Next.js version compatibility before scaffolding.

---

## 9. Build order

1. Scaffold the project, tokens, fonts, layout shell, header, footer, buttons.
2. Payload collections, globals, media setup, access control, seed data (clearly fake and marked as such, replaced before launch).
3. Home, Projects list, Project detail.
4. For landowners, About, Contact, enquiry forms with notifications and spam protection.
5. Sticky mobile bar, gallery lightbox, hero moment, reduced-motion handling.
6. SEO, structured data, sitemap, performance and accessibility audit.
7. Content entry with real photos and facts, then launch checklist (DNS, SSL, backups, redirects, analytics, 404 page, privacy note).

---

## 10. Starter prompt for Claude Code

> Read `span-website-design-system.md` fully before writing code. Build the SPAN website exactly to this spec. Start with step 1 and 2 of the build order only: scaffold Next.js + Tailwind + Payload with PostgreSQL, implement the design tokens as CSS variables mapped into the Tailwind theme, create the layout shell, and define all collections and globals with localization for `en` and `bn`. Do not invent real company facts; use clearly marked placeholder content. After each step, run a type check, lint and a production build, then summarize what was done and what is next.

---

## 11. Pre-launch checklist

- [ ] All `[CLIENT]` content received and entered
- [ ] Every claim on the site can be verified by the client
- [ ] Photography shot or approved for every published project
- [ ] Landowner partner permissions recorded
- [ ] Phone, WhatsApp and form notifications tested on real devices
- [ ] Lighthouse and accessibility checks passed on mobile
- [ ] Backups and restore tested once
- [ ] Analytics and Google Business Profile connected

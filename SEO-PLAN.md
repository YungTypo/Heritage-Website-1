# Heritage Roofing & Restoration — SEO Remediation Plan

_Prepared for heritagerrtn.com — a new roofing & storm-restoration company serving 49+ cities across Middle Tennessee & Southern Kentucky. Owners: Nathan Hillis & Jacob Castillo. Phone: (615) 670-3132. Email: jacob@heritagerrtn.com._

> **Truthfulness guardrail (applies to everything below):** We are a new company with no verified Google Business Profile, no customer reviews, and no project photos. This plan adds **zero** fake reviews, fake ratings, fake testimonials, stock "project" photos, or invented stats (no "500+ roofs," no founding year, no license number unless you supply it). City-page differentiation uses only **publicly verifiable** facts (county, geography, climate/storm patterns, neighborhood names) — never fabricated job counts or local track-record claims.

---

## 0. Answers from owner (confirmed) + what's still pending

**Confirmed — now baked into the plan:**

| # | Question | Answer → how it's used |
|---|----------|------------------------|
| 1 | License | **Licensed in TN: yes** (number not on hand → add `license #` to copy/schema later). Keep "licensed & insured." |
| 2 | Insurance | **Yes — keep "licensed & insured" sitewide.** |
| 3 | Year founded | **2026** → `foundingDate:"2026"` in schema; "founded in 2026" in About (truthful — we're new). |
| 4 | Owner roles | **Both are "Co-Owner"** → Nathan Hillis (Co-Owner) & Jacob Castillo (Co-Owner) in About + `founder` schema. |
| 5 | Certifications | **None yet** — GAF "coming soon." → **Do NOT claim GAF or any cert yet.** Revisit when active. |
| 6 | Base location | **Gallatin, TN** → fix the vague `"addressRegion":"TN/KY"` to a real `PostalAddress` (`addressLocality:"Gallatin"`, `addressRegion:"TN"`, `addressCountry:"US"`). **Meaningful local-SEO win.** |
| 7 | Socials / GBP | **Coming soon — will provide later;** "add placeholders for socials now" → add footer social placeholders + a **commented `sameAs`** stub in schema (no fake live URLs). |
| 8 | GA4 ID | **`G-WEJV0T4X21`** → replace `G-XXXXXXXXXX` in `js/analytics.js`. **Now actionable.** |
| 9 | Financing | **No partner yet** (many coming soon) → leave `financing.html` generic; no partner names. |
| 10 | Canonical host | **Confirmed `https://www.heritagerrtn.com` (www);** Netlify forces non-www → www + HTTPS. |

**Still pending (non-blocking — fill in when available):** TN license **number** (Q1); real **social/GBP URLs** to populate `sameAs` (Q7); **GAF/other certifications** once active (Q5); **financing partner(s)** (Q9). Everything else can be implemented now.

---

## STEP 1 — Audit findings

### 1.1 Site inventory (68 HTML pages)

- **Root (11):** `index.html`, `about.html`, `contact.html`, `quote.html`, `reviews.html`, `gallery.html`, `financing.html`, `privacy.html`, `terms.html`, `thank-you.html` (noindex), `404.html` (noindex).
- **Services (6):** `services/index.html` + `roof-repair-replacement`, `storm-restoration`, `gutters-siding`, `insurance-claims`, `more-services`.
- **Service areas (44):** `service-areas/index.html` + **43 city pages** (the brief says "49+ cities"; the schema `areaServed` lists 49, but only **43** city pages exist — see gap note below).
- **Assets:** `css/style.css`, `js/main.js`, `js/analytics.js`, `favicon.svg`, `heritage-logo.jpg` (158 KB), `heritage-logo-silver.png` (332 KB). **No hero/project images exist at all.**
- **Config present:** `robots.txt` ✓, `sitemap.xml` ✓ (65 URLs), `_headers` (Netlify security + cache) ✓. **Absent:** `_redirects` / `netlify.toml`, `CNAME`.

> **Gap flagged:** marketing says "49+ cities" and the schema lists 49, but there are **43 city pages**. We should reconcile — either create the 6 missing city pages or align the "49+" claim. (Open question candidate; low priority.)

### 1.2 Title / meta / H1 / canonical map (representative)

| Page | `<title>` | H1 | Canonical | Notes |
|------|-----------|----|-----------|-------|
| `/` (index) | Heritage Roofing & Restoration \| Roofing & Storm Restoration in Middle TN & Southern KY | Roofing & Restoration You Can Trust, Across Middle Tennessee & Southern Kentucky | `https://www.heritagerrtn.com/` | Good. 1× H1. Has RoofingContractor + FAQPage JSON-LD. |
| `about.html` | About Us \| Heritage Roofing & Restoration | About Heritage Roofing & Restoration | `/about.html` | **Thin (~160 words), owners not named.** No geo in title. |
| `contact.html` | Contact Us \| Heritage Roofing & Restoration | Contact Us | `/contact.html` | No geo in title. |
| `quote.html` | Get a Free Quote \| Heritage Roofing & Restoration | Get a Free Quote | `/quote.html` | OK; geo could help. |
| `reviews.html` | Reviews & Testimonials \| … | Reviews & Testimonials | `/reviews.html` | **Honest "building our review wall" copy — no fake reviews.** Fine to keep. |
| `gallery.html` | Project Gallery \| … | Project Gallery | `/gallery.html` | **Placeholder "Project Photo 1-6" boxes; indexed.** → noindex. |
| `financing.html` | Financing Options \| … | Financing Your Project | `/financing.html` | Generic; verify partner. |
| `services/index.html` | Roofing & Restoration Services \| … | Our Services | `/services/` | No geo in title. |
| `services/roof-repair-replacement.html` | Roof Repair & Replacement \| … | Roof Repair & Replacement | `/services/roof-repair-replacement.html` | **~50-word body. Malformed `Service` schema (see 1.5).** No geo in title. |
| `services/storm-restoration.html` (+3 more) | `<Service> \| …` | `<Service>` | self | **~50-word body each. Schema is `RoofingContractor`, not `Service`.** No geo in title. |
| `service-areas/index.html` | Service Areas \| … | Our Service Area | `/service-areas/` | OK hub. |
| `service-areas/<city>.html` ×43 | Roofing & Restoration in `<City>, <State>` \| … | Roofing & Restoration in `<City>, <State>` | self | **~270 words, near-identical template, duplicate meta descriptions — doorway risk.** Titles/H1s already geo'd (good bones). |
| `thank-you.html`, `404.html` | … | … | none | Correctly `noindex`. Good. |

**H1 health:** every page has exactly one H1 — no missing/duplicate H1s. H1 work is therefore minor (optional keyword/geo enrichment on service pages), not corrective.

### 1.3 Duplicate-content / `index.html` vs trailing-slash situation

- **Canonicals are correct and self-referential** to the clean form (`/`, `/services/`, `/service-areas/`, and `*.html` for leaf pages). The homepage is **not** duplicated as a separate file.
- **The real issue is internal linking:** every page's logo links to **`/index.html`**, and the nav links to **`/services/index.html`** and **`/service-areas/index.html`** — i.e., the site internally points at non-canonical URLs that Netlify also serves. Canonical tags currently paper over it, but we should **pick one form and enforce it**.
- **Recommended canonical form: clean URLs** (`/`, `/services/`, `/service-areas/`) — already what the canonicals declare. Fix = (a) rewrite internal links to the clean form sitewide, and (b) add 301 redirects (`_redirects`) for the `index.html` variants so any stray inbound link consolidates.

### 1.4 robots.txt & sitemap.xml — exist, minor fixes only

- **`robots.txt`** ✓ — `User-agent: * / Allow: / / Sitemap: …`. Correct. (Optional: it's fine as-is.)
- **`sitemap.xml`** ✓ — 65 URLs, valid, correctly **excludes** `thank-you.html` & `404.html`. Fixes needed: **remove `gallery.html`** once it's noindexed; **bump `<lastmod>`** as pages change; keep all 43 city pages (all will be uniquely rewritten and stay indexed).

### 1.5 Structured-data audit (this is where the real schema work is)

- **`RoofingContractor` present on every indexable page** ✓ — `name`, `url`, `logo`, `image`, `priceRange "$$"`, `telephone`, `email`, `areaServed` (full 49-city list on hubs; single city on city pages), `address` (region-only `TN/KY`), `openingHours "Mo-Su 00:00-23:59"` (good for 24/7). **Missing: `founder`** (Nathan Hillis, Jacob Castillo), `@id` entity anchor, `sameAs`.
- **`FAQPage` on homepage** ✓ — 4 Q&As, **matches the visible FAQ exactly**. No change needed; reuse same Q&As if we add FAQ schema elsewhere.
- **`Service` schema:** only `roof-repair-replacement.html` has `@type:"Service"`, and it's **malformed** — its `name` is *"Heritage Roofing & Restoration"* (the business, not the service) and it stuffs business props (`openingHours`, `areaServed`, `priceRange`) into the Service node. The **other 4 service pages use `RoofingContractor`** (wrong type for a service page). → **Standardize all 5** to a clean `Service` node with `provider` referencing the business `@id`.
- **`BreadcrumbList`:** **absent everywhere.** Service and city pages should have it (+ a visible breadcrumb).
- **`Review` / `AggregateRating`:** **absent** (correct — none should exist yet). We'll add a **clearly-commented, disabled placeholder** for later.
- `address.addressRegion` is the non-standard `"TN/KY"`; **replace with a real base address** — `addressLocality:"Gallatin"`, `addressRegion:"TN"`, `addressCountry:"US"` (Gallatin, TN is the company base, per owner). `areaServed` can still span TN + KY.

### 1.6 Placeholder hero & gallery (confirmed — visible on the live site)

These render **visible placeholder text** to real visitors right now:
- **Homepage hero:** `<div class="nc-photo" role="img" …><span class="nc-photo-cap">[ hero photo — finished roof ]</span>…` (lines ~92-98 of `index.html`).
- **Homepage before/after slider:** `[ before — storm damage ]` / `[ after — restored by Heritage ]` (lines ~236-245).
- **Homepage "Project Gallery" tiles:** four boxes reading **`Roof 1`, `Storm 2`, `Gutters 3`, `Siding 4`** (lines ~290-295). Their `aria-label`s also describe photos that don't exist.
- **`gallery.html`:** six **`Project Photo 1`–`6`** boxes + an honest "swap in project photos as they come in" note; **indexed**.

**Decision (yours):** replace all of these with a **branded, no-photo design** (clean brand panels / icon-led cards / honest "what we do" content — no fake imagery) and **noindex `gallery.html`** until real photos exist.

### 1.7 Image formats & alt text

- Only two real images, both used well with adequate alt text: `heritage-logo-silver.png` (header/footer/quote) and `heritage-logo.jpg` (favicon + `og:image`).
- **Formats:** PNG/JPG, not WebP. `heritage-logo-silver.png` is **332 KB** — oversized for a logo. → convert logos to **WebP** (with PNG/JPG fallback) and/or compress; keep explicit `width`/`height` (already present — good for CLS).
- **og:image is the logo** (fine for now); replace with a real branded share image when available.
- When real photos arrive: WebP, descriptive geo-aware `alt`, `loading="lazy"`, `width`/`height`.

---

## STEP 2 — Prioritized fixes

### A) Technical

1. **Enforce one canonical URL form (clean URLs).**
   - Rewrite internal links sitewide: logo `/index.html` → `/`; nav `services/index.html` → `/services/`; `service-areas/index.html` → `/service-areas/` (header **and** mobile nav **and** footer "View full service area" on all 68 pages).
   - Add **`_redirects`** (Netlify) with 301s:
     ```
     /index.html              /              301!
     /services/index.html     /services/     301!
     /service-areas/index.html /service-areas/ 301!
     ```
   - Confirm Netlify forces non-www → www + HTTP → HTTPS (Q10 — confirmed yes).
2. **`sitemap.xml`:** remove `gallery.html`; refresh `<lastmod>` on edited pages. (Keep all city pages — all staying indexed.)
3. **`robots.txt`:** leave as-is (already correct).
4. **`BreadcrumbList` JSON-LD + visible breadcrumb** on all service pages and all 43 city pages (Home › Services/Service Areas › Page).
5. **Image weight:** convert/compress logos to WebP; keep dimensions.
6. **Analytics:** replace `G-XXXXXXXXXX` in `js/analytics.js` with the real GA4 ID **`G-WEJV0T4X21`** (confirmed) — analytics is currently collecting nothing.

### B) Structured data (truthful only)

1. **Upgrade the sitewide `RoofingContractor` node** (keep existing fields) by adding/fixing:
   - `"@id": "https://www.heritagerrtn.com/#business"` (entity anchor for cross-referencing),
   - `"founder": [{"@type":"Person","name":"Nathan Hillis","jobTitle":"Co-Owner"},{"@type":"Person","name":"Jacob Castillo","jobTitle":"Co-Owner"}]`,
   - `"foundingDate": "2026"`,
   - real base **address**: `{"@type":"PostalAddress","addressLocality":"Gallatin","addressRegion":"TN","addressCountry":"US"}` (replaces the `"TN/KY"` region string),
   - normalize `telephone` to `"+1-615-670-3132"` (E.164),
   - a **commented `sameAs` stub** for socials (no fake live URLs) — populate when real profile URLs arrive:
     `<!-- "sameAs": ["https://facebook.com/…","https://instagram.com/…"]  // add real URLs when live -->`
   - Keep `openingHours "Mo-Su 00:00-23:59"` (24/7), `priceRange "$$"`, `areaServed`, `email`, `logo`.
   - **Do NOT** add GAF/certification claims yet (coming soon, not active).
2. **Standardize `Service` schema on all 5 service pages** to a correct shape, e.g.:
   ```json
   {
     "@context":"https://schema.org",
     "@type":"Service",
     "name":"Roof Repair & Replacement",
     "serviceType":"Roof Repair & Replacement",
     "provider":{"@type":"RoofingContractor","@id":"https://www.heritagerrtn.com/#business","name":"Heritage Roofing & Restoration","telephone":"+1-615-670-3132","url":"https://www.heritagerrtn.com"},
     "areaServed":[{"@type":"State","name":"Tennessee"},{"@type":"State","name":"Kentucky"}],
     "url":"https://www.heritagerrtn.com/services/roof-repair-replacement.html",
     "description":"<concise truthful summary>"
   }
   ```
3. **Keep `FAQPage` on the homepage**; optionally add page-specific FAQ + `FAQPage` schema to service pages and the 5 priority city pages as their FAQ content is written.
4. **`BreadcrumbList`** (see A4).
5. **Disabled Review/Rating placeholder** — drop this commented block into the business node location on each page, to be filled in LATER:
   ```html
   <!-- ============================================================
        REVIEW / AGGREGATE-RATING SCHEMA — DISABLED ON PURPOSE.
        DO NOT ENABLE until Heritage has REAL, verified reviews.
        When genuine reviews exist (e.g., Google Business Profile),
        add an aggregateRating to the RoofingContractor (#business)
        node with TRUTHFUL values, for example:
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "X.X",
            "reviewCount": "NN"
          }
        Inventing ratings violates Google policy and risks a manual
        action. Leave disabled until the numbers are real.
   ============================================================ -->
   ```

### C) On-page (titles, descriptions, H1s, alt)

1. **Title tags — add geo modifiers** (front-load keyword + geo, keep the brand suffix):
   - `services/index.html` → **"Roofing Services in Middle TN & Southern KY | Heritage Roofing & Restoration"**
   - `roof-repair-replacement.html` → **"Roof Repair & Replacement in Middle TN & Southern KY | Heritage Roofing & Restoration"**
   - `storm-restoration.html` → **"Storm Damage Roof Restoration in Middle TN & Southern KY | Heritage Roofing & Restoration"**
   - `gutters-siding.html` → **"Gutter & Siding Installation in Middle TN & Southern KY | Heritage Roofing & Restoration"**
   - `insurance-claims.html` → **"Roof Insurance Claim Help in Middle TN & Southern KY | Heritage Roofing & Restoration"**
   - `about.html` → **"About Our Local Roofing Team | Heritage Roofing & Restoration — Middle TN & KY"**
   - `contact.html` / `quote.html` → add "in Middle TN & Southern KY".
   - **City pages** already follow the geo pattern; optionally enrich, e.g. **"Roof Repair & Storm Restoration in Nashville, TN | Heritage Roofing & Restoration"**.
2. **Meta descriptions — tighten for CTR** and **make city descriptions unique** (43 currently share one templated sentence with the city swapped — a duplicate-meta issue). Unique descriptions are written as part of the city rewrite (Step D).
3. **H1s:** already healthy (1 per page). Optional: enrich service H1s with a benefit/keyword; otherwise leave.
4. **Alt text:** logos are fine. Replace the misleading "completed project" `aria-label`s on the placeholder tiles when we swap in the branded design; write descriptive geo-aware alt when real photos land.

### D) Content depth (the biggest organic-traffic lever)

**Service pages — expand each from ~50 → 500-800 words**, section outline:
1. **Overview** — the homeowner's problem, our honest-diagnosis promise.
2. **When you need it** — repair-vs-replace signals (service-specific).
3. **What's included / materials** — systems & specifics (truthful).
4. **Our process** — 1) free inspection → 2) documentation & written quote → 3) licensed/insured install → 4) we stand behind it.
5. **Service area** — region + a few anchor cities (internal links).
6. **Mini-FAQ** (2-4 Q&As) → eligible for `FAQPage` schema.
7. **CTA.**

**City pages — fully rewrite ALL 43, ~500-700 words each, genuinely unique** (your call: "do every single one, unique to the city"). Differentiation uses only **public facts**: county, region, river/terrain, climate & seasonal storm patterns, housing stock/age, named neighborhoods & nearby suburbs, relationship to the Nashville/Bowling Green hubs. **No** fabricated job counts, local reviews, or claims of a physical office in each city. Per-page outline:
1. **Local intro** — city + county + what local homes face (geography/climate/housing).
2. **Storm/weather context** for that area + 24/7 response.
3. **Services in `<City>`** — the 5 services framed locally, internally linked.
4. **Areas/neighborhoods we serve** near `<City>` — link to adjacent city pages (already partly present as "Nearby Areas").
5. **Why local homeowners choose Heritage** — licensed, insured, local, honest, 24/7.
6. **Unique meta description + (optional) local mini-FAQ.**
7. **CTA.**

**Execution sequence (all 49, prioritized by market size):** Nashville → Murfreesboro → Franklin → Clarksville → Bowling Green KY → then the remaining 38, grouped by region (Greater Nashville, Northern Middle TN, South Central TN, Upper Cumberland, South Central KY). Each rewrite gets unique body + unique meta description; all stay indexed. _(Implementation note: this is large and template-structured, so it's a good fit for a generation pass that fills a per-city facts table, with human review of the 5 priority cities first.)_

**Worked examples are in Step 4** (one full service page, one full city page).

### E) Trust / E-E-A-T (copy only)

**Rewrite `about.html` from ~160 → ~400-500 words**, truthfully:
- **Who we are** — **founded in 2026**, locally owned and operated by **Nathan Hillis (Co-Owner)** and **Jacob Castillo (Co-Owner)**, **based in Gallatin, TN**, serving Middle TN & Southern KY. Lean into "new but built right" rather than hiding that we're new.
- **Ownership block** naming both Co-Owners; backed by the `Person` entries in schema `founder`.
- **What we do / our promise** — honest inspections, repair-or-replace straight talk, insurance support start-to-finish.
- **"Licensed (Tennessee) & insured"** language (consistent with the rest of the site). Add the **license number** when supplied.
- **24/7 storm response;** Gallatin home base.
- **Do NOT invent** a license number, certifications (GAF is "coming soon," not active), or job counts → leave those out until real.

---

## STEP 3 — Master checklist (ordered by impact)

Legend: **[NOW]** = implementable immediately in code/copy · **[PENDING INFO]** = waiting on a detail from owner · **[ASSET]** = needs a real photo/review later.

### Tier 1 — High impact, do first
- [ ] **[NOW]** Rewrite **all 43 city pages** unique to each city (~500-700 words, unique meta) — kills doorway risk. _(Priority 5 first: Nashville, Murfreesboro, Franklin, Clarksville, Bowling Green.)_
- [ ] **[NOW]** Expand **5 service pages** to 500-800 words with the section outline + mini-FAQ.
- [ ] **[NOW]** Replace homepage **hero / before-after / gallery** placeholders with branded no-photo design; **noindex `gallery.html`**; remove from sitemap.
- [ ] **[NOW]** Rewrite **About** page (truthful, names owners, licensed/insured, 24/7).
- [ ] **[NOW]** Standardize **`Service` schema** on all 5 service pages; fix the malformed one.

### Tier 2 — High impact, low effort
- [ ] **[NOW]** Add **`founder`** (Nathan Hillis & Jacob Castillo, Co-Owners) + **`foundingDate:"2026"`** + **real Gallatin, TN address** + `@id` + E.164 phone to the sitewide business schema; commented `sameAs` stub for socials.
- [ ] **[NOW]** Add **`BreadcrumbList`** schema + visible breadcrumbs to service & city pages.
- [ ] **[NOW]** **Geo-modified title tags** + tightened meta descriptions (service/about/contact/quote + unique city metas).
- [ ] **[NOW]** Fix internal links to **clean canonical URLs** + add **`_redirects`** 301s.
- [ ] **[NOW]** Add the **disabled Review/AggregateRating placeholder** comment.

### Tier 3 — Supporting / hygiene
- [ ] **[NOW]** Update `sitemap.xml` (`<lastmod>`, drop noindexed `gallery.html`).
- [ ] **[NOW]** Set GA4 ID **`G-WEJV0T4X21`** in `js/analytics.js`.
- [ ] **[NOW]** Convert/compress logos to **WebP**; keep dimensions.
- [ ] **[NOW]** Reconcile the **"49+ cities" vs 43 pages** mismatch (create 6 or adjust the claim).
- [ ] **[NOW]** Add **footer social placeholders** + commented `sameAs` stub (real URLs later).
- [ ] **[PENDING INFO]** Fill in when provided: TN **license number**; real **social/GBP URLs**; **GAF/certs** when active; **financing partner(s)**.

### Tier 4 — Later, when assets exist
- [ ] **[ASSET]** Real **hero + project photos** → restore real gallery, add `ImageObject`, WebP, descriptive alt.
- [ ] **[ASSET]** Real **reviews** → enable the AggregateRating/Review schema with truthful values; populate `reviews.html`.

---

## STEP 4 — Worked example copy (drafts for your approval)

### 4.1 Example expanded SERVICE page — `services/roof-repair-replacement.html` (~560 words)

> **Roof Repair & Replacement in Middle Tennessee & Southern Kentucky**
>
> A roof problem rarely announces itself politely. Maybe it's a dark stain creeping across a bedroom ceiling, a handful of shingles in the yard after a windy night, or a roof that's simply reached the end of its life. Whatever brought you here, Heritage Roofing & Restoration starts the same way every time: we get up on the roof, look closely, and tell you the truth about what it actually needs — a targeted repair or a full replacement — before anyone talks about price.
>
> **Repair or replace? We help you decide honestly.**
> Not every roof needs to be torn off. A localized leak, a few wind-lifted shingles, or flashing that has pulled away from a chimney or vent can often be fixed for a fraction of the cost of replacement — and we'll tell you when that's the smarter move. We recommend a full replacement when damage is widespread, the decking underneath is compromised, granule loss is advanced, or the roof is simply past its serviceable years. Either way, the goal is the same: the most cost-effective fix that genuinely solves the problem, not the most expensive one we can sell.
>
> **Built with the right materials for your home.**
> We install and repair all major residential roofing systems — architectural and 3-tab asphalt shingles, standing-seam and exposed-fastener metal, and low-slope membrane roofing. Every system is installed to manufacturer specification, because cutting corners on installation is the fastest way to void the warranty you paid for.
>
> **What working with us looks like:**
> 1. **Free, no-pressure inspection.** We document the full condition of your roof — not just the obvious spots — with photos.
> 2. **A straight answer and a written quote.** You'll know exactly what we recommend and why, in plain language.
> 3. **The work, done right.** Licensed, insured crews complete the job to spec and leave the site clean.
> 4. **We stand behind it.** Our installs are backed by workmanship you can hold us to.
>
> **Serving homeowners across 49+ communities.**
> From Nashville and Murfreesboro to Franklin, Clarksville, and Bowling Green, KY, we repair and replace roofs across Middle Tennessee and Southern Kentucky. The region's mix of aging housing stock and hard-hitting spring storm seasons leaves a lot of roofs overdue for honest attention — and when storm damage can't wait, we're available **24/7**.
>
> **Roof repair & replacement FAQs**
> - **How long does a roof replacement take?** Most residential replacements are completed in one to three days, weather permitting.
> - **Will you work with my insurance?** Yes. If your damage is storm-related, we document everything your adjuster needs and walk the claim with you — see [Insurance Claim Assistance](/services/insurance-claims.html).
> - **Is the inspection really free?** Always. Every inspection is free and no-pressure.
>
> **Get a free roof inspection** → [Get a Free Quote](/quote.html) · Call (615) 670-3132

_(`Service` schema, `BreadcrumbList`, and an optional `FAQPage` for the FAQ block ship with this page.)_

### 4.2 Example fully-rewritten CITY page — `service-areas/nashville-tn.html` (~620 words)

> _Breadcrumb: Home › Service Areas › Nashville, TN_
>
> **Roof Repair & Storm Restoration in Nashville, Tennessee**
>
> Nashville sits in the Cumberland River basin at the heart of Davidson County, and its homes face a very specific set of challenges. Long, humid summers bake asphalt shingles; spring brings the severe thunderstorms, straight-line winds, and hail that sweep across Middle Tennessee from March into May; and the city's wide range of housing — from century-old homes in East Nashville and Germantown to newer subdivisions in Antioch, Bellevue, and The Nations — means no two roofs wear the same way. Heritage Roofing & Restoration helps Nashville homeowners stay ahead of all of it.
>
> **When Nashville weather turns.**
> Davidson County knows how fast a Middle Tennessee storm can turn an ordinary afternoon into an insurance claim. Wind and hail strip granules, lift and crack shingles, dent metal and gutters, and water finds its way inside fast. When that happens, we're available **24/7** for storm-damage response across Nashville and the Greater Nashville Area, and we document everything your insurer needs — from the first inspection through to payout.
>
> **Our services in Nashville**
> - [Roof Repair & Replacement](/services/roof-repair-replacement.html) — honest repair-or-replace diagnosis and installs built to spec.
> - [Storm & Disaster Restoration](/services/storm-restoration.html) — wind, hail, fire, and water damage handled start to finish.
> - [Gutters & Siding](/services/gutters-siding.html) — exterior systems that actually move water away from your foundation.
> - [Insurance Claim Assistance](/services/insurance-claims.html) — documentation and adjuster support through the whole claim.
> - [More Services](/services/more-services.html) — patios, crawlspace work, and storm-damaged tree removal.
>
> **From the urban core to the suburbs.**
> We serve homeowners across Nashville's neighborhoods — East Nashville, Germantown, Green Hills, Donelson, Hermitage, Madison, Antioch, and Bellevue — and throughout the surrounding metro. If you're just outside the city, we also cover nearby [Brentwood](/service-areas/brentwood-tn.html), [Franklin](/service-areas/franklin-tn.html), [Hendersonville](/service-areas/hendersonville-tn.html), [Mt. Juliet](/service-areas/mt-juliet-tn.html), [Smyrna](/service-areas/smyrna-tn.html), and [Spring Hill](/service-areas/spring-hill-tn.html).
>
> **Why Nashville homeowners call Heritage.**
> We're a locally owned, licensed and insured team that answers the phone and shows up when it matters. You'll get a free, no-pressure inspection, a straight answer about what your roof actually needs, and crews that do the job right the first time. No upselling, no disappearing after the deposit — just honest work backed by people who live and work in Middle Tennessee.
>
> **Nashville roofing FAQs**
> - **Do you serve all of Davidson County?** Yes — Nashville proper and the surrounding communities across the Greater Nashville Area.
> - **How fast can you respond after a storm?** We run 24/7 storm-damage response; call (615) 670-3132 any time.
>
> **Request a free Nashville quote** → [Get a Free Quote](/quote.html) · Call (615) 670-3132

_(Unique meta description, e.g.: "Roof repair, replacement & 24/7 storm restoration in Nashville, TN. Licensed, insured, local crews serving Davidson County & the Greater Nashville Area. Free quotes — (615) 670-3132." Ships with `BreadcrumbList` + single-city `RoofingContractor` schema; the per-city facts — county, river basin, neighborhoods, storm season — are public and verifiable, with no fabricated track record.)_

---

## Implementation approach (after you approve this plan)

1. **Build a shared schema/snippet pattern** (founder + `@id` business node, `Service`, `BreadcrumbList`, disabled Review comment) and apply across templates.
2. **Tier 1 + Tier 2 code/schema/link fixes** in one pass (fast, low-risk, mechanical).
3. **Content rewrites** — service pages, then the 5 priority city pages (for your review of tone/accuracy), then the remaining 38 city pages using a per-city facts table.
4. **Validate:** Google Rich Results Test on a sample of each template; re-crawl sitemap; spot-check redirects; confirm no remaining placeholder text and no fake content anywhere.
5. Commit in logical chunks on `claude/heritage-roofing-seo-audit-da3o13`; keep the draft PR updated.

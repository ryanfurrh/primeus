# CLAUDE.md — primeus

## Primeus

An in-world archive site: a record of the first age, presented as scanned documents, artifact
scans and a world vault. Next.js app router, React, Tailwind.

## Where design truth lives

The design system is a **separate project**, not checked into this repo — it arrives as a
handoff archive. In order of authority:

1. `tokens/*.css` — colors, type, spacing, chassis, semantic roles. **Truth.**
2. `guidelines/*.card.html` — the foundation cards. Each one states a rule and shows it.
3. `components/**` — 24 components, each with a `.d.ts`, a `.prompt.md` and a specimen.
4. `ui_kits/primeus_archive/` — the five site surfaces as a click-through reference (design
   references, not production code — inline-styled, loaded through in-browser Babel).
5. `handoff/` — the patch set for this repo: `README.md` (tokens, fonts, class renames),
   `tailwind.config.js`, `fonts.ts.txt`, `primeus-archive-site.md` (the full site spec, exact
   values and interactions per surface).

Where the repo and the tokens disagree, the tokens are right and the repo is behind — **except**
where a standing decision below says otherwise. Check "Standing decisions" before applying a
design-system rule that looks like it contradicts working repo code.

## Type stack

Three voices, locked. Do not add a fourth.

- **Redaction** — display and prose. Cut 20 is the finest in use, so even a heading carries
  dot structure. Body prose climbs to cut 35 and no further.
- **Instrument Sans** — nameplates. Uppercase, stamped on hardware. Tailwind class:
  `font-instrument`.
- **Overpass Mono** — everything else. Tailwind class: `font-mono`.

Note the inversion: the design system's own CSS tokens name these the other way round
(`--font-nameplate` = Instrument Sans, `--font-instrument` = Overpass Mono). This repo's
Tailwind classes follow `tailwind.config.js`'s naming, not the token file's — translate
carefully when reading kit JSX.

Courier Prime appears in exactly one place: inside a document sheet, because a scan is a
photographed object rather than system chrome.

## Rules

- **Fidelity is computed, never set.** `Calibration.compute()` derives it from what the
  source actually contains — word count, links out, citations in, whether it truncates.
  Never hard-code a fidelity value.
- **Degradation is the Redaction cut ladder, never blur.** A thin page renders in a coarser
  cut. `filter: blur()` is not part of this system.
- **Structure never decays.** Indexes, headings, readouts, letterheads, stamps and field
  labels stay sharp at any fidelity. Only authored content degrades.
- **Redaction bars are solid blocks**, not blurs — the text is present in the DOM and
  genuinely unreadable.
- **Nothing invents lore.** Unwritten copy is marked `[ like this ]`. If a source page is
  empty or stops mid-clause, say so on screen.
- **The chassis is square.** `--radius: 0`. The one exception is a panel floating over a
  stage: 4px radius, 6px backdrop blur.
- **Nothing casts a shadow.** There is no elevation system; strip any `shadow-*` you find.
- **Instruments switch, they do not settle.** `transition: 140ms linear` — no easing
  utilities, no longer durations. **Except the side nav — see Standing decisions.**
- **Empty is a state with copy**, not a gap to fill.
- **Dim alphas** are `calc(<a> * var(--dim-multiplier))` — one multiplier at the token
  (1 dark, 1.7 light), never tuned per element. This repo doesn't import that CSS custom
  property; where it matters, use explicit light/dark Tailwind values instead (see how
  `components/GridBackdrop.tsx` and `ArtifactData.tsx` handle `--energized-rgb` /
  `--wash-rgb` the same way).
- **Accents stay faded.** Nothing in the accent family passes C 0.085. Neptune is the only
  accent that survives the mode switch; `--flux` and `--alert` mean a state, so they never
  tint or shade.
- **Mode is token-level** in the design system (`data-mode="light"`). This repo instead uses
  `next-themes` with `attribute="class"` (`.dark`/`.light` on `<html>`) — components use
  Tailwind's `dark:` variant, not a `data-mode` selector.

## Standing decisions

Repo-specific calls that override the generic rules above. A future pass should not
"correct" these back toward the spec without checking with Ryan first.

- **Side nav keeps its own motion.** `components/layout/Sidebar.tsx`, `SidebarItem.tsx`,
  `components/theme-toggle.tsx` and `components/ui/switch.tsx` keep their original
  `duration-500`/`duration-300 ease-in-out` timing — explicitly exempted from the
  140ms-linear rule above. Ryan: keep the side nav animations. Do not strip these to match
  the spec's motion invariant.
- **Flux is cut.** `app/flux/page.tsx` does not exist and should not be built. Flux is not a
  rail destination, and the home stage no longer routes to it (both the design system and
  the older handoff describe a live Flux page and a stage-click-to-flux route — that's
  upstream/kit content, not this repo's target). `app/archived/flux/` and
  `app/components/flux/CubeThree.tsx` were removed as dead code.
- **Dynamic routes are in scope and must keep working**, even though the design system spec
  doesn't mention them: `app/documentation/[...slug]/page.tsx`, `app/artifacts/[model]/page.tsx`,
  `app/world/[...slug]/page.tsx`, `app/world/tags/[tag]/page.tsx`. The spec's simpler
  single-screen model doesn't get to delete real, working routes. (`documentation/[slug]`
  became a catch-all when disclosures moved into per-source subfolders under
  `vault/disclosures/` and their slugs became nested — same reasoning World's catch-all
  already used, not a departure from "must keep working".) It's a standalone deep link now,
  not part of the three-move flow's own navigation — nothing in `DocumentationClient.tsx`
  routes through it.
- **The kit governs appearance, the repo governs behavior.** Where a component already has
  real data wiring (e.g. `TensionMonitor.tsx`'s live wireframe canvas, vs. the kit's static
  "no reading on this channel" placeholder), keep the real wiring and apply the kit's visual
  treatment around it — don't regress working functionality to match a simpler design
  reference.
- **Artifacts is a full-page 3D view window**, not the spec's 460x460 centred mount — Ryan's
  call. The real in-scene grid (`ViewPortal.tsx`) carries the ground, recoloured to
  `--energized` (`#1BE4B4`); there's no 2D CSS `GridBackdrop` on this page, since a
  transparent full-bleed canvas would just layer on top of one and clutter the view.
- **Document sheets don't use the kit's memo template fields** (TOP SECRET stamp, TO/FROM/
  SUBJECT, page count). The disclosure records are real authored notes, not intercepted
  classified correspondence — fabricating a classification banner or a sender/recipient that
  doesn't exist would break "nothing invents lore". The sheet keeps the kit's chassis (paper,
  ink, Courier Prime, dashed top rule) with a masthead built from real metadata (title,
  source, entry, date, fileNo) instead.

## Known gaps

- No further gaps tracked for Shell, Home, Artifacts, World or Documentation as of the
  disclosure-index rebuild — all five surfaces are live. Remaining open threads, if picked
  back up:
  - World's visual design is still the original plain list/prose (`app/world/*`) — connected
    to real content (`vault/world/`), but not yet built out to the spec's WorldScreen
    treatment (frame index, cross-reference, calibration). Ryan asked specifically for the
    vault to be connected, not a redesign; the Calibration mechanic built for Documentation
    (`lib/calibration.ts`, `components/data/CalibratedText.tsx`) is ready to reuse here if
    that redesign happens.
  - `vault/world` and `vault/disclosures` are read from the filesystem at request/build
    time — no extra plumbing needed for "push an update, see it live" beyond a normal
    deploy picking up the new files.

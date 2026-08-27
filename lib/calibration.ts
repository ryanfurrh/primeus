// lib/calibration.ts
/* Ported from the design system's components/data/CalibratedText.jsx.
   Fidelity is computed, never set — never hand-author a fidelity value. */

export interface CalibrationInput {
  words?: number
  linksOut?: string[]
  citedBy?: string[]
  truncated?: boolean
  folder?: string
}

export interface CalibrationCaps {
  words: number
  out: number
  back: number
}

export interface LadderStep {
  min: number
  cut: number
  ligature?: boolean
}

// The ladder. Higher cut number = coarser dot. 100 is the floor, 20 the
// ceiling; body prose stops resolving at 35 and never gets cleaner.
export const LADDER: LadderStep[] = [
  { min: 0.8, cut: 20 },
  { min: 0.6, cut: 35 },
  { min: 0.45, cut: 50 },
  { min: 0.3, cut: 70 },
  { min: 0.2, cut: 100 },
  { min: 0, cut: 100, ligature: true },
]

const LIGATURES = ["æ", "œ", "ß", "ﬁ", "ﬂ", "ﬀ"]

// Four terms, in the order the archive trusts them: how much prose exists,
// how much of it resolves outward, how often the rest of the vault reaches
// back, and whether the page is filed and finished.
export const FIDELITY_WEIGHTS = {
  words: 0.55,
  out: 0.25,
  back: 0.2,
  cap: { words: 200, out: 5, back: 5 } as CalibrationCaps,
}

// Take the 75th percentile, not the maximum, so one long page cannot define
// "full" for the whole corpus; draw only from filed pages, because a scratch
// page is not a specimen.
export function fidelityCaps(pages: { folder?: string; words?: number; linksOut?: string[]; citedBy?: string[] }[] = []): CalibrationCaps {
  const filed = pages.filter((p) => p.folder !== "UNFILED")
  const sample = filed.length >= 4 ? filed : pages
  const p75 = (f: (p: (typeof pages)[number]) => number) => {
    const v = sample.map(f).sort((a, b) => a - b)
    if (!v.length) return 1
    return Math.max(1, v[Math.ceil(0.75 * (v.length - 1))])
  }
  return {
    words: p75((p) => p.words || 0),
    out: p75((p) => (p.linksOut || []).length),
    back: p75((p) => (p.citedBy || []).length),
  }
}

export function computeFidelity(
  { words = 0, linksOut = [], citedBy = [], truncated = false, folder }: CalibrationInput,
  caps?: CalibrationCaps
): number {
  const c = caps || FIDELITY_WEIGHTS.cap
  const w = Math.min(1, words / c.words)
  const o = Math.min(1, linksOut.length / c.out)
  const b = Math.min(1, citedBy.length / c.back)
  let f = FIDELITY_WEIGHTS.words * w + FIDELITY_WEIGHTS.out * o + FIDELITY_WEIGHTS.back * b
  // Metadata penalties: an unfiled page and a sentence that stops mid-clause
  // are both readings the archive takes at face value.
  if (truncated) f *= 0.9
  if (folder === "UNFILED") f *= 0.85
  return Math.max(0, Math.min(1, f))
}

export function calibrationStep(fidelity: number): LadderStep {
  return LADDER.find((s) => fidelity >= s.min) || LADDER[LADDER.length - 1]
}

export const Calibration = {
  compute: computeFidelity,
  caps: fidelityCaps,
  step: calibrationStep,
  LADDER,
  WEIGHTS: FIDELITY_WEIGHTS,
}

export const CALIBRATION_LIGATURES = LIGATURES

// A dangling clause, not merely a line without a full stop. Checked on every
// paragraph, because a page can break in the middle and keep going.
const DANGLING = /\b(of|the|a|an|and|or|with|to|for|in|on|at|by|from|as|into|than|that|but|is|are|was|were|be|been|both)$/i

export function isDangling(text: string): boolean {
  return DANGLING.test(text.trim().replace(/[.,;:]$/, ""))
}

// Word count the same way the kit's own parser does: strip markdown noise,
// split on whitespace.
export function countWords(text: string): number {
  return text
    .replace(/[#*_>|`[\]]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

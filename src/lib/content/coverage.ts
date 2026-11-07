/**
 * Coverage in square metres for one retail unit (kit / pail / bag).
 * Used by the on-page material estimator.
 */
export const coverageBySlug: Record<string, { floor: number; wall: number }> = {
  "microcement-classic": { floor: 9, wall: 13 },
  "microcement-exterior": { floor: 7, wall: 8 },
  "microcement-wet": { floor: 6, wall: 7 },
  "micro-topping": { floor: 5, wall: 5 },
  "venetian-plaster": { floor: 0, wall: 12 },
  "mineral-facade-coating": { floor: 0, wall: 14 },
  "sealer-system": { floor: 26, wall: 26 },
};

export function coverageFor(slug: string) {
  return coverageBySlug[slug] ?? { floor: 8, wall: 10 };
}

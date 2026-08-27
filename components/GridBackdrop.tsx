// components/GridBackdrop.tsx
interface GridBackdropProps {
  variant: "isometric" | "graph"
  /* Span the whole viewport instead of the positioned ancestor — the ground
     then runs edge to edge, under the rail and past the page gutter, rather
     than being boxed into the centred column. */
  fullBleed?: boolean
  className?: string
}

const GROUNDS: Record<GridBackdropProps["variant"], { angles: number[]; minor: number; major: number }> = {
  isometric: { angles: [30, 150], minor: 40, major: 200 },
  graph: { angles: [0, 90], minor: 14, major: 70 },
}

const layer = (deg: number, step: number, alpha: number, rgb: string) =>
  `repeating-linear-gradient(${deg}deg, rgba(${rgb}, ${alpha}) 0 1px, transparent 1px ${step}px)`

const image = (g: (typeof GROUNDS)["isometric"], rgb: string) =>
  [...g.angles.map((d) => layer(d, g.minor, 0.05, rgb)), ...g.angles.map((d) => layer(d, g.major, 0.09, rgb))].join(
    ", "
  )

/* The two shared page grounds — isometric lattice or graph grid, drawn as
   stacked repeating-linear-gradients in --energized-rgb. The design system's
   own Shell.jsx draws this inline rather than calling its bundled
   GridBackdrop (a kit-local Babel-load-order workaround); this is the "repo
   equivalent" the handoff spec says production should use instead. Needs a
   `position: relative` ancestor — it positions itself `inset-0`. */
export function GridBackdrop({ variant, fullBleed = false, className }: GridBackdropProps) {
  const g = GROUNDS[variant]
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        position: fullBleed ? "fixed" : "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <span className="absolute inset-0 dark:hidden" style={{ backgroundImage: image(g, "67,134,123") }} />
      <span className="absolute inset-0 hidden dark:block" style={{ backgroundImage: image(g, "27,228,180") }} />
    </span>
  )
}

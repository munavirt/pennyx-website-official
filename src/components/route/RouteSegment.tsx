import { RouteLine } from "./RouteLine";

/**
 * The page rail: a vertical route segment 28px from the viewport's left edge. Each section
 * renders its own segment from its top edge to its bottom edge at the same x, so the line
 * is continuous without one huge SVG. Hidden below 1024px, where sections keep local lines.
 */
export function RouteSegment({ className = "" }: { className?: string }) {
  return (
    <RouteLine
      orientation="v"
      triggerSelector="section"
      className={`absolute inset-y-0 left-[23px] z-[5] hidden w-[10px] lg:block ${className}`}
    />
  );
}

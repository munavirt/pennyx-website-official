import { type ReactNode } from "react";
import { RouteSegment } from "./RouteSegment";
import { RouteNode } from "./RouteNode";

const PAD = {
  // 160 / 112 / 96px at desktop; 96 / 72 / 64px on mobile
  quiet: "py-24 lg:py-40",
  product: "py-[4.5rem] lg:py-28",
  dense: "py-16 lg:py-24",
} as const;

const NODE_TOP = {
  quiet: "lg:top-[calc(10rem+1.1rem)]",
  product: "lg:top-[calc(7rem+1.1rem)]",
  dense: "lg:top-[calc(6rem+1.1rem)]",
} as const;

type Props = {
  id?: string;
  tone?: "page" | "surface";
  pad?: keyof typeof PAD;
  node?: boolean;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/**
 * Shared section frame: varied vertical rhythm, band-edge gradients instead of flat colour
 * changes, the page rail + node, and a container that leaves room for the rail (64px).
 */
export function SectionShell({
  id,
  tone = "page",
  pad = "product",
  node = true,
  children,
  className = "",
  innerClassName = "",
}: Props) {
  const surface = tone === "surface";
  return (
    <section
      id={id}
      className={`relative ${surface ? "bg-surface" : ""} ${PAD[pad]} ${className}`}
    >
      {surface && (
        <>
          <div aria-hidden="true" className="band-fade-top pointer-events-none absolute inset-x-0 top-0 h-20" />
          <div aria-hidden="true" className="band-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-20" />
        </>
      )}
      <RouteSegment />
      {node && (
        <RouteNode
          className={`absolute left-[23px] z-[6] hidden lg:block ${NODE_TOP[pad]}`}
        />
      )}
      <div className={`relative mx-auto max-w-7xl px-5 sm:px-8 lg:pl-16 lg:pr-8 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

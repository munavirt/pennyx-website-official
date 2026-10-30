import { type ElementType, type ReactNode } from "react";

/**
 * Heading whose lines/words can be revealed by GSAP (see M5). Renders plain text and
 * stays fully visible when no animation is attached (reduced motion, no JS).
 * Pass lines as children via `lines`; each line is masked so it can slide up.
 */
export function RevealHeading({
  as: Tag = "h2",
  lines,
  className = "",
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
}) {
  return (
    <Tag className={`text-balance ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-mask">
          <span className="pp-reveal-line block">{line}</span>
        </span>
      ))}
    </Tag>
  );
}

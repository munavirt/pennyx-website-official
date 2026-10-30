/**
 * Central configuration for the PennyX marketing site.
 *
 * Set VITE_PENNYX_APP_URL (or VITE_PENNYPAY_APP_URL) in the environment to the URL of the existing
 * PennyX transaction application. All primary CTAs point there.
 * When unset, CTAs fall back to "#platform" so the page never dead-links.
 */
export const APP_URL: string =
  (import.meta.env.VITE_PENNYX_APP_URL as string | undefined) ||
  (import.meta.env.VITE_PENNYPAY_APP_URL as string | undefined) ||
  "#platform";

export const APP_URL_CONFIGURED = Boolean(
  import.meta.env.VITE_PENNYX_APP_URL || import.meta.env.VITE_PENNYPAY_APP_URL,
);

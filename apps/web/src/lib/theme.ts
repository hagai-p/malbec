/**
 * Design direction. Three are under review (see docs/themes); "estate" is the default.
 * Set NEXT_PUBLIC_THEME to preview another. Remove this switch once one is chosen.
 */
export type Theme = "estate" | "gallery" | "night";
const value = process.env.NEXT_PUBLIC_THEME;
export const theme: Theme = value === "gallery" || value === "night" ? value : "estate";

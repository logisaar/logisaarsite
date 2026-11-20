import manifest from "./image-manifest.json";

export interface ResponsiveSrc {
  /** path without size suffix or extension, e.g. /images/mockups/school-erp */
  base: string;
  /** intrinsic size of the 800w variant (for width/height attributes) */
  width: number;
  height: number;
}

type Group = "mockups" | "services" | "projects";

/** Look up a generated responsive image, e.g. img("mockups", "school-erp"). */
export const getImage = (group: Group, name: string): ResponsiveSrc => {
  const entry = (manifest as unknown as Record<string, ResponsiveSrc>)[`${group}/${name}`];
  if (!entry) throw new Error(`Missing image in manifest: ${group}/${name}`);
  return entry;
};

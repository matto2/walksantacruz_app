import { defineCollection, z } from "astro:content";

// Predefined architectural styles with custom colors
// New styles will automatically get generated colors
const predefinedStyles: Record<string, { bg: string; text: string }> = {
  "Victorian": { bg: "rgba(236, 72, 153, 0.1)", text: "rgb(157, 23, 77)" }, // Pink
  "Spanish Colonial Revival": { bg: "rgba(239, 68, 68, 0.1)", text: "rgb(153, 27, 27)" }, // Red
  "Craftsman Bungalow": { bg: "rgba(249, 115, 22, 0.1)", text: "rgb(154, 52, 18)" }, // Orange
  "Coastal / Beach Bungalow": { bg: "rgba(14, 165, 233, 0.1)", text: "rgb(7, 89, 133)" }, // Sky Blue
  "Western Ranch": { bg: "rgba(168, 85, 247, 0.1)", text: "rgb(91, 33, 182)" }, // Purple
  "Mid-Century Modern": { bg: "rgba(99, 102, 241, 0.1)", text: "rgb(55, 48, 163)" }, // Indigo
  "Adobe": { bg: "rgba(217, 119, 6, 0.1)", text: "rgb(146, 64, 14)" }, // Amber/Brown
  "Art Deco / Moderne": { bg: "rgba(244, 63, 94, 0.1)", text: "rgb(136, 19, 55)" }, // Rose
  "Mission Revival": { bg: "rgba(245, 158, 11, 0.1)", text: "rgb(161, 98, 7)" }, // Yellow/Gold
  "Contemporary / Sustainable": { bg: "rgba(34, 197, 94, 0.1)", text: "rgb(21, 128, 61)" }, // Green
  "Italianate": { bg: "rgba(6, 182, 212, 0.1)", text: "rgb(14, 116, 144)" }, // Cyan
  "Shingle Style": { bg: "rgba(139, 92, 246, 0.1)", text: "rgb(76, 29, 149)" }, // Violet
  "N/A": { bg: "rgba(156, 163, 175, 0.15)", text: "rgb(75, 85, 99)" } // Gray
};

// Color palette for auto-generating new style colors
const colorPalette = [
  { bg: "rgba(59, 130, 246, 0.1)", text: "rgb(29, 78, 216)" }, // Blue
  { bg: "rgba(16, 185, 129, 0.1)", text: "rgb(5, 150, 105)" }, // Emerald
  { bg: "rgba(251, 146, 60, 0.1)", text: "rgb(194, 65, 12)" }, // Orange
  { bg: "rgba(167, 139, 250, 0.1)", text: "rgb(109, 40, 217)" }, // Purple
  { bg: "rgba(236, 72, 153, 0.1)", text: "rgb(190, 24, 93)" }, // Pink
  { bg: "rgba(234, 179, 8, 0.1)", text: "rgb(161, 98, 7)" }, // Yellow
  { bg: "rgba(20, 184, 166, 0.1)", text: "rgb(15, 118, 110)" }, // Teal
  { bg: "rgba(248, 113, 113, 0.1)", text: "rgb(185, 28, 28)" }, // Red
];

// Function to get or generate color for a style
export function getStyleColor(style: string | undefined): { bg: string; text: string } {
  if (!style) return predefinedStyles["N/A"];

  // Return predefined color if it exists
  if (predefinedStyles[style]) {
    return predefinedStyles[style];
  }

  // Generate a color based on the style name (consistent hashing)
  const hash = style.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = hash % colorPalette.length;
  return colorPalette[colorIndex];
}

// Export for backward compatibility
export const architecturalStyles = predefinedStyles;

const timelineCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(), // Format: YYYY-MM-DD or YYYY
    location: z.string(),
    address: z.string().optional(),
    latitude: z.number(),
    longitude: z.number(),
    description: z.string(),
    architectural_style: z.string().optional(), // Accept any string
    sources: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().optional(),
        })
      )
      .optional(),
    tags: z.array(z.string()).optional(),
    // Additional fields
    year_built: z.union([z.number(), z.string()]).optional(), // Allow both number and string (e.g., "c. 1905-1920")
    altered: z.boolean().optional(),
    historic_status: z.string().optional(),
  }),
});

export const collections = {
  timeline: timelineCollection,
};

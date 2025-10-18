import { defineCollection, z } from "astro:content";

// Re-export from shared utility
export { getStyleColor, architecturalStyles, getAllStyles } from "../utils/styleColors";

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

import { defineCollection, z } from "astro:content";

// Re-export from shared utility
export { getStyleColor, architecturalStyles, getAllStyles } from "../utils/styleColors";

const timelineSchema = z.object({
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
  image: z.string().optional(), // Path to image file in public/images/
  image_credit: z.string().optional(), // Attribution for the image
});

const peopleSchema = z.object({
  name: z.string(),
  birth_date: z.string(), // Format: YYYY-MM-DD or YYYY
  death_date: z.string().optional(),
  birth_place: z.string().optional(),
  death_place: z.string().optional(),
  description: z.string(), // Short biography summary
  occupations: z.array(z.string()).optional(),
  significance: z.string(), // What they're known for
  sources: z
    .array(
      z.object({
        title: z.string(),
        url: z.string().optional(),
      })
    )
    .optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(), // Portrait or photo
  image_credit: z.string().optional(), // Attribution for the image
});

// Define collections for each language
const timelineCollection = defineCollection({
  type: "content",
  schema: timelineSchema,
});

const peopleCollection = defineCollection({
  type: "content",
  schema: peopleSchema,
});

export const collections = {
  timeline: timelineCollection,
  people: peopleCollection,
};

# Santa Cruz Historical Timeline App

A comprehensive timeline and map-based guide for documenting Santa Cruz history, architecture, and walking tour locations.

## Getting Started

### Run the development server:

```bash
npm run dev
```

### Build for production:

```bash
npm run build
```

## Adding New Timeline Entries

To add a new historical location or event:

1. Create a new Markdown file in `src/content/timeline/`
2. Name it with the year and a short description, e.g., `1920-craftsman-house.md`
3. Use the following template:

```markdown
---
title: "Your Entry Title"
date: "YYYY-MM-DD" # or just "YYYY" for year-only dates
location: "General area name"
address: "Full street address (optional)"
latitude: 36.9741 # Get from Google Maps
longitude: -122.0308 # Get from Google Maps
description: "Brief description of the location or event"
architecturalStyle: "Victorian / Mission Revival / etc. (optional)"
sources:
  - title: "Source name"
    url: "https://example.com (optional)"
  - title: "Another source"
tags: ["tag1", "tag2"] # Optional for future filtering
---

## Additional Details

Add any additional notes, historical context, or architectural details here.
This content can be expanded as you research more.
```

### Getting Coordinates

1. Go to Google Maps
2. Right-click on the location
3. Click the coordinates to copy them
4. The format is: `latitude, longitude`

## Project Structure

```
src/
├── components/
│   ├── TimelineView.astro  # Chronological table view
│   └── MapView.astro        # Interactive map with markers
├── content/
│   ├── config.ts           # Content collection schema
│   └── timeline/           # All timeline entries (Markdown files)
├── layouts/
│   └── Layout.astro        # Main layout
├── pages/
│   └── index.astro         # Main page with tab navigation
└── styles/
    └── global.css          # Tailwind CSS imports
```

## Features

- **Timeline View**: Chronological table sorted by date with expandable details
- **Map View**: Interactive map showing all locations with popup information
- **Easy Content Management**: Add entries by creating simple Markdown files
- **Automatic Sorting**: New entries are automatically placed in chronological order
- **Mobile Responsive**: Works great on phones for tour participants

## Future Enhancements (Phase 2)

- Filtering by tags (architectural styles, event types, areas)
- Search functionality
- Multi-language support
- Tour route planning
- Print-friendly view
- PDF export

## Tips

- Keep descriptions concise in the frontmatter (YAML section)
- Add detailed notes in the Markdown body
- Always include sources for future reference
- Use consistent tag naming for better filtering later
- Test coordinates on the map to ensure accuracy

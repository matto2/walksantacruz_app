# Contributing to Walk Santa Cruz Historical Timeline

Thank you for your interest in contributing to the Walk Santa Cruz Historical Timeline! This project documents the rich architectural and cultural history of Santa Cruz, California.

## How to Contribute

### Adding New Timeline Entries

The easiest way to contribute is by adding new historical locations and events:

1. **Fork the repository** and create a new branch for your contribution

2. **Create a new Markdown file** in `src/content/timeline/`
   - Use the naming convention: `YYYY-descriptive-title.md`
   - Example: `1920-craftsman-house-walnut-ave.md`

3. **Use the template** from `src/content/timeline/_TEMPLATE.md`:

```markdown
---
title: "Your Entry Title"
date: "YYYY-MM-DD" # or just "YYYY" for year-only dates
location: "General area name"
address: "Full street address (optional)"
latitude: 36.9741 # Get from Google Maps
longitude: -122.0308 # Get from Google Maps
description: "Brief description of the location or event"
architectural_style: "Victorian / Mission Revival / etc. (optional)"
sources:
  - title: "Source name"
    url: "https://example.com (optional)"
  - title: "Another source"
tags: ["tag1", "tag2"] # Optional for future filtering
---

## Additional Details

Add any additional notes, historical context, or architectural details here.
```

4. **Get accurate coordinates**:
   - Go to [Google Maps](https://maps.google.com)
   - Right-click on the location
   - Click the coordinates to copy them
   - Format: `latitude, longitude`

5. **Validate your entry**:
   ```bash
   npm run test
   ```
   This will validate your entry against our content schema.

6. **Submit a pull request** with:
   - A clear title describing the entry
   - Any relevant historical context
   - Sources for your information

### Code Contributions

If you're contributing code improvements:

1. **Set up your development environment**:
   ```bash
   npm install
   npm run dev
   ```

2. **Follow our coding standards**:
   - Use TypeScript for type safety
   - Follow the existing code style
   - Write tests for new utilities
   - Ensure all tests pass: `npm run test:run`

3. **Test your changes**:
   ```bash
   npm run build
   npm run preview
   ```

4. **Create a pull request** with:
   - Description of the changes
   - Why the changes are needed
   - Screenshots (if UI changes)

### Improving Documentation

Documentation improvements are always welcome:

- Fix typos or unclear instructions
- Add examples
- Improve the README
- Expand this contributing guide

## Content Guidelines

### Historical Accuracy

- **Cite your sources**: Always include source information
- **Verify dates**: Cross-reference multiple sources when possible
- **Be specific**: Include exact addresses when known
- **Neutral tone**: Present facts objectively

### Writing Style

- **Concise descriptions**: Keep frontmatter descriptions to 1-2 sentences
- **Detailed content**: Add rich historical context in the markdown body
- **Active voice**: Make the writing engaging and accessible
- **Proper attribution**: Credit photographers, architects, and researchers

### Architectural Styles

Use consistent terminology for architectural styles. Common styles in Santa Cruz include:

- Victorian (specify: Italianate, Queen Anne, Eastlake, etc.)
- Craftsman Bungalow
- Spanish Colonial Revival
- Mission Revival
- Art Deco / Moderne
- Mid-Century Modern
- Contemporary / Sustainable

If unsure, use general terms or mark as "N/A" with a note in the content.

## Code Style

### TypeScript

- Enable strict mode (already configured)
- Avoid `any` types
- Prefer interfaces for object shapes
- Use const for immutable values

### Astro Components

- Keep components focused and single-purpose
- Use props for configuration
- Extract reusable logic to utilities
- Document complex components

### CSS/Tailwind

- Use Tailwind utility classes when possible
- Extract repeated patterns to components
- Maintain the branded color scheme: `rgb(226, 111, 4)`
- Ensure mobile responsiveness

## Testing

All code contributions should include tests:

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage

# Open UI
npm run test:ui
```

## File Naming Conventions

### Timeline Entries
- Format: `YYYY-descriptive-slug.md`
- Examples:
  - `1877-mccormick-house.md`
  - `1976-town-clock-santa-cruz.md`
- Use lowercase with hyphens
- Start with 4-digit year

### Components
- PascalCase: `TimelineView.astro`
- Descriptive names
- Single responsibility

### Utilities
- camelCase: `contentValidator.ts`
- Group related functions
- Export clearly

## Getting Help

If you have questions:

1. Check the [README](README.md)
2. Look at existing entries as examples
3. Open an issue for clarification
4. Reach out to maintainers

## Code of Conduct

- Be respectful and inclusive
- Assume good intentions
- Provide constructive feedback
- Focus on the content and code, not the person
- Welcome newcomers

## Recognition

All contributors will be recognized in our commit history and we appreciate every contribution, no matter how small!

Thank you for helping preserve and share Santa Cruz's history! 🏛️

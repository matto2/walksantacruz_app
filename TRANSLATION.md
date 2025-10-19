# Multi-Language Translation Guide

This document explains how to use the AI-assisted translation system for Walk Santa Cruz.

## Overview

The application supports 4 languages:
- **English (en)** - Source of truth
- **Spanish (es)** - Español
- **Simplified Chinese (zh-CN)** - 中文
- **Japanese (ja)** - 日本語

## Content Structure

Markdown files are organized in language-specific folders:

```
src/content/timeline/
├── en/          # English (source)
├── es/          # Spanish translations
├── zh-CN/       # Simplified Chinese translations
└── ja/          # Japanese translations
```

## Translation Workflow

### 1. Setup API Key

Before running translations, set your Anthropic API key:

```bash
export ANTHROPIC_API_KEY=your_api_key_here
```

### 2. Add or Update English Content

All new content should be added to `src/content/timeline/en/` in markdown format with proper frontmatter:

```markdown
---
title: "Building Name"
date: "YYYY-MM-DD"
location: "Location Name"
latitude: 36.9741
longitude: -122.0308
description: "Brief description"
architectural_style: "Style Name"
---

Main content goes here...
```

### 3. Run Translation Script

To translate all English files into other languages:

```bash
npm run translate
```

The script will:
- Read all `.md` files from `src/content/timeline/en/`
- Use Claude API to translate into Spanish, Simplified Chinese, and Japanese
- Preserve frontmatter exactly as-is (only translates content)
- Preserve markdown formatting, links, and URLs
- Skip files that already have translations
- Save translated files to corresponding language folders

### 4. Translation Rules

The AI translator follows these rules:
- ✅ **PRESERVE** frontmatter keys and values exactly
- ✅ **PRESERVE** markdown formatting (headers, lists, links, etc.)
- ✅ **PRESERVE** URLs and file paths
- ✅ **KEEP** proper names (Santa Cruz, Mission Hill, etc.) unless official translation exists
- ✅ **KEEP** dates, numbers, and coordinates
- ✅ **TRANSLATE** content text naturally for target language speakers
- ✅ **TRANSLATE** architectural terms appropriately

### 5. Review Translations

After translation:
1. Review the generated files in `src/content/timeline/[language]/`
2. Verify frontmatter is preserved correctly
3. Check that markdown formatting is intact
4. Ensure proper names and technical terms are handled appropriately
5. Make manual corrections if needed

### 6. Re-translate Specific Files

If you need to re-translate a file:
1. Delete the translated version(s) from the target language folder(s)
2. Run `npm run translate` again
3. The script will regenerate only the missing translations

## Language Selector

Users can switch languages using the dropdown in the top navigation bar:
- Selection is saved to localStorage and cookies
- Page reloads to display content in the selected language
- Falls back to English if a translation doesn't exist

## Static Site Generation

The application generates static pages with English content by default. When a user selects a different language:
1. The preference is saved to localStorage and cookies
2. The page reloads
3. Astro components filter content based on the language preference

## Cost Considerations

- Translation uses Claude 3.5 Sonnet via Anthropic API
- Cost depends on content length and number of files
- The script includes 1-second delays between requests to avoid rate limits
- Existing translations are skipped to avoid redundant API calls

## Updating Existing Translations

When you update English content:
1. Update the file in `src/content/timeline/en/`
2. Delete the corresponding translations in other language folders
3. Run `npm run translate` to regenerate updated translations

## Troubleshooting

### API Key Issues
```
Error: ANTHROPIC_API_KEY environment variable is not set
```
**Solution**: Set the environment variable: `export ANTHROPIC_API_KEY=your_key`

### Translation Failures
If a specific file fails to translate:
1. Check the error message in the console
2. Verify the markdown file is valid
3. Try deleting and re-running for that specific file
4. Check your API quota and rate limits

### Missing Translations
If content doesn't appear in a language:
1. Verify the translation file exists in the correct folder
2. Check the file has the same filename as the English version
3. Verify the frontmatter is valid
4. Check browser console for loading errors

## Best Practices

1. **Always edit English first** - It's the source of truth
2. **Batch translations** - Translate multiple files at once to save time
3. **Review AI output** - Always review translations for accuracy
4. **Preserve structure** - Don't change frontmatter or markdown structure
5. **Document proper names** - Keep a list of names that should stay in English

## Future Enhancements

Potential improvements to consider:
- Incremental translation (only translate changed content)
- Translation memory to ensure consistency
- Multiple AI model options
- Batch translation optimization
- Translation review workflow
- Automated testing for translation quality

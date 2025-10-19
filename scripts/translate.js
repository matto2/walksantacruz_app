#!/usr/bin/env node

/**
 * AI-Assisted Translation Script for Walk Santa Cruz
 *
 * This script uses the Anthropic Claude API to translate English markdown files
 * into Spanish (es), Simplified Chinese (zh-CN), and Japanese (ja).
 *
 * Usage: npm run translate
 *
 * Requirements:
 * - Set ANTHROPIC_API_KEY environment variable
 * - English source files must be in src/content/timeline/en/
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES = {
  es: 'Spanish',
  'zh-CN': 'Simplified Chinese',
  ja: 'Japanese'
};

const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: ANTHROPIC_API_KEY environment variable is not set.');
  console.error('Please set it with: export ANTHROPIC_API_KEY=your_api_key_here');
  process.exit(1);
}

const anthropic = new Anthropic({
  apiKey: API_KEY,
});

/**
 * Extracts frontmatter and body from markdown content
 * Returns { frontmatter: string, body: string }
 */
function separateFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('Could not parse frontmatter from markdown file');
  }

  return {
    frontmatter: match[1], // Content between the --- delimiters
    body: match[2] // Everything after the closing ---
  };
}

/**
 * Combines frontmatter and translated body back into markdown format
 */
function combineFrontmatter(frontmatter, translatedBody) {
  return `---\n${frontmatter}\n---\n${translatedBody}`;
}

const TRANSLATION_PROMPT = (targetLang, bodyContent) => `You are a professional translator specializing in historical and cultural content.

Translate the following markdown content into ${targetLang}.

CRITICAL RULES:
1. ONLY translate the content provided below - this is the body content ONLY (no frontmatter)
2. Preserve ALL markdown formatting (headers ##, lists, bold, italic, links, etc.)
3. Preserve ALL URLs and file paths exactly as they are
4. Keep proper names like "Santa Cruz", "Mission Hill", "Portola", street names, and building names in English unless they have official ${targetLang} names
5. Maintain the same paragraph structure and line breaks
6. Translate naturally and culturally appropriately for ${targetLang} speakers
7. Keep dates and numbers in their original format

Here is the content to translate:

${bodyContent}

Return ONLY the translated markdown content. Do not add any explanations, notes, or frontmatter.`;

async function translateContent(content, targetLang) {
  try {
    // Separate frontmatter from body
    const { frontmatter, body } = separateFrontmatter(content);

    // Translate only the body
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4000,
      temperature: 0.3,
      messages: [{
        role: 'user',
        content: TRANSLATION_PROMPT(LANGUAGES[targetLang], body)
      }]
    });

    const translatedBody = message.content[0].text;

    // Combine original frontmatter with translated body
    const finalContent = combineFrontmatter(frontmatter, translatedBody);

    return finalContent;
  } catch (error) {
    console.error(`Error translating to ${targetLang}:`, error.message);
    throw error;
  }
}

async function getMarkdownFiles(dir) {
  const files = await fs.readdir(dir);
  return files.filter(file => file.endsWith('.md') && !file.startsWith('_'));
}

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function translateFile(sourceFile, sourceLang, targetLang) {
  const sourceDir = path.join(__dirname, '..', 'src', 'content', 'timeline', sourceLang);
  const targetDir = path.join(__dirname, '..', 'src', 'content', 'timeline', targetLang);

  const sourceFilePath = path.join(sourceDir, sourceFile);
  const targetFilePath = path.join(targetDir, sourceFile);

  // Check if translation already exists
  try {
    await fs.access(targetFilePath);
    console.log(`  ⏭️  Skipping ${sourceFile} → ${targetLang} (already exists)`);
    return { skipped: true };
  } catch {
    // File doesn't exist, proceed with translation
  }

  console.log(`  🔄 Translating ${sourceFile} → ${LANGUAGES[targetLang]}...`);

  const content = await fs.readFile(sourceFilePath, 'utf-8');

  try {
    const translatedContent = await translateContent(content, targetLang);

    await ensureDirectoryExists(targetDir);
    await fs.writeFile(targetFilePath, translatedContent, 'utf-8');

    console.log(`  ✅ Completed ${sourceFile} → ${targetLang}`);
    return { success: true };
  } catch (error) {
    console.error(`  ❌ Failed ${sourceFile} → ${targetLang}: ${error.message}`);
    return { error: true };
  }
}

async function main() {
  console.log('🌐 Walk Santa Cruz Translation Script');
  console.log('=====================================\n');

  const sourceDir = path.join(__dirname, '..', 'src', 'content', 'timeline', 'en');

  try {
    await fs.access(sourceDir);
  } catch {
    console.error(`❌ Error: Source directory not found: ${sourceDir}`);
    console.error('Please ensure English markdown files are in src/content/timeline/en/');
    process.exit(1);
  }

  const files = await getMarkdownFiles(sourceDir);

  if (files.length === 0) {
    console.error('❌ No markdown files found in src/content/timeline/en/');
    process.exit(1);
  }

  console.log(`Found ${files.length} English markdown file(s)\n`);

  const stats = {
    total: 0,
    success: 0,
    skipped: 0,
    errors: 0
  };

  for (const targetLang of Object.keys(LANGUAGES)) {
    console.log(`\n📝 Translating to ${LANGUAGES[targetLang]} (${targetLang})`);
    console.log('─'.repeat(50));

    for (const file of files) {
      stats.total++;
      const result = await translateFile(file, 'en', targetLang);

      if (result.success) stats.success++;
      if (result.skipped) stats.skipped++;
      if (result.error) stats.errors++;

      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n\n📊 Translation Summary');
  console.log('═'.repeat(50));
  console.log(`Total translations attempted: ${stats.total}`);
  console.log(`✅ Successful: ${stats.success}`);
  console.log(`⏭️  Skipped (already exist): ${stats.skipped}`);
  console.log(`❌ Errors: ${stats.errors}`);
  console.log('\n✨ Translation complete!\n');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

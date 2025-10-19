#!/usr/bin/env node

/**
 * Fix Frontmatter Script
 *
 * This script replaces all translated frontmatter with English frontmatter
 * while preserving the translated body content.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES = ['es', 'zh-CN', 'ja'];

function separateFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('Could not parse frontmatter from markdown file');
  }

  return {
    frontmatter: match[1],
    body: match[2]
  };
}

function combineFrontmatter(frontmatter, body) {
  return `---\n${frontmatter}\n---\n${body}`;
}

async function getMarkdownFiles(dir) {
  const files = await fs.readdir(dir);
  return files.filter(file => file.endsWith('.md') && !file.startsWith('_'));
}

async function fixFile(filename) {
  const enPath = path.join(__dirname, '..', 'src', 'content', 'timeline', 'en', filename);

  // Read English file to get correct frontmatter
  const enContent = await fs.readFile(enPath, 'utf-8');
  const { frontmatter: enFrontmatter } = separateFrontmatter(enContent);

  let fixed = 0;

  for (const lang of LANGUAGES) {
    const langPath = path.join(__dirname, '..', 'src', 'content', 'timeline', lang, filename);

    try {
      // Check if file exists
      await fs.access(langPath);

      // Read translated file
      const langContent = await fs.readFile(langPath, 'utf-8');
      const { body: translatedBody } = separateFrontmatter(langContent);

      // Combine English frontmatter with translated body
      const fixedContent = combineFrontmatter(enFrontmatter, translatedBody);

      // Write back
      await fs.writeFile(langPath, fixedContent, 'utf-8');
      console.log(`  ✅ Fixed ${lang}/${filename}`);
      fixed++;
    } catch (error) {
      // File doesn't exist in this language, skip
    }
  }

  return fixed;
}

async function main() {
  console.log('🔧 Fixing Frontmatter in All Translations');
  console.log('=========================================\n');

  const sourceDir = path.join(__dirname, '..', 'src', 'content', 'timeline', 'en');
  const files = await getMarkdownFiles(sourceDir);

  console.log(`Found ${files.length} English files\n`);

  let totalFixed = 0;

  for (const file of files) {
    const fixed = await fixFile(file);
    totalFixed += fixed;
  }

  console.log(`\n✨ Complete! Fixed ${totalFixed} files.\n`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

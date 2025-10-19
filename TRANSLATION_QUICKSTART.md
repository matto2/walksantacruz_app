# Translation Quick Start Guide

## Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in (you may need to add payment info)
3. Navigate to "API Keys" in settings
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-...`)

## Step 2: Set Your API Key

### Option A: Use a .env file (Recommended)

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace `sk-ant-your-key-here` with your actual key:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
   ```

3. Load the environment variable:
   ```bash
   source .env
   # OR for more robust loading:
   export $(cat .env | xargs)
   ```

### Option B: Set it temporarily in your terminal

```bash
export ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

This will only last for your current terminal session.

### Option C: Add to your shell profile (Permanent)

Add this line to your `~/.zshrc` or `~/.bash_profile`:

```bash
export ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

Then reload:
```bash
source ~/.zshrc  # or source ~/.bash_profile
```

## Step 3: Run the Translation Script

Once your API key is set, run:

```bash
npm run translate
```

### What will happen:

1. The script reads all files from `src/content/timeline/en/`
2. For each file, it translates to Spanish, Chinese, and Japanese
3. It saves translations to:
   - `src/content/timeline/es/` (Spanish)
   - `src/content/timeline/zh-CN/` (Simplified Chinese)
   - `src/content/timeline/ja/` (Japanese)
4. Files that already exist are skipped (saves API costs)

### Expected output:

```
🌐 Walk Santa Cruz Translation Script
=====================================

Found 18 English markdown file(s)

📝 Translating to Spanish (es)
──────────────────────────────────────────────────
  🔄 Translating 1003-cedar-st-santa-cruz.md → Spanish...
  ✅ Completed 1003-cedar-st-santa-cruz.md → es
  ...

📊 Translation Summary
══════════════════════════════════════════════════
Total translations attempted: 54
✅ Successful: 54
⏭️  Skipped (already exist): 0
❌ Errors: 0

✨ Translation complete!
```

## Step 4: Test the Language Selector

1. Build and run the site:
   ```bash
   npm run build
   npm run dev
   ```

2. Open http://localhost:4323/

3. Click the language dropdown in the top-right (next to the tabs)

4. Select a language - the page will reload with translated content!

## Costs

- Translation uses Claude 3.5 Sonnet
- Current pricing: ~$3 per million input tokens, ~$15 per million output tokens
- Each timeline entry is ~500-1000 tokens
- **Estimated cost for 18 files × 3 languages**: ~$2-5 total
- Re-running the script doesn't re-translate existing files (it skips them)

## Troubleshooting

### "ANTHROPIC_API_KEY environment variable is not set"

Your API key isn't loaded. Run:
```bash
export ANTHROPIC_API_KEY=your-key-here
```

Or create a `.env` file as described above.

### "Rate limit exceeded"

You're making requests too quickly. The script already has 1-second delays. If this happens:
- Wait a few minutes
- Run the script again (it will skip completed translations)

### Translation quality issues

The AI does a good job but isn't perfect:
1. Review the translated files manually
2. Edit any translations that need improvement
3. The translations are just markdown files - edit them like any other file

### Need to re-translate a file

1. Delete the translated file(s):
   ```bash
   rm src/content/timeline/es/filename.md
   rm src/content/timeline/zh-CN/filename.md
   rm src/content/timeline/ja/filename.md
   ```

2. Run `npm run translate` again

## Next Steps

After running translations:

1. **Review the output** - Check a few translated files to ensure quality
2. **Build the site** - Run `npm run build` to verify everything works
3. **Deploy** - Push to GitHub and deploy to your hosting
4. **Test language switching** - Make sure the UI works in production

## Adding New Content

When you add new English content:

1. Create the markdown file in `src/content/timeline/en/`
2. Run `npm run translate`
3. The script will only translate the new file (skips existing ones)
4. Commit and push all changes

That's it! You now have a multi-language website. 🎉

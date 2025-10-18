# Deployment Guide

This guide covers deploying the Walk Santa Cruz Historical Timeline application to production.

## Prerequisites

Before deploying, ensure you have:

- Node.js 18+ installed
- Git repository access
- Account with your chosen hosting platform

## Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Tests

Ensure all tests pass before deploying:

```bash
npm run test:run
```

### 3. Build for Production

```bash
npm run build
```

This creates an optimized static site in the `dist/` directory.

### 4. Preview Locally

Test the production build locally:

```bash
npm run preview
```

Visit `http://localhost:4321` to verify everything works.

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides excellent Astro support with zero configuration.

#### Deploy via CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

#### Deploy via Git Integration

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects Astro and deploys

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Option 2: Netlify

#### Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

#### Deploy via Git Integration

1. Push code to GitHub/GitLab/Bitbucket
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository

**Configuration:**
- Build Command: `npm run build`
- Publish Directory: `dist`
- Functions Directory: (leave empty)

### Option 3: GitHub Pages

1. Install the Astro GitHub Pages adapter:
   ```bash
   npm install -D @astrojs/github-pages
   ```

2. Update `astro.config.mjs`:
   ```javascript
   import { defineConfig } from 'astro/config';
   import tailwindcss from '@tailwindcss/vite';

   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/walksantacruz_app',
     vite: {
       plugins: [tailwindcss()]
     }
   });
   ```

3. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'npm'

         - name: Install dependencies
           run: npm ci

         - name: Run tests
           run: npm run test:run

         - name: Build
           run: npm run build

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

4. Enable GitHub Pages in repository settings
5. Push to `main` branch

### Option 4: Cloudflare Pages

1. Push code to GitHub
2. Visit [pages.cloudflare.com](https://pages.cloudflare.com)
3. Create a new project
4. Connect your repository

**Configuration:**
- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`

### Option 5: AWS S3 + CloudFront

For advanced deployments with custom domains and CDN:

1. Build the project:
   ```bash
   npm run build
   ```

2. Create an S3 bucket:
   ```bash
   aws s3 mb s3://walksantacruz-timeline
   ```

3. Enable static website hosting:
   ```bash
   aws s3 website s3://walksantacruz-timeline \
     --index-document index.html \
     --error-document 404.html
   ```

4. Upload files:
   ```bash
   aws s3 sync dist/ s3://walksantacruz-timeline \
     --delete \
     --cache-control "public, max-age=31536000, immutable"
   ```

5. Set up CloudFront distribution (optional but recommended)

## Environment Variables

This project doesn't require environment variables by default. If you add any:

### Vercel
Add in Project Settings → Environment Variables

### Netlify
Add in Site Settings → Environment Variables

### GitHub Actions
Add as Repository Secrets

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS or use Netlify DNS

### Cloudflare Pages
1. Go to Custom Domains
2. Add your domain
3. DNS automatically configured if using Cloudflare DNS

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All timeline entries display
- [ ] Map loads and markers appear
- [ ] Search functionality works
- [ ] Filters work correctly
- [ ] Mobile responsive
- [ ] Print styles work (Cmd/Ctrl + P)
- [ ] No console errors
- [ ] Images load properly
- [ ] External links work
- [ ] Performance is acceptable (run Lighthouse)

## Performance Optimization

### Enable Compression

Most platforms enable this by default, but verify:

- Gzip or Brotli compression enabled
- Cache headers set correctly
- Assets served from CDN

### Image Optimization

If you add images to timeline entries:

1. Use WebP format when possible
2. Include width/height attributes
3. Consider lazy loading:
   ```html
   <img loading="lazy" src="..." alt="...">
   ```

### Monitor Performance

Use these tools:

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)

Target metrics:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1

## Continuous Deployment

### Automatic Deployments

Most platforms support automatic deployments:

**Vercel/Netlify/Cloudflare:**
- Push to `main` → Automatic deployment
- Pull requests → Preview deployments

**GitHub Pages:**
- Handled by GitHub Actions workflow

### Manual Deployments

If you prefer manual control:

**Vercel:**
```bash
vercel --prod
```

**Netlify:**
```bash
netlify deploy --prod
```

## Rollback

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Netlify
1. Go to Deploys
2. Find previous deployment
3. Click "Publish deploy"

### GitHub Pages
1. Revert the commit that broke things
2. Push to trigger new deployment

## Monitoring

### Set Up Monitoring

Consider adding:

1. **Uptime monitoring**: [UptimeRobot](https://uptimerobot.com/)
2. **Error tracking**: [Sentry](https://sentry.io/)
3. **Analytics**: [Plausible](https://plausible.io/) or [Google Analytics](https://analytics.google.com/)

### Health Checks

Create a simple health check endpoint if needed, or monitor:
- Homepage loads (200 status)
- Timeline entries load
- Map initializes

## Troubleshooting

### Build Fails

**Check:**
- Node version (use 18+)
- All dependencies installed
- No TypeScript errors: `npx tsc --noEmit`
- Tests pass: `npm run test:run`

### Map Doesn't Load

**Check:**
- Leaflet CSS imported in layout
- Coordinates are valid
- No JavaScript errors in console

### Styles Missing

**Check:**
- Tailwind CSS configured correctly
- Build completed successfully
- CSS files in `dist/` directory

### 404 Errors

**Check:**
- Base path configured correctly
- All routes work in preview
- Redirects configured if needed

## Security

### Content Security Policy

Consider adding CSP headers (platform-specific):

**Vercel (`vercel.json`):**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
        }
      ]
    }
  ]
}
```

### HTTPS

All modern platforms enforce HTTPS by default. Verify:
- Certificate is valid
- HTTP redirects to HTTPS
- Mixed content warnings resolved

## Support

If you encounter deployment issues:

1. Check platform-specific documentation
2. Review build logs
3. Test locally with `npm run preview`
4. Open an issue in the repository

## Cost Estimates

### Free Tiers (sufficient for most use cases)

- **Vercel**: Free (Hobby plan)
- **Netlify**: Free (100GB bandwidth/month)
- **Cloudflare Pages**: Free (unlimited bandwidth)
- **GitHub Pages**: Free (1GB storage, 100GB bandwidth/month)

### Paid Options

Only needed for high traffic or advanced features:

- **Vercel Pro**: $20/month
- **Netlify Pro**: $19/month
- **Cloudflare Pages**: Pay as you go
- **AWS**: ~$1-5/month for S3 + CloudFront

## Next Steps

After deployment:

1. Share the URL with your community
2. Monitor usage and performance
3. Continue adding historical entries
4. Gather feedback from users
5. Iterate and improve

Happy deploying! 🚀

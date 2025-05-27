# Cloudflare Pages Deployment Guide

This guide explains how to deploy the JavaScript Design Patterns tutorial to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account
2. Wrangler CLI installed globally: `npm install -g wrangler`
3. Node.js 18+ installed

## Deployment Methods

### Method 1: Direct GitHub Integration (Recommended)

1. Push your code to GitHub
2. Log in to your Cloudflare dashboard
3. Go to Pages > Create a project > Connect to Git
4. Select your GitHub repository
5. Configure build settings:
   - Framework preset: `Next.js`
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Build output directory: `.vercel/output/static`
   - Environment variables (if any)

### Method 2: Manual Deployment via Wrangler CLI

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the Next.js application:
   ```bash
   npm run build
   ```

3. Build for Cloudflare Pages:
   ```bash
   npm run pages:build
   ```

4. Deploy to Cloudflare Pages:
   ```bash
   npm run pages:deploy
   ```

   Or run all steps at once:
   ```bash
   npm run deploy
   ```

### Method 3: Using Cloudflare Dashboard

1. Build locally:
   ```bash
   npm run build && npm run pages:build
   ```

2. Upload the `.vercel/output/static` directory via the Cloudflare Pages dashboard

## Configuration

The `wrangler.toml` file contains the configuration for Cloudflare Pages:

- **name**: Your project name
- **compatibility_date**: Ensures consistent behavior
- **compatibility_flags**: Enables Node.js compatibility for Next.js

## Environment Variables

If your application uses environment variables, add them in:
- Cloudflare Dashboard: Pages > Your Project > Settings > Environment variables
- Or in `wrangler.toml` under `[vars]` section

## Custom Domain

1. Go to your Pages project in Cloudflare dashboard
2. Navigate to Custom domains
3. Add your domain
4. Update DNS records as instructed

## Troubleshooting

### Build Failures

If the build fails:
1. Ensure you're using Node.js 18+
2. Check that all dependencies are installed
3. Verify the build works locally first

### Runtime Errors

For runtime issues:
1. Check the Functions logs in Cloudflare dashboard
2. Ensure all API routes are compatible with edge runtime
3. Verify environment variables are set correctly

### Large Bundle Size

If you exceed size limits:
1. Optimize images and assets
2. Use dynamic imports for large components
3. Check for unnecessary dependencies

## Useful Commands

```bash
# Login to Cloudflare
wrangler login

# Check deployment status
wrangler pages deployment list

# View logs
wrangler pages deployment tail

# Delete deployment
wrangler pages deployment delete [deployment-id]
```

## Support

For issues specific to Next.js on Cloudflare Pages, refer to:
- [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
- [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)

## Notes

- Cloudflare Pages has a 25MB limit for the entire deployment
- Some Next.js features may require adaptation for edge runtime
- Static assets are automatically cached globally 
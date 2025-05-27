# Cloudflare Workers Deployment Guide

This guide explains how to deploy the JavaScript Design Patterns tutorial to Cloudflare Workers.

## Important Note

Deploying Next.js applications to Cloudflare Workers is more complex than using Cloudflare Pages because Workers have different runtime constraints. For Next.js applications, **Cloudflare Pages is the recommended approach** as it has built-in Next.js support.

However, if you specifically need Workers functionality (like KV storage, Durable Objects, or custom routing), this guide will help you.

## Prerequisites

1. A Cloudflare account with Workers enabled
2. Wrangler CLI installed: `npm install -g wrangler`
3. Node.js 18+ installed

## Key Differences: Workers vs Pages

| Feature | Cloudflare Workers | Cloudflare Pages |
|---------|-------------------|------------------|
| Next.js Support | Requires custom adapter | Built-in support |
| Static Assets | Manual handling via KV | Automatic |
| Build Process | Complex | Simple |
| Use Cases | APIs, custom logic | Static sites, SSR |
| Pricing | Per request | Per build |

## Setup for Workers

### 1. Install Dependencies

```bash
npm install
npm install -D @cloudflare/kv-asset-handler @cloudflare/workers-types wrangler
```

### 2. Configure Wrangler

The `wrangler.toml` file is already configured for Workers deployment with:
- Worker name and entry point
- Static asset handling via KV
- Compatibility flags for Node.js

### 3. Build for Workers

```bash
npm run build:worker
```

This creates a `.worker-next` directory with your Worker code and assets.

### 4. Deploy to Workers

```bash
# Login to Cloudflare
wrangler login

# Deploy to Workers
npm run deploy:worker
```

## Development

For local development with Workers:

```bash
npm run dev:worker
```

This runs your Worker locally using Wrangler's development server.

## Limitations

### Current Implementation

The current `build-worker.js` creates a basic Worker that doesn't fully support Next.js features. For a production-ready Next.js on Workers setup, you would need:

1. **Custom Runtime Adapter**: Convert Next.js server to Workers-compatible format
2. **Asset Handling**: Implement proper static asset serving via KV
3. **Routing**: Implement Next.js routing in Workers
4. **API Routes**: Adapt API routes to Workers fetch handler

### What Works

- Basic static asset serving
- Simple routing
- Custom Worker logic

### What Doesn't Work (Yet)

- Server-side rendering (SSR)
- API routes
- Dynamic imports
- Image optimization
- Middleware

## Alternative: Hybrid Approach

Consider a hybrid approach:

1. Use **Cloudflare Pages** for your Next.js app
2. Use **Cloudflare Workers** for specific API endpoints or edge logic
3. Connect them via Worker Routes or Service Bindings

## Advanced Workers Features

If you need Workers-specific features:

### KV Storage

```javascript
// In your Worker
export default {
  async fetch(request, env) {
    // Read from KV
    const value = await env.MY_KV.get('key');
    
    // Write to KV
    await env.MY_KV.put('key', 'value');
    
    return new Response(value);
  }
}
```

### Durable Objects

```javascript
// Define a Durable Object
export class Counter {
  constructor(state, env) {
    this.state = state;
  }
  
  async fetch(request) {
    const count = (await this.state.storage.get('count')) || 0;
    await this.state.storage.put('count', count + 1);
    return new Response(count.toString());
  }
}
```

## Recommendation

For Next.js applications, we strongly recommend using **Cloudflare Pages** instead of Workers:

1. Switch to Pages deployment:
   ```bash
   npm run pages:build
   npm run pages:deploy
   ```

2. Use Workers only for:
   - Custom API endpoints
   - Background tasks
   - KV/Durable Objects integration
   - Custom middleware logic

## Migration Path

To migrate from Workers to Pages:

1. Use the original `wrangler.toml` configuration for Pages
2. Run `npm run pages:deploy` instead of `npm run deploy:worker`
3. All Next.js features will work out of the box

## Support

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/) 
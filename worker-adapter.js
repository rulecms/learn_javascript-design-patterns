import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '.worker-next/manifest.json';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve static assets
    try {
      // Add logic to serve from KV
      if (url.pathname.startsWith('/_next/') || 
          url.pathname.includes('.') && 
          !url.pathname.endsWith('/')) {
        return await getAssetFromKV(
          {
            request,
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: manifestJSON,
          }
        );
      }
    } catch (e) {
      // Fall through to dynamic handling
    }

    // Import and run the Next.js server
    const { default: server } = await import('./.worker-next/index.js');
    return server.fetch(request, env, ctx);
  },
}; 
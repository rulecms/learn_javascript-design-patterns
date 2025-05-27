#!/usr/bin/env node

import { execSync } from 'child_process';
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('Building Next.js for Cloudflare Workers...');

// Clean previous builds
try {
  rmSync('.worker-next', { recursive: true, force: true });
} catch {}

// Build Next.js
console.log('Building Next.js application...');
execSync('npm run build', { stdio: 'inherit' });

// Create worker directory
mkdirSync('.worker-next', { recursive: true });
mkdirSync('.worker-next/assets', { recursive: true });

// Copy static assets
console.log('Copying static assets...');
cpSync('.next/static', '.worker-next/assets/_next/static', { recursive: true });
cpSync('public', '.worker-next/assets', { recursive: true });

// Create worker entry point
const workerEntry = `
import { NextResponse } from 'next/server';

// This would normally import your Next.js app
// For Workers, you'll need to use a compatible runtime
export default {
  async fetch(request, env, ctx) {
    // Handle the request
    const url = new URL(request.url);
    
    // Basic routing example
    if (url.pathname === '/') {
      return new Response('Welcome to JavaScript Design Patterns', {
        headers: { 'content-type': 'text/html' },
      });
    }
    
    return new Response('Not found', { status: 404 });
  }
};
`;

writeFileSync('.worker-next/index.js', workerEntry);

// Create manifest for static assets
const manifest = {
  version: '1.0.0',
  assets: {},
};

writeFileSync('.worker-next/manifest.json', JSON.stringify(manifest, null, 2));

console.log('Build complete! Ready for Cloudflare Workers deployment.'); 
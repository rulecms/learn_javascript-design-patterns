# JavaScript Design Patterns Tutorial

A comprehensive, interactive tutorial for learning essential JavaScript design patterns. Built with Next.js, TypeScript, and Tailwind CSS.

![JavaScript Design Patterns](https://img.shields.io/badge/JavaScript-Design%20Patterns-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-teal)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Overview

This project serves as an educational resource for developers looking to understand and implement design patterns in JavaScript. It covers 12 essential patterns across three categories:

### Creational Patterns
- **Singleton** - Ensures a class has only one instance
- **Factory** - Creates objects without specifying their exact class
- **Builder** - Constructs complex objects step by step
- **Prototype** - Creates objects by cloning existing instances

### Structural Patterns
- **Adapter** - Allows incompatible interfaces to work together
- **Decorator** - Adds new functionality to objects dynamically
- **Facade** - Provides a simplified interface to complex subsystems
- **Proxy** - Provides a placeholder/surrogate for another object

### Behavioral Patterns
- **Observer** - Defines one-to-many dependencies between objects
- **Mediator** - Centralizes complex communications between objects
- **Strategy** - Encapsulates algorithms and makes them interchangeable
- **Command** - Encapsulates requests as objects

## 🚀 Features

- **Interactive Examples**: Each pattern includes working code examples you can study
- **Clear Explanations**: Understand what each pattern is and why it's useful
- **Dark Theme**: Easy on the eyes for extended learning sessions
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Copy Code**: One-click code copying for easy experimentation

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Font**: Geist Sans & Geist Mono

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/rulecms/learn_javascript-design-patterns.git
cd learn_javascript-design-patterns
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
```

## ☁️ Deploy to Cloudflare

### Option 1: Cloudflare Pages (Recommended)

Cloudflare Pages is the recommended approach for Next.js applications:

1. Fork this repository
2. Connect your GitHub account to Cloudflare Pages
3. Import this project with these settings:
   - Framework preset: `Next.js`
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Build output directory: `.vercel/output/static`

**Manual Deploy:**
```bash
npm run pages:build
npm run pages:deploy
```

### Option 2: Cloudflare Workers

For advanced use cases requiring Workers features (KV, Durable Objects):

```bash
# Install dependencies
npm install

# Build for Workers
npm run build:worker

# Deploy to Workers
npm run deploy:worker
```

**Note:** Workers deployment requires additional setup and has limitations with Next.js features. See [CLOUDFLARE_WORKERS_DEPLOYMENT.md](./CLOUDFLARE_WORKERS_DEPLOYMENT.md) for details.

For most use cases, **Cloudflare Pages is strongly recommended** over Workers for Next.js applications.

See [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home page with pattern cards
│   ├── patterns/          # Pattern detail pages
│   │   └── [id]/
│   │       └── page.tsx
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx        # Site header with navigation
│   ├── Footer.tsx        # Site footer
│   ├── PatternCard.tsx   # Pattern preview card
│   └── CodeBlock.tsx     # Code example display
├── lib/                   # Utilities and data
│   └── patterns-data.ts  # Pattern definitions and examples
└── public/               # Static assets
    └── favicon.ico       # Site favicon
```

## 🤝 Contributing

Contributions are welcome! If you'd like to add more patterns, improve explanations, or fix bugs:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-pattern`)
3. Commit your changes (`git commit -m 'Add amazing pattern'`)
4. Push to the branch (`git push origin feature/amazing-pattern`)
5. Open a Pull Request

## 📚 Learning Resources

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)
- [JavaScript Design Patterns](https://www.patterns.dev/)

## 🙏 Credits

Created with ❤️ by the [RuleCMS Team](https://rulecms.com)

## 📄 License

MIT License

Copyright (c) 2024 RuleCMS Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

Built with Next.js and deployed with ❤️

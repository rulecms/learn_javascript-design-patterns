import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JavaScript Design Patterns - Learn Essential Patterns",
  description: "Master JavaScript design patterns with interactive examples and clear explanations. Learn Singleton, Factory, Observer, and more essential patterns.",
  keywords: "JavaScript, design patterns, programming, software development, tutorial",
  authors: [{ name: "RuleCMS Team", url: "https://rulecms.com" }],
  creator: "RuleCMS Team",
  publisher: "RuleCMS",
  openGraph: {
    title: "JavaScript Design Patterns Tutorial",
    description: "Master essential JavaScript design patterns with interactive examples",
    url: "https://learn-js-design-patterns.org",
    siteName: "JavaScript Design Patterns",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-900 text-gray-100`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { ToastProvider } from "./context/ToastContext";
import { getActiveTheme } from "./lib/themes";
import { rootMetadata } from "./lib/seo";
import { JsonLd } from "./components/seo/JsonLd";
import { Analytics } from "./components/seo/Analytics";
import { SiteChrome } from "./components/layout/SiteChrome";
import {
  localBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "./lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const brandTheme = getActiveTheme();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00A63E" },
    { media: "(prefers-color-scheme: dark)", color: "#006F1D" },
  ],
};

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-brand-theme={brandTheme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <JsonLd
          data={[organizationJsonLd(), websiteJsonLd(), localBusinessJsonLd()]}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <div className="relative flex min-h-screen flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              <SiteChrome>{children}</SiteChrome>
            </ToastProvider>
          </ThemeProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}

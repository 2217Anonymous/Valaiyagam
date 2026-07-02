import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { ToastProvider } from "./context/ToastContext";
import { BRAND_NAME, getActiveTheme } from "./lib/themes";
import "./globals.css";
import { NavBar } from "./components/ui/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brandTheme = getActiveTheme();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Innovating the Future`,
  description:
    `${BRAND_NAME} provides cutting-edge tech solutions, specializing in AI, Cloud, and Enterprise Software.`,
  keywords: ["Technology", "Software", "AI", "Cloud", "Valaiyagam"],
  applicationName: BRAND_NAME,
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    siteName: BRAND_NAME,
    title: BRAND_NAME,
    description:
      `${BRAND_NAME} provides cutting-edge tech solutions, specializing in AI, Cloud, and Enterprise Software.`,
  },
  twitter: {
    title: BRAND_NAME,
  },
};

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
        <div className="relative flex min-h-screen flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              <NavBar />
              <main className="flex-1">{children}</main>
            </ToastProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

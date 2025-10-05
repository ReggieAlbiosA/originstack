import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import DraggableFavButton from "@/components/client/draggable-fab-button";
import SiteLogo from "@/app/(react-demo)/react-demo/_shared/client/site-logo";
import ThemeToggle from "@/components/client/theme-toggle";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Fundamentals Demo - Interactive Learning Platform",
  description: "Master React fundamentals through interactive demonstrations. Learn hooks, state management, performance optimization, and best practices with hands-on examples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script> */}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <SiteLogo />
              </div>
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main className="pt-20">
            {children}
          </main>

          <DraggableFavButton />

        </ThemeProvider>
      </body>
    </html>
  )
}

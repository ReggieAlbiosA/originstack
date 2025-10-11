import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import DraggableFavButton from "@/components/client/draggable-fab-button";
import SiteLogo from "@/app/(react-demo)/react-demo/_shared/server/site-logo";
import { LargeScreenThemeToggle } from "@/components/client/header/theme-toggle";
import { ThemeProvider } from "next-themes";
import { SiGithub } from "react-icons/si";
import CustomNavigationMenu from "@/components/client/header/custom-navigation-menu";
import MenuButton from "@/components/client/header/mobile-main-nav-menu";
import { navigationItems } from "@/app/(react-demo)/react-demo/_shared/data/value";
import React from "react";
import { NavItem } from "@/components/client/header/custom-navigation-menu";

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

  const hideOnMobileStyle = "hidden md:flex";
  const showOnMobileStyle = "flex md:hidden";




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

          <header className="sticky top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
            <nav className=" mx-auto px-7 py-3 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <SiteLogo />
              </div>

              <div className="flex items-center gap-4 justify-between">
                <CustomNavigationMenu items={navigationItems} className={hideOnMobileStyle} />
                <div className="bg-zinc-300 dark:bg-zinc-700 h-6 w-[1px]" />

                <a href="https://github.com/originstack/originstack" className={hideOnMobileStyle} target="_blank" rel="noopener noreferrer">
                  <SiGithub className="w-5.5 h-5.5" />
                </a>
                <LargeScreenThemeToggle className={hideOnMobileStyle} />
                <MenuButton navigationItems={navigationItems} className={showOnMobileStyle} />
              </div>

            </nav>
          </header>

          {children}


          <DraggableFavButton />

        </ThemeProvider>
      </body>
    </html>
  )
}

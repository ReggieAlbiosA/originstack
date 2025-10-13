import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import DraggableFavButton from "@/components/client/draggable-fab-button";
import SiteLogo from "@/app/(react-demo)/react-demo/_shared/server/site-logo";
import { LargeScreenThemeToggle } from "@/components/client/header/theme-toggle";
import { ThemeProvider } from "next-themes";
import { SiGithub } from "react-icons/si";
import CustomNavigationMenu, { type NavItem } from "@/components/client/header/custom-navigation-menu";
import MenuButton from "@/components/client/header/mobile-main-nav-menu";
import { navigationItems } from "@/app/(react-demo)/react-demo/_shared/data/value";
import { type Route } from "next";
import Link from "next/link";
import CommandPalette from "@/components/client/header/search-interface";
import { sidebarConfig } from "@/app/(react-demo)/react-demo/demo/_shared/data/value";

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

// Server Component to render dropdown content
function DropdownContent({ items }: { items: NavItem[] }) {
  return (
    <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {items.map((child, childIndex) => (
        <li key={childIndex}>
          <Link
            href={child.href! as Route}
            className="flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1"
          >
            <div className="text-sm leading-none font-medium">{child.label}</div>
            {child.description && (
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                {child.description}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hideOnMobileStyle = "hidden lg:flex";
  const showOnMobileStyle = "flex lg:hidden";

  // Enhance navigation items with server-rendered dropdown content
  const enhancedNavItems = navigationItems.map((item) => {
    if (item.type === "sub" && item.children && item.children.length > 0) {
      return {
        ...item,
        dropdownContent: <DropdownContent items={item.children} />,
      };
    }
    return item;
  });

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
          <header className="sticky top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md" role="banner">
            <nav className="mx-auto px-7 py-3 flex items-center justify-between" role="navigation" aria-label="Main navigation">
              <div className="flex items-center gap-8">
                <SiteLogo />
              </div>
              <div className="flex items-center gap-4 justify-between">
                <CustomNavigationMenu
                  items={enhancedNavItems}
                  className={hideOnMobileStyle}
                />

                <div className={`bg-zinc-300 dark:bg-zinc-700 h-6 w-[1px] ${hideOnMobileStyle}`} aria-hidden="true" />

                <CommandPalette docsItems={sidebarConfig} />

                <div className="bg-zinc-300 dark:bg-zinc-700 h-6 w-[1px]" aria-hidden="true" />

                <a
                  href="https://github.com/originstack/originstack"
                  className={hideOnMobileStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our GitHub repository"
                >
                  <SiGithub className="w-5.5 h-5.5" aria-hidden="true" />
                </a>
                <LargeScreenThemeToggle className={hideOnMobileStyle} />
                <MenuButton
                  navigationItems={navigationItems}
                  className={showOnMobileStyle}
                />
              </div>
            </nav>
          </header>
          {children}
          <DraggableFavButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

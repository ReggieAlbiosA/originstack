import Sidebar from "@/components/composite-ui/client/sidebar"
import { sidebarConfig } from "@/app/(nextjs-demo)/nextjs-demo/demo/_shared/data/value"
import VersionNavigation from "@/components/sidebar/client/version-navigation"

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-[calc(100vh-65px)] bg-white dark:bg-zinc-900">
            {/* Desktop Sidebar - hidden on mobile, visible on lg and up */}
            <aside className="hidden lg:block" role="complementary" aria-label="Table of contents">
                {/* ✨ Composite Sidebar Component - Reusable & Flexible! */}
                <Sidebar
                    config={sidebarConfig}
                    width="w-78"
                    header={<VersionNavigation versionLabel="Next.js 16.0.0" />}
                    sticky
                />
            </aside>

            {/* Main content */}
            <div className="flex-1 bg-white dark:bg-zinc-900 h-min">
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}


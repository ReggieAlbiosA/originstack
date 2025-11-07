import Sidebar from "@/components/composite-ui/client/sidebar"
import { sidebarConfig } from "@/app/(react-demo)/react-demo/demo/_shared/data/value"
import { VersionNavigation } from "@/components/sidebar/client/version-navigation"

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-white dark:bg-zinc-900">
            {/* Desktop Sidebar - hidden on mobile, visible on md and up */}
            <aside className="hidden lg:block" role="complementary" aria-label="Table of contents">
                {/* ✨ New Composite Sidebar Component - Cleaner & More Flexible! */}
                <Sidebar
                    config={sidebarConfig}
                    header={<VersionNavigation />}
                    sticky
                />
            </aside>

            {/* Main content */}
            <div className="flex-1 bg-white dark:bg-zinc-900">
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

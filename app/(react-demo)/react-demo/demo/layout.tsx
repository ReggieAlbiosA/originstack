import Sidebar from "@/components/client/sidebar/sidebar"
import MobileSidebar from "@/components/client/sidebar/sidebar-mobile"
import { sidebarConfig } from "@/app/(react-demo)/react-demo/demo/_shared/data/value"

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            {/* Desktop Sidebar - hidden on mobile, visible on md and up */}
            <div className="hidden md:block">
                <Sidebar config={sidebarConfig} />
            </div>

            {/* Main content */}
            <div className="flex-1">
                {/* Mobile sidebar button - visible only on mobile */}
                <div className="md:hidden sticky top-16 z-30 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4">
                    <MobileSidebar config={sidebarConfig} />
                </div>

                {/* Page content */}
                <div className="p-6 md:p-8 lg:p-12">
                    <div className="max-w-4xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

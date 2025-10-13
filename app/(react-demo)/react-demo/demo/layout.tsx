import Sidebar from "@/components/client/sidebar/sidebar"
import { sidebarConfig } from "@/app/(react-demo)/react-demo/demo/_shared/data/value"

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-white dark:bg-zinc-900">
            {/* Desktop Sidebar - hidden on mobile, visible on md and up */}
            <aside className="hidden lg:block" role="complementary" aria-label="Table of contents">
                <Sidebar config={sidebarConfig} />
            </aside>

            {/* Main content */}
            <div className="flex-1 bg-white dark:bg-zinc-900">
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

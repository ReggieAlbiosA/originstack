import { TableOfContents } from "@/components/client/page/table-of-contents"
import { MobileTableOfContents } from "@/components/client/page/mobile-table-of-contents"
import { PageNavigation } from "@/components/client/page/page-navigation"
import {
    demoPageTitle,
    demoPageDescription,
    demoFeatures,
    demoConfigurationTypes,
    demoCallToAction,
    demoPageNavigation,
} from "@/app/(react-demo)/react-demo/demo/_shared/data/value"

// Generate table of contents based on page sections
function getTableOfContents() {
    return [
        { id: "features-heading", title: "Features", level: 2 },
        { id: "config-types-heading", title: "Configuration Types", level: 2 },
        // Add individual config types as sub-items
        ...demoConfigurationTypes.map((config, index) => ({
            id: `config-${index}`,
            title: config.title,
            level: 3
        })),
        { id: "cta-heading", title: demoCallToAction.title, level: 2 },
    ]
}

export default function DemoPage() {
    const tocItems = getTableOfContents()

    return (
        <>
            <MobileTableOfContents items={tocItems} pageTitle="On this page" />
            <div className="relative min-h-screen py-8">
                {/* Mobile Table of Contents */}

                {/* Main content container with responsive grid */}
                <div className="xl:grid xl:grid-cols-[1fr_minmax(250px,285.996px)] ">
                    {/* Main content */}
                    <main className="space-y-8 max-w-4xl mx-auto px-4 xl:px-0 bg-white dark:bg-zinc-900">
                        <header className="scroll-mt-20">
                            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                                {demoPageTitle}
                            </h1>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400">
                                {demoPageDescription}
                            </p>
                        </header>

                        <div className="space-y-6">
                            <section id="features-heading" className="space-y-3 scroll-mt-20" aria-labelledby="features-heading">
                                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                                    Features
                                </h2>
                                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300" role="list" aria-label="Sidebar component features">
                                    {demoFeatures.map((feature, index) => (
                                        <li key={index} role="listitem">{feature}</li>
                                    ))}
                                </ul>
                            </section>

                            <section id="config-types-heading" className="space-y-3 scroll-mt-20" aria-labelledby="config-types-heading">
                                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                                    Configuration Types
                                </h2>
                                <div className="space-y-4" role="list" aria-label="Configuration type examples">
                                    {demoConfigurationTypes.map((config, index) => (
                                        <article
                                            key={index}
                                            id={`config-${index}`}
                                            className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg scroll-mt-20"
                                            role="listitem"
                                        >
                                            <header>
                                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                                    {config.title}
                                                </h3>
                                            </header>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                {config.description}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            <section id="cta-heading" className="space-y-3 scroll-mt-20" aria-labelledby="cta-heading">
                                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                                    {demoCallToAction.title}
                                </h2>
                                <p className="text-zinc-700 dark:text-zinc-300">
                                    {demoCallToAction.description}
                                </p>
                            </section>
                        </div>

                        {/* Page Navigation - Previous/Next */}
                        <PageNavigation
                            previous={demoPageNavigation.previous}
                            next={demoPageNavigation.next}
                        />
                    </main>

                    {/* Table of Contents - Desktop only */}
                    <aside className="hidden xl:block">
                        <TableOfContents items={tocItems} />
                    </aside>
                </div>
            </div>
        </>
    )
}

import {
    demoPageTitle,
    demoPageDescription,
    demoFeatures,
    demoConfigurationTypes,
    demoCallToAction,
} from "@/app/(react-demo)/react-demo/demo/_shared/data/value"

export default function DemoPage() {
    return (
        <main className="space-y-8 bg-white dark:bg-zinc-900">
            <header>
                <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                    {demoPageTitle}
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    {demoPageDescription}
                </p>
            </header>

            <div className="space-y-6">
                <section className="space-y-3" aria-labelledby="features-heading">
                    <h2 id="features-heading" className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Features
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300" role="list" aria-label="Sidebar component features">
                        {demoFeatures.map((feature, index) => (
                            <li key={index} role="listitem">{feature}</li>
                        ))}
                    </ul>
                </section>

                <section className="space-y-3" aria-labelledby="config-types-heading">
                    <h2 id="config-types-heading" className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Configuration Types
                    </h2>
                    <div className="space-y-4" role="list" aria-label="Configuration type examples">
                        {demoConfigurationTypes.map((config, index) => (
                            <article key={index} className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg" role="listitem">
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

                <section className="space-y-3" aria-labelledby="cta-heading">
                    <h2 id="cta-heading" className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {demoCallToAction.title}
                    </h2>
                    <p className="text-zinc-700 dark:text-zinc-300">
                        {demoCallToAction.description}
                    </p>
                </section>
            </div>
        </main>
    )
}

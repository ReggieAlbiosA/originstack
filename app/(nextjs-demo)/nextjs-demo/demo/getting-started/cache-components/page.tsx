export default function CacheComponentsPage() {
    return (
        <div className="space-y-6">
            <section id="introduction" className="space-y-4">
                <h2 className="text-2xl font-semibold">Introduction</h2>
                <p className="text-muted-foreground">
                    Cache Components is a new feature in Next.js 16 that allows you to cache entire component trees
                    and their data fetching, providing powerful performance optimizations with granular control over cache invalidation.
                </p>
            </section>

            <section id="ppr-overview" className="space-y-4">
                <h2 className="text-2xl font-semibold">What is Cache Components?</h2>
                <p className="text-muted-foreground">
                    Cache Components enable you to wrap any component with the &quot;use cache&quot; directive, making it
                    cacheable along with all its data fetching. This is particularly useful for expensive computations
                    or data fetching operations that don&apos;t change frequently.
                </p>
            </section>

            <section id="usage" className="space-y-4">
                <h3 className="text-xl font-semibold">How to Use Cache Components</h3>
                <p className="text-muted-foreground">
                    To use Cache Components, add the &quot;use cache&quot; directive at the top of your server component:
                </p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code>{`export default async function MyComponent() {
  "use cache"

  const data = await fetchData()

  return <div>{data}</div>
}`}</code>
                </pre>
            </section>

            <section id="examples" className="space-y-4">
                <h3 className="text-xl font-semibold">Examples</h3>
                <p className="text-muted-foreground">
                    Cache Components can be used for various scenarios including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Caching API responses</li>
                    <li>Expensive computations</li>
                    <li>Static content that rarely changes</li>
                    <li>User-specific data with controlled revalidation</li>
                </ul>
            </section>

            <section id="resources" className="space-y-4">
                <h3 className="text-xl font-semibold">Further Resources</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                        <a
                            href="https://nextjs.org/docs/app/building-your-application/caching"
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Next.js Caching Documentation
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://nextjs.org/blog/next-16"
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Next.js 16 Release Blog
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
}


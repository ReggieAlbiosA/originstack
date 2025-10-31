import { Article } from "@/components/layout/server/article";
import { DesktopViewTableOfContents, MobileViewTableOfContents } from "@/components/page/client/table-of-contents";
import PageNavigation from "@/components/page/server/page-navigation";

export const metadata = {
    title: "Getting Started - Partial Prerendering in Next.js",
    description:
        "Learn how to use Partial Prerendering (PPR) to combine a static shell with dynamic content for faster page loads.",
};

export default function PartialPrerenderingLayout({
    ppr,
}: {
    ppr: React.ReactNode;
}) {
    return (
        <>

            <MobileViewTableOfContents
                items={[
                    { id: "introduction", title: "Introduction", level: 2 },
                    { id: "ppr-overview", title: "What is Partial Prerendering?", level: 2 },
                    { id: "usage", title: "How to Use PPR", level: 3 },
                    { id: "examples", title: "Examples", level: 3 },
                    { id: "resources", title: "Further Resources", level: 3 }
                ]}
                pageTitle="On this page"
            />

            <div className="relative min-h-screen py-8">
                {/* Main content container with responsive grid */}
                <div className="xl:grid xl:grid-cols-[1fr_minmax(250px,285.996px)] ">

                    <main className="space-y-8 max-w-[1200px] mx-auto px-4 xl:px-0 bg-white dark:bg-zinc-900">
                        <Article
                            title="Partial Prerendering"
                            description={
                                <>
                                    Partial Prerendering (PPR) is a new rendering mode in Next.js that allows you to serve a static shell of a page instantly, with dynamic &quot;holes&quot; that are streamed in at request time. This combines the performance of static sites with the dynamism of server-rendered apps.
                                </>
                            }
                            officialDocsLink="https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering"
                            githubSrcLink="#"
                        >

                            <div className="space-y-8">
                                {ppr}
                            </div>
                        </Article>

                        <PageNavigation previous={{ label: "Previous", title: "Introduction", href: "/docs/introduction" }} next={{ label: "Next", title: "Getting Started", href: "/docs/getting-started" }} className="max-w-[1150px] mx-auto" />
                    </main>
                    <aside className="hidden xl:block">
                        <DesktopViewTableOfContents items={[
                            { id: "introduction", title: "Introduction", level: 2 },
                            { id: "ppr-overview", title: "What is Partial Prerendering?", level: 2 },
                            { id: "usage", title: "How to Use PPR", level: 3 },
                            { id: "examples", title: "Examples", level: 3 },
                            { id: "resources", title: "Further Resources", level: 3 }
                        ]} />
                    </aside>
                </div>
            </div>
        </>
    );
}

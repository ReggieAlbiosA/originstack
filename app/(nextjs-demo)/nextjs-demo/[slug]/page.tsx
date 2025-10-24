import { notFound } from 'next/navigation'

// Generate static params for all possible 404 scenarios
// This makes the route statically generated instead of server-rendered
export function generateStaticParams() {
    // Return an empty array - this tells Next.js to statically generate
    // the fallback behavior for any unmatched route
    return []
}

// Enable static generation for unmatched routes
export const dynamicParams = true

export default function CatchAllPage() {
    // This will trigger the not-found.tsx in the parent directory
    notFound()
}

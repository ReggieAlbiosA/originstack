# Page Navigation Component

A reusable pagination component for navigating between pages with Previous/Next links.

## Features

- ✅ Displays Previous and Next page links
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Accessible with ARIA labels
- ✅ Smooth hover transitions
- ✅ Icon support with Tabler Icons
- ✅ Flexible - can show only previous, only next, or both
- ✅ Fully typed with TypeScript

## Usage

### Basic Example

```tsx
import { PageNavigation } from "@/components/client/page/page-navigation"

export default function MyPage() {
  return (
    <div>
      {/* Your page content */}

      <PageNavigation
        previous={{
          label: "Previous Page",
          title: "Introduction",
          href: "/docs/introduction"
        }}
        next={{
          label: "Next Page",
          title: "Getting Started",
          href: "/docs/getting-started"
        }}
      />
    </div>
  )
}
```

### Only Previous Link

```tsx
<PageNavigation
  previous={{
    label: "Previous",
    title: "Introduction",
    href: "/docs/introduction"
  }}
/>
```

### Only Next Link

```tsx
<PageNavigation
  next={{
    label: "Next",
    title: "Getting Started",
    href: "/docs/getting-started"
  }}
/>
```

### Using with Data File

Create a data file for your page navigation:

```typescript
// app/my-section/_shared/data/value.ts
export const myPageNavigation = {
  previous: {
    label: "Previous Page",
    title: "Introduction",
    href: "/my-section/introduction",
  },
  next: {
    label: "Next Page",
    title: "Installation",
    href: "/my-section/installation",
  },
}
```

Then import and use it:

```tsx
import { PageNavigation } from "@/components/client/page/page-navigation"
import { myPageNavigation } from "./_shared/data/value"

export default function MyPage() {
  return (
    <div>
      {/* Your page content */}

      <PageNavigation
        previous={myPageNavigation.previous}
        next={myPageNavigation.next}
      />
    </div>
  )
}
```

## Props

### PageNavigationProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `previous` | `PageNavigationLink` | No | Configuration for the previous page link |
| `next` | `PageNavigationLink` | No | Configuration for the next page link |

### PageNavigationLink

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | Yes | Small label text (e.g., "Previous Page", "Next Page") |
| `title` | `string` | Yes | Main title of the page |
| `href` | `string` | Yes | URL path to navigate to |

## Styling

The component uses Tailwind CSS classes and includes:
- Border, padding, and rounded corners
- Hover effects with background and border color changes
- Dark mode support
- Focus states for accessibility
- Responsive text truncation

## Accessibility

- Uses semantic `<nav>` element with `aria-label="Page navigation"`
- Each link has descriptive `aria-label` with full page title
- Focus states with visible ring for keyboard navigation
- Icons marked as `aria-hidden="true"`

## Examples in the Codebase

See these files for working examples:
- `app/(react-demo)/react-demo/page.tsx` - Main page with only next link
- `app/(react-demo)/react-demo/demo/page.tsx` - Demo page with both links
- `app/(react-demo)/react-demo/demo/_shared/data/value.ts` - Data configuration

## Dependencies

- `next/link` - Next.js Link component
- `@tabler/icons-react` - IconChevronLeft, IconChevronRight icons
- Tailwind CSS - For styling


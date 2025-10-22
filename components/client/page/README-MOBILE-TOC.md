# Mobile Table of Contents Component

## Overview
A mobile-friendly, collapsible Table of Contents component inspired by Better Auth documentation, designed for responsive navigation on mobile and tablet devices.

## Features

✅ **Mobile-Only Display** - Automatically hidden on large screens (lg and above)
✅ **Sticky Positioning** - Stays at the top of the page for easy access
✅ **Collapsible Interface** - Click to expand/collapse the TOC menu
✅ **Active Section Tracking** - Highlights the current section as you scroll
✅ **Smooth Scrolling** - Animated scroll to section with proper header offset
✅ **Auto-Close on Selection** - Menu closes automatically after clicking a link
✅ **Click Outside to Close** - Closes when clicking anywhere outside the menu
✅ **Hierarchical Display** - Shows nested headings with proper indentation
✅ **Dark Mode Support** - Full theme support matching your design system
✅ **Accessibility** - ARIA labels and semantic HTML

## Component Structure

```tsx
<MobileTableOfContents
  items={tocItems}
  pageTitle="On this page"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TableOfContentsItem[]` | Required | Array of TOC items with id, title, and level |
| `pageTitle` | `string` | `"On this page"` | Title shown in the collapsed state |

## TableOfContentsItem Type

```typescript
interface TableOfContentsItem {
    id: string;      // HTML element ID (without #)
    title: string;   // Display text for the TOC item
    level: number;   // Heading level (2 for h2, 3 for h3, etc.)
}
```

## Usage Example

```tsx
import { MobileTableOfContents } from "@/components/client/page/mobile-table-of-contents"

function getTableOfContents() {
    return [
        { id: "introduction", title: "Introduction", level: 2 },
        { id: "getting-started", title: "Getting Started", level: 2 },
        { id: "installation", title: "Installation", level: 3 },
        { id: "configuration", title: "Configuration", level: 3 },
        { id: "api-reference", title: "API Reference", level: 2 },
    ]
}

export default function MyPage() {
    const tocItems = getTableOfContents()

    return (
        <>
            <MobileTableOfContents items={tocItems} />

            <main>
                <h2 id="introduction">Introduction</h2>
                <p>Content here...</p>

                <h2 id="getting-started">Getting Started</h2>
                <h3 id="installation">Installation</h3>
                <p>Content here...</p>
            </main>
        </>
    )
}
```

## Styling & Customization

### Key Classes
- **Container**: Sticky, positioned below header at `top-[60px]`
- **Active Link**: Blue accent with background highlight
- **Indentation**: `16px` base + `16px` per level
- **Max Height**: `70vh` for scrollable content

### Color Scheme
- **Border**: `zinc-200` / `zinc-800`
- **Text**: `zinc-700` / `zinc-300`
- **Active**: `blue-600` / `blue-400`
- **Hover**: `zinc-50` / `zinc-800/50`

## Integration Points

### 1. Page Component
Add the mobile TOC at the top of your page layout:

```tsx
<div className="relative min-h-screen">
    <MobileTableOfContents items={tocItems} pageTitle="On this page" />

    <div className="xl:grid xl:grid-cols-[1fr_minmax(250px,285.996px)] xl:gap-8">
        <main>
            {/* Your content */}
        </main>
        <aside className="hidden xl:block">
            {/* Desktop TOC */}
        </aside>
    </div>
</div>
```

### 2. Required IDs on Content
Ensure your headings have matching IDs:

```tsx
<h2 id="features-heading">Features</h2>
<h3 id="config-types">Configuration Types</h3>
```

### 3. Scroll Margin
Add scroll margin to headings to account for sticky headers:

```tsx
<section id="my-section" className="scroll-mt-20">
    <h2>My Section</h2>
</section>
```

## Responsive Behavior

| Screen Size | Behavior |
|-------------|----------|
| `< lg` (< 1024px) | Mobile TOC visible, sticky at top |
| `≥ lg` (≥ 1024px) | Mobile TOC hidden, desktop sidebar visible |

## Technical Details

### Scroll Tracking
- Uses `IntersectionObserver` pattern via scroll event
- Activates section when it's within 100px of viewport top
- Updates URL hash on section change

### Scroll Offset
- Header offset: `80px` (adjustable)
- Smooth scroll with `behavior: 'smooth'`
- Prevents default anchor jump

### Event Handling
- Click outside listener for auto-close
- Cleanup on unmount
- Prevents memory leaks

## Browser Support
- Modern browsers with ES6+ support
- Tailwind CSS utility classes
- CSS custom properties for theming

## Dependencies
- React 18+
- Lucide React (ChevronDown icon)
- clsx (conditional classes)
- Tailwind CSS

## File Location
```
components/
  client/
    page/
      mobile-table-of-contents.tsx  ← New component
      table-of-contents.tsx          ← Desktop version
```

## Related Components
- `TableOfContents` - Desktop sidebar TOC
- `Sidebar` - Main navigation sidebar
- `MobileMainNavMenu` - Mobile navigation menu

## Future Enhancements
- [ ] Add transition animations
- [ ] Support for dynamic content updates
- [ ] Customizable scroll offset
- [ ] Optional breadcrumb current section display
- [ ] Keyboard navigation support


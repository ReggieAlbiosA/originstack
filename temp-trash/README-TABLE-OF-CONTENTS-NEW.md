# Table of Contents - Composable Architecture

A flexible, composable table of contents system inspired by Radix UI and shadcn/ui patterns. Provides granular control over styling, layout, and behavior while maintaining excellent SEO and accessibility.

---

## 🎯 Key Features

- ✅ **Composable Primitives** - Build exactly what you need
- ✅ **Server Component Compatible** - SEO-friendly, no hydration issues
- ✅ **Auto-Generation Support** - Optional DOM scanning for dynamic content
- ✅ **Mobile Breadcrumb** - Active section indicator in collapsed state
- ✅ **Granular Styling** - Every component accepts className
- ✅ **Level-Based Indentation** - Automatic visual hierarchy
- ✅ **Active Section Tracking** - Automatic scroll-based highlighting
- ✅ **Smooth Scrolling** - Header offset support
- ✅ **Accessible** - ARIA labels, keyboard navigation, semantic HTML

---

## 📦 Components

### Core Components

| Component | Purpose |
|-----------|---------|
| `<TableOfContents>` | Root container with context |
| `<TableOfContentsHeader>` | Mobile trigger with breadcrumb |
| `<TableOfContentsContent>` | Scrollable content area |
| `<TableOfContentsNav>` | Navigation wrapper |
| `<TableOfContentsItem>` | Individual link item |

### Hooks (Client-only)

| Hook | Purpose |
|------|---------|
| `useAutoExtractHeadings()` | Extract headings from DOM |
| `useAddScrollMargin()` | Add scroll margins to headings |

---

## 🚀 Quick Start

### Server Component (Recommended for SEO)

```tsx
import {
    TableOfContents,
    TableOfContentsHeader,
    TableOfContentsContent,
    TableOfContentsNav,
    TableOfContentsItem,
    type TableOfContentsItem as TocItem,
} from '@/components/page/client/table-of-contents'

// Define data statically (like navigationSections in layout.tsx)
const tableOfContentsData = [
    { id: "introduction", title: "Introduction", level: 2 },
    { id: "getting-started", title: "Getting Started", level: 3 },
    { id: "features", title: "Features", level: 2 },
] satisfies TocItem[]

export default function Page() {
    return (
        <>
            {/* Mobile TOC */}
            <TableOfContents variant="mobile" sticky topOffset={65}>
                <TableOfContentsHeader title="On this page" />
                <TableOfContentsContent>
                    <TableOfContentsNav>
                        {tableOfContentsData.map((item) => (
                            <TableOfContentsItem
                                key={item.id}
                                href={`#${item.id}`}
                                level={item.level}
                            >
                                {item.title}
                            </TableOfContentsItem>
                        ))}
                    </TableOfContentsNav>
                </TableOfContentsContent>
            </TableOfContents>

            {/* Desktop TOC */}
            <TableOfContents variant="desktop" sticky topOffset={100}>
                <TableOfContentsNav>
                    {tableOfContentsData.map((item) => (
                        <TableOfContentsItem
                            key={item.id}
                            href={`#${item.id}`}
                            level={item.level}
                        >
                            {item.title}
                        </TableOfContentsItem>
                    ))}
                </TableOfContentsNav>
            </TableOfContents>

            <main>
                <h2 id="introduction">Introduction</h2>
                <h3 id="getting-started">Getting Started</h3>
                <h2 id="features">Features</h2>
            </main>
        </>
    )
}
```

---

## 📚 API Reference

### `<TableOfContents>`

Root container that provides context for active tracking and variant configuration.

**Props:**

```tsx
interface TableOfContentsProps {
    variant?: 'mobile' | 'desktop'  // Default: 'desktop'
    sticky?: boolean                 // Default: true
    topOffset?: number              // Default: 65 (px from top)
    className?: string
    children: React.ReactNode
}
```

**Example:**

```tsx
<TableOfContents variant="mobile" sticky topOffset={65}>
    {children}
</TableOfContents>
```

---

### `<TableOfContentsHeader>`

Mobile-only trigger button with breadcrumb showing active section. Hidden on desktop.

**Props:**

```tsx
interface TableOfContentsHeaderProps {
    title?: string              // Default: "On this page"
    icon?: React.ReactNode      // Custom icon (default: hamburger menu)
    className?: string
}
```

**Features:**

- Collapsible trigger button
- Shows active section in breadcrumb format: `"On this page > Active Section"`
- Auto-closes on outside click
- Animated chevron indicator

**Example:**

```tsx
<TableOfContentsHeader title="Navigation" />
```

---

### `<TableOfContentsContent>`

Scrollable container for TOC items. Conditionally rendered based on variant and open state.

**Props:**

```tsx
interface TableOfContentsContentProps {
    maxHeight?: string      // Default: '70vh'
    className?: string
    children: React.ReactNode
}
```

**Example:**

```tsx
<TableOfContentsContent maxHeight="80vh">
    {children}
</TableOfContentsContent>
```

---

### `<TableOfContentsNav>`

Navigation wrapper with optional title and icon (desktop only).

**Props:**

```tsx
interface TableOfContentsNavProps {
    title?: string              // Default: "Table of contents"
    icon?: React.ReactNode      // Default: IconListSearch
    showTitle?: boolean         // Default: true (desktop only)
    className?: string
    children: React.ReactNode
}
```

**Example:**

```tsx
<TableOfContentsNav title="Quick Navigation" showTitle={true}>
    {children}
</TableOfContentsNav>
```

---

### `<TableOfContentsItem>`

Individual link item with automatic active state tracking and level-based indentation.

**Props:**

```tsx
interface TableOfContentsItemProps {
    href: string            // Anchor link (e.g., "#section-id")
    level?: number          // Heading level (2, 3, 4, etc.) - Default: 2
    className?: string
    children: React.ReactNode
}
```

**Features:**

- Automatic active state highlighting
- Level-based indentation (h2 = 0, h3 = 1rem, h4 = 2rem, etc.)
- Smooth scroll with header offset
- URL hash update
- Auto-closes mobile menu on click

**Example:**

```tsx
<TableOfContentsItem href="#introduction" level={2}>
    Introduction
</TableOfContentsItem>
```

**Custom Content:**

```tsx
<TableOfContentsItem href="#features" level={2} className="hover:scale-105">
    <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span>Features</span>
        <Badge>New</Badge>
    </div>
</TableOfContentsItem>
```

---

## 🤖 Auto-Generation (Client Components)

### `useAutoExtractHeadings()`

Hook to automatically extract headings from the DOM.

**Parameters:**

```tsx
interface UseAutoExtractHeadingsOptions {
    containerRef?: React.RefObject<HTMLElement>
    containerSelector?: string      // Default: 'main'
    levels?: number[]              // Default: [2, 3, 4]
    autoGenerateIds?: boolean      // Default: true
}
```

**Returns:** `TableOfContentsItem[]`

**Example:**

```tsx
'use client'

import { useAutoExtractHeadings } from '@/components/page/client/table-of-contents'

export default function ClientPage() {
    const tocData = useAutoExtractHeadings({
        containerSelector: 'main',
        levels: [2, 3]  // Only h2 and h3
    })

    return (
        <TableOfContents variant="mobile">
            <TableOfContentsNav>
                {tocData.map((item) => (
                    <TableOfContentsItem key={item.id} href={`#${item.id}`}>
                        {item.title}
                    </TableOfContentsItem>
                ))}
            </TableOfContentsNav>
        </TableOfContents>
    )
}
```

---

### `useAddScrollMargin()`

Hook to automatically add scroll margins to headings (prevents content hiding under sticky headers).

**Parameters:**

```tsx
interface UseAddScrollMarginOptions {
    containerRef?: React.RefObject<HTMLElement>
    containerSelector?: string      // Default: 'main'
    margin?: string                // Default: '80px'
}
```

**Example:**

```tsx
'use client'

import { useAddScrollMargin } from '@/components/page/client/table-of-contents'

export default function ClientPage() {
    useAddScrollMargin({ margin: '100px' })

    return <main>{/* content */}</main>
}
```

---

## 🎨 Styling Examples

### Custom Mobile TOC with Icons

```tsx
<TableOfContents variant="mobile" className="bg-gradient-to-r from-blue-50 to-purple-50">
    <TableOfContentsHeader
        title="Quick Nav"
        icon={<MenuIcon className="w-5 h-5" />}
    />
    <TableOfContentsContent>
        <TableOfContentsNav>
            {tocData.map((item) => (
                <TableOfContentsItem
                    key={item.id}
                    href={`#${item.id}`}
                    className="hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                    <div className="flex items-center gap-2">
                        {item.level === 2 && <ChevronRight className="w-4 h-4" />}
                        {item.title}
                    </div>
                </TableOfContentsItem>
            ))}
        </TableOfContentsNav>
    </TableOfContentsContent>
</TableOfContents>
```

### Custom Desktop TOC with Gradient

```tsx
<TableOfContents
    variant="desktop"
    className="bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 p-4 rounded-lg"
>
    <TableOfContentsNav title="Navigation" className="space-y-4">
        {tocData.map((item) => (
            <TableOfContentsItem
                key={item.id}
                href={`#${item.id}`}
                level={item.level}
                className={cn(
                    "rounded-lg transition-all duration-300",
                    item.level === 2 && "font-bold text-lg",
                    item.level === 3 && "text-blue-600 dark:text-blue-400"
                )}
            >
                {item.title}
            </TableOfContentsItem>
        ))}
    </TableOfContentsNav>
</TableOfContents>
```

---

## 🔧 Advanced Patterns

### Dynamic Data from CMS

```tsx
interface CMSSection {
    slug: string
    heading: string
    subsections?: Array<{ slug: string; heading: string }>
}

function convertCMSData(sections: CMSSection[]): TocItem[] {
    return sections.flatMap(section => [
        { id: section.slug, title: section.heading, level: 2 },
        ...(section.subsections?.map(sub => ({
            id: sub.slug,
            title: sub.heading,
            level: 3
        })) || [])
    ])
}

export default function CMSPage({ sections }: { sections: CMSSection[] }) {
    const tocData = convertCMSData(sections)

    return (
        <TableOfContents variant="mobile">
            <TableOfContentsNav>
                {tocData.map((item) => (
                    <TableOfContentsItem key={item.id} href={`#${item.id}`}>
                        {item.title}
                    </TableOfContentsItem>
                ))}
            </TableOfContentsNav>
        </TableOfContents>
    )
}
```

### Conditional TOC Items

```tsx
const tocData = tableOfContentsData.filter(item => {
    // Show only level 2 items on mobile
    if (isMobile) return item.level === 2
    return true
})
```

### Custom Active State Logic

```tsx
<TableOfContentsItem
    href={`#${item.id}`}
    className={cn(
        "transition-all",
        isSpecialSection(item.id) && "bg-yellow-50 dark:bg-yellow-900/20"
    )}
>
    {item.title}
    {isSpecialSection(item.id) && <Badge>Important</Badge>}
</TableOfContentsItem>
```

---

## 📱 Responsive Behavior

| Screen Size | Mobile TOC | Desktop TOC |
|-------------|------------|-------------|
| `< xl` (< 1280px) | Visible (sticky breadcrumb) | Hidden |
| `≥ xl` (≥ 1280px) | Hidden | Visible (sidebar) |

**Control visibility:**

```tsx
// Mobile only
<TableOfContents variant="mobile" />  // Hides at xl+

// Desktop only
<TableOfContents variant="desktop" /> // Shows only at xl+
```

---

## ♿ Accessibility

- Semantic HTML (`<nav>`, `<ul>`, `<li>`, `<a>`)
- ARIA labels (`aria-label`, `aria-expanded`, `aria-controls`)
- Keyboard navigation support
- Focus management
- Screen reader friendly

---

## 🆚 Comparison with Old Version

| Feature | Old | New |
|---------|-----|-----|
| Architecture | Monolithic | Composable |
| Data Passing | External prop | Internal (like layout.tsx) |
| Styling | Fixed classes | Full className control |
| Server Component | ❌ | ✅ |
| Auto-Generation | ❌ | ✅ (optional) |
| Customization | Limited | Granular |
| Mobile Breadcrumb | ✅ | ✅ |
| Level Indentation | ✅ | ✅ (improved) |

---

## 🎓 Design Philosophy

This component follows the **same pattern as the new sidebar component**:

1. **Composable primitives** over configuration objects
2. **Context-driven** for shared state
3. **Flexible by default** with sensible defaults
4. **Server-first** with optional client enhancements
5. **Radix/shadcn-inspired** API design

**Like the sidebar refactor:**
- ✅ Small, focused components
- ✅ Easy to debug
- ✅ Flexible styling
- ✅ Clean break (no backward compatibility)

---

## 📝 Migration Guide

### Old (Monolithic)

```tsx
const tocItems = getTableOfContents()
<MobileViewTableOfContents items={tocItems} pageTitle="On this page" />
<DesktopViewTableOfContents items={tocItems} />
```

### New (Composable)

```tsx
const tableOfContentsData = [
    { id: "intro", title: "Introduction", level: 2 }
] satisfies TocItem[]

<TableOfContents variant="mobile">
    <TableOfContentsHeader title="On this page" />
    <TableOfContentsContent>
        <TableOfContentsNav>
            {tableOfContentsData.map(item => (
                <TableOfContentsItem href={`#${item.id}`}>
                    {item.title}
                </TableOfContentsItem>
            ))}
        </TableOfContentsNav>
    </TableOfContentsContent>
</TableOfContents>
```

---

## 🐛 Troubleshooting

### TOC not tracking active section
- Ensure headings have `id` attributes
- Check that heading IDs match `href` in TOC items

### Scroll jumps under header
- Add `scroll-mt-20` (or similar) to heading elements
- Or use `useAddScrollMargin()` hook

### Mobile menu won't close
- Ensure `variant="mobile"` is set
- Check that click outside handler isn't blocked

---

## 💡 Tips

1. **Use Server Components** when possible for better SEO
2. **Define data statically** (like `navigationSections` in layout.tsx)
3. **Use auto-generation** for dynamic content or blog posts
4. **Customize freely** - every component accepts `className`
5. **Match heading levels** - h2=level:2, h3=level:3, etc.

---

Built with ❤️ following the composable architecture pattern.


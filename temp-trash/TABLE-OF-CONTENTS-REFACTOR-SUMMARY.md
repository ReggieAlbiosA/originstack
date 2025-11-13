# Table of Contents - Refactor Complete ✅

## 🎯 Requirements Met

All requirements from your approval have been successfully implemented:

- ✅ **Auto-generation available** - `useAutoExtractHeadings()` hook
- ✅ **Page stays Server Component** - SEO-friendly, no hydration issues
- ✅ **Composable + granular styling** - Every component accepts className
- ✅ **Mobile breadcrumb kept** - "On this page > Active Section" pattern
- ✅ **Clean break** - No backward compatibility, fresh start
- ✅ **Level-based indentation** - Automatic visual hierarchy (h2=0, h3=1rem, h4=2rem)

---

## 📦 What Was Created

### 1. New Component File
**Location:** `/components/page/client/table-of-contents.tsx`

**Exports:**
```tsx
// Components
- TableOfContents
- TableOfContentsHeader
- TableOfContentsContent
- TableOfContentsNav
- TableOfContentsItem

// Hooks (Client-only)
- useAutoExtractHeadings()
- useAddScrollMargin()
- extractHeadingsFromDOM() (utility)

// Types
- TableOfContentsItem
```

**Size:** ~650 lines (well-documented, composable primitives)

---

### 2. Documentation Files

**Main Documentation:**
- `/components/page/client/README-TABLE-OF-CONTENTS-NEW.md` (comprehensive API reference)

**Examples:**
- `/components/page/client/table-of-contents-examples.tsx` (5 usage patterns)

---

### 3. Updated Pages

**Next.js Demo:**
- `/app/(nextjs-demo)/nextjs-demo/demo/page.tsx` ✅ Migrated

**React Demo:**
- `/app/(react-demo)/react-demo/demo/page.tsx` ✅ Migrated

Both now use:
- Internal data definition (like `navigationSections` in layout.tsx)
- Composable component structure
- Server component compatible
- Type-safe with `satisfies TocItem[]`

---

## 🏗️ Architecture Overview

### Pattern: Composable Primitives (Like New Sidebar)

```
┌─────────────────────────────────────┐
│ <TableOfContents>                   │ ← Root (Context Provider)
│   ┌─────────────────────────────┐   │
│   │ <TableOfContentsHeader>     │   │ ← Mobile trigger + breadcrumb
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │ <TableOfContentsContent>    │   │ ← Scrollable container
│   │   ┌─────────────────────┐   │   │
│   │   │ <TableOfContentsNav>│   │   │ ← Navigation wrapper
│   │   │   ┌─────────────┐   │   │   │
│   │   │   │ Item        │   │   │   │ ← Individual links
│   │   │   │ Item        │   │   │   │
│   │   │   │ Item        │   │   │   │
│   │   │   └─────────────┘   │   │   │
│   │   └─────────────────────┘   │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Context System

1. **TableOfContentsContext** - Active section tracking, variant config
2. **TableOfContentsMobileContext** - Open/close state for mobile

---

## 📊 Before vs After

### Old Pattern (Monolithic)

```tsx
// ❌ External function
function getTableOfContents() {
    return [...]
}

const tocItems = getTableOfContents()

// ❌ Props drilling
<MobileViewTableOfContents items={tocItems} pageTitle="On this page" />
<DesktopViewTableOfContents items={tocItems} />
```

**Problems:**
- Monolithic components
- External data function
- Props drilling
- Limited customization
- Hard to style individually

---

### New Pattern (Composable)

```tsx
// ✅ Internal data (like layout.tsx)
const tableOfContentsData = [
    { id: "intro", title: "Introduction", level: 2 }
] satisfies TocItem[]

// ✅ Composable structure
<TableOfContents variant="mobile" sticky topOffset={65}>
    <TableOfContentsHeader title="On this page" />
    <TableOfContentsContent>
        <TableOfContentsNav>
            {tableOfContentsData.map((item) => (
                <TableOfContentsItem href={`#${item.id}`} level={item.level}>
                    {item.title}
                </TableOfContentsItem>
            ))}
        </TableOfContentsNav>
    </TableOfContentsContent>
</TableOfContents>
```

**Benefits:**
- ✅ Small, focused components
- ✅ Internal data definition
- ✅ Flexible composition
- ✅ Full styling control
- ✅ Easy to debug
- ✅ Server component compatible

---

## 🎨 Customization Examples

### Custom Mobile TOC with Icons

```tsx
<TableOfContents variant="mobile" className="bg-gradient-to-r from-blue-50">
    <TableOfContentsHeader
        title="Quick Nav"
        icon={<MenuIcon />}
        className="hover:bg-blue-100"
    />
    <TableOfContentsContent maxHeight="80vh">
        <TableOfContentsNav>
            {tocData.map((item) => (
                <TableOfContentsItem
                    href={`#${item.id}`}
                    className="hover:scale-105 transition-transform"
                >
                    <div className="flex items-center gap-2">
                        {item.level === 2 && <ChevronRight />}
                        {item.title}
                        {item.level === 2 && <Badge>New</Badge>}
                    </div>
                </TableOfContentsItem>
            ))}
        </TableOfContentsNav>
    </TableOfContentsContent>
</TableOfContents>
```

**Every component accepts:**
- `className` prop
- `children` for custom content
- All standard HTML attributes

---

## 🤖 Auto-Generation Feature

### Client Component Usage

```tsx
'use client'

import { useAutoExtractHeadings } from '@/components/page/client/table-of-contents'

export default function BlogPost() {
    // 🔥 Auto-extract headings from DOM
    const tocData = useAutoExtractHeadings({
        containerSelector: 'article',
        levels: [2, 3],  // h2 and h3 only
        autoGenerateIds: true
    })

    return (
        <>
            <TableOfContents variant="mobile">
                <TableOfContentsNav>
                    {tocData.map((item) => (
                        <TableOfContentsItem href={`#${item.id}`}>
                            {item.title}
                        </TableOfContentsItem>
                    ))}
                </TableOfContentsNav>
            </TableOfContents>

            <article>
                <h2>Features</h2>  {/* ✅ Auto-detected */}
                <h3>Installation</h3>  {/* ✅ Auto-detected */}
            </article>
        </>
    )
}
```

**How it works:**
1. Hook scans DOM for specified heading levels
2. Extracts `id`, `title`, and `level`
3. Auto-generates IDs if missing (using slugify)
4. Returns plain data array
5. You compose the UI however you want

**The `levels` array:**
```tsx
levels: [2, 3, 4]  // Include h2, h3, h4
//       ↑  ↑  ↑
//       │  │  └─ <h4> tags
//       │  └──── <h3> tags
//       └─────── <h2> tags
```

---

## 🎯 Key Features

### 1. Server Component Compatible ✅

```tsx
// This is a SERVER COMPONENT (no 'use client')
export default function Page() {
    const tocData = [...] // Static data

    return <TableOfContents>...</TableOfContents>
}
```

**Benefits:**
- Better SEO
- Faster initial load
- No hydration issues
- Works with Next.js App Router

---

### 2. Mobile Breadcrumb Pattern ✅

Mobile view shows:
```
┌────────────────────────────────────────┐
│ ☰ On this page > Active Section    ▼  │
└────────────────────────────────────────┘
```

When opened:
```
┌────────────────────────────────────────┐
│ ☰ On this page > Introduction       ▲  │
├────────────────────────────────────────┤
│ Introduction                      [●]  │ ← Active
│   Getting Started                      │
│ Features                               │
│   Installation                         │
└────────────────────────────────────────┘
```

---

### 3. Level-Based Indentation ✅

```tsx
<TableOfContentsItem href="#intro" level={2}>     // No indent
<TableOfContentsItem href="#install" level={3}>   // 1 level indent
<TableOfContentsItem href="#detail" level={4}>    // 2 levels indent
```

**Desktop:** `paddingLeft: calc(0.75rem + ${indent * 0.75}rem)`
**Mobile:** `paddingLeft: ${16 + indent * 16}px`

Visual result:
```
Introduction              (h2)
  Getting Started         (h3)
    Prerequisites         (h4)
  Installation            (h3)
Features                  (h2)
```

---

### 4. Automatic Active Tracking ✅

- Tracks scroll position
- Highlights current section
- Updates URL hash
- Mobile breadcrumb updates
- Smooth scroll on click

---

## 📁 File Structure

```
components/page/client/
├── table-of-contents.tsx                      (NEW - Main component)
├── table-of-contents-examples.tsx             (NEW - Examples)
├── README-TABLE-OF-CONTENTS-NEW.md            (NEW - Documentation)
├── TABLE-OF-CONTENTS-REFACTOR-SUMMARY.md      (NEW - This file)
└── README-TABLE-OF-CONTENTS.md                (OLD - Can be archived)

app/(nextjs-demo)/nextjs-demo/demo/
└── page.tsx                                   (UPDATED - Uses new pattern)

app/(react-demo)/react-demo/demo/
└── page.tsx                                   (UPDATED - Uses new pattern)
```

---

## ✅ Testing Checklist

- [x] Mobile TOC renders correctly
- [x] Desktop TOC renders correctly
- [x] Breadcrumb shows active section on mobile
- [x] Menu opens/closes on mobile
- [x] Clicks outside close mobile menu
- [x] Active section highlights correctly
- [x] Smooth scroll works with proper offset
- [x] Level-based indentation displays correctly
- [x] URL hash updates on click
- [x] No linter errors
- [x] Server component compatible
- [x] TypeScript types work correctly
- [x] Both demo pages migrated successfully

---

## 🚀 Usage Patterns

### Pattern 1: Server Component (Recommended)

```tsx
// ✅ Best for SEO, static content
const tocData = [...] satisfies TocItem[]

export default function Page() {
    return <TableOfContents>...</TableOfContents>
}
```

### Pattern 2: Client Component with Auto-Generation

```tsx
'use client'

const tocData = useAutoExtractHeadings()
```

### Pattern 3: Dynamic Data (CMS, API)

```tsx
// Server or Client
const tocData = await fetchTocFromCMS()
```

---

## 🎓 Design Principles

This refactor follows the **same principles as the sidebar refactor**:

1. **Composable over Configuration**
   - Build with primitives, not config objects
   - User controls the structure

2. **Context-Driven State**
   - Shared state via Context
   - Components communicate without props drilling

3. **Flexible by Default**
   - Every component accepts className
   - Children for custom content
   - Sensible defaults

4. **Server-First**
   - Works in Server Components
   - Client features are optional enhancements

5. **Clean Break**
   - No backward compatibility
   - Fresh start with better patterns

---

## 💡 Migration Path

If you have other pages using the old component:

### Step 1: Update Imports

```tsx
// Old
import { MobileViewTableOfContents, DesktopViewTableOfContents } from '...'

// New
import {
    TableOfContents,
    TableOfContentsHeader,
    TableOfContentsContent,
    TableOfContentsNav,
    TableOfContentsItem,
    type TableOfContentsItem as TocItem,
} from '...'
```

### Step 2: Convert Data Function to Const

```tsx
// Old
function getTableOfContents() {
    return [...]
}
const tocItems = getTableOfContents()

// New
const tableOfContentsData = [...] satisfies TocItem[]
```

### Step 3: Replace Components

```tsx
// Old
<MobileViewTableOfContents items={tocItems} />

// New
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

## 📈 Performance

- ✅ Server-rendered by default (faster initial load)
- ✅ Client-side state only for interactivity
- ✅ Efficient scroll tracking (debounced)
- ✅ No unnecessary re-renders
- ✅ Tree-shakeable exports

---

## ♿ Accessibility

- ✅ Semantic HTML (`<nav>`, `<ul>`, `<li>`, `<a>`)
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Proper heading hierarchy

---

## 🎉 Summary

The Table of Contents component has been successfully refactored using the same composable architecture pattern as the sidebar component. It's now:

- **More maintainable** - Small, focused components
- **More flexible** - Compose any layout, style any part
- **Better DX** - Like shadcn/Radix, familiar API
- **SEO-friendly** - Server component compatible
- **Feature-rich** - Auto-generation, breadcrumb, active tracking
- **Well-documented** - Comprehensive API reference and examples

**All requirements met!** ✅

Ready for production use! 🚀


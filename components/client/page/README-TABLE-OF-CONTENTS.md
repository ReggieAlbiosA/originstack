# Table of Contents Components

## Overview

This file contains both **mobile** and **desktop** table of contents components for responsive navigation. Keeping both variants in one file reduces clutter and makes maintenance easier.

---

## Components

### 1. `MobileViewTableOfContents`
Mobile-friendly, collapsible TOC that sticks to the top of the page.

### 2. `DesktopViewTableOfContents`
Sidebar TOC for desktop screens with active section tracking.

---

## 📊 Features

### MobileViewTableOfContents
- ✅ **Mobile-Only Display** - Hidden on large screens (lg and above)
- ✅ **Sticky Positioning** - Stays at the top for easy access
- ✅ **Collapsible Interface** - Click to expand/collapse
- ✅ **Breadcrumb Display** - Shows current section when collapsed
- ✅ **Active Section Tracking** - Highlights current section
- ✅ **Smooth Scrolling** - Animated scroll with header offset
- ✅ **Auto-Close on Selection** - Menu closes after clicking
- ✅ **Click Outside to Close** - Closes when clicking outside
- ✅ **Hierarchical Display** - Nested headings with indentation
- ✅ **Dark Mode Support** - Full theme support
- ✅ **Accessibility** - ARIA labels and semantic HTML

### DesktopViewTableOfContents
- ✅ **Sticky Sidebar** - Remains visible while scrolling
- ✅ **Active Section Tracking** - Highlights current section
- ✅ **Smooth Scrolling** - Animated navigation
- ✅ **Hierarchical Display** - Indented nested headings
- ✅ **Dark Mode Support** - Full theme support
- ✅ **Accessibility** - ARIA labels and semantic HTML

---

## 🎯 Usage

### Basic Example

```tsx
import { 
    MobileViewTableOfContents, 
    DesktopViewTableOfContents 
} from "@/components/client/page/table-of-contents"

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
            {/* Mobile TOC - Sticky at top */}
            <MobileViewTableOfContents 
                items={tocItems} 
                pageTitle="On this page" 
            />

            <div className="xl:grid xl:grid-cols-[1fr_300px]">
                {/* Main content */}
                <main>
                    <h2 id="introduction">Introduction</h2>
                    <p>Content here...</p>

                    <h2 id="getting-started">Getting Started</h2>
                    <h3 id="installation">Installation</h3>
                    <p>Content here...</p>
                </main>

                {/* Desktop TOC - Sidebar */}
                <aside className="hidden xl:block">
                    <DesktopViewTableOfContents items={tocItems} />
                </aside>
            </div>
        </>
    )
}
```

---

## 📝 Props

### MobileViewTableOfContents

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TableOfContentsItem[]` | Required | Array of TOC items |
| `pageTitle` | `string` | `"On this page"` | Title shown when collapsed |

### DesktopViewTableOfContents

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TableOfContentsItem[]` | Required | Array of TOC items |

### TableOfContentsItem Type

```typescript
interface TableOfContentsItem {
    id: string      // HTML element ID (without #)
    title: string   // Display text
    level: number   // Heading level (2, 3, 4, etc.)
}
```

---

## 🎨 Styling

### MobileViewTableOfContents
- **Position**: Sticky at top with responsive offset
- **Max Height**: 70vh for scrollable content
- **Indentation**: 16px base + 16px per level
- **Active Color**: Blue accent with background

### DesktopViewTableOfContents
- **Position**: Sticky sidebar
- **Indentation**: 0.75rem per level
- **Active Color**: Blue accent with background
- **Hover**: Gray background highlight

---

## 🔧 Integration

### 1. Add IDs to Headings

```tsx
<h2 id="features-heading">Features</h2>
<h3 id="installation-guide">Installation Guide</h3>
```

### 2. Add Scroll Margin

Add scroll margin to headings to account for sticky headers:

```tsx
<section id="my-section" className="scroll-mt-20">
    <h2>My Section</h2>
</section>
```

### 3. Generate TOC Data

```tsx
function getTableOfContents() {
    return [
        { id: "section-1", title: "Section 1", level: 2 },
        { id: "subsection-1", title: "Subsection 1.1", level: 3 },
        { id: "section-2", title: "Section 2", level: 2 },
    ]
}
```

---

## 📱 Responsive Behavior

| Screen Size | Mobile TOC | Desktop TOC |
|-------------|------------|-------------|
| `< xl` (< 1280px) | Visible (sticky) | Hidden |
| `≥ xl` (≥ 1280px) | Hidden | Visible (sidebar) |

---

## ⚙️ Technical Details

### Scroll Tracking
- Uses scroll event listener
- Activates section within 100px of viewport top
- Updates URL hash on section change

### Scroll Offset
- Mobile: 80px header offset
- Desktop: Standard smooth scroll
- Prevents default anchor jump

### Event Handling
- Click outside listener for mobile auto-close
- Proper cleanup on unmount
- No memory leaks

---

## 🔄 Legacy Support

The old `TableOfContents` export is maintained for backwards compatibility:

```tsx
// Old way (still works)
import { TableOfContents } from "@/components/client/page/table-of-contents"

// New way (recommended)
import { DesktopViewTableOfContents } from "@/components/client/page/table-of-contents"
```

---

## ✨ Benefits of Consolidated Approach

### Before (Separate Files)
```
components/client/page/
  ├── table-of-contents.tsx
  ├── mobile-table-of-contents.tsx
  ├── README-TOC.md
  └── README-MOBILE-TOC.md
```

### After (Single File)
```
components/client/page/
  ├── table-of-contents.tsx  ← Both components here
  └── README-TABLE-OF-CONTENTS.md
```

**Advantages:**
- ✅ **Less clutter** - One file instead of two
- ✅ **Easier maintenance** - Changes in one place
- ✅ **Shared utilities** - Common hooks and functions
- ✅ **Better organization** - Related components together
- ✅ **Consistent API** - Same props structure
- ✅ **Single source of truth** - No duplicate logic

---

## 📚 Related Components

- `PageNavigation` - Previous/Next page navigation
- `Sidebar` - Main navigation sidebar
- `MobileMainNavMenu` - Mobile navigation menu

---

## 🚀 Example Usage in Codebase

See: `/app/(react-demo)/react-demo/demo/page.tsx`

```tsx
import { 
    DesktopViewTableOfContents, 
    MobileViewTableOfContents 
} from "@/components/client/page/table-of-contents"

export default function DemoPage() {
    const tocItems = getTableOfContents()

    return (
        <>
            <MobileViewTableOfContents 
                items={tocItems} 
                pageTitle="On this page" 
            />
            
            <div className="xl:grid xl:grid-cols-[1fr_285px]">
                <main>{/* content */}</main>
                
                <aside className="hidden xl:block">
                    <DesktopViewTableOfContents items={tocItems} />
                </aside>
            </div>
        </>
    )
}
```

---

## 🎯 Best Practices

### ✅ DO
```tsx
// Use both components for responsive experience
<MobileViewTableOfContents items={items} />
<DesktopViewTableOfContents items={items} />

// Add scroll margins to sections
<section className="scroll-mt-20" id="my-section">

// Generate TOC from actual content structure
const items = sections.map(s => ({ 
    id: s.id, 
    title: s.title, 
    level: s.level 
}))
```

### ❌ DON'T
```tsx
// Don't use only one variant
<DesktopViewTableOfContents /> // Bad on mobile

// Don't forget IDs on headings
<h2>My Heading</h2> // Needs id="my-heading"

// Don't hardcode TOC items when content is dynamic
const items = [{ id: "fixed", ... }] // Generate from content instead
```

---

## 🔮 Future Enhancements

- [ ] Add keyboard navigation support
- [ ] Support for dynamic content updates
- [ ] Customizable scroll offset prop
- [ ] Optional progress indicator
- [ ] Collapsible nested sections
- [ ] Search/filter functionality

---

**Result:** Clean, maintainable, and organized TOC components in a single file! 🎉



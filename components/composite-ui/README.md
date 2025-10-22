# Composite UI Components

A collection of highly reusable, composable UI components designed for consistency and flexibility across your Next.js application.

## 📋 Table of Contents

- [Overview](#overview)
- [Why Composite UI?](#why-composite-ui)
- [Components](#components)
- [Usage](#usage)
- [Best Practices](#best-practices)
- [Pros & Cons](#pros--cons)

## 🎯 Overview

Composite UI components combine multiple smaller components into cohesive, reusable units. Instead of repeating complex UI patterns across layouts, you centralize them into well-tested, maintainable components.

## 🤔 Why Composite UI?

### **The Problem:**

```tsx
// Before: Repeated in every layout (130+ lines)
<header className="sticky top-0...">
  <nav className="mx-auto...">
    <div className="flex items-center gap-8">
      <Link href="/">
        <div className="flex items-center...">
          <Logo />
          <span>My App</span>
        </div>
      </Link>
    </div>
    <div className="flex items-center gap-4">
      <CustomNavigationMenu items={items} className="hidden lg:flex" />
      <div className="bg-zinc-300 h-6 w-[1px]" />
      <CommandPalette docsItems={docs} />
      <div className="bg-zinc-300 h-6 w-[1px]" />
      <a href="https://github.com...">
        <SiGithub className="w-5 h-5" />
      </a>
      <LargeScreenThemeToggle className="hidden lg:flex" />
      <MenuButton navigationItems={items} className="flex lg:hidden" />
    </div>
  </nav>
</header>
```

**Issues:**
- ❌ 130+ lines of repeated code
- ❌ Hard to maintain (change in one place = update everywhere)
- ❌ Inconsistent styling across layouts
- ❌ Mixed concerns (structure + styling + logic)
- ❌ Difficult to test

### **The Solution:**

```tsx
// After: Clean and reusable (10 lines)
<Header
  siteBrand={{ logo: MyLogo, name: "My App", href: "/" }}
  navigationItems={navigationItems}
  searchDocsItems={sidebarConfig}
  githubLink={{ href: "https://github.com/..." }}
/>
```

**Benefits:**
- ✅ 10 lines vs 130+ lines (92% reduction)
- ✅ Single source of truth
- ✅ Consistent UI everywhere
- ✅ Easy to maintain and update
- ✅ Testable and documented

## 📦 Components

### Header

A complete header solution with navigation, search, theme toggle, and mobile menu.

**Props:**

```typescript
interface HeaderProps {
  // Required
  siteBrand: SiteBrand;
  navigationItems: NavItem[];

  // Optional (with defaults)
  searchDocsItems?: SidebarConfig;
  githubLink?: GitHubLink;
  showThemeToggle?: boolean;  // default: true
  showSearch?: boolean;       // default: true
  showGitHub?: boolean;       // default: true
  showMobileMenu?: boolean;   // default: true

  // Customization slots
  leftContent?: ReactNode;
  rightContent?: ReactNode;

  // Styling
  className?: string;
  containerClassName?: string;
}
```

**Features:**
- ✅ Responsive (mobile + desktop)
- ✅ Server-rendered dropdown content support
- ✅ Integrated search (command palette)
- ✅ Theme toggle (dark/light mode)
- ✅ Mobile menu with hamburger icon
- ✅ Accessible (ARIA labels)
- ✅ Customizable through props
- ✅ Content slots for advanced use cases

## 📖 Usage

### Basic Usage

```tsx
import Header from "@/components/composite-ui/header";

export default function Layout({ children }) {
  return (
    <Header
      siteBrand={{
        logo: MyLogo,
        name: "My App",
        description: "Build amazing things",
        href: "/",
      }}
      navigationItems={navigationItems}
      searchDocsItems={sidebarConfig}
      githubLink={{ href: "https://github.com/myuser/myrepo" }}
    />
  );
}
```

### Minimal Header

```tsx
<Header
  siteBrand={{ logo: MyLogo, name: "My App", href: "/" }}
  navigationItems={navigationItems}
  showSearch={false}
  showGitHub={false}
  showThemeToggle={false}
/>
```

### With Server-Rendered Dropdowns

```tsx
function DropdownContent({ items }) {
  return (
    <ul className="grid gap-2 p-4">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>
            <div>{item.label}</div>
            <p>{item.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Layout() {
  const enhancedNavItems = navigationItems.map((item) => {
    if (item.type === "sub" && item.children) {
      return {
        ...item,
        dropdownContent: <DropdownContent items={item.children} />,
      };
    }
    return item;
  });

  return (
    <Header
      siteBrand={{ logo: MyLogo, name: "My App", href: "/" }}
      navigationItems={enhancedNavItems}
    />
  );
}
```

### With Custom Content Slots

```tsx
<Header
  siteBrand={{ logo: MyLogo, name: "My App", href: "/" }}
  navigationItems={navigationItems}
  leftContent={
    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
      v2.0
    </span>
  }
  rightContent={
    <button className="px-3 py-1.5 bg-blue-600 text-white rounded">
      Get Started
    </button>
  }
/>
```

### With Custom Styling

```tsx
<Header
  siteBrand={{ logo: MyLogo, name: "My App", href: "/" }}
  navigationItems={navigationItems}
  className="border-b-2 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50"
  containerClassName="max-w-7xl"
/>
```

## ✅ Best Practices

### 1. **Use Sensible Defaults**

```tsx
// Good: Sensible defaults in component
showThemeToggle = true,
showSearch = true,
showGitHub = true,

// Usage: Only override when needed
<Header {...props} showGitHub={false} />
```

### 2. **Keep It Flexible**

```tsx
// Good: Provide escape hatches
leftContent?: ReactNode;
rightContent?: ReactNode;
className?: string;

// Allows customization without modifying the component
```

### 3. **Separate Server and Client**

```tsx
// Good: Server component for static content
function DropdownContent() {
  return <ul>...</ul>; // Server-rendered
}

// Client component for interactivity
<Header navigationItems={items} /> // Client interactions handled internally
```

### 4. **Export Types**

```tsx
// Good: Export types for consumers
export type { HeaderProps, SiteBrand, GitHubLink };

// Consumers can extend and reuse
import type { SiteBrand } from "@/components/composite-ui/header";
```

### 5. **Document with Examples**

```tsx
/**
 * @example
 * ```tsx
 * <Header
 *   siteBrand={{ logo: MyLogo, name: "My App", href: "/" }}
 *   navigationItems={items}
 * />
 * ```
 */
```

## ⚖️ Pros & Cons

### ✅ Pros

| Benefit | Description |
|---------|-------------|
| **Consistency** | Same look and feel across all pages |
| **Maintainability** | Update once, reflect everywhere |
| **Testability** | Test once, works everywhere |
| **DRY Principle** | Don't repeat yourself |
| **Type Safety** | Full TypeScript support |
| **Documentation** | Centralized docs and examples |
| **Performance** | Optimized once, benefits all |

### ⚠️ Cons

| Challenge | Mitigation |
|-----------|------------|
| **Over-abstraction** | Keep it simple, avoid premature optimization |
| **Rigidity** | Provide customization props and content slots |
| **Hidden Complexity** | Document well, provide examples |
| **Learning Curve** | Good types and examples reduce this |
| **Version Conflicts** | Use proper versioning and changelog |

## 🎯 When to Use Composite UI

### ✅ **Use Composite UI When:**

- ✅ You have repeated UI patterns (headers, footers, navbars)
- ✅ You need consistency across multiple layouts
- ✅ You want to reduce duplication
- ✅ You have a design system
- ✅ You're building a scalable application
- ✅ You have multiple developers on the team

### ❌ **Don't Use Composite UI When:**

- ❌ You have only one or two uses
- ❌ Each instance needs to be completely different
- ❌ You're prototyping/MVP (premature optimization)
- ❌ The abstraction is harder to understand than the original

## 🔄 Migration Path

### Step 1: Identify Repeated Patterns

Look for UI code repeated across layouts:
- Headers
- Footers
- Navigation
- Sidebars

### Step 2: Extract to Composite Component

Create a new component with:
- Props for customization
- Sensible defaults
- Type definitions
- Documentation

### Step 3: Gradually Replace

```tsx
// Before
<header>
  {/* 130 lines */}
</header>

// After
<Header {...props} />
```

### Step 4: Iterate and Improve

Based on usage:
- Add more props
- Improve flexibility
- Fix edge cases
- Update documentation

## 📚 Further Reading

- [Compound Components Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Component Composition](https://reactjs.org/docs/composition-vs-inheritance.html)
- [Design Systems](https://www.designsystems.com/)

## 🎓 Related TypeScript Concepts

From your `ts-fundamentals` folder:

- **interface-declaration.tsx** - Defining component prop interfaces
- **optional-properties.tsx** - Making props optional with defaults
- **union-types.tsx** - Variants and configuration options
- **generic-types.tsx** - Making components reusable
- **type-intersection.tsx** - Composing complex prop types

---

**Remember:** The goal of composite components is to **reduce complexity**, not hide it. If your composite component becomes too complex, consider breaking it down further or providing more customization options.


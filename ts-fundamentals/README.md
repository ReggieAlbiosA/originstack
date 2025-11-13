# TypeScript Fundamentals for Next.js

A comprehensive collection of TypeScript fundamental concepts organized for learning and reference in Next.js development.

## Overview

This directory contains practical examples of TypeScript features specifically tailored for Next.js App Router development, separated into **Client Components** and **Server Components**.

## Structure

```
ts-fundamentals/
├── client-component/     # Client-side TypeScript fundamentals
│   ├── beginner/         # 8 files - Basic TS concepts
│   ├── intermediate/     # 8 files - Intermediate TS features
│   ├── advanced/         # 8 files - Advanced TS patterns
│   └── README.md
├── server-component/     # Server-side TypeScript fundamentals (TODO)
└── README.md            # This file
```

## Client Components (24 Files)

### Beginner (8)
1. **primitive-types** - string, number, boolean, null, undefined
2. **interface-declaration** - Defining object shapes for props
3. **type-alias** - Creating custom type names
4. **optional-properties** - Using ? for optional fields
5. **array-types** - Type[] and Array<Type> syntax
6. **function-types** - Typing functions and callbacks
7. **union-types** - Combining types with |
8. **enum-types** - Numeric and string enums

### Intermediate (8)
9. **generic-types** - Reusable type parameters <T>
10. **type-intersection** - Combining types with &
11. **type-guards** - typeof, instanceof, custom guards
12. **utility-types** - Partial, Pick, Omit, Record, etc.
13. **discriminated-unions** - Tagged unions for type safety
14. **indexed-access-types** - Type['property'] syntax
15. **typeof-operator** - Extracting types from values
16. **keyof-operator** - Creating unions of object keys

### Advanced (8)
17. **mapped-types** - Transforming types by mapping
18. **conditional-types** - T extends U ? X : Y syntax
19. **template-literal-types** - Template string types
20. **infer-keyword** - Type inference in conditionals
21. **recursive-types** - Self-referencing definitions
22. **branded-types** - Nominal typing for primitives
23. **const-assertions** - as const for literal types
24. **variance-annotations** - Covariance and contravariance

## Server Components

*Coming soon* - TypeScript fundamentals specific to Server Components, including:
- Async component types
- Server action types
- Database query types
- API response types
- And more...

## Quick Start

Navigate to the `client-component` directory and explore files based on your skill level:

```bash
cd ts-fundamentals/client-component

# For beginners
cd beginner

# For intermediate users
cd intermediate

# For advanced users
cd advanced
```

## Key Features

✅ **24 Client Component Examples** - Comprehensive coverage of TS in client components
✅ **3 Difficulty Levels** - Progressive learning path
✅ **Next.js Specific** - All examples use Next.js App Router patterns
✅ **Interactive Examples** - Each file is a working component with state
✅ **Well Documented** - Clear comments explaining each concept
✅ **No Linter Errors** - Production-ready TypeScript code
✅ **Organized Structure** - Easy to find what you need

## Learning Approach

1. **Sequential Learning**: Start from beginner and work your way up
2. **Reference Guide**: Jump to specific concepts as needed
3. **Practical Examples**: See TypeScript in real Next.js contexts
4. **Incremental Complexity**: Build understanding step by step

## File Naming Convention

Files are named after the **TypeScript fundamental** they demonstrate, not the implementation or feature. This makes it easy to:
- Find concepts quickly
- Understand what each file teaches
- Reference specific TypeScript features
- Build a mental model of TypeScript

## Use Cases

- **Learning TypeScript**: Systematic approach to TS concepts
- **Reference Material**: Quick lookup for specific patterns
- **Team Training**: Onboard developers to TypeScript + Next.js
- **Code Review**: Examples of proper type usage
- **Interview Prep**: Cover common TypeScript questions

## TypeScript + Next.js Best Practices

All examples follow these principles:
- ✅ Strong type safety throughout
- ✅ Proper use of 'use client' directive
- ✅ React hooks with correct types
- ✅ Props interfaces for all components
- ✅ Type inference where beneficial
- ✅ Explicit types where clarity is needed

## Contributing

This is a learning resource. Each file should:
- Focus on ONE TypeScript concept
- Include practical Next.js examples
- Have clear documentation
- Be a working component
- Follow consistent patterns

## Next Steps

1. Explore `client-component/beginner/` if you're new to TypeScript
2. Review `client-component/intermediate/` to level up your skills
3. Master `client-component/advanced/` for expert-level patterns
4. Check back for `server-component/` examples (coming soon)

---

**Created for**: Next.js App Router development with TypeScript
**Focus**: Practical, real-world TypeScript patterns
**Skill Levels**: Beginner → Intermediate → Advanced


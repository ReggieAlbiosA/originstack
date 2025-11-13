# Client Component TypeScript Fundamentals - Quick Reference

## 📁 Beginner Level (8 files)

| # | File | Concept | Key Features |
|---|------|---------|--------------|
| 1 | `primitive-types.tsx` | Primitive Types | string, number, boolean, null, undefined, optional properties |
| 2 | `interface-declaration.tsx` | Interfaces | Defining object shapes, ReactNode, component props |
| 3 | `type-alias.tsx` | Type Aliases | Custom type names, alternative to interfaces |
| 4 | `optional-properties.tsx` | Optional Properties | `?` operator, default values, conditional rendering |
| 5 | `array-types.tsx` | Array Types | `Type[]`, `Array<Type>`, arrays in props/state |
| 6 | `function-types.tsx` | Function Types | Parameters, return types, callback functions |
| 7 | `union-types.tsx` | Union Types | `\|` operator, string literals, multiple types |
| 8 | `enum-types.tsx` | Enums | Numeric enums, string enums, named constants |

## 📁 Intermediate Level (8 files)

| # | File | Concept | Key Features |
|---|------|---------|--------------|
| 9 | `generic-types.tsx` | Generics | `<T>`, reusable types, type parameters, constraints |
| 10 | `type-intersection.tsx` | Type Intersection | `&` operator, merging types, composite types |
| 11 | `type-guards.tsx` | Type Guards | `typeof`, `instanceof`, custom guards with `is` |
| 12 | `utility-types.tsx` | Utility Types | Partial, Required, Pick, Omit, Record, Readonly |
| 13 | `discriminated-unions.tsx` | Discriminated Unions | Tagged unions, type narrowing, state machines |
| 14 | `indexed-access-types.tsx` | Indexed Access | `Type['property']`, extracting nested types |
| 15 | `typeof-operator.tsx` | typeof Operator | Extract types from values, Parameters, ReturnType |
| 16 | `keyof-operator.tsx` | keyof Operator | Union of keys, type-safe property access |

## 📁 Advanced Level (8 files)

| # | File | Concept | Key Features |
|---|------|---------|--------------|
| 17 | `mapped-types.tsx` | Mapped Types | `[K in keyof T]`, transforming types, key remapping |
| 18 | `conditional-types.tsx` | Conditional Types | `T extends U ? X : Y`, type inference, distributive |
| 19 | `template-literal-types.tsx` | Template Literals | Template string types, dynamic strings |
| 20 | `infer-keyword.tsx` | infer Keyword | Type inference in conditionals, extracting types |
| 21 | `recursive-types.tsx` | Recursive Types | Self-referencing, nested structures, trees |
| 22 | `branded-types.tsx` | Branded Types | Nominal typing, distinct primitive types, type safety |
| 23 | `const-assertions.tsx` | const Assertions | `as const`, literal types, readonly, immutability |
| 24 | `variance-annotations.tsx` | Variance | Covariance (`out`), contravariance (`in`), invariance |

## 🎯 Quick Navigation by Use Case

### Working with Props
- `primitive-types.tsx` - Basic prop types
- `interface-declaration.tsx` - Complex prop objects
- `optional-properties.tsx` - Optional props
- `function-types.tsx` - Callback props
- `generic-types.tsx` - Reusable component props

### State Management
- `union-types.tsx` - Status states
- `discriminated-unions.tsx` - Complex state machines
- `type-guards.tsx` - State type narrowing

### Type Transformations
- `utility-types.tsx` - Built-in transformations
- `mapped-types.tsx` - Custom transformations
- `conditional-types.tsx` - Conditional transformations

### Type Extraction
- `typeof-operator.tsx` - Extract from values
- `keyof-operator.tsx` - Extract keys
- `indexed-access-types.tsx` - Extract nested types
- `infer-keyword.tsx` - Advanced extraction

### Advanced Patterns
- `recursive-types.tsx` - Nested data structures
- `branded-types.tsx` - Type-safe primitives
- `template-literal-types.tsx` - Dynamic string types
- `variance-annotations.tsx` - Type relationships

## 📊 Complexity Matrix

```
SIMPLE ────────────────────────────────────── COMPLEX

Beginner:
├─ primitive-types
├─ interface-declaration
├─ type-alias
├─ optional-properties
├─ array-types
├─ function-types
├─ union-types
└─ enum-types

Intermediate:
├─ generic-types
├─ type-intersection
├─ type-guards
├─ utility-types
├─ discriminated-unions
├─ indexed-access-types
├─ typeof-operator
└─ keyof-operator

Advanced:
├─ mapped-types
├─ conditional-types
├─ template-literal-types
├─ infer-keyword
├─ recursive-types
├─ branded-types
├─ const-assertions
└─ variance-annotations
```

## 🔍 Search by TypeScript Feature

### Type Definitions
- Interfaces: `interface-declaration.tsx`
- Type Aliases: `type-alias.tsx`
- Enums: `enum-types.tsx`

### Type Operations
- Union: `union-types.tsx`
- Intersection: `type-intersection.tsx`
- Conditional: `conditional-types.tsx`
- Mapped: `mapped-types.tsx`

### Type Utilities
- Built-in: `utility-types.tsx`
- typeof: `typeof-operator.tsx`
- keyof: `keyof-operator.tsx`
- infer: `infer-keyword.tsx`

### Type Modifiers
- Optional: `optional-properties.tsx`
- Readonly: `const-assertions.tsx`
- Const: `const-assertions.tsx`
- Variance: `variance-annotations.tsx`

### Advanced Features
- Generics: `generic-types.tsx`
- Guards: `type-guards.tsx`
- Branded: `branded-types.tsx`
- Recursive: `recursive-types.tsx`
- Template Literals: `template-literal-types.tsx`

## 💡 Learning Tips

1. **Start Simple**: Begin with beginner files before jumping to advanced
2. **Hands-On**: Run each component and experiment with the code
3. **Read Comments**: Each file has detailed explanations
4. **Type Errors**: Try breaking the types to understand constraints
5. **Build Patterns**: Combine multiple concepts in your own components

## 🚀 Common Patterns

### API Response Typing
→ `discriminated-unions.tsx` + `utility-types.tsx`

### Form Handling
→ `interface-declaration.tsx` + `optional-properties.tsx`

### Reusable Components
→ `generic-types.tsx` + `function-types.tsx`

### Complex State
→ `discriminated-unions.tsx` + `type-guards.tsx`

### Type-Safe Routes
→ `template-literal-types.tsx` + `const-assertions.tsx`

### Data Validation
→ `branded-types.tsx` + `type-guards.tsx`

---

**Total Files**: 24 TypeScript fundamentals
**All Examples**: Next.js App Router compatible
**Status**: ✅ No linter errors


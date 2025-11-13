# TypeScript Fundamentals for Next.js Client Components

This directory contains TypeScript fundamental concepts organized by difficulty level, specifically focused on client component development in Next.js App Router.

## Directory Structure

```
client-component/
├── beginner/
│   ├── primitive-types.tsx
│   ├── interface-declaration.tsx
│   ├── type-alias.tsx
│   ├── optional-properties.tsx
│   ├── array-types.tsx
│   ├── function-types.tsx
│   ├── union-types.tsx
│   └── enum-types.tsx
├── intermediate/
│   ├── generic-types.tsx
│   ├── type-intersection.tsx
│   ├── type-guards.tsx
│   ├── utility-types.tsx
│   ├── discriminated-unions.tsx
│   ├── indexed-access-types.tsx
│   ├── typeof-operator.tsx
│   └── keyof-operator.tsx
└── advanced/
    ├── mapped-types.tsx
    ├── conditional-types.tsx
    ├── template-literal-types.tsx
    ├── infer-keyword.tsx
    ├── recursive-types.tsx
    ├── branded-types.tsx
    ├── const-assertions.tsx
    └── variance-annotations.tsx
```

## Beginner Level

### 1. **primitive-types.tsx**
- Basic TypeScript types: `string`, `number`, `boolean`, `null`, `undefined`
- Optional properties with `?`
- Usage in props and state

### 2. **interface-declaration.tsx**
- Defining object shapes with `interface`
- Typing component props
- `ReactNode` for children

### 3. **type-alias.tsx**
- Creating custom types with `type`
- Union types for status values
- Object and array types

### 4. **optional-properties.tsx**
- Using `?` for optional fields
- Default parameter values
- Conditional rendering based on optional props

### 5. **array-types.tsx**
- `Type[]` syntax
- `Array<Type>` syntax
- Typing arrays in props and state

### 6. **function-types.tsx**
- Typing function parameters and return types
- Callback function types in props
- Event handlers

### 7. **union-types.tsx**
- Combining types with `|`
- String literal unions
- Multiple possible types for a value

### 8. **enum-types.tsx**
- Numeric and string enums
- Named constants
- Type-safe enum values

## Intermediate Level

### 9. **generic-types.tsx**
- Reusable type parameters with `<T>`
- Generic components and functions
- Type constraints with `extends`

### 10. **type-intersection.tsx**
- Combining types with `&`
- Merging multiple interfaces
- Composing complex types

### 11. **type-guards.tsx**
- `typeof` and `instanceof` checks
- Custom type guard functions with `is`
- Type narrowing

### 12. **utility-types.tsx**
- `Partial`, `Required`, `Pick`, `Omit`
- `Record`, `Readonly`
- Built-in type transformations

### 13. **discriminated-unions.tsx**
- Tagged unions with discriminant properties
- Type narrowing with `switch` statements
- API state management patterns

### 14. **indexed-access-types.tsx**
- Accessing property types with `Type['property']`
- Extracting nested types
- Array element types with `Type[number]`

### 15. **typeof-operator.tsx**
- Extracting types from values
- `typeof` for objects and functions
- `Parameters<typeof fn>` and `ReturnType<typeof fn>`

### 16. **keyof-operator.tsx**
- Creating unions of object keys
- Type-safe property access
- Dynamic key handling

## Advanced Level

### 17. **mapped-types.tsx**
- Transforming types by mapping over properties
- `[K in keyof T]` syntax
- Creating derived types (Optional, Readonly, Nullable)
- Key remapping with `as`

### 18. **conditional-types.tsx**
- `T extends U ? X : Y` syntax
- Type inference with conditionals
- `infer` keyword introduction
- Unwrapping types (Promise, Array)

### 19. **template-literal-types.tsx**
- String literal types with template syntax
- Creating dynamic string types
- CSS properties, event handlers
- API route typing

### 20. **infer-keyword.tsx**
- Type inference within conditional types
- Extracting return types and parameters
- Deep property type extraction
- Unwrapping Promise and Array types

### 21. **recursive-types.tsx**
- Self-referencing type definitions
- Nested structures (comments, file systems)
- JSON types
- Deep readonly and partial types

### 22. **branded-types.tsx**
- Nominal typing in TypeScript
- Creating distinct types from primitives
- Type safety for IDs, tokens, emails
- Brand symbols and type constructors

### 23. **const-assertions.tsx**
- `as const` for literal types
- Readonly and immutable inference
- Enum-like patterns
- Tuple types preservation

### 24. **variance-annotations.tsx**
- Covariance with `out` modifier
- Contravariance with `in` modifier
- Producers and consumers
- Type parameter variance

## Usage

Each file is a standalone Next.js client component that demonstrates a specific TypeScript concept. All components include:
- Clear documentation comments
- Practical examples relevant to React/Next.js
- Interactive demonstrations with state
- Type annotations for learning

## Learning Path

1. **Start with Beginner**: Master the basics before moving on
2. **Progress to Intermediate**: Build on foundational knowledge
3. **Advance to Advanced**: Tackle complex type manipulations

## Best Practices

- Each file focuses on ONE TypeScript fundamental
- All files are `'use client'` components
- Examples are practical and Next.js-specific
- Code is well-commented for learning purposes
- Type safety is demonstrated throughout

## Notes

- These files are educational resources, not production components
- Focus is on TypeScript concepts, not UI/UX
- Each concept is isolated for easier understanding
- Examples show real-world Next.js patterns


# TypeScript Fundamentals - Use Cases Guide

This document provides a quick overview of when to use each TypeScript concept. Each file now includes detailed use case comments at the end.

## 🎯 Quick Reference: When to Use Each Concept

### Beginner Level

#### 1. **primitive-types.tsx**
**Use for:** Form inputs, simple props, basic state, API data fields, configuration values
**When:** Starting any new component, need simple type annotations

#### 2. **interface-declaration.tsx**
**Use for:** Component props with multiple fields, API response types, data models, database entities
**When:** Objects with related properties, need to extend types later

#### 3. **type-alias.tsx**
**Use for:** Union types, complex type combinations, function signatures, non-object types
**When:** Need unions (can't use interface), want flexibility, internal types

#### 4. **optional-properties.tsx**
**Use for:** Non-required props, optional config, incomplete data, feature flags, metadata
**When:** Props aren't mandatory, want default values, backwards compatibility

#### 5. **array-types.tsx**
**Use for:** Lists, tables, dropdowns, API collections, navigation, tags, search results
**When:** Iterating collections, rendering dynamic lists, handling multiple records

#### 6. **function-types.tsx**
**Use for:** Event handlers, callback props, custom hooks, API calls, validators, formatters
**When:** Passing functions as props, typing callbacks, service functions

#### 7. **union-types.tsx**
**Use for:** Status values, themes, variants, sizes, flexible props, conditional rendering
**When:** Value can be one of several options, restrict to specific set

#### 8. **enum-types.tsx**
**Use for:** Constants, status codes, directions, permissions, categories, priorities
**When:** Need reverse mapping, numeric constants, namespace for constants

### Intermediate Level

#### 9. **generic-types.tsx**
**Use for:** Reusable components, API wrappers, form builders, data grids, custom hooks
**When:** Reuse logic across different types, need type safety without duplication

#### 10. **type-intersection.tsx**
**Use for:** Mixing props, entity composition, HOC props, extending types, trait composition
**When:** Need all properties from multiple types, composition over inheritance

#### 11. **type-guards.tsx**
**Use for:** Union type handling, API responses, event handling, form validation, null checks
**When:** Working with unions needing runtime checks, safe null handling

#### 12. **utility-types.tsx**
**Use for:** Partial updates, form state, DTOs, sanitization, dictionaries, immutability
**When:** Transform types for different contexts (PATCH, DTO, config)

#### 13. **discriminated-unions.tsx**
**Use for:** API states, form steps, Redux actions, events, WebSocket messages, state machines
**When:** Type can be one of several variants with different data

#### 14. **indexed-access-types.tsx**
**Use for:** Nested type extraction, array elements, API parsing, ORM models, state slices
**When:** Need types from specific properties, avoid duplication

#### 15. **typeof-operator.tsx**
**Use for:** Config objects, function types, constants, mock data, library functions
**When:** Have runtime value and need its type, avoid duplicate definitions

#### 16. **keyof-operator.tsx**
**Use for:** Dynamic property access, form field names, dropdowns, generic getters, columns
**When:** Constrain values to valid keys, type-safe property access

### Advanced Level

#### 17. **mapped-types.tsx**
**Use for:** API transformations, form states, validation, deep modifications, key remapping
**When:** Transform all properties systematically, domain-specific utilities

#### 18. **conditional-types.tsx**
**Use for:** Type filtering, extraction, function overloads, API responses, unwrapping
**When:** Return type depends on input, type-level conditional logic

#### 19. **template-literal-types.tsx**
**Use for:** CSS classes, event handlers, API routes, data attributes, CSS variables
**When:** Combine string literals, type-safe string APIs, naming conventions

#### 20. **infer-keyword.tsx**
**Use for:** Promise unwrapping, function signatures, array elements, nested types, HOC types
**When:** Extract types from generic types, advanced utility types

#### 21. **recursive-types.tsx**
**Use for:** Tree structures, nested comments, JSON, menus, forms, GraphQL, linked lists
**When:** Data has arbitrary nesting depth, hierarchical relationships

#### 22. **branded-types.tsx**
**Use for:** ID types, validation, units, tokens, sanitization, currencies, coordinates
**When:** Distinguish structurally identical types, prevent misuse of primitives

#### 23. **const-assertions.tsx**
**Use for:** Configuration, routes, status constants, themes, tuples, API constants
**When:** Want literal types, immutable objects, preserve tuples, avoid enums

#### 24. **variance-annotations.tsx**
**Use for:** Event handlers, callbacks, collections, observers, factories, streams, plugins
**When:** Working with producer/consumer patterns, complex generic APIs

---

## 📋 Use Case Categories

### Form Handling
- `primitive-types.tsx` - Basic form fields
- `optional-properties.tsx` - Optional fields
- `utility-types.tsx` - Partial updates
- `discriminated-unions.tsx` - Multi-step forms
- `keyof-operator.tsx` - Field names

### API Integration
- `interface-declaration.tsx` - Response types
- `type-alias.tsx` - Request/response payloads
- `generic-types.tsx` - Generic wrappers
- `discriminated-unions.tsx` - Loading/success/error states
- `utility-types.tsx` - DTOs and sanitization
- `indexed-access-types.tsx` - Response parsing

### Component Development
- `primitive-types.tsx` - Simple props
- `interface-declaration.tsx` - Complex props
- `function-types.tsx` - Callback props
- `generic-types.tsx` - Reusable components
- `union-types.tsx` - Variants and themes

### State Management
- `discriminated-unions.tsx` - Complex states
- `type-guards.tsx` - State narrowing
- `utility-types.tsx` - Derived state
- `recursive-types.tsx` - Nested state

### Type Safety
- `branded-types.tsx` - Prevent ID mixing
- `const-assertions.tsx` - Immutable values
- `type-guards.tsx` - Runtime validation
- `template-literal-types.tsx` - String safety

### Advanced Patterns
- `mapped-types.tsx` - Type transformations
- `conditional-types.tsx` - Conditional logic
- `infer-keyword.tsx` - Type extraction
- `recursive-types.tsx` - Self-referencing
- `variance-annotations.tsx` - Producer/consumer

---

## 💡 Decision Tree

```
Need to type...

├─ Simple value (string, number, boolean)
│  └─ Use: primitive-types.tsx
│
├─ Object with multiple properties
│  ├─ Might extend later → interface-declaration.tsx
│  └─ Won't extend → type-alias.tsx
│
├─ Value that can be multiple things
│  ├─ Different literal values → union-types.tsx
│  ├─ Different structures → discriminated-unions.tsx
│  └─ Old-style constants → enum-types.tsx
│
├─ Function or callback
│  └─ Use: function-types.tsx
│
├─ Array or list
│  └─ Use: array-types.tsx
│
├─ Optional value
│  └─ Use: optional-properties.tsx
│
├─ Reusable across types
│  └─ Use: generic-types.tsx
│
├─ Combine multiple types
│  ├─ Need all properties → type-intersection.tsx
│  └─ One of several → union-types.tsx
│
├─ Need runtime type checking
│  └─ Use: type-guards.tsx
│
├─ Transform existing type
│  ├─ Built-in transformation → utility-types.tsx
│  ├─ Custom transformation → mapped-types.tsx
│  └─ Conditional transformation → conditional-types.tsx
│
├─ Extract type from something
│  ├─ From value → typeof-operator.tsx
│  ├─ From property → indexed-access-types.tsx
│  ├─ From keys → keyof-operator.tsx
│  └─ From generic → infer-keyword.tsx
│
├─ String with pattern
│  └─ Use: template-literal-types.tsx
│
├─ Prevent mixing similar types
│  └─ Use: branded-types.tsx
│
├─ Immutable literal values
│  └─ Use: const-assertions.tsx
│
├─ Nested/recursive structure
│  └─ Use: recursive-types.tsx
│
└─ Producer/consumer pattern
   └─ Use: variance-annotations.tsx
```

---

## 🔍 By Real-World Scenario

### Building a Todo App
1. `interface-declaration.tsx` - Todo item structure
2. `array-types.tsx` - List of todos
3. `union-types.tsx` - Todo status (pending/completed)
4. `function-types.tsx` - Event handlers
5. `optional-properties.tsx` - Optional due date

### Creating a User Dashboard
1. `interface-declaration.tsx` - User data model
2. `utility-types.tsx` - Partial updates (PATCH)
3. `discriminated-unions.tsx` - API loading states
4. `generic-types.tsx` - Reusable data table
5. `keyof-operator.tsx` - Sortable columns

### Building a Form
1. `interface-declaration.tsx` - Form data structure
2. `optional-properties.tsx` - Optional fields
3. `function-types.tsx` - Validators and handlers
4. `type-guards.tsx` - Input validation
5. `discriminated-unions.tsx` - Multi-step form

### Creating a Design System
1. `union-types.tsx` - Variants and sizes
2. `type-intersection.tsx` - Mixing style props
3. `generic-types.tsx` - Reusable components
4. `template-literal-types.tsx` - CSS class names
5. `const-assertions.tsx` - Theme constants

### Type-Safe API Client
1. `interface-declaration.tsx` - API models
2. `generic-types.tsx` - Generic API wrapper
3. `discriminated-unions.tsx` - Response states
4. `utility-types.tsx` - Request DTOs
5. `branded-types.tsx` - Type-safe IDs

---

**Remember:** Each file includes detailed use cases at the end with 8 specific examples and clear "WHEN TO USE" guidance!


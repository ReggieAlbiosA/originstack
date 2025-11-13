'use client';

/**
 * TypeScript Fundamental: Interface Declaration
 * - Defining object shapes for props
 * - Interface for component props
 */

import { ReactNode } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface CardProps {
    user: User;
    children?: ReactNode;
    className?: string;
}

export default function InterfaceDeclaration({ user, children, className }: CardProps) {
    return (
        <div className={className}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>ID: {user.id}</p>
            {children}
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Component Props - Define structured props for components with multiple fields
 * 2. API Response Types - Type complex API response objects with nested data
 * 3. Data Models - Define entities like User, Product, Order, Post
 * 4. Form Data - Type form state with multiple related fields
 * 5. Context Values - Type React Context values with multiple properties
 * 6. Card Components - Type card/list item data structures
 * 7. Database Records - Type database entities from ORMs (Prisma, Drizzle)
 * 8. Event Payloads - Type custom event data structures
 *
 * WHEN TO USE:
 * - When you have objects with multiple related properties
 * - When building reusable components that accept structured data
 * - For defining domain models in your application
 * - When you need to extend or merge types later (interfaces are mergeable)
 * - For public APIs where others might extend your types
 */


'use client';

/**
 * TypeScript Fundamental: Mapped Types
 * - Transforming types by mapping over properties
 * - Creating new types from existing ones
 */

import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

// Make all properties optional
type Optional<T> = {
    [K in keyof T]?: T[K];
};

// Make all properties readonly
type ReadonlyType<T> = {
    readonly [K in keyof T]: T[K];
};

// Make all properties nullable
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

// Pick and transform specific properties
type StringifyProperties<T> = {
    [K in keyof T]: string;
};

// Conditional mapping
type OnlyStrings<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// Add prefix to keys
type Prefixed<T, P extends string> = {
    [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K];
};

interface MappedTypesProps {
    user: User;
}

export default function MappedTypes({ user }: MappedTypesProps) {
    const [optionalUser, setOptionalUser] = useState<Optional<User>>({ name: 'John' });
    const [nullableUser, setNullableUser] = useState<Nullable<User>>({
        id: 1,
        name: 'Alice',
        email: null,
        age: 25,
    });

    const readonlyUser: ReadonlyType<User> = user;
    // readonlyUser.name = 'test'; // Error: readonly property

    const stringifiedUser: StringifyProperties<User> = {
        id: '1',
        name: 'John',
        email: 'john@example.com',
        age: '30',
    };

    const onlyStringProps: OnlyStrings<User> = {
        name: user.name,
        email: user.email,
    };

    const prefixedUser: Prefixed<User, 'user'> = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userAge: user.age,
    };

    return (
        <div>
            <h2>Original User</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            <h2>Optional User</h2>
            <pre>{JSON.stringify(optionalUser, null, 2)}</pre>
            <button onClick={() => setOptionalUser({ ...optionalUser, email: 'new@email.com' })}>
                Add Email
            </button>

            <h2>Nullable User</h2>
            <pre>{JSON.stringify(nullableUser, null, 2)}</pre>

            <h2>Stringified User</h2>
            <pre>{JSON.stringify(stringifiedUser, null, 2)}</pre>

            <h2>Only String Properties</h2>
            <pre>{JSON.stringify(onlyStringProps, null, 2)}</pre>

            <h2>Prefixed User</h2>
            <pre>{JSON.stringify(prefixedUser, null, 2)}</pre>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. API Transformations - Transform API types for different contexts (client/server)
 * 2. Form States - Create loading/error states for each form field
 * 3. Validation - Create validation result types for each property
 * 4. Deep Modifications - Make entire object trees readonly or optional
 * 5. Key Remapping - Add prefixes/suffixes to property names (userEmail, userName)
 * 6. State Management - Create action types from state shape
 * 7. Serialization - Transform types for JSON serialization (Date → string)
 * 8. GraphQL - Generate types from schema with custom transformations
 *
 * WHEN TO USE:
 * - When you need to transform all properties of a type systematically
 * - For creating utility types specific to your domain
 * - When building form libraries or state management solutions
 * - For generating types from other types programmatically
 * - When you need complex type transformations beyond built-in utilities
 */


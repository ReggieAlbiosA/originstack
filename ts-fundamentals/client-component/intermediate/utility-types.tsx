'use client';

/**
 * TypeScript Fundamental: Utility Types
 * - Partial, Required, Pick, Omit, Record, Readonly
 * - Built-in type transformation utilities
 */

import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    address: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Required - all properties required
type RequiredUser = Required<User>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type UserWithoutId = Omit<User, 'id'>;

// Record - create object type with specific keys
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;

// Readonly - make all properties readonly
type ReadonlyUser = Readonly<User>;

interface UtilityTypesProps {
    user: User;
}

export default function UtilityTypes({ user }: UtilityTypesProps) {
    const [partialUser, setPartialUser] = useState<PartialUser>({ name: 'John' });
    const [userPreview, setUserPreview] = useState<UserPreview>({ id: 1, name: 'Alice' });
    const [roles, setRoles] = useState<UserRoles>({ user1: 'admin', user2: 'user' });

    const updatePartialUser = (updates: PartialUser) => {
        setPartialUser({ ...partialUser, ...updates });
    };

    const userWithoutId: UserWithoutId = {
        name: user.name,
        email: user.email,
        age: user.age,
        address: user.address,
    };

    const readonlyUser: ReadonlyUser = user;
    // readonlyUser.name = 'test'; // Error: cannot modify readonly property

    return (
        <div>
            <h2>Full User</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            <h2>Partial User</h2>
            <pre>{JSON.stringify(partialUser, null, 2)}</pre>
            <button onClick={() => updatePartialUser({ email: 'new@email.com' })}>
                Update Email
            </button>

            <h2>User Preview (Pick)</h2>
            <pre>{JSON.stringify(userPreview, null, 2)}</pre>

            <h2>User Without ID (Omit)</h2>
            <pre>{JSON.stringify(userWithoutId, null, 2)}</pre>

            <h2>User Roles (Record)</h2>
            <pre>{JSON.stringify(roles, null, 2)}</pre>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Partial Updates - Use Partial<T> for PATCH requests or form updates
 * 2. Form State - Use Required<T> to ensure all form fields are filled
 * 3. DTOs - Use Pick<T> to select only needed fields for API responses
 * 4. Sanitization - Use Omit<T> to remove sensitive fields (password, tokens)
 * 5. Dictionaries - Use Record<K, V> for key-value maps with consistent types
 * 6. Immutability - Use Readonly<T> for config objects that shouldn't change
 * 7. API Contracts - Transform types for different API layers
 * 8. State Management - Create derived state types from base state
 *
 * WHEN TO USE:
 * - Partial: Form updates, optional configurations, PATCH requests
 * - Required: Form validation, complete data requirements
 * - Pick: Creating DTOs, selecting specific fields
 * - Omit: Removing sensitive data, excluding fields
 * - Record: Lookup tables, dictionaries, maps
 * - Readonly: Constants, immutable config, props from parent
 */


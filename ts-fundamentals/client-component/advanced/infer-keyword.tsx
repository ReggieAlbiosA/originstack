'use client';

/**
 * TypeScript Fundamental: infer Keyword
 * - Type inference within conditional types
 * - Extracting types from complex structures
 */

import { useState } from 'react';

// Extract return type of a function
type ReturnTypeCustom<T> = T extends (...args: any[]) => infer R ? R : never;

// Extract parameter types
type ParametersCustom<T> = T extends (...args: infer P) => any ? P : never;

// Extract first parameter
type FirstParameter<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;

// Extract Promise value type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// Extract array element type
type ArrayElement<T> = T extends (infer E)[] ? E : never;

// Extract function from event handler
type EventHandler<T> = T extends { handleEvent: infer H } ? H : never;

// Deep property type extraction
type DeepPropertyType<T, K extends string> = K extends `${infer First}.${infer Rest}`
    ? First extends keyof T
    ? DeepPropertyType<T[First], Rest>
    : never
    : K extends keyof T
    ? T[K]
    : never;

interface User {
    id: number;
    profile: {
        name: string;
        contact: {
            email: string;
            phone: string;
        };
    };
}

function fetchUser(): Promise<User> {
    return Promise.resolve({
        id: 1,
        profile: {
            name: 'John',
            contact: {
                email: 'john@example.com',
                phone: '123-456-7890',
            },
        },
    });
}

function updateUser(id: number, name: string, email: string): boolean {
    return true;
}

export default function InferKeyword() {
    // Inferred types
    type FetchUserReturn = ReturnTypeCustom<typeof fetchUser>; // Promise<User>
    type UnwrappedUser = UnwrapPromise<FetchUserReturn>; // User

    type UpdateUserParams = ParametersCustom<typeof updateUser>; // [number, string, string]
    type FirstParam = FirstParameter<typeof updateUser>; // number

    type UserArray = User[];
    type UserElement = ArrayElement<UserArray>; // User

    type EmailType = DeepPropertyType<User, 'profile.contact.email'>; // string

    const [user, setUser] = useState<UnwrappedUser | null>(null);
    const [loading, setLoading] = useState(false);

    const loadUser = async () => {
        setLoading(true);
        const userData = await fetchUser();
        setUser(userData);
        setLoading(false);
    };

    const handleUpdate = (...params: UpdateUserParams) => {
        const result = updateUser(...params);
        console.log('Update result:', result);
    };

    // Extract nested type
    const getEmail = (user: User): EmailType => {
        return user.profile.contact.email;
    };

    return (
        <div>
            <h2>Infer Keyword Demo</h2>

            <button onClick={loadUser} disabled={loading}>
                {loading ? 'Loading...' : 'Load User'}
            </button>

            {user && (
                <div>
                    <h3>User Data</h3>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.profile.name}</p>
                    <p>Email: {getEmail(user)}</p>
                    <p>Phone: {user.profile.contact.phone}</p>

                    <button onClick={() => handleUpdate(user.id, 'New Name', 'new@email.com')}>
                        Update User
                    </button>
                </div>
            )}

            <div>
                <h3>Type Information</h3>
                <ul>
                    <li>ReturnTypeCustom extracts: Promise&lt;User&gt;</li>
                    <li>UnwrapPromise extracts: User</li>
                    <li>ParametersCustom extracts: [number, string, string]</li>
                    <li>FirstParameter extracts: number</li>
                    <li>DeepPropertyType extracts: string (from nested email)</li>
                </ul>
            </div>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Promise Unwrapping - Extract value type from Promise<T> types
 * 2. Function Signatures - Extract parameter or return types from functions
 * 3. Array Elements - Extract element types from array types
 * 4. Nested Types - Extract deeply nested type information
 * 5. Generic Constraints - Infer types within generic type constraints
 * 6. HOC Types - Extract component props from HOC wrappers
 * 7. Event Handlers - Infer event types from event handler types
 * 8. Library Integration - Extract types from third-party library constructs
 *
 * WHEN TO USE:
 * - When you need to extract types from generic types
 * - For building advanced utility types
 * - When working with complex type transformations
 * - For extracting types from wrapped/nested structures
 * - When you need type inference in conditional types
 */


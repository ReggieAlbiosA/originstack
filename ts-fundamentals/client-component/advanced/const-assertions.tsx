'use client';

/**
 * TypeScript Fundamental: Const Assertions
 * - as const for literal types
 * - Readonly and immutable type inference
 */

import { useState } from 'react';

// Without const assertion - inferred as string
const color1 = 'red'; // type: string

// With const assertion - inferred as literal type
const color2 = 'red' as const; // type: 'red'

// Object with const assertion
const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
} as const;

// Type is readonly with literal values:
// { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; readonly retries: 3 }

// Array with const assertion
const colors = ['red', 'green', 'blue'] as const;
// Type: readonly ["red", "green", "blue"]

// Nested structures with const assertion
const routes = {
    home: '/',
    about: '/about',
    users: {
        list: '/users',
        detail: (id: string) => `/users/${id}`,
    },
    posts: {
        list: '/posts',
        create: '/posts/new',
    },
} as const;

// Enum-like pattern with const assertion
const STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

type Status = typeof STATUS[keyof typeof STATUS];

// Const assertion with tuples
const point = [10, 20] as const; // type: readonly [10, 20]

// Function return with const assertion
function getTheme() {
    return {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
    } as const;
}

type Theme = ReturnType<typeof getTheme>;

export default function ConstAssertions() {
    const [status, setStatus] = useState<Status>(STATUS.IDLE);
    const [selectedColor, setSelectedColor] = useState<typeof colors[number]>('red');

    // config.timeout = 6000; // Error: Cannot assign to 'timeout' because it is a read-only property
    // colors[0] = 'yellow'; // Error: Index signature in type 'readonly ["red", "green", "blue"]' only permits reading

    const theme = getTheme();

    return (
        <div>
            <h2>Const Assertions Demo</h2>

            <div>
                <h3>Status: {status}</h3>
                <button onClick={() => setStatus(STATUS.LOADING)}>Set Loading</button>
                <button onClick={() => setStatus(STATUS.SUCCESS)}>Set Success</button>
                <button onClick={() => setStatus(STATUS.ERROR)}>Set Error</button>
                <button onClick={() => setStatus(STATUS.IDLE)}>Reset</button>
            </div>

            <div>
                <h3>Colors</h3>
                <p>Selected: {selectedColor}</p>
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color, color: 'white', margin: '5px' }}
                    >
                        {color}
                    </button>
                ))}
            </div>

            <div>
                <h3>Config (Readonly)</h3>
                <pre>{JSON.stringify(config, null, 2)}</pre>
            </div>

            <div>
                <h3>Routes</h3>
                <ul>
                    <li>Home: {routes.home}</li>
                    <li>About: {routes.about}</li>
                    <li>Users List: {routes.users.list}</li>
                    <li>User Detail: {routes.users.detail('123')}</li>
                    <li>Posts List: {routes.posts.list}</li>
                    <li>Create Post: {routes.posts.create}</li>
                </ul>
            </div>

            <div>
                <h3>Theme</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ background: theme.primary, padding: '20px', color: 'white' }}>
                        Primary
                    </div>
                    <div style={{ background: theme.secondary, padding: '20px', color: 'white' }}>
                        Secondary
                    </div>
                    <div style={{ background: theme.success, padding: '20px', color: 'white' }}>
                        Success
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
                <h4>Benefits of Const Assertions:</h4>
                <ul>
                    <li>Literal types instead of widened types</li>
                    <li>Readonly properties (immutable)</li>
                    <li>Tuple types preserved</li>
                    <li>Better autocomplete and type checking</li>
                    <li>No need for explicit enums</li>
                </ul>
            </div>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Configuration - Type config objects as readonly with literal values
 * 2. Routes - Type route paths as literal strings for type safety
 * 3. Status Constants - Create enum-like objects without enums
 * 4. Theme Values - Type theme colors, sizes as exact literal types
 * 5. Tuple Types - Preserve tuple structure instead of array type
 * 6. API Constants - Type API endpoints, methods as literal strings
 * 7. Translation Keys - Type i18n keys as exact strings
 * 8. Action Types - Type Redux/state action types as literals
 *
 * WHEN TO USE:
 * - When you want literal types instead of wider types
 * - For creating immutable configuration objects
 * - When you need tuple types preserved
 * - For type-safe constants without enums
 * - When you want maximum type narrowing from values
 */


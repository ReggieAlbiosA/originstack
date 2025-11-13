'use client';

/**
 * TypeScript Fundamental: Conditional Types
 * - T extends U ? X : Y syntax
 * - Type inference with conditional types
 */

import { ReactNode } from 'react';

// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Extract function return type
type ReturnTypeCustom<T> = T extends (...args: any[]) => infer R ? R : never;

// Extract array element type
type ElementType<T> = T extends (infer U)[] ? U : never;

// Remove null/undefined from type
type NonNullable<T> = T extends null | undefined ? never : T;

// Flatten nested arrays
type Flatten<T> = T extends Array<infer U> ? U : T;

// Extract promise value
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface ConditionalTypesProps<T> {
    data: T;
    render: (data: T) => ReactNode;
}

function ConditionalComponent<T>({ data, render }: ConditionalTypesProps<T>) {
    return <div>{render(data)}</div>;
}

type Message = string | string[] | null;

type ProcessedMessage<T extends Message> = T extends string
    ? { type: 'single'; value: string }
    : T extends string[]
    ? { type: 'multiple'; values: string[] }
    : { type: 'empty' };

export default function ConditionalTypes() {
    const processMessage = <T extends Message>(message: T): ProcessedMessage<T> => {
        if (typeof message === 'string') {
            return { type: 'single', value: message } as ProcessedMessage<T>;
        } else if (Array.isArray(message)) {
            return { type: 'multiple', values: message } as ProcessedMessage<T>;
        } else {
            return { type: 'empty' } as ProcessedMessage<T>;
        }
    };

    const singleMessage = processMessage('Hello');
    const multipleMessages = processMessage(['Hello', 'World']);
    const emptyMessage = processMessage(null);

    // Type examples
    type FlatArray = Flatten<number[]>; // number
    type FlatNumber = Flatten<number>; // number

    type PromiseValue = UnwrapPromise<Promise<string>>; // string
    type NonPromiseValue = UnwrapPromise<number>; // number

    type ArrayElement = ElementType<string[]>; // string
    type NonArrayElement = ElementType<number>; // never

    return (
        <div>
            <h2>Conditional Type Processing</h2>

            <ConditionalComponent
                data="Hello, World!"
                render={(data) => <p>String: {data}</p>}
            />

            <ConditionalComponent
                data={[1, 2, 3]}
                render={(data) => (
                    <ul>
                        {data.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                )}
            />

            <h3>Message Processing</h3>
            <pre>{JSON.stringify(singleMessage, null, 2)}</pre>
            <pre>{JSON.stringify(multipleMessages, null, 2)}</pre>
            <pre>{JSON.stringify(emptyMessage, null, 2)}</pre>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Type Filtering - Remove null/undefined from types (NonNullable)
 * 2. Type Extraction - Extract return types, promise values, array elements
 * 3. Function Overloads - Create different return types based on input types
 * 4. API Response Types - Type responses differently based on success/error
 * 5. Generic Constraints - Constrain generic types based on conditions
 * 6. Utility Types - Build custom utility types (Flatten, Unwrap, Extract)
 * 7. Type Guards - Create types that work with type guard functions
 * 8. Polymorphic Functions - Type functions that behave differently per input
 *
 * WHEN TO USE:
 * - When return type depends on input type
 * - For building advanced utility types
 * - When you need type-level conditional logic
 * - For unwrapping nested types (Promise<T> → T)
 * - When creating polymorphic components/functions
 */


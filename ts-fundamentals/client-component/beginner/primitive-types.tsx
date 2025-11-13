'use client';

/**
 * TypeScript Fundamental: Primitive Types
 * - string, number, boolean, null, undefined
 * Used in client component props and state
 */

import { useState } from 'react';

interface PrimitiveTypesProps {
    title: string;
    count: number;
    isActive: boolean;
    optionalValue?: string;
}

export default function PrimitiveTypes({
    title,
    count,
    isActive,
    optionalValue
}: PrimitiveTypesProps) {
    const [value, setValue] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [enabled, setEnabled] = useState<boolean>(false);

    return (
        <div>
            <h1>{title}</h1>
            <p>Count: {count}</p>
            <p>Active: {isActive ? 'Yes' : 'No'}</p>
            {optionalValue && <p>Optional: {optionalValue}</p>}

            <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={() => setEnabled(!enabled)}>
                {enabled ? 'Enabled' : 'Disabled'}
            </button>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Form Components - Type form field values (text inputs, checkboxes, number inputs)
 * 2. Component Props - Define basic prop types for simple components
 * 3. State Management - Type useState hooks with primitive values
 * 4. API Data - Type simple API response fields (id, name, isActive)
 * 5. Configuration - Type config objects with basic settings
 * 6. Toggle States - Type boolean flags for UI states (loading, visible, disabled)
 * 7. Counters - Type numeric values for counts, scores, quantities
 * 8. User Input - Type search queries, usernames, email addresses
 *
 * WHEN TO USE:
 * - Starting any new component (foundation for all TypeScript)
 * - When you need simple, straightforward type annotations
 * - For basic form validation
 * - When dealing with JSON data from APIs
 * - For component props that don't need complex structures
 */


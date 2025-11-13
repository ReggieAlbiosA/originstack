'use client';

/**
 * TypeScript Fundamental: Union Types
 * - Using | to combine types
 * - Multiple possible types for a value
 */

import { useState } from 'react';

type Size = 'small' | 'medium' | 'large';
type Theme = 'light' | 'dark';
type Value = string | number | boolean;

interface UnionTypesProps {
    size: Size;
    theme: Theme;
    value: Value;
    id: string | number;
}

export default function UnionTypes({ size, theme, value, id }: UnionTypesProps) {
    const [currentSize, setCurrentSize] = useState<Size>(size);
    const [mode, setMode] = useState<Theme>(theme);
    const [data, setData] = useState<string | number>(42);

    return (
        <div data-theme={mode} data-size={currentSize}>
            <p>ID: {id}</p>
            <p>Value: {String(value)}</p>
            <p>Current Data: {data}</p>

            <button onClick={() => setCurrentSize('large')}>Large</button>
            <button onClick={() => setMode('dark')}>Dark Mode</button>
            <button onClick={() => setData('text')}>Set Text</button>
            <button onClick={() => setData(100)}>Set Number</button>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Status Values - Type finite states (loading, success, error, idle)
 * 2. Theme/Variants - Type component variants (primary, secondary, danger)
 * 3. Size Options - Type size props (small, medium, large, xl)
 * 4. Flexible Props - Type props that accept multiple types (string | number)
 * 5. API Responses - Type responses that can have different shapes
 * 6. Form Values - Type form fields that can be different types
 * 7. Conditional Rendering - Type data that determines what to render
 * 8. Configuration - Type config values with limited valid options
 *
 * WHEN TO USE:
 * - When a value can be one of several specific options
 * - For creating type-safe enums with string literals
 * - When you need to restrict values to a specific set
 * - For component variants and themes
 * - When handling different data shapes in one place
 */


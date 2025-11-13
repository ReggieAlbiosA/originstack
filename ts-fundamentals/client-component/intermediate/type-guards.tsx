'use client';

/**
 * TypeScript Fundamental: Type Guards
 * - typeof, instanceof checks
 * - Custom type guard functions
 * - Narrowing types
 */

import { useState } from 'react';

interface Circle {
    kind: 'circle';
    radius: number;
}

interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}

type Shape = Circle | Rectangle;

// Custom type guard
function isCircle(shape: Shape): shape is Circle {
    return shape.kind === 'circle';
}

function isRectangle(shape: Shape): shape is Rectangle {
    return shape.kind === 'rectangle';
}

interface TypeGuardsProps {
    value: string | number | string[];
    shape: Shape;
}

export default function TypeGuards({ value, shape }: TypeGuardsProps) {
    const [data, setData] = useState<string | number | null>(null);

    const renderValue = () => {
        // typeof type guard
        if (typeof value === 'string') {
            return <p>String: {value.toUpperCase()}</p>;
        } else if (typeof value === 'number') {
            return <p>Number: {value.toFixed(2)}</p>;
        } else if (Array.isArray(value)) {
            return <p>Array: {value.join(', ')}</p>;
        }
    };

    const renderShape = () => {
        // Custom type guard
        if (isCircle(shape)) {
            return <p>Circle with radius: {shape.radius}</p>;
        } else if (isRectangle(shape)) {
            return <p>Rectangle: {shape.width} x {shape.height}</p>;
        }
    };

    const handleData = () => {
        // Null check type guard
        if (data !== null) {
            if (typeof data === 'string') {
                console.log(data.toLowerCase());
            } else {
                console.log(data.toFixed(2));
            }
        }
    };

    return (
        <div>
            {renderValue()}
            {renderShape()}
            <button onClick={handleData}>Process Data</button>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Union Type Handling - Safely narrow down union types to specific members
 * 2. API Response Types - Handle different response shapes (success/error)
 * 3. Event Handling - Type check different event types in a handler
 * 4. Form Validation - Validate and narrow input types during form submission
 * 5. Discriminated Unions - Work with tagged unions safely
 * 6. Null Checks - Safely handle nullable values before using them
 * 7. Polymorphic Components - Handle different prop combinations
 * 8. Data Transformation - Type-safe transformations based on input type
 *
 * WHEN TO USE:
 * - When working with union types that need runtime checking
 * - For safe null/undefined handling
 * - When you need to access type-specific properties
 * - For runtime type validation in user input
 * - When TypeScript needs help narrowing types automatically
 */


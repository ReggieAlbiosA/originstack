'use client';

/**
 * TypeScript Fundamental: Function Types
 * - Typing function parameters and return types
 * - Callback function types in props
 */

interface FunctionTypesProps {
    onSubmit: (value: string) => void;
    onDelete: (id: number) => void;
    formatText: (text: string) => string;
    calculate: (a: number, b: number) => number;
}

export default function FunctionTypes({
    onSubmit,
    onDelete,
    formatText,
    calculate,
}: FunctionTypesProps) {
    const handleClick = (): void => {
        onSubmit('test value');
    };

    const processData = (input: string): string => {
        return formatText(input);
    };

    const sum: number = calculate(5, 10);

    return (
        <div>
            <button onClick={handleClick}>Submit</button>
            <button onClick={() => onDelete(1)}>Delete Item 1</button>
            <p>Formatted: {processData('Hello World')}</p>
            <p>Calculation Result: {sum}</p>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Event Handlers - Type onClick, onChange, onSubmit callbacks
 * 2. Callback Props - Type function props passed to child components
 * 3. Custom Hooks - Type hook return values (functions and utilities)
 * 4. Higher-Order Functions - Type functions that return or accept functions
 * 5. API Calls - Type service functions that make API requests
 * 6. Validation - Type validation functions (validators, transformers)
 * 7. Formatters - Type formatting functions (currency, dates, strings)
 * 8. State Updaters - Type setState callback functions
 *
 * WHEN TO USE:
 * - When passing functions as props to child components
 * - For typing event handlers with proper parameter types
 * - When creating utility functions with clear contracts
 * - For API service layers and data fetching functions
 * - When you need type-safe callbacks in async operations
 */


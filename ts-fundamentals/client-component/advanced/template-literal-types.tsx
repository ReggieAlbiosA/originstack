'use client';

/**
 * TypeScript Fundamental: Template Literal Types
 * - String literal types with template syntax
 * - Creating dynamic string types
 */

import { useState } from 'react';

// Basic template literal type
type Color = 'red' | 'blue' | 'green';
type Size = 'small' | 'medium' | 'large';
type ColoredSize = `${Color}-${Size}`; // 'red-small' | 'red-medium' | ... | 'green-large'

// Event name pattern
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = `on${Capitalize<EventName>}`; // 'onClick' | 'onFocus' | 'onBlur'

// CSS properties
type CSSProperty = 'width' | 'height' | 'margin' | 'padding';
type PixelValue = `${number}px`;
type PercentValue = `${number}%`;
type CSSValue = PixelValue | PercentValue;

// API routes
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = '/users' | '/posts' | '/comments';
type APIRoute = `${HTTPMethod} ${Endpoint}`;

// Data attributes
type DataAttribute = `data-${string}`;

interface StyledComponentProps {
    className: ColoredSize;
    style?: {
        [K in CSSProperty]?: CSSValue;
    };
}

interface TemplateLiteralTypesProps {
    initialClassName: ColoredSize;
}

export default function TemplateLiteralTypes({
    initialClassName
}: TemplateLiteralTypesProps) {
    const [className, setClassName] = useState<ColoredSize>(initialClassName);
    const [apiRoute, setApiRoute] = useState<APIRoute>('GET /users');

    const colors: Color[] = ['red', 'blue', 'green'];
    const sizes: Size[] = ['small', 'medium', 'large'];

    const generateClassName = (color: Color, size: Size): ColoredSize => {
        return `${color}-${size}`;
    };

    // Type-safe event handlers
    const handlers: Record<EventHandler, () => void> = {
        onClick: () => console.log('Clicked'),
        onFocus: () => console.log('Focused'),
        onBlur: () => console.log('Blurred'),
    };

    const StyledComponent = ({ className, style }: StyledComponentProps) => (
        <div className={className} style={style}>
            Styled Component
        </div>
    );

    const dataAttributes: Record<DataAttribute, string> = {
        'data-testid': 'component',
        'data-variant': 'primary',
        'data-state': 'active',
    };

    return (
        <div>
            <h2>Current Class: {className}</h2>

            <div>
                <h3>Select Color and Size</h3>
                {colors.map((color) =>
                    sizes.map((size) => (
                        <button
                            key={`${color}-${size}`}
                            onClick={() => setClassName(generateClassName(color, size))}
                        >
                            {color} {size}
                        </button>
                    ))
                )}
            </div>

            <StyledComponent
                className={className}
                style={{
                    width: '100px',
                    height: '50px',
                    margin: '10px',
                    padding: '5px',
                }}
            />

            <div>
                <h3>API Route: {apiRoute}</h3>
                <button onClick={() => setApiRoute('POST /users')}>POST /users</button>
                <button onClick={() => setApiRoute('GET /posts')}>GET /posts</button>
                <button onClick={() => setApiRoute('DELETE /comments')}>DELETE /comments</button>
            </div>

            <div>
                <h3>Event Handlers</h3>
                <button onClick={handlers.onClick} onFocus={handlers.onFocus} onBlur={handlers.onBlur}>
                    Interactive Button
                </button>
            </div>

            <div>
                <h3>Data Attributes</h3>
                <pre>{JSON.stringify(dataAttributes, null, 2)}</pre>
            </div>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. CSS Classes - Type BEM class names (block__element--modifier)
 * 2. Event Handlers - Type event handler names (onClick, onMouseEnter)
 * 3. API Routes - Type REST API routes (/api/users/:id, GET /posts)
 * 4. Data Attributes - Type data-* attributes for HTML elements
 * 5. CSS Variables - Type CSS custom properties (--color-primary)
 * 6. File Paths - Type file paths with specific patterns
 * 7. Environment Variables - Type env var names (NEXT_PUBLIC_API_URL)
 * 8. Translation Keys - Type i18n keys (common.button.submit)
 *
 * WHEN TO USE:
 * - When you need to combine string literal types
 * - For generating variations of string patterns
 * - When building type-safe string APIs (routes, CSS)
 * - For creating naming conventions as types
 * - When you want autocomplete for dynamic string values
 */


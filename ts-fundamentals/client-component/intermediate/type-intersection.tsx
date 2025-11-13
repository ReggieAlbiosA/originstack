'use client';

/**
 * TypeScript Fundamental: Type Intersection
 * - Combining multiple types with &
 * - Merging type properties
 */

import { ReactNode } from 'react';

interface Identifiable {
    id: string;
}

interface Timestamped {
    createdAt: Date;
    updatedAt: Date;
}

interface Nameable {
    name: string;
}

type Entity = Identifiable & Timestamped & Nameable;

interface StyledProps {
    className?: string;
    style?: React.CSSProperties;
}

interface ClickableProps {
    onClick: () => void;
    disabled?: boolean;
}

type ButtonProps = StyledProps & ClickableProps & { children: ReactNode };

export default function TypeIntersection({ entity }: { entity: Entity }) {
    const Button = ({ className, style, onClick, disabled, children }: ButtonProps) => (
        <button className={className} style={style} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );

    return (
        <div>
            <h2>{entity.name}</h2>
            <p>ID: {entity.id}</p>
            <p>Created: {entity.createdAt.toISOString()}</p>
            <p>Updated: {entity.updatedAt.toISOString()}</p>

            <Button
                className="btn"
                style={{ padding: '10px' }}
                onClick={() => console.log('Clicked')}
            >
                Click Me
            </Button>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Mixing Props - Combine multiple prop interfaces (StyledProps & ClickableProps)
 * 2. Entity Composition - Build entities from mixins (User & Timestamped & Auditable)
 * 3. HOC Props - Type higher-order components that add props to wrapped components
 * 4. Extended Types - Extend existing types with additional properties
 * 5. Plugin Systems - Combine base functionality with plugin features
 * 6. Trait Composition - Mix multiple traits/behaviors into one type
 * 7. Form Fields - Combine base field props with specific field type props
 * 8. API Models - Build API models from reusable pieces (Paginated & Sortable & Filterable)
 *
 * WHEN TO USE:
 * - When you need all properties from multiple types
 * - For composition over inheritance patterns
 * - When building types from reusable mixins
 * - For combining orthogonal concerns (styling + behavior + data)
 * - When you want to enforce that an object has all required properties
 */


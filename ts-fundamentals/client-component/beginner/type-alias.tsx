'use client';

/**
 * TypeScript Fundamental: Type Alias
 * - Creating custom type names
 * - Alternative to interfaces
 */

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

type Product = {
    id: string;
    name: string;
    price: number;
};

type TypeAliasProps = {
    initialStatus: Status;
    products: Product[];
};

export default function TypeAlias({ initialStatus, products }: TypeAliasProps) {
    const [status, setStatus] = useState<Status>(initialStatus);

    return (
        <div>
            <p>Status: {status}</p>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setStatus('loading')}>Set Loading</button>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Union Types - Create type aliases for union types (Status = 'idle' | 'loading')
 * 2. Complex Types - Simplify complex type expressions with readable names
 * 3. Tuple Types - Define tuple structures with meaningful names
 * 4. Function Types - Create reusable function signature types
 * 5. Primitive Unions - Type status, theme, size, variant options
 * 6. Data Transfer Objects - Type API request/response payloads
 * 7. Utility Combinations - Combine utility types (Partial<User> & Timestamped)
 * 8. Type Composition - Build complex types from simpler ones
 *
 * WHEN TO USE:
 * - When you need union types (can't do with interface)
 * - For creating named types that aren't objects
 * - When type won't be extended or merged
 * - For internal types that don't need declaration merging
 * - When you want more flexibility than interfaces provide
 */


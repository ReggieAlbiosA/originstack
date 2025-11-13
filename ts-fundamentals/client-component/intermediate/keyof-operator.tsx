'use client';

/**
 * TypeScript Fundamental: keyof Operator
 * - Creating union of object keys
 * - Type-safe property access
 */

import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
}

// keyof creates: 'id' | 'name' | 'price' | 'category' | 'inStock'
type ProductKey = keyof Product;

interface User {
    username: string;
    email: string;
    age: number;
}

type UserKey = keyof User;

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

interface KeyofOperatorProps {
    product: Product;
    user: User;
}

export default function KeyofOperator({ product, user }: KeyofOperatorProps) {
    const [selectedKey, setSelectedKey] = useState<ProductKey>('name');

    const productKeys: ProductKey[] = ['id', 'name', 'price', 'category', 'inStock'];
    const userKeys: UserKey[] = ['username', 'email', 'age'];

    const productValue = getProperty(product, selectedKey);

    return (
        <div>
            <h2>Product</h2>
            <div>
                <label>Select Property: </label>
                <select
                    value={selectedKey}
                    onChange={(e) => setSelectedKey(e.target.value as ProductKey)}
                >
                    {productKeys.map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
                <p>Value: {String(productValue)}</p>
            </div>

            <h3>All Product Properties</h3>
            {productKeys.map((key) => (
                <p key={key}>
                    {key}: {String(product[key])}
                </p>
            ))}

            <h2>User Properties</h2>
            {userKeys.map((key) => (
                <p key={key}>
                    {key}: {String(user[key])}
                </p>
            ))}
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Dynamic Property Access - Type-safe access to object properties by key
 * 2. Form Field Names - Type form field names from form data type
 * 3. Dropdown Options - Generate dropdown options from object keys
 * 4. Generic Getters/Setters - Build type-safe getter/setter functions
 * 5. Column Definitions - Type table column keys from data type
 * 6. Sort Fields - Type sortable field names from entity type
 * 7. Filter Keys - Type filterable properties for search/filter UI
 * 8. Object Iteration - Safely iterate over typed object properties
 *
 * WHEN TO USE:
 * - When you need to constrain a value to valid object keys
 * - For building generic functions that work with object properties
 * - When creating dynamic forms or tables from types
 * - For type-safe property access in utility functions
 * - When you want autocomplete for object property names
 */


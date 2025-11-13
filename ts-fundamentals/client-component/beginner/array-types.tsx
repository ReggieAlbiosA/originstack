'use client';

/**
 * TypeScript Fundamental: Array Types
 * - Type[] syntax
 * - Array<Type> syntax
 */

import { useState } from 'react';

interface Item {
    id: number;
    label: string;
}

interface ArrayTypesProps {
    stringArray: string[];
    numberArray: number[];
    objectArray: Array<Item>;
}

export default function ArrayTypes({
    stringArray,
    numberArray,
    objectArray
}: ArrayTypesProps) {
    const [items, setItems] = useState<Item[]>(objectArray);
    const [tags, setTags] = useState<Array<string>>(stringArray);

    return (
        <div>
            <h2>String Array</h2>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>

            <h2>Number Array</h2>
            <ul>
                {numberArray.map((num, index) => (
                    <li key={index}>{num}</li>
                ))}
            </ul>

            <h2>Object Array</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.label}</li>
                ))}
            </ul>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Lists & Tables - Type arrays of items for rendering lists, tables, grids
 * 2. Form Options - Type dropdown options, checkbox groups, radio button lists
 * 3. API Collections - Type arrays returned from API endpoints
 * 4. Navigation - Type menu items, breadcrumb paths, route configurations
 * 5. Tags & Categories - Type arrays of tags, labels, categories
 * 6. Search Results - Type arrays of search results or filtered items
 * 7. Cart Items - Type shopping cart items, order items, selections
 * 8. Batch Operations - Type multiple items for bulk operations
 *
 * WHEN TO USE:
 * - When you need to iterate over collections with .map(), .filter(), .reduce()
 * - For rendering dynamic lists in UI
 * - When handling multiple records from database queries
 * - For managing collections in state (todo lists, shopping carts)
 * - When you need type safety for array operations
 */


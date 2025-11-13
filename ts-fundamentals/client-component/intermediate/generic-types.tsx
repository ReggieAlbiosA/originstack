'use client';

/**
 * TypeScript Fundamental: Generic Types
 * - Reusable type parameters
 * - Generic components and functions
 */

import { useState } from 'react';

interface GenericListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    onSelect?: (item: T) => void;
}

function GenericList<T>({ items, renderItem, onSelect }: GenericListProps<T>) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index} onClick={() => onSelect?.(item)}>
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
}

interface User {
    id: number;
    name: string;
}

export default function GenericTypes() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

    const users: User[] = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ];

    const numbers: number[] = [1, 2, 3, 4, 5];

    return (
        <div>
            <h2>Generic List with Users</h2>
            <GenericList
                items={users}
                renderItem={(user) => <span>{user.name}</span>}
                onSelect={setSelectedUser}
            />
            {selectedUser && <p>Selected: {selectedUser.name}</p>}

            <h2>Generic List with Numbers</h2>
            <GenericList
                items={numbers}
                renderItem={(num) => <span>Number: {num}</span>}
                onSelect={setSelectedNumber}
            />
            {selectedNumber && <p>Selected: {selectedNumber}</p>}
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Reusable Components - Create components that work with any data type (List<T>, Table<T>)
 * 2. API Wrappers - Type API responses with generic data (Response<T>, Result<T>)
 * 3. Form Builders - Build generic form components that work with any form data
 * 4. Data Grids - Create flexible grid/table components for any entity type
 * 5. Dropdown/Select - Build type-safe dropdowns that work with any option type
 * 6. Modal/Dialog - Create modals that can return any data type on confirmation
 * 7. State Management - Build generic hooks (useLocalStorage<T>, useAsync<T>)
 * 8. Collection Operations - Type utility functions that work with any array type
 *
 * WHEN TO USE:
 * - When you want to reuse component/function logic across different data types
 * - For building library components that need flexibility
 * - When you want type safety without duplicating code
 * - For utility functions that should preserve type information
 * - When creating custom hooks that work with various data types
 */


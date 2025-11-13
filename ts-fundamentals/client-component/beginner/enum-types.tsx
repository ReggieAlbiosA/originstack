'use client';

/**
 * TypeScript Fundamental: Enum Types
 * - Numeric and string enums
 * - Named constants
 */

import { useState } from 'react';

enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}

enum Status {
    Pending = 0,
    Approved = 1,
    Rejected = 2,
}

interface EnumTypesProps {
    direction: Direction;
    status: Status;
}

export default function EnumTypes({ direction, status }: EnumTypesProps) {
    const [currentDirection, setCurrentDirection] = useState<Direction>(direction);
    const [currentStatus, setCurrentStatus] = useState<Status>(status);

    return (
        <div>
            <p>Direction: {currentDirection}</p>
            <p>Status: {Status[currentStatus]}</p>

            <button onClick={() => setCurrentDirection(Direction.Up)}>Move Up</button>
            <button onClick={() => setCurrentDirection(Direction.Down)}>Move Down</button>
            <button onClick={() => setCurrentStatus(Status.Approved)}>Approve</button>
            <button onClick={() => setCurrentStatus(Status.Rejected)}>Reject</button>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Constants - Define named constants that are grouped together
 * 2. Status Codes - Type HTTP status codes, error codes, state codes
 * 3. Directions - Type directional values (Up, Down, Left, Right)
 * 4. Permissions - Type user permission levels (Admin, User, Guest)
 * 5. Categories - Type fixed categories (Bronze, Silver, Gold)
 * 6. Priorities - Type priority levels (Low, Medium, High, Critical)
 * 7. Modes - Type operation modes (Development, Staging, Production)
 * 8. Actions - Type action types in state management
 *
 * WHEN TO USE:
 * - When you need reverse mapping (value to name lookup)
 * - For numeric constants with meaningful names
 * - When you want auto-incrementing values
 * - For legacy code integration (many libraries use enums)
 * - When you need a namespace for related constants
 *
 * NOTE: Consider using string literal unions ('as const' objects) for modern TypeScript
 */


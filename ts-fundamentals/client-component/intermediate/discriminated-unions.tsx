'use client';

/**
 * TypeScript Fundamental: Discriminated Unions (Tagged Unions)
 * - Using a common property to discriminate between types
 * - Type narrowing with discriminant property
 */

import { useState } from 'react';

interface LoadingState {
    status: 'loading';
}

interface SuccessState<T> {
    status: 'success';
    data: T;
}

interface ErrorState {
    status: 'error';
    error: string;
}

type ApiState<T> = LoadingState | SuccessState<T> | ErrorState;

interface User {
    id: number;
    name: string;
}

// Another example: UI Events
interface ClickEvent {
    type: 'click';
    x: number;
    y: number;
}

interface KeyboardEvent {
    type: 'keyboard';
    key: string;
}

interface ScrollEvent {
    type: 'scroll';
    scrollY: number;
}

type UIEvent = ClickEvent | KeyboardEvent | ScrollEvent;

export default function DiscriminatedUnions() {
    const [apiState, setApiState] = useState<ApiState<User>>({ status: 'loading' });
    const [lastEvent, setLastEvent] = useState<UIEvent | null>(null);

    const renderApiState = () => {
        switch (apiState.status) {
            case 'loading':
                return <p>Loading...</p>;
            case 'success':
                return <p>User: {apiState.data.name}</p>;
            case 'error':
                return <p>Error: {apiState.error}</p>;
        }
    };

    const renderEvent = () => {
        if (!lastEvent) return null;

        switch (lastEvent.type) {
            case 'click':
                return <p>Clicked at ({lastEvent.x}, {lastEvent.y})</p>;
            case 'keyboard':
                return <p>Key pressed: {lastEvent.key}</p>;
            case 'scroll':
                return <p>Scrolled to: {lastEvent.scrollY}</p>;
        }
    };

    return (
        <div>
            <h2>API State</h2>
            {renderApiState()}

            <button onClick={() => setApiState({ status: 'loading' })}>
                Set Loading
            </button>
            <button onClick={() => setApiState({ status: 'success', data: { id: 1, name: 'John' } })}>
                Set Success
            </button>
            <button onClick={() => setApiState({ status: 'error', error: 'Network error' })}>
                Set Error
            </button>

            <h2>Last Event</h2>
            {renderEvent()}

            <button onClick={() => setLastEvent({ type: 'click', x: 100, y: 200 })}>
                Simulate Click
            </button>
            <button onClick={() => setLastEvent({ type: 'keyboard', key: 'Enter' })}>
                Simulate Keyboard
            </button>
            <button onClick={() => setLastEvent({ type: 'scroll', scrollY: 500 })}>
                Simulate Scroll
            </button>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. API States - Model loading/success/error states with type safety
 * 2. Form Steps - Type multi-step forms where each step has different fields
 * 3. Redux Actions - Type action creators with different payloads
 * 4. Event Systems - Model different event types with different data
 * 5. WebSocket Messages - Type different message types from WebSocket
 * 6. State Machines - Implement finite state machines with type safety
 * 7. Notification Types - Type different notification shapes (info, warning, error)
 * 8. Route Params - Type different route configurations with different params
 *
 * WHEN TO USE:
 * - When you have a type that can be one of several variants
 * - For exhaustive pattern matching with switch statements
 * - When each variant has different associated data
 * - For state machines and workflow modeling
 * - When you need TypeScript to ensure all cases are handled
 */


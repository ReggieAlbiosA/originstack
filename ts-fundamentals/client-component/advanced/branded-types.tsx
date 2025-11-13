'use client';

/**
 * TypeScript Fundamental: Branded Types (Nominal Typing)
 * - Creating distinct types from primitives
 * - Type safety for IDs, tokens, etc.
 */

import { useState } from 'react';

// Brand symbol to make types unique
declare const __brand: unique symbol;

type Brand<T, B> = T & { [__brand]: B };

// Branded types for different IDs
type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;
type SessionToken = Brand<string, 'SessionToken'>;
type Email = Brand<string, 'Email'>;
type PositiveNumber = Brand<number, 'PositiveNumber'>;

// Constructor functions
function createUserId(id: string): UserId {
    return id as UserId;
}

function createPostId(id: string): PostId {
    return id as PostId;
}

function createSessionToken(token: string): SessionToken {
    return token as SessionToken;
}

function createEmail(email: string): Email {
    if (!email.includes('@')) {
        throw new Error('Invalid email');
    }
    return email as Email;
}

function createPositiveNumber(num: number): PositiveNumber {
    if (num <= 0) {
        throw new Error('Number must be positive');
    }
    return num as PositiveNumber;
}

// Type-safe functions that only accept branded types
function fetchUser(userId: UserId): Promise<{ id: UserId; name: string }> {
    return Promise.resolve({ id: userId, name: 'John Doe' });
}

function fetchPost(postId: PostId): Promise<{ id: PostId; title: string }> {
    return Promise.resolve({ id: postId, title: 'Hello World' });
}

function authenticateSession(token: SessionToken): boolean {
    console.log('Authenticating with token:', token);
    return true;
}

function sendEmail(to: Email, subject: string): void {
    console.log(`Sending email to ${to}: ${subject}`);
}

function calculateDiscount(price: PositiveNumber, percentage: PositiveNumber): number {
    return price * (percentage / 100);
}

export default function BrandedTypes() {
    const [userId, setUserId] = useState<UserId>(createUserId('user-123'));
    const [postId, setPostId] = useState<PostId>(createPostId('post-456'));
    const [user, setUser] = useState<{ id: UserId; name: string } | null>(null);

    const handleFetchUser = async () => {
        const userData = await fetchUser(userId);
        setUser(userData);
    };

    const handleFetchPost = async () => {
        const postData = await fetchPost(postId);
        console.log('Post:', postData);
    };

    const handleAuthenticate = () => {
        const token = createSessionToken('abc123xyz');
        authenticateSession(token);
    };

    const handleSendEmail = () => {
        try {
            const email = createEmail('user@example.com');
            sendEmail(email, 'Welcome!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleCalculateDiscount = () => {
        try {
            const price = createPositiveNumber(100);
            const discount = createPositiveNumber(10);
            const discountAmount = calculateDiscount(price, discount);
            console.log('Discount amount:', discountAmount);
        } catch (error) {
            console.error(error);
        }
    };

    // This would cause a type error (uncomment to see):
    // fetchUser(postId); // Error: PostId is not assignable to UserId
    // fetchPost(userId); // Error: UserId is not assignable to PostId

    return (
        <div>
            <h2>Branded Types Demo</h2>

            <div>
                <h3>User Operations</h3>
                <p>Current User ID: {userId}</p>
                <button onClick={handleFetchUser}>Fetch User</button>
                {user && <p>User Name: {user.name}</p>}
            </div>

            <div>
                <h3>Post Operations</h3>
                <p>Current Post ID: {postId}</p>
                <button onClick={handleFetchPost}>Fetch Post</button>
            </div>

            <div>
                <h3>Session Operations</h3>
                <button onClick={handleAuthenticate}>Authenticate Session</button>
            </div>

            <div>
                <h3>Email Operations</h3>
                <button onClick={handleSendEmail}>Send Email</button>
            </div>

            <div>
                <h3>Positive Number Operations</h3>
                <button onClick={handleCalculateDiscount}>Calculate Discount</button>
            </div>

            <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
                <h4>Type Safety Benefits:</h4>
                <ul>
                    <li>Cannot mix UserId with PostId</li>
                    <li>Cannot pass regular strings where branded types are expected</li>
                    <li>Validation happens at type creation</li>
                    <li>Self-documenting code</li>
                </ul>
            </div>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. ID Types - Prevent mixing UserID with PostID (both strings)
 * 2. Validation - Ensure validated data isn't mixed with unvalidated
 * 3. Units - Type values with units (Pixels, Percentage, Milliseconds)
 * 4. Tokens - Type authentication tokens, API keys, session IDs
 * 5. Sanitization - Type sanitized vs unsanitized strings (HTML, SQL)
 * 6. Currencies - Type currency amounts (USD, EUR) to prevent mixing
 * 7. Coordinates - Type latitude/longitude to prevent swapping
 * 8. Constrained Values - Type positive numbers, non-empty strings
 *
 * WHEN TO USE:
 * - When you need to distinguish between structurally identical types
 * - For preventing accidental misuse of similar primitive types
 * - When you want compile-time guarantees about value validity
 * - For domain-driven design with strong typing
 * - When you need type safety beyond structural typing
 */


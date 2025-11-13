'use client';

/**
 * TypeScript Fundamental: Indexed Access Types
 * - Accessing types of properties using Type['property']
 * - Extracting nested types
 */

interface User {
    id: number;
    profile: {
        name: string;
        avatar: string;
        settings: {
            theme: 'light' | 'dark';
            notifications: boolean;
        };
    };
    posts: Array<{
        id: string;
        title: string;
        content: string;
    }>;
}

// Extract specific property types
type UserId = User['id']; // number
type UserProfile = User['profile']; // { name: string; avatar: string; settings: {...} }
type UserSettings = User['profile']['settings']; // { theme: ...; notifications: boolean }
type Post = User['posts'][number]; // { id: string; title: string; content: string }
type PostTitle = User['posts'][number]['title']; // string

interface IndexedAccessTypesProps {
    user: User;
}

export default function IndexedAccessTypes({ user }: IndexedAccessTypesProps) {
    const userId: UserId = user.id;
    const profile: UserProfile = user.profile;
    const settings: UserSettings = user.profile.settings;
    const firstPost: Post | undefined = user.posts[0];

    const updateSettings = (newSettings: UserSettings) => {
        console.log('Updating settings:', newSettings);
    };

    const createPost = (post: Post) => {
        console.log('Creating post:', post);
    };

    return (
        <div>
            <h2>User ID: {userId}</h2>

            <div>
                <h3>Profile</h3>
                <p>Name: {profile.name}</p>
                <img src={profile.avatar} alt={profile.name} />
            </div>

            <div>
                <h3>Settings</h3>
                <p>Theme: {settings.theme}</p>
                <p>Notifications: {settings.notifications ? 'On' : 'Off'}</p>
                <button onClick={() => updateSettings({ theme: 'dark', notifications: true })}>
                    Update Settings
                </button>
            </div>

            <div>
                <h3>Posts</h3>
                {user.posts.map((post: Post) => (
                    <div key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Nested Type Extraction - Extract types from deeply nested objects
 * 2. Array Element Types - Get the type of array elements (User['posts'][number])
 * 3. API Response Parsing - Extract nested response data types
 * 4. Component Prop Drilling - Type props passed down through component trees
 * 5. Database Schema - Extract field types from ORM models
 * 6. State Slices - Extract specific slices from global state types
 * 7. Configuration - Get types of nested configuration values
 * 8. Library Types - Extract types from third-party library objects
 *
 * WHEN TO USE:
 * - When you need types from specific properties of existing types
 * - For extracting types from complex nested structures
 * - When working with ORM/database types
 * - For deriving types from large configuration objects
 * - When you want to avoid duplicating type definitions
 */


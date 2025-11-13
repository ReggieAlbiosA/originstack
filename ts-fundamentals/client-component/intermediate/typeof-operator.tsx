'use client';

/**
 * TypeScript Fundamental: typeof Operator
 * - Extracting types from values
 * - Creating types from existing objects/functions
 */

const userConfig = {
    name: 'John Doe',
    age: 30,
    settings: {
        theme: 'dark' as const,
        language: 'en',
    },
    permissions: ['read', 'write'] as const,
};

// Extract type from object
type UserConfig = typeof userConfig;
type UserSettings = typeof userConfig.settings;
type UserPermissions = typeof userConfig.permissions;

const apiResponse = {
    status: 200,
    data: {
        users: [{ id: 1, name: 'Alice' }],
        total: 1,
    },
};

type ApiResponse = typeof apiResponse;
type ApiData = typeof apiResponse.data;

function processUser(id: number, name: string, active: boolean) {
    return { id, name, active };
}

// Extract function parameter types
type ProcessUserParams = Parameters<typeof processUser>;
// Extract function return type
type ProcessUserReturn = ReturnType<typeof processUser>;

interface TypeofOperatorProps {
    config: UserConfig;
}

export default function TypeofOperator({ config }: TypeofOperatorProps) {
    const settings: UserSettings = {
        theme: 'dark',
        language: 'en',
    };

    const permissions: UserPermissions = ['read', 'write'];

    const result: ProcessUserReturn = processUser(1, 'Bob', true);

    return (
        <div>
            <h2>Config</h2>
            <pre>{JSON.stringify(config, null, 2)}</pre>

            <h2>Settings</h2>
            <pre>{JSON.stringify(settings, null, 2)}</pre>

            <h2>Permissions</h2>
            <ul>
                {permissions.map((perm, index) => (
                    <li key={index}>{perm}</li>
                ))}
            </ul>

            <h2>Processed User</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Config Objects - Extract types from runtime configuration objects
 * 2. Function Types - Get parameter and return types from existing functions
 * 3. Constant Types - Create types from const objects defined in code
 * 4. Mock Data - Type state/props from mock data objects
 * 5. API Responses - Type API responses from example response objects
 * 6. Library Functions - Extract types from third-party functions
 * 7. Default Values - Type props from default values object
 * 8. Factory Functions - Extract types from factory function returns
 *
 * WHEN TO USE:
 * - When you have a runtime value and need its type
 * - For avoiding duplicate type definitions
 * - When working with JavaScript libraries without types
 * - For extracting function signatures
 * - When you want types to stay in sync with runtime values
 */


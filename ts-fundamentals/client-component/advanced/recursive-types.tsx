'use client';

/**
 * TypeScript Fundamental: Recursive Types
 * - Self-referencing type definitions
 * - Nested structures with infinite depth
 */

import { useState } from 'react';

// Recursive type for nested comments
interface Comment {
    id: string;
    text: string;
    author: string;
    replies?: Comment[];
}

// Recursive type for file system
interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
    size?: number;
}

// Recursive type for JSON values
type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

// Recursive type for nested paths
type NestedPath<T> = T extends object
    ? {
        [K in keyof T]: T[K] extends object
        ? K | `${K & string}.${NestedPath<T[K]> & string}`
        : K;
    }[keyof T]
    : never;

// Deep readonly recursive type
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Deep partial recursive type
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface RecursiveTypesProps {
    comments: Comment[];
    fileSystem: FileNode;
}

export default function RecursiveTypes({ comments, fileSystem }: RecursiveTypesProps) {
    const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const toggleComment = (id: string) => {
        setExpandedComments((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const toggleFolder = (name: string) => {
        setExpandedFolders((prev) => {
            const next = new Set(prev);
            if (next.has(name)) {
                next.delete(name);
            } else {
                next.add(name);
            }
            return next;
        });
    };

    const renderComment = (comment: Comment, depth: number = 0): React.JSX.Element => {
        const isExpanded = expandedComments.has(comment.id);
        const hasReplies = comment.replies && comment.replies.length > 0;

        return (
            <div key={comment.id} style={{ marginLeft: `${depth * 20}px`, marginTop: '10px' }}>
                <div>
                    <strong>{comment.author}</strong>: {comment.text}
                    {hasReplies && (
                        <button onClick={() => toggleComment(comment.id)}>
                            {isExpanded ? 'Hide' : 'Show'} Replies ({comment.replies!.length})
                        </button>
                    )}
                </div>
                {isExpanded && comment.replies && (
                    <div>
                        {comment.replies.map((reply) => renderComment(reply, depth + 1))}
                    </div>
                )}
            </div>
        );
    }

    const renderFileNode = (node: FileNode, depth: number = 0) => {
        const isExpanded = expandedFolders.has(node.name);
        const isFolder = node.type === 'folder';
        const hasChildren = node.children && node.children.length > 0;

        return (
            <div key={node.name} style={{ marginLeft: `${depth * 20}px` }}>
                <div>
                    {isFolder ? '📁' : '📄'} {node.name}
                    {node.size && ` (${node.size} bytes)`}
                    {isFolder && hasChildren && (
                        <button onClick={() => toggleFolder(node.name)}>
                            {isExpanded ? '▼' : '▶'}
                        </button>
                    )}
                </div>
                {isExpanded && node.children && (
                    <div>
                        {node.children.map((child) => renderFileNode(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    // JSON value example
    const jsonData: JSONValue = {
        name: 'John',
        age: 30,
        addresses: [
            {
                street: '123 Main St',
                city: 'New York',
                coordinates: {
                    lat: 40.7128,
                    lng: -74.0060,
                },
            },
        ],
    };

    return (
        <div>
            <h2>Recursive Comments</h2>
            {comments.map((comment) => renderComment(comment))}

            <h2>Recursive File System</h2>
            {renderFileNode(fileSystem)}

            <h2>Recursive JSON Data</h2>
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Tree Structures - Type file systems, organizational charts, DOM trees
 * 2. Nested Comments - Type comment threads with unlimited reply depth
 * 3. JSON Values - Type any valid JSON structure recursively
 * 4. Menu Systems - Type nested navigation menus with submenus
 * 5. Form Schemas - Type nested form configurations (groups, sections)
 * 6. GraphQL Types - Type nested GraphQL query results
 * 7. Deep Operations - Type deep readonly, partial, or required transformations
 * 8. Linked Lists - Type linked data structures (nodes with children)
 *
 * WHEN TO USE:
 * - When data has arbitrary nesting depth
 * - For tree or graph data structures
 * - When you need self-referencing types
 * - For recursive algorithms that operate on nested data
 * - When modeling hierarchical relationships
 */


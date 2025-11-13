'use client';

/**
 * TypeScript Fundamental: Optional Properties
 * - Using ? for optional fields
 * - Default values with optional props
 */

interface OptionalPropsConfig {
    title: string;
    subtitle?: string;
    description?: string;
    footer?: string;
    showBorder?: boolean;
}

export default function OptionalProperties({
    title,
    subtitle,
    description,
    footer,
    showBorder = false,
}: OptionalPropsConfig) {
    return (
        <div style={{ border: showBorder ? '1px solid black' : 'none' }}>
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
            {description && <p>{description}</p>}
            {footer && <footer>{footer}</footer>}
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Component Props - Props that aren't always required (subtitle, description, icon)
 * 2. Configuration Objects - Optional config settings with sensible defaults
 * 3. Form Fields - Optional form inputs that users may skip
 * 4. API Responses - Handle incomplete data from APIs
 * 5. Feature Flags - Optional features that may not be present
 * 6. Metadata - Optional metadata fields (author, tags, categories)
 * 7. UI Variations - Optional styling props (className, style)
 * 8. Partial Updates - When updating only some fields of an object
 *
 * WHEN TO USE:
 * - When a prop or field is not mandatory for the component to function
 * - When you want to provide default values
 * - For progressive disclosure in forms
 * - When dealing with incomplete or partial data
 * - For backwards compatibility (adding new optional fields)
 */


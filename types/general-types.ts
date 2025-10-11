import React, { ComponentType, ReactElement, FC } from 'react';

// ============================================
// COMPONENT TYPE BRANDS
// ============================================

declare const ServerBrand: unique symbol;
declare const ClientBrand: unique symbol;

export type ServerComponent<P = {}> = ComponentType<P> & {
    readonly [ServerBrand]: 'server';
};

export type ClientComponent<P = {}> = ComponentType<P> & {
    readonly [ClientBrand]: 'client';
};

// ============================================
// TYPE SYMBOLS FOR JSX "as" PROP
// ============================================

export const ServerComponent = Symbol.for('ServerComponent');
export const ClientComponent = Symbol.for('ClientComponent');

export type ComponentTypeSymbol =
    | typeof ServerComponent
    | typeof ClientComponent;

// ============================================
// JSX INTRINSIC ATTRIBUTES EXTENSION
// ============================================

declare global {
    namespace JSX {
        interface IntrinsicAttributes {
            /**
             * REQUIRED: Explicitly declare component type
             * Usage: <MyComponent as={ServerComponent} />
             */
            as?: ComponentTypeSymbol;
        }
    }
}

// ============================================
// COMPONENT EXPORT TYPES (Implicit Creation)
// ============================================

/**
 * Use in components WITHOUT "use client"
 */
export type SC<P = {}> = ServerComponent<P>;

/**
 * Use in components WITH "use client"
 */
export type CC<P = {}> = ClientComponent<P>;

// ============================================
// TYPE VALIDATION FOR USAGE
// ============================================

/**
 * Validates component is used with correct "as" type
 */
export type ValidateComponentType<
    TComponent,
    TAs extends ComponentTypeSymbol
> = TComponent extends ServerComponent<any>
    ? TAs extends typeof ServerComponent
    ? TComponent
    : 'ERROR: Server Component must use as={ServerComponent}'
    : TComponent extends ClientComponent<any>
    ? TAs extends typeof ClientComponent
    ? TComponent
    : 'ERROR: Client Component must use as={ClientComponent}'
    : 'ERROR: Component must be typed as SC<Props> or CC<Props>';

// ============================================
// RUNTIME TYPE CHECKING (Development Only)
// ============================================

/**
 * Runtime validation of component types
 */
export function validateComponentUsage<P>(
    Component: ServerComponent<P> | ClientComponent<P>,
    asType: ComponentTypeSymbol,
    displayName?: string
): void {
    if (process.env.NODE_ENV !== 'development') return;

    const isServerComp = ServerBrand in Component;
    const isClientComp = ClientBrand in Component;

    const name = displayName || Component.displayName || Component.name || 'Component';

    if (isServerComp && asType !== ServerComponent) {
        console.error(
            `❌ Type Error: "${name}" is a Server Component but used with as={ClientComponent}`
        );
    }

    if (isClientComp && asType !== ServerComponent) {
        console.error(
            `❌ Type Error: "${name}" is a Client Component but used with as={ServerComponent}`
        );
    }
}

// ============================================
// TYPED JSX FACTORY (Optional Enhanced DX)
// ============================================

/**
 * Type-safe JSX element creator with "as" validation
 */
export function createTypedElement<
    C extends ServerComponent<any> | ClientComponent<any>,
    P = C extends ServerComponent<infer P> ? P : C extends ClientComponent<infer P> ? P : never
>(
    Component: C,
    props: P & { as: ComponentTypeSymbol }
): ReactElement {
    const { as: asType, ...rest } = props;

    validateComponentUsage(Component, asType, Component.displayName);

    return React.createElement(Component, rest);
}
// ============================================
// BABEL/SWC TRANSFORM HELPER
// ============================================

/**
 * This would be used by a babel plugin to enforce "as" prop
 * The plugin would transform JSX to validate at compile time
 */
export function enforceAsProperty(
    jsx: ReactElement,
    componentType: ServerComponent<any> | ClientComponent<any>
): ReactElement {
    const asType = (jsx.props as any)?.as;

    if (!asType) {
        throw new Error(
            'Missing "as" prop: All components must specify as={ServerComponent} or as={ClientComponent}'
        );
    }

    return jsx;
}

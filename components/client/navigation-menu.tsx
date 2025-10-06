"use client"

import * as React from "react"
import Link from "next/link"
import { Route } from "next"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/shadcn-ui/navigation-menu"

export type NavItem = {
    label: string
    href?: string
    type: "main" | "sub"
    description?: string
    children?: NavItem[]
}

interface NavigationMenuDemoProps {
    className?: string
    items: NavItem[]
}

export default function NavigationMenuDemo({ className, items }: NavigationMenuDemoProps) {
    return (
        <NavigationMenu viewport={false} className={className}>
            <NavigationMenuList>
                {items.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        {item.type === "main" && item.href ? (
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={item.href as Route}>{item.label}</Link>
                            </NavigationMenuLink>
                        ) : item.type === "sub" && item.children ? (
                            <>
                                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {item.children.map((child, childIndex) => (
                                            <ListItem
                                                key={childIndex}
                                                title={child.label}
                                                href={child.href || "#"}
                                            >
                                                {child.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        ) : null}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href as Route}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

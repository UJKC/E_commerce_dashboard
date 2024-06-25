'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export function MainNav({ className, ...props}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`,
        },
    ]

    return(
        <nav className={cn('flex', className)}>
            {routes.map((routes) => (
                <Link key={routes.href} href={routes.href} className={cn('flex', routes.active ? 'text-black dark:text-white' : 'text-muted-foreground')}>
                    {routes.label}
                </Link>
            ))}
        </nav>
    )
}
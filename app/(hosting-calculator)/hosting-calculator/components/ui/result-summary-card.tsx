import * as React from "react"
import { cn } from "@/lib/utils"

type ResultSummaryCardProps = {
    title: string
    subtitle?: string
    caption?: string
    icon?: React.ReactNode
    badgeSlot?: React.ReactNode
    primaryMetric?: { label: string; value: string }
    secondaryMetrics?: Array<{ label: string; value: string }>
    footerSlot?: React.ReactNode
    className?: string
}

export function ResultSummaryCard({
    title,
    subtitle,
    caption,
    icon,
    badgeSlot,
    primaryMetric,
    secondaryMetrics,
    footerSlot,
    className,
}: ResultSummaryCardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded border border-border/60 bg-gradient-to-br from-background via-background/95 to-foreground/5 p-6 shadow-md",
                className,
            )}
        >
            <div className="absolute inset-y-0 right-0 w-1/3 rounded bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <div className="relative flex flex-col gap-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {icon && <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10 text-primary">{icon}</div>}
                        <div>
                            <h2 className="text-xl font-semibold text-foreground md:text-2xl">{title}</h2>
                            {subtitle && <p className="text-sm text-muted-foreground/80 md:text-base">{subtitle}</p>}
                        </div>
                    </div>
                    {badgeSlot}
                </div>

                {primaryMetric && (
                    <div className="flex flex-wrap items-baseline justify-between gap-4 rounded bg-muted/30 p-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground/80">
                                {primaryMetric.label}
                            </span>
                            <span className="text-3xl font-bold text-foreground md:text-4xl">{primaryMetric.value}</span>
                        </div>
                        {secondaryMetrics && secondaryMetrics.length > 0 && (
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                                {secondaryMetrics.map((metric, idx) => (
                                    <div key={idx} className="rounded bg-background/50 px-4 py-2 text-sm text-muted-foreground">
                                        <p className="font-medium text-foreground/80">{metric.value}</p>
                                        <p className="text-xs uppercase tracking-wide">{metric.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {caption && <p className="text-sm text-muted-foreground/80">{caption}</p>}

                {footerSlot && <div className="rounded bg-muted/20 p-4 text-sm text-muted-foreground">{footerSlot}</div>}
            </div>
        </div>
    )
}


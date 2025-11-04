"use client"

import { CalculatorProvider } from "../../components/core/provider"
import { useCalculator } from "../../components/core/provider"
import { cloudflareConfig } from "./config"
import { CalculatorLayout } from "../../components/composables/calculator-layout"
import { PlanSelector } from "../../components/composables/plan-selector"
import { ResetButton } from "../../components/composables/reset-button"
import { CostDisplay } from "../../components/composables/cost-display"
import { BreakdownList } from "../../components/composables/breakdown-list"
import { CloudflareInputs } from "./inputs"
import { SiCloudflare } from "react-icons/si"
import type { CloudflarePlan } from "./types"
import { TrendingUp } from "lucide-react"
import { Sidebar, SidebarContent } from "@/components/sidebar/reusable/sidebar"

export default function CloudflarePage() {
    return (
        <CalculatorProvider config={cloudflareConfig}>
            <CloudflareCalculator />
        </CalculatorProvider>
    )
}

function CloudflareCalculator() {
    const { cost, plan, setPlan, reset } = useCalculator<any, CloudflarePlan>()

    const plans = [
        { id: "free" as const, label: "Workers Free", icon: <SiCloudflare /> },
        { id: "paid" as const, label: "Workers Paid", icon: <SiCloudflare /> },
        { id: "custom" as const, label: "Workers Paid Custom", icon: <SiCloudflare /> },
    ]

    return (
        <CalculatorLayout className="grid !grid-cols-[1.5fr_0.2fr] ">
            {/* Inputs Section */}
            <div className="space-y-10  w-full">
                <div className="flex items-center px-[30px] border-b border-zinc-200 last-stack dark:bg-zinc-900 bg-white dark:border-zinc-800 h-[65.5px] sticky top-0 justify-between">
                    <PlanSelector plans={plans} value={plan} onChange={setPlan} />
                    <ResetButton onReset={reset} />
                </div>

                <div className="mx-auto max-w-4xl px-[30px]">
                    <CloudflareInputs />
                </div>
            </div>

            {/* Results Section */}
            {/* <div className="space-y-6"> */}
            <Sidebar className="right-0" width={350}>
                <SidebarContent>
                    <CostDisplay
                        cost={cost}
                        plan={plan === "free" ? "Free" : plan === "paid" ? "Paid" : "Custom"}
                        providerName="Cloudflare Workers"
                        providerIcon={<SiCloudflare className="h-6 w-6" />}
                    />

                    <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-500/10 px-3 py-2 rounded-lg">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">Zero bandwidth charges</span>
                    </div>

                    <BreakdownList breakdown={cost.breakdown} />
                </SidebarContent>
            </Sidebar>
            {/* </div> */}
        </CalculatorLayout>
    )
}

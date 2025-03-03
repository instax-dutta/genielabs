import type React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { ProgressRing } from "./progress-ring"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  progress?: number
}

export default function FeatureCard({ icon, title, description, href, progress = 0 }: FeatureCardProps) {
  return (
    <Card className="vercel-card group relative overflow-hidden rounded-lg transition-all">
      <div className="relative p-8">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-white">
          {icon}
        </div>
        <div className="absolute right-8 top-8">
          <ProgressRing progress={progress} />
        </div>
        <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
        <p className="mb-6 text-base font-medium text-white/60">{description}</p>
        <Link href={href} className="group/link inline-flex items-center text-base font-medium text-white">
          Try it now
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-2" />
        </Link>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.03] to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Card>
  )
}


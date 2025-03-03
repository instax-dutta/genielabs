import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  description: string
}

export default function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <Card className="group relative overflow-hidden border-2 bg-white/50 transition-all hover:scale-[1.02] hover:border-[#304FFE]/20 hover:shadow-[0_0_40px_8px_rgba(48,79,254,0.1)] dark:bg-slate-900/50">
      <div className="absolute inset-0 bg-gradient-to-br from-[#304FFE]/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute inset-[2px] rounded-lg bg-gradient-to-br from-[#304FFE]/10 to-transparent" />
      <div className="relative">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-[#304FFE] to-[#00C853] bg-clip-text text-3xl font-bold text-transparent">
            {value}
          </div>
          <CardDescription className="mt-2 text-sm">{description}</CardDescription>
        </CardContent>
      </div>
    </Card>
  )
}


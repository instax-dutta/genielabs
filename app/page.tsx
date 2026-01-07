"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, FileCode, GitCompare, Database, Bug, Sparkles } from "lucide-react"
import Link from "next/link"
import { AnimatedText } from "@/components/animated-text"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { homeToolIcons } from "@/components/home-tool-icons"
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/hero'), { ssr: false })

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <div className="relative min-h-screen bg-black" ref={containerRef}>
      {/* Hero Section - only initial viewport */}
      <Hero />
      {/* Main Content - tools grid etc. */}
      <section className="section-container relative z-10 py-16 sm:py-24">
        <div className="space-y-16 w-full">
          {/* Enhanced Tools Showcase */}
          <section id="tools-showcase" className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(48,79,254,0.05)_0%,rgba(0,0,0,0)_100%)] pointer-events-none" />

            <div className="grid gap-12 sm:gap-16">
              <div className="space-y-4 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent mx-auto max-w-4xl"
                >
                  AI-Powered Development Tools
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg sm:text-xl text-white/50 mx-auto max-w-2xl px-4"
                >
                  Streamline your workflow with our suite of intelligent coding tools designed for the modern developer.
                </motion.p>
              </div>

              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">                  {[
                {
                  href: "/tools/bug-fixer",
                  iconKey: "bug-fixer",
                  title: "Bug Fixer",
                  description: "Detect and fix code issues automatically",
                },
                {
                  href: "/tools/complexity-analyzer",
                  iconKey: "complexity-analyzer",
                  title: "Complexity Analyzer",
                  description: "Analyze code performance and complexity",
                },
                {
                  href: "/tools/code-explainer",
                  iconKey: "code-explainer",
                  title: "Code Explainer",
                  description: "Get plain-English code explanations",
                },
                {
                  href: "/tools/code-converter",
                  iconKey: "code-converter",
                  title: "Code Converter",
                  description: "Convert between programming languages",
                },
                {
                  href: "/tools/sql-generator",
                  iconKey: "sql-generator",
                  title: "SQL Generator",
                  description: "Generate SQL queries from text",
                },
                {
                  href: "/tools/regex-tool",
                  iconKey: "regex-tool",
                  title: "Regex Builder & Tester",
                  description: "Build, test, and explain regex patterns with AI",
                },
              ].map((tool, i) => {
                const Icon = homeToolIcons[tool.iconKey as keyof typeof homeToolIcons];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <Link
                      href={tool.href}
                      className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-center min-h-[220px] transition-all duration-500 hover:border-[#304FFE]/50 hover:bg-white/[0.05] hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(48,79,254,0.15)] glow-card"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#304FFE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="flex items-center gap-6 relative z-10 w-full h-full">
                        <motion.span
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className="rounded-2xl bg-gradient-to-br from-[#304FFE]/20 to-transparent p-4 ring-1 ring-white/10 shadow-2xl transition-all duration-300 group-hover:ring-[#304FFE]/40"
                        >
                          <Icon className="h-8 w-8 text-[#304FFE]" />
                        </motion.span>
                        <div className="flex flex-col items-start justify-center flex-1">
                          <h3 className="font-bold text-xl sm:text-2xl text-white group-hover:text-[#304FFE] transition-colors duration-300">
                            {tool.title}
                          </h3>
                          <p className="mt-2 text-sm sm:text-base text-white/40 group-hover:text-white/70 transition-colors duration-300 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

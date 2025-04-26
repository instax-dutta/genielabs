"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, FileCode, GitCompare, Database, Bug, Sparkles } from "lucide-react"
import Link from "next/link"
import { AnimatedText } from "@/components/animated-text"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { homeToolIcons } from "@/components/home-tool-icons"
import PoweredByMistral from "@/components/powered-by-mistral"
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
      <section className="container max-w-6xl px-4 sm:px-8 sm:py-12 lg:py-16 mx-auto relative z-10">
        <div className="space-y-8 w-full">
          {/* Enhanced Tools Showcase */}
          <section id="tools-showcase" className="relative overflow-hidden bg-black py-16 sm:py-20 md:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(48,79,254,0.03)_0%,rgba(0,0,0,0)_100%)]" />
            <div className="container mx-auto max-w-[1200px] px-4 sm:px-6">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-full mb-12 space-y-4 text-center">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent mx-auto max-w-3xl"
                  >
                    AI-Powered Development Tools
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-base xs:text-lg sm:text-xl text-white/60 mx-auto max-w-2xl"
                  >
                    Streamline your workflow with our suite of intelligent coding tools
                  </motion.p>
                </div>
                <div className="col-span-full grid gap-10 sm:gap-10 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                  {[
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full flex"
                      >
                        <Link
                          href={tool.href}
                          className="group relative block h-full w-full overflow-hidden rounded-lg border border-white/20 bg-white/5 p-6 flex flex-col justify-center min-h-[220px] transition-all duration-300 hover:border-[#304FFE]/30 hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(48,79,254,0.2)]"
                        >
                          <div className="flex items-center gap-4 w-full h-full">
                            <span className="rounded-full bg-gradient-to-br from-[#304FFE]/10 to-[#304FFE]/5 p-2.5 ring-1 ring-[#304FFE]/20 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#304FFE]/20 group-hover:ring-[#304FFE]/30">
                              <span className="h-7 w-7 text-[#304FFE] transition-colors duration-300 group-hover:text-white flex items-center justify-center">
                                <Icon className="h-7 w-7" />
                              </span>
                            </span>
                            <div className="flex flex-col items-start justify-center w-full">
                              <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-white transition-colors duration-300 group-hover:text-white/90">
                                {tool.title}
                              </h3>
                              <p className="mt-1 text-xs xs:text-sm sm:text-base text-white/60 transition-colors duration-300 group-hover:text-white/70">
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
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

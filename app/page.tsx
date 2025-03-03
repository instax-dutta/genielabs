"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, FileCode, GitCompare, Database, Bug, Sparkles } from "lucide-react"
import Link from "next/link"
import { AnimatedText } from "@/components/animated-text"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

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
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-16 sm:px-6 sm:py-20">
        {/* Enhanced Background Elements */}
        <div className="vercel-gradient absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_100%)]" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(48,79,254,0.08) 0%, transparent 80%)",
            opacity,
            scale,
          }}
        />

        {/* Content */}
        <div className="container relative mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center justify-center space-y-12 text-center">
            {/* Enhanced Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="animate-float group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 backdrop-blur-xl hover:border-[#304FFE]/50 hover:bg-white/15"
            >
              <Sparkles className="h-5 w-5 animate-pulse-slow text-white transition-transform duration-300 group-hover:scale-110" />
              <span className="text-base font-medium text-white/90 transition-colors duration-300 group-hover:text-white">
                Powered by Advanced AI
              </span>
            </motion.div>

            {/* Enhanced Main Content */}
            <div className="space-y-8">
              <AnimatedText
                text="Transform Your Code Experience"
                className="animate-gradient bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-balance text-5xl font-extrabold tracking-[-0.02em] text-transparent [text-shadow:_0_2px_20px_rgba(255,255,255,0.15)] sm:text-6xl md:text-7xl lg:text-8xl"
                delay={0.2}
              />
              <AnimatedText
                text="Elevate your development workflow with AI-powered tools that help you write, analyze, and improve code faster than ever."
                className="mx-auto max-w-[800px] text-lg font-medium text-white/80 transition-all duration-300 hover:text-white sm:text-xl md:text-2xl"
                delay={0.4}
              />
            </div>

            {/* Enhanced Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col gap-4 sm:flex-row sm:gap-6"
            >
              <Link href="/tools/bug-fixer" className="group">
                <Button
                  size="lg"
                  className="animate-shimmer relative h-14 w-full overflow-hidden bg-white px-8 text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-[0_0_20px_rgba(48,79,254,0.3)] sm:w-auto"
                >
                  <span className="flex items-center gap-2 text-base font-semibold">
                    Get Started
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </motion.div>

            {/* Enhanced Feature Highlights */}
            <div className="grid w-full max-w-3xl gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
              {[
                {
                  icon: <Bug className="h-6 w-6" />,
                  text: "Smart Bug Detection",
                },
                {
                  icon: <Code className="h-6 w-6" />,
                  text: "Instant Code Analysis",
                },
                {
                  icon: <FileCode className="h-6 w-6" />,
                  text: "Multiple Language Support",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                  className="group relative overflow-hidden rounded-lg border border-white/20 bg-white/5 px-6 py-4 backdrop-blur-xl transition-all duration-300 hover:border-[#304FFE]/30 hover:bg-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="rounded-full bg-gradient-to-br from-[#304FFE]/10 to-[#304FFE]/5 p-2.5 ring-1 ring-white/20 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#304FFE]/20 group-hover:ring-[#304FFE]/30">
                      <div className="h-6 w-6 text-white/90 transition-colors duration-300 group-hover:text-white">
                        {item.icon}
                      </div>
                    </div>
                    <span className="text-base font-medium text-white">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tools Showcase */}
      <section id="tools-showcase" className="relative overflow-hidden bg-black py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(48,79,254,0.03)_0%,rgba(0,0,0,0)_100%)]" />
        <div className="container mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full mb-12 space-y-4 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl mx-auto max-w-3xl"
              >
                AI-Powered Development Tools
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-white/60 mx-auto max-w-2xl"
              >
                Streamline your workflow with our suite of intelligent coding tools
              </motion.p>
            </div>
            <div className="col-span-full grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: "/tools/bug-fixer",
                  icon: <Bug className="h-7 w-7 text-white" />,
                  title: "Bug Fixer",
                  description: "Detect and fix code issues automatically",
                },
                {
                  href: "/tools/complexity-analyzer",
                  icon: <Code className="h-7 w-7 text-white" />,
                  title: "Complexity Analyzer",
                  description: "Analyze code performance and complexity",
                },
                {
                  href: "/tools/code-explainer",
                  icon: <FileCode className="h-7 w-7 text-white" />,
                  title: "Code Explainer",
                  description: "Get plain-English code explanations",
                },
                {
                  href: "/tools/code-converter",
                  icon: <GitCompare className="h-7 w-7 text-white" />,
                  title: "Code Converter",
                  description: "Convert between programming languages",
                },
                {
                  href: "/tools/sql-generator",
                  icon: <Database className="h-7 w-7 text-white" />,
                  title: "SQL Generator",
                  description: "Generate SQL queries from text",
                },
              ].map((tool, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={tool.href}
                    className="group relative block overflow-hidden rounded-lg border border-white/20 bg-white/5 p-4 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#304FFE]/30 hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(48,79,254,0.2)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#304FFE]/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex items-center gap-4">
                      <div className="rounded-full bg-gradient-to-br from-[#304FFE]/10 to-[#304FFE]/5 p-2.5 ring-1 ring-[#304FFE]/20 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#304FFE]/20 group-hover:ring-[#304FFE]/30">
                        <div className="h-6 w-6 text-white/90 transition-colors duration-300 group-hover:text-white">
                          {tool.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white transition-colors duration-300 group-hover:text-white/90">
                          {tool.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/60 transition-colors duration-300 group-hover:text-white/70">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


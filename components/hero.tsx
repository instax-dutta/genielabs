import { motion } from "framer-motion"
import { AnimatedText } from "@/components/animated-text"
import PoweredByMistral from "@/components/powered-by-mistral";
import { Bug, Code, FileCode } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-8 sm:px-6 sm:py-10">
      {/* Enhanced Background Elements */}
      <div className="vercel-gradient absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_100%)]" />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(48,79,254,0.08) 0%, transparent 80%)",
        }}
      />
      {/* Hero Content */}
      <div className="container max-w-6xl px-4 sm:px-8 sm:py-12 lg:py-16 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          {/* Powered by Mistral badge - only one instance */}
          <div className="flex justify-center mb-8">
            <PoweredByMistral />
          </div>
          <AnimatedText
            text="Transform Your Code Experience"
            className="hero-text animate-gradient bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-balance text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] text-transparent [text-shadow:_0_2px_20px_rgba(255,255,255,0.15)]"
            delay={0.2}
          />
          <AnimatedText
            text="Elevate your development workflow with AI-powered tools that help you write, analyze, and improve code faster than ever."
            className="mx-auto max-w-[95vw] sm:max-w-[800px] text-base xs:text-lg sm:text-xl md:text-2xl font-medium text-white/80 transition-all duration-300 hover:text-white"
            delay={0.4}
          />
          {/* Feature Highlights in Hero */}
          <div className="grid w-full max-w-6xl gap-10 grid-cols-1 sm:grid-cols-3 mt-8">
            {[
              {
                icon: <Bug className="h-10 w-10 text-[#304FFE] mx-auto mb-4" />,
                text: "Smart Bug Detection",
              },
              {
                icon: <Code className="h-10 w-10 text-[#304FFE] mx-auto mb-4" />,
                text: "Instant Code Analysis",
              },
              {
                icon: <FileCode className="h-10 w-10 text-[#304FFE] mx-auto mb-4" />,
                text: "Multiple Language Support",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl bg-white/5 border border-white/20 px-6 py-8 flex flex-col items-center justify-center text-center min-h-[120px]"
              >
                {item.icon}
                <div className="font-semibold text-white text-base sm:text-lg mt-1">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Explore Tools Button */}
          <div className="flex justify-center mt-8">
            <a href="#tools" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-lg font-semibold text-black shadow-lg transition-all duration-300 hover:bg-white/90 hover:text-[#304FFE] focus:outline-none focus:ring-2 focus:ring-[#304FFE]/40">
              Explore Tools
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

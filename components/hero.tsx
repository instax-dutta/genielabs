import { motion } from "framer-motion"
import { AnimatedText } from "@/components/animated-text"
import { Bug, Code, FileCode, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-black px-4 sm:px-6">
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
      <div className="container max-w-7xl px-4 sm:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-10 sm:space-y-14 text-center">
          {/* Visual highlight badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#304FFE]" />
              Ultimate AI Coding Suite
            </div>
          </motion.div>

          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
            <AnimatedText
              text="Transform Your Code Experience"
              className="hero-text animate-gradient bg-gradient-to-r from-white via-white to-[#304FFE]/50 bg-clip-text text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-transparent drop-shadow-2xl"
              delay={0.1}
            />
            <AnimatedText
              text="Elevate your development workflow with AI-powered tools that help you write, analyze, and improve code faster than ever."
              className="mx-auto max-w-[90vw] sm:max-w-2xl text-center text-base sm:text-lg md:text-xl font-medium text-white/40 leading-relaxed px-4"
              delay={0.3}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 mt-6">
            {[
              {
                icon: <Bug className="h-6 w-6 text-[#304FFE]" />,
                text: "Smart Bug Detection",
              },
              {
                icon: <Code className="h-6 w-6 text-[#304FFE]" />,
                text: "Instant Code Analysis",
              },
              {
                icon: <FileCode className="h-6 w-6 text-[#304FFE]" />,
                text: "Multiple Language Support",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 glass-morphism ios-transition hover:border-[#304FFE]/40 hover:bg-white/[0.05] hover:premium-shadow"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-xl bg-[#304FFE]/10 p-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="font-bold text-white text-base sm:text-lg text-center">
                    {item.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <a href="#tools-showcase" className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-lg font-bold text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-[#304FFE] hover:text-white hover:scale-105 active:scale-95">
              Explore Tools
              <svg className="ml-1 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

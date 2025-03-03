"use client"

import { Bug, Code, FileCode, GitCompare, Database } from "lucide-react"
import { motion } from "framer-motion"

interface ToolHeaderProps {
  title: string
  description: string
  icon: string
}

export default function ToolHeader({ title, description, icon }: ToolHeaderProps) {
  const getIcon = () => {
    switch (icon) {
      case "bug":
        return <Bug className="h-10 w-10 text-white" />
      case "code":
        return <Code className="h-10 w-10 text-white" />
      case "file-code":
        return <FileCode className="h-10 w-10 text-white" />
      case "git-compare":
        return <GitCompare className="h-10 w-10 text-white" />
      case "database":
        return <Database className="h-10 w-10 text-white" />
      default:
        return <Code className="h-10 w-10 text-white" />
    }
  }

  return (
    <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col items-center space-y-4 text-center px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-full bg-[#304FFE]/10 p-3 sm:p-4 backdrop-blur-sm border border-[#304FFE]/20"
      >
        {getIcon()}
      </motion.div>
      <div className="space-y-2 sm:space-y-3">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-b from-white to-[#304FFE]/90 bg-clip-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-transparent"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-[700px] text-base sm:text-lg text-white/60 md:text-xl/relaxed"
        >
          {description}
        </motion.p>
      </div>
    </div>
  )
}


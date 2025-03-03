"use client"

import { Card } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

interface CodeDisplayProps {
  code: string
  language: string
}

export default function CodeDisplay({ code, language }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="relative overflow-hidden border border-white/10 bg-black/60 text-white backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2 sm:px-4">
          <div className="text-sm font-medium text-white/60">{language}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 text-white/60 hover:text-white hover:bg-white/5"
          >
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <div className="overflow-x-auto">
          <pre className="p-3 sm:p-4 text-xs sm:text-sm">
            <code className="font-mono whitespace-pre-wrap break-words">{code}</code>
          </pre>
        </div>
      </Card>
    </motion.div>
  )
}


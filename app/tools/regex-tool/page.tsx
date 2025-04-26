"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ToolHeader from "@/components/tool-header"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function RegexToolPage() {
  const [pattern, setPattern] = useState("")
  const [testText, setTestText] = useState("")
  const [flags, setFlags] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [explanation, setExplanation] = useState("")
  const [error, setError] = useState("")
  const [matches, setMatches] = useState<number[][]>([])

  const handleExplain = async () => {
    if (!pattern) return
    setIsLoading(true)
    setExplanation("")
    setError("")
    try {
      const prompt = `Explain in plain English what this regex does: /${pattern}/${flags}`
      const response = await fetch("/api/codestral-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, max_tokens: 500, temperature: 0.3 })
      })
      const data = await response.json()
      const responseContent = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || data.completion || data.result || ""
      setExplanation(responseContent.trim())
    } catch (e) {
      setExplanation("")
      setError("Could not get explanation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTest = () => {
    setError("")
    setMatches([])
    if (!pattern) return
    try {
      const regex = new RegExp(pattern, flags)
      let match: RegExpExecArray | null
      let allMatches: number[][] = []
      if (testText) {
        let lastIndex = 0
        while ((match = regex.exec(testText)) !== null) {
          allMatches.push([match.index, match.index + match[0].length])
          // Prevent infinite loop for zero-width matches
          if (regex.lastIndex === match.index) regex.lastIndex++
        }
      }
      setMatches(allMatches)
    } catch (e: any) {
      setError("Invalid regex pattern or flags.")
    }
  }

  // Highlight matches in test text
  const getHighlightedText = () => {
    if (!matches.length) return testText
    let parts = []
    let lastIdx = 0
    for (const [start, end] of matches) {
      if (lastIdx < start) parts.push(testText.slice(lastIdx, start))
      parts.push(<mark key={start} className="bg-[#304FFE]/30 text-[#304FFE] font-bold rounded px-0.5">{testText.slice(start, end)}</mark>)
      lastIdx = end
    }
    if (lastIdx < testText.length) parts.push(testText.slice(lastIdx))
    return parts
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:py-12">
        <ToolHeader
          title="Regex Builder & Tester"
          description="Build, test, and understand regular expressions with AI explanations."
          icon="regex-tool"
        />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-0"
          >
            <Card className="h-full min-h-[300px] sm:min-h-0 border-white/10 bg-black/60 backdrop-blur-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl xs:text-2xl sm:text-3xl text-white">Regex Pattern</CardTitle>
                <CardDescription className="text-sm xs:text-base sm:text-lg text-white/60">
                  Enter your regex and flags (e.g. <code>gim</code> for global, ignore case, multiline)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="e.g. ^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
                    className="min-h-[60px] border-white/10 bg-white/5 font-mono text-sm text-white placeholder:text-white/40"
                    value={pattern}
                    onChange={e => setPattern(e.target.value)}
                  />
                  <input
                    type="text"
                    maxLength={5}
                    className="w-16 rounded border border-white/10 bg-white/5 px-2 py-2 text-sm text-white placeholder:text-white/40"
                    placeholder="flags"
                    value={flags}
                    onChange={e => setFlags(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleExplain} disabled={!pattern || isLoading} className="w-full bg-white text-black hover:bg-white/90">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Explain Regex"}
                  </Button>
                </div>
                {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-0"
          >
            <Card className="h-full min-h-[300px] sm:min-h-0 border-white/10 bg-black/60 backdrop-blur-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl xs:text-2xl sm:text-3xl text-white">Test Text</CardTitle>
                <CardDescription className="text-sm xs:text-base sm:text-lg text-white/60">
                  Paste sample text to test your regex
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your sample text here..."
                  className="min-h-[120px] border-white/10 bg-white/5 font-mono text-sm text-white placeholder:text-white/40"
                  value={testText}
                  onChange={e => setTestText(e.target.value)}
                />
                <Button onClick={handleTest} disabled={!pattern || !testText} className="w-full bg-white text-black hover:bg-white/90">
                  Test Regex
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="mt-8">
          <Tabs defaultValue="matches" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="matches" className="data-[state=active]:bg-white data-[state=active]:text-black">
                Matches
              </TabsTrigger>
              <TabsTrigger value="explanation" className="data-[state=active]:bg-white data-[state=active]:text-black">
                Explanation
              </TabsTrigger>
            </TabsList>
            <TabsContent value="matches" className="mt-0">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80 sm:text-base">
                <div className="whitespace-pre-wrap font-mono text-base break-words">
                  {typeof getHighlightedText() === "string"
                    ? getHighlightedText()
                    : getHighlightedText()}
                </div>
                {!matches.length && testText && (
                  <div className="text-xs text-white/40 mt-2">No matches found.</div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="explanation" className="mt-0">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80 sm:text-base">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Explaining...</span>
                  </div>
                ) : explanation ? (
                  <div className="whitespace-pre-wrap">{explanation}</div>
                ) : (
                  <div className="text-xs text-white/40">Enter a regex pattern and click Explain Regex.</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

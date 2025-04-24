"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/components/code-display"
import ToolHeader from "@/components/tool-header"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function BugFixerPage() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ fixedCode: string; explanation: string } | null>(null)

  const handleSubmit = async () => {
    if (!code) return

    setIsLoading(true)
    setResult(null)

    try {
      // Create a prompt that instructs the model to fix the code and provide an explanation
      const prompt = `
I need you to fix bugs in the following ${language} code:

\`\`\`${language}
${code}
\`\`\`

Please provide:
1. The fixed code
2. An explanation of what was wrong and how you fixed it

Format your response as follows:

FIXED_CODE:
\`\`\`${language}
// Your fixed code here
\`\`\`

EXPLANATION:
// Your explanation here
`

      // Call the Mistral Codestral API
      const response = await fetch("https://codestral.mistral.ai/v1/fim/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      })

      const data = await response.json()

      const responseContent = data.completion

      // Parse the response to extract code and explanation
      const parts = parseResponse(responseContent)
      if (parts) {
        setResult({
          fixedCode: parts.code,
          explanation: parts.explanation,
        })
      } else {
        // If parsing fails, use the whole response as explanation
        setResult({
          fixedCode: "// Could not parse fixed code from response",
          explanation: responseContent,
        })
      }
    } catch (error) {
      console.error("Error calling Mistral Codestral API:", error)
      setResult({
        fixedCode: "// Error processing your request. Please try again.",
        explanation: "There was an error processing your request. Please try again or check your code syntax.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to parse the response and extract code and explanation
  const parseResponse = (response: string) => {
    // Look for the fixed code section
    const codeMatch = response.match(/FIXED_CODE:\s*```(?:\w+)?\s*([\s\S]*?)```/i)
    const explanationMatch = response.match(/EXPLANATION:\s*([\s\S]*?)(?:$|FIXED_CODE)/i)

    if (codeMatch || explanationMatch) {
      return {
        code: codeMatch ? codeMatch[1].trim() : "",
        explanation: explanationMatch ? explanationMatch[1].trim() : "",
      }
    }

    // If we can't find the specific format, try to extract code blocks
    const codeBlocks = response.match(/```(?:\w+)?\s*([\s\S]*?)```/g)
    if (codeBlocks && codeBlocks.length > 0) {
      // Extract the first code block
      const firstCodeBlock = codeBlocks[0].match(/```(?:\w+)?\s*([\s\S]*?)```/)
      const codeContent = firstCodeBlock ? firstCodeBlock[1].trim() : ""

      // Remove code blocks from response to get explanation
      const explanationContent = response.replace(/```(?:\w+)?\s*[\s\S]*?```/g, "").trim()

      return {
        code: codeContent,
        explanation: explanationContent,
      }
    }

    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:py-12">
        <ToolHeader
          title="AI Bug Fixer"
          description="Paste your buggy code and let our AI identify and fix issues with detailed explanations."
          icon="bug"
        />

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-0"
          >
            <Card className="h-full min-h-[400px] sm:min-h-0 border-white/10 bg-black/60 backdrop-blur-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-white sm:text-2xl">Your Code</CardTitle>
                <CardDescription className="text-sm text-white/60 sm:text-base">
                  Paste the code you want to fix
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="h-10 border-white/10 bg-white/5 text-white sm:h-11">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-black/90 text-white backdrop-blur-sm">
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="ruby">Ruby</SelectItem>
                      <SelectItem value="php">PHP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="function calculateSum(numbers) {
return numbers.reduce((sum, num) => sum + num);
}"
                  className="min-h-[200px] border-white/10 bg-white/5 font-mono text-sm text-white placeholder:text-white/40 sm:min-h-[300px] sm:text-base"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!code || isLoading}
                  className="w-full bg-white text-black transition-all hover:bg-white/90 sm:h-11"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    "Fix My Code"
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-0"
          >
            <Card className="h-full min-h-[400px] sm:min-h-0 border-white/10 bg-black/60 backdrop-blur-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-white sm:text-2xl">Results</CardTitle>
                <CardDescription className="text-sm text-white/60 sm:text-base">
                  Fixed code and explanation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4 text-center sm:min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-white/60" />
                    <p className="text-sm text-white/60 sm:text-base">AI is analyzing your code...</p>
                  </div>
                ) : result ? (
                  <Tabs defaultValue="fixed-code" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2 bg-white/5">
                      <TabsTrigger
                        value="fixed-code"
                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                      >
                        Fixed Code
                      </TabsTrigger>
                      <TabsTrigger
                        value="explanation"
                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                      >
                        Explanation
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="fixed-code" className="mt-0">
                      <CodeDisplay code={result.fixedCode} language={language} />
                    </TabsContent>
                    <TabsContent value="explanation" className="mt-0">
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80 sm:text-base">
                        <p className="whitespace-pre-wrap">{result.explanation}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="flex min-h-[200px] items-center justify-center text-center sm:min-h-[300px]">
                    <div>
                      <p className="text-sm text-white/60 sm:text-base">
                        Submit your code to see the fixed version and explanation
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

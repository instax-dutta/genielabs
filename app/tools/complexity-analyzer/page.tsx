"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ToolHeader from "@/components/tool-header"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function ComplexityAnalyzerPage() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ complexity: string; explanation: string; optimization: string } | null>(null)

  const handleSubmit = async () => {
    if (!code) return

    setIsLoading(true)
    setResult(null)

    try {
      // Create a prompt that instructs the model to analyze code complexity
      const prompt = `
I need you to analyze the time and space complexity of the following ${language} code:

\`\`\`${language}
${code}
\`\`\`

Please provide:
1. The time complexity (Big-O notation)
2. A detailed explanation of why this is the time complexity
3. Optimization suggestions to improve the code's efficiency

Format your response as follows:

COMPLEXITY:
// Time complexity in Big-O notation

EXPLANATION:
// Detailed explanation of the complexity analysis

OPTIMIZATION:
// Suggestions for optimizing the code, including code examples if applicable
`

      // Call the Mistral Codestral API
      const response = await fetch("/api/codestral-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          suffix: "",
          max_tokens: 1000,
          temperature: 0.7,
        }),
      })
      const data = await response.json()
      const responseContent = data.choices?.[0]?.text || data.completion || data.result || ""

      // Parse the response to extract complexity, explanation, and optimization
      const parts = parseResponse(responseContent)
      if (parts) {
        setResult({
          complexity: parts.complexity,
          explanation: parts.explanation,
          optimization: parts.optimization,
        })
      } else {
        // If parsing fails, use the whole response
        setResult({
          complexity: "Could not determine",
          explanation: "Could not parse a specific explanation from the response.",
          optimization: responseContent,
        })
      }
    } catch (error) {
      console.error("Error calling Mistral Codestral API:", error)
      setResult({
        complexity: "Error",
        explanation: "There was an error processing your request. Please try again or check your code syntax.",
        optimization: "Unable to provide optimization suggestions due to an error.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to parse the response
  const parseResponse = (response: string) => {
    // Look for the complexity section
    const complexityMatch = response.match(/COMPLEXITY:\s*([\s\S]*?)(?=\n\n|EXPLANATION:|$)/)
    const explanationMatch = response.match(/EXPLANATION:\s*([\s\S]*?)(?=\n\n|OPTIMIZATION:|$)/)
    const optimizationMatch = response.match(/OPTIMIZATION:\s*([\s\S]*?)(?=$)/)

    if (complexityMatch || explanationMatch || optimizationMatch) {
      return {
        complexity: complexityMatch ? complexityMatch[1].trim() : "O(?)",
        explanation: explanationMatch ? explanationMatch[1].trim() : "",
        optimization: optimizationMatch ? optimizationMatch[1].trim() : "",
      }
    }

    // If we can't find the specific format, try to extract Big-O notation
    const bigOMatch = response.match(/O$$[^)]*$$/)
    if (bigOMatch) {
      // Split the response into parts based on the Big-O notation
      const bigO = bigOMatch[0]
      const parts = response.split(bigO)

      return {
        complexity: bigO,
        explanation: parts[0].trim(),
        optimization: parts.length > 1 ? parts[1].trim() : "",
      }
    }

    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:py-12">
        <ToolHeader
          title="Code Complexity Analyzer"
          description="Analyze your code's time and space complexity with optimization suggestions."
          icon="code"
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
                  Paste the code you want to analyze
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
                  placeholder="function findPair(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return null;
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
                    "Analyze Complexity"
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
                <CardTitle className="text-xl text-white sm:text-2xl">Analysis Results</CardTitle>
                <CardDescription className="text-sm text-white/60 sm:text-base">
                  Time complexity and optimization suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4 text-center sm:min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-white/60" />
                    <p className="text-sm text-white/60 sm:text-base">AI is analyzing your code complexity...</p>
                  </div>
                ) : result ? (
                  <Tabs defaultValue="complexity" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3 bg-white/5">
                      <TabsTrigger
                        value="complexity"
                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                      >
                        Complexity
                      </TabsTrigger>
                      <TabsTrigger
                        value="explanation"
                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                      >
                        Explanation
                      </TabsTrigger>
                      <TabsTrigger
                        value="optimization"
                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                      >
                        Optimization
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="complexity" className="mt-0">
                      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                        <div className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold text-transparent">
                          {result.complexity}
                        </div>
                        <p className="text-sm text-white/60">Time Complexity</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="explanation" className="mt-0">
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80 sm:text-base">
                        <p className="whitespace-pre-wrap">{result.explanation}</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="optimization" className="mt-0">
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80 sm:text-base">
                        <div
                          className="whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{
                            __html: result.optimization.replace(
                              /```(?:javascript|python|java|csharp|cpp|go|ruby|php)?\s*([\s\S]*?)```/g,
                              '<pre class="my-4 overflow-x-auto rounded-md bg-black/40 p-4 font-mono"><code>$1</code></pre>',
                            ),
                          }}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="flex min-h-[200px] items-center justify-center text-center sm:min-h-[300px]">
                    <div>
                      <p className="text-sm text-white/60 sm:text-base">
                        Submit your code to see the complexity analysis
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Loader2 } from "lucide-react"
import CodeDisplay from "@/components/code-display"
import ToolHeader from "@/components/tool-header"
import { motion } from "framer-motion"
import ReactMarkdown from 'react-markdown';

export default function CodeExplainerPage() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [isLoading, setIsLoading] = useState(false)
  const [explanation, setExplanation] = useState("")

  const handleSubmit = async () => {
    if (!code) return

    setIsLoading(true)
    setExplanation("")

    try {
      // Create a prompt that instructs the model to explain the code
      const prompt = `
I need you to explain the following ${language} code in simple terms:

\`\`\`${language}
${code}
\`\`\`

Please provide a detailed explanation in markdown format that includes:
1. A high-level overview of what the code does
2. An explanation of the key components and functions
3. The time and space complexity (if applicable)
4. Any potential issues or optimizations

Format your response as markdown with proper headings, lists, and code blocks.
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
      const responseContent = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || data.completion || data.result || ""

      // Set the explanation from the response
      setExplanation(responseContent)
    } catch (error) {
      console.error("Error calling Mistral Codestral API:", error)
      setExplanation(
        "# Error\n\nThere was an error processing your request. Please try again or check your code syntax.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const downloadMarkdown = () => {
    const element = document.createElement("a")
    const file = new Blob([explanation], { type: "text/markdown" })
    element.href = URL.createObjectURL(file)
    element.download = "code-explanation.md"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="section-container py-8 sm:py-12">
        <ToolHeader
          title="Code Explainer"
          description="Get clear, human-friendly explanations for any code snippet."
          icon="code-explainer"
        />

        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-0"
          >
            <Card className="h-full border-white/10 bg-black/60 backdrop-blur-md premium-shadow">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-white">Your Code</CardTitle>
                <CardDescription className="text-sm sm:text-base text-white/50">
                  Paste the code you want to explain
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
                  placeholder="function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
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
                      Generating Explanation...
                    </span>
                  ) : (
                    "Explain This Code"
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
            <Card className="h-full border-white/10 bg-black/60 backdrop-blur-md premium-shadow">
              <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-white">Explanation</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-white/50">
                    AI-generated explanation
                  </CardDescription>
                </div>
                {explanation && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadMarkdown}
                    className="mt-2 border-white/10 bg-white/5 text-white hover:bg-white/10 sm:mt-0"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download MD
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4 text-center sm:min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-white/60" />
                    <p className="text-sm text-white/60 sm:text-base">AI is generating your explanation...</p>
                  </div>
                ) : explanation ? (
                  <Tabs defaultValue="preview" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2 bg-white/5">
                      <TabsTrigger
                        value="preview"
                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                      >
                        Preview
                      </TabsTrigger>
                      <TabsTrigger
                        value="markdown"
                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                      >
                        Markdown
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="mt-0">
                      <div className="prose prose-invert max-w-none rounded-lg border border-white/10 bg-white/5 p-4 text-sm sm:text-base">
                        <ReactMarkdown>{explanation}</ReactMarkdown>
                      </div>
                    </TabsContent>
                    <TabsContent value="markdown" className="mt-0">
                      <CodeDisplay code={explanation} language="markdown" />
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="flex min-h-[200px] items-center justify-center text-center sm:min-h-[300px]">
                    <div>
                      <p className="text-sm text-white/60 sm:text-base">Submit your code to see the explanation</p>
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

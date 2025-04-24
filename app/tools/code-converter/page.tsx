"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CodeDisplay from "@/components/code-display"
import ToolHeader from "@/components/tool-header"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function CodeConverterPage() {
  const [sourceCode, setSourceCode] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("javascript")
  const [targetLanguage, setTargetLanguage] = useState("python")
  const [isLoading, setIsLoading] = useState(false)
  const [convertedCode, setConvertedCode] = useState("")

  const handleSubmit = async () => {
    if (!sourceCode) return

    setIsLoading(true)
    setConvertedCode("")

    try {
      // Create a prompt that instructs the model to convert the code
      const prompt = `
I need you to convert the following code from ${sourceLanguage} to ${targetLanguage}:

\`\`\`${sourceLanguage}
${sourceCode}
\`\`\`

Please provide only the converted code in ${targetLanguage} without any explanations or comments about the conversion process.
Make sure the converted code follows best practices and idioms of the target language.
`

      // Call the Mistral Codestral API
      const response = await fetch("/api/codestral-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      })
      // Mistral chat API returns choices[0].message.content
      const data = await response.json()
      const responseContent = data.choices?.[0]?.message?.content || ""

      // Extract the code from the response
      const extractedCode = extractCodeFromResponse(responseContent, targetLanguage)
      setConvertedCode(extractedCode)
    } catch (error) {
      console.error("Error calling Mistral Codestral API:", error)
      setConvertedCode(`// Error: Could not convert the code\n// Please try again or check your code syntax.`)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to extract code from the response
  const extractCodeFromResponse = (response: string, targetLang: string) => {
    // Try to extract code from code blocks
    const codeBlockMatch = response.match(/```(?:\w+)?\s*([\s\S]*?)```/)
    return codeBlockMatch ? codeBlockMatch[1].trim() : response.trim()
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:py-12">
        <ToolHeader
          title="Code Converter"
          description="Translate your code between different programming languages seamlessly."
          icon="git-compare"
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
                <CardTitle className="text-xl text-white sm:text-2xl">Source Code</CardTitle>
                <CardDescription className="text-sm text-white/60 sm:text-base">
                  Paste the code you want to convert
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                    <SelectTrigger className="h-10 border-white/10 bg-white/5 text-white sm:h-11">
                      <SelectValue placeholder="Select Source Language" />
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
                  placeholder="function calculateFibonacci(n) {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  }

  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}

// Example usage
const result = calculateFibonacci(10);
console.log(`The 10th Fibonacci number is: ${result}`);"
                  className="min-h-[200px] border-white/10 bg-white/5 font-mono text-sm text-white placeholder:text-white/40 sm:min-h-[300px] sm:text-base"
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                />
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
                <CardTitle className="text-xl text-white sm:text-2xl">Converted Code</CardTitle>
                <CardDescription className="text-sm text-white/60 sm:text-base">
                  Your code translated to the target language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger className="h-10 border-white/10 bg-white/5 text-white sm:h-11">
                      <SelectValue placeholder="Select Target Language" />
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
                <Button
                  onClick={handleSubmit}
                  disabled={!sourceCode || isLoading}
                  className="w-full bg-white text-black transition-all hover:bg-white/90 sm:h-11"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Converting...
                    </span>
                  ) : (
                    "Convert Code"
                  )}
                </Button>
                {isLoading ? (
                  <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4 text-center sm:min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-white/60" />
                    <p className="text-sm text-white/60 sm:text-base">AI is converting your code...</p>
                  </div>
                ) : convertedCode ? (
                  <CodeDisplay code={convertedCode} language={targetLanguage} />
                ) : (
                  <div className="flex min-h-[200px] items-center justify-center text-center sm:min-h-[300px]">
                    <div>
                      <p className="text-sm text-white/60 sm:text-base">
                        Submit your code to see the converted version
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

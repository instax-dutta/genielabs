"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Loader2 } from "lucide-react"
import CodeDisplay from "@/components/code-display"
import ToolHeader from "@/components/tool-header"
import { motion } from "framer-motion"

export default function SqlGeneratorPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedSql, setGeneratedSql] = useState("")

  const handleSubmit = async () => {
    if (!query) return

    setIsLoading(true)
    setGeneratedSql("")

    try {
      // Create a prompt that instructs the model to generate an SQL query
      const prompt = `
I need you to translate the following plain-English query into an SQL query:

"${query}"

Assume a typical relational database schema with tables like customers, orders, products, etc.
Please provide only the SQL query without any explanations or comments.
Make sure the SQL query is properly formatted and follows best practices.
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

      // Try to extract SQL from the response
      const extractedSql = extractSqlFromResponse(responseContent)
      setGeneratedSql(extractedSql)
    } catch (error) {
      console.error("Error calling Mistral Codestral API:", error)
      setGeneratedSql(`-- Error: Could not generate SQL query\n-- Please try again or rephrase your query.`)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to extract SQL from the response
  const extractSqlFromResponse = (response: string) => {
    // Try to extract code block from model response
    const codeBlockMatch = response.match(/```(?:\w+)?\s*([\s\S]*?)```/)
    return codeBlockMatch ? codeBlockMatch[1].trim() : response.trim()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSql)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:py-12">
        <ToolHeader
          title="SQL Query Generator"
          description="Convert natural language to SQL queries with perfect syntax."
          icon="database"
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
                <CardTitle className="text-xl text-white sm:text-2xl">Natural Language Query</CardTitle>
                <CardDescription className="text-sm text-white/60 sm:text-base">
                  Describe what data you want to retrieve
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Find the top 10 customers who spent more than $1000 in the past year, showing their ID, name, email, number of orders, and total amount spent."
                  className="min-h-[200px] border-white/10 bg-white/5 text-sm text-white placeholder:text-white/40 sm:min-h-[300px] sm:text-base"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!query || isLoading}
                  className="w-full bg-white text-black transition-all hover:bg-white/90 sm:h-11"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating SQL...
                    </span>
                  ) : (
                    "Generate SQL Query"
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
              <CardHeader className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div>
                  <CardTitle className="text-xl text-white sm:text-2xl">Generated SQL</CardTitle>
                  <CardDescription className="text-sm text-white/60 sm:text-base">
                    Ready-to-use SQL query
                  </CardDescription>
                </div>
                {generatedSql && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="mt-2 border-white/10 bg-white/5 text-white hover:bg-white/10 sm:mt-0"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4 text-center sm:min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-white/60" />
                    <p className="text-sm text-white/60 sm:text-base">AI is generating your SQL query...</p>
                  </div>
                ) : generatedSql ? (
                  <CodeDisplay code={generatedSql} language="sql" />
                ) : (
                  <div className="flex min-h-[200px] items-center justify-center text-center sm:min-h-[300px]">
                    <div>
                      <p className="text-sm text-white/60 sm:text-base">Submit your query to generate SQL</p>
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

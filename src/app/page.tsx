"use client"

import { useState } from "react"
import { askModel } from "@/lib/askModel"

export default function Page() {
  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState("gpt-oss-20b")
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setReply("")

    try {
      const result = await askModel(prompt, model)
      setReply(result)
    } catch (err: any) {
      setReply(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">StudentIQ Chat</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question..."
          className="w-full p-3 border rounded"
          rows={4}
        />

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="gpt-oss-20b">OSS 20B</option>
          <option value="gpt-oss-120b">OSS 120B</option>
          <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {reply && (
        <div className="mt-6 w-full max-w-md p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">AI Reply:</h2>
          <p>{reply}</p>
        </div>
      )}
    </main>
  )
}

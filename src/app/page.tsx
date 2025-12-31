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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          StudentIQ Chat
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          />

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="gpt-oss-20b">OSS 20B</option>
            <option value="gpt-oss-120b">OSS 120B</option>
            <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>

        {reply && (
          <div className="mt-6 p-4 rounded-lg bg-gray-900 border border-gray-700">
            <h2 className="font-semibold mb-2 text-blue-400">AI Reply:</h2>
            <p className="text-gray-200 whitespace-pre-line">{reply}</p>
          </div>
        )}
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} StudentIQ
      </footer>
    </main>
  )
}

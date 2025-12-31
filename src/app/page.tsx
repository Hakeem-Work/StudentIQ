"use client"

import { useState } from "react"
import { askModel } from "@/lib/askModel"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline" // Heroicons for clean black/white icons

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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-black border border-white rounded-xl shadow-lg p-6">
        {/* App Title */}
        <h1 className="text-3xl font-bold text-center mb-6">Student IQ</h1>
        <p className="text-center text-gray-400 mb-6">
          Your AI companion in pure black & white
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Student IQ anything..."
            className="w-full p-3 rounded-lg border border-white bg-black text-white focus:outline-none focus:ring-2 focus:ring-white resize-none"
            rows={4}
          />

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-3 rounded-lg border border-white bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="gpt-oss-20b">OSS 20B</option>
            <option value="gpt-oss-120b">OSS 120B</option>
            <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg border border-white bg-black text-white hover:bg-white hover:text-black transition-colors font-semibold"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>

        {/* Reply Box */}
        {reply && (
          <div className="mt-6 p-4 rounded-lg border border-white bg-black flex items-start space-x-3">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
            <p className="text-white whitespace-pre-line">{reply}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Student IQ
      </footer>
    </main>
  )
}

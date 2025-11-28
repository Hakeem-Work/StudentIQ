'use client'

import { useState } from 'react'
import { askModel } from '@/lib/askModel'

export default function HomePage() {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState<'gpt-oss-20b' | 'gpt-oss-120b'>('gpt-oss-20b')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setOutput('')
    const resp = await askModel(prompt, model)
    setOutput(resp)
    setLoading(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <form onSubmit={onSubmit} className="space-y-3">
        {/* Dropdown to choose model */}
        <select
          value={model}
          onChange={(e) => setModel(e.target.value as 'gpt-oss-20b' | 'gpt-oss-120b')}
          className="bg-black border border-neutral-800 p-2"
        >
          <option value="gpt-oss-20b">gpt-oss-20b (faster)</option>
          <option value="gpt-oss-120b">gpt-oss-120b (stronger)</option>
        </select>

        {/* Textarea for your question */}
        <textarea
          className="w-full h-32 bg-black border border-neutral-800 p-3"
          placeholder="Type your question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Submit button */}
        <button
          type="submit"
          className="px-4 py-2 bg-white text-black"
          disabled={loading}
        >
          {loading ? 'Thinking…' : 'Ask'}
        </button>
      </form>

      {/* Show the answer */}
      {output && (
        <div className="mt-4 border border-neutral-800 p-4">
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </main>
  )
}

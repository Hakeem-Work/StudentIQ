'use client'
import { useState } from 'react'

export default function AskPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  async function askQuestion() {
    setLoading(true)
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })
    const data = await res.json()
    setAnswer(data.answer || 'No answer found')
    setLoading(false)
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Ask Anything</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question..."
        className="w-full p-3 rounded bg-neutral-900 text-white mb-4"
      />
      <button
        onClick={askQuestion}
        className="bg-white text-black px-4 py-2 rounded disabled:opacity-50"
        disabled={!question || loading}
      >
        {loading ? 'Thinking…' : 'Ask'}
      </button>

      {answer && (
        <section className="mt-6 bg-neutral-900 p-5 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Answer</h2>
          <p className="text-neutral-200">{answer}</p>
        </section>
      )}
    </main>
  )
}

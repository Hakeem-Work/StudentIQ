'use client'
import { useState } from 'react'

export default function QuizPage() {
  const [text, setText] = useState('')
  const [quiz, setQuiz] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function generateQuiz() {
    setLoading(true)
    const res = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    const data = await res.json()
    setQuiz(data.quiz || [])
    setLoading(false)
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Generate Quiz</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste study notes here..."
        className="w-full h-32 p-3 rounded bg-neutral-900 text-white mb-4"
      />
      <button
        onClick={generateQuiz}
        className="bg-white text-black px-4 py-2 rounded disabled:opacity-50"
        disabled={!text || loading}
      >
        {loading ? 'Generating…' : 'Generate Quiz'}
      </button>

      {quiz.length > 0 && (
        <section className="mt-6 bg-neutral-900 p-5 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Quiz</h2>
          {quiz.map((q, i) => (
            <div key={i} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              <ul className="list-disc list-inside text-neutral-300">
                {q.options.map((opt: string, j: number) => (
                  <li key={j}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}

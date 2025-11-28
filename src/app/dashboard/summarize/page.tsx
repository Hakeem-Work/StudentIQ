'use client'
import { useState } from 'react'

export default function SummarizePage() {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/summarize', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok) setSummary(data.summary)
      else setError(data.error || 'Failed to summarize')
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Summarize PDFs</h1>
      <form onSubmit={handleUpload} className="bg-neutral-900 p-5 rounded-lg">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm mb-4"
        />
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded disabled:opacity-50"
          disabled={!file || loading}
        >
          {loading ? 'Summarizing…' : 'Summarize'}
        </button>
        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
      </form>

      {summary && (
        <section className="mt-6 bg-neutral-900 p-5 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="text-neutral-200 whitespace-pre-wrap">{summary}</p>
        </section>
      )}
    </main>
  )
}

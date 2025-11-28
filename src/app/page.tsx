 client'

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
  n value="gpt-oss-20b">gpt-oss-20b (faster)</option>
          <option value="gpt-oss-120b">gpt-oss-120b (stronger)</option>
        </select>

        {/*
          className="w-full h-32 bg-black border border-neutral-800 p-3"
          plac

'use client'

import { useState } from 'react'
import { askModel } from '@/lib/askModel'

type Role = 'user' | 'assistant'

type Message = {
  role: Role
  text: string
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [model, setModel] = useState<Role>('user') // optional: for role switching
  const [loading, setLoading] = useState(false)

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages: Message[] = [...messages, { role: 'user', text: input }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const reply = await askModel(input, model === 'user' ? 'gpt-oss-20b' : 'gpt-oss-120b')
      setMessages([...newMessages, { role: 'assistant', text: reply }])
    } catch (err: any) {
      setMessages([...newMessages, { role: 'assistant', text: 'Error: ' + err.message }])
    } finally {
      setLoading(false)
      setInput('')
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4">
      <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
        StudentIQ Chat
      </h1>

      <div className="border border-neutral-800 p-3 sm:p-4 h-[70vh] sm:h-96 overflow-y-auto space-y-3 bg-black rounded">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 sm:p-3 rounded max-w-[85%] sm:max-w-[70%] text-sm sm:text-base ${
              m.role === 'user'
                ? 'bg-blue-600 text-white ml-auto'
                : 'bg-neutral-800 text-white mr-auto'
            }`}
          >
            <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong> {m.text}
          </div>
        ))}
        {loading && <div className="text-neutral-400">Thinking…</div>}
      </div>

      <form onSubmit={sendMessage} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value as Role)}
          className="bg-black border border-neutral-800 p-2 rounded text-sm sm:text-base"
        >
          <option value="user">gpt-oss-20b (faster)</option>
          <option value="assistant">gpt-oss-120b (stronger)</option>
        </select>

        <input
          className="flex-1 bg-black border border-neutral-800 p-2 rounded text-white text-sm sm:text-base"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          className="px-3 sm:px-4 py-2 bg-white text-black rounded text-sm sm:text-base"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </main>
  )
  }

export async function askModel(prompt: string, model: string) {
  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, model }),
  })

  if (!res.ok) {
    throw new Error('Request failed')
  }

  const data = await res.json()
  return data.reply
}

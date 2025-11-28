export async function askModel(
  prompt: string,
  model: 'gpt-oss-20b' | 'gpt-oss-120b' = 'gpt-oss-20b'
) {
  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, model })
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || 'Request failed')
  }
  const data = await res.json()
  return data.output as string
}

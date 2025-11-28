import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { text } = await req.json()
  if (!text || text.length < 50) {
    return NextResponse.json({ quiz: [] })
  }

  const topics = Array.from(new Set(text.split(/\W+/).filter(w => w.length > 5))).slice(0, 3)
  const quiz = topics.map((t) => ({
    question: `What best describes ${t}?`,
    options: [
      `${t} definition`,
      `Historical context of ${t}`,
      `Application of ${t}`,
      `Opposite of ${t}`
    ],
    answer: 0
  }))

  return NextResponse.json({ quiz })
}

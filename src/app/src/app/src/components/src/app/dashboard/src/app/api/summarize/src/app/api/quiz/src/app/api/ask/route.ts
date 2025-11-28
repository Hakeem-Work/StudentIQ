import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { question } = await req.json()
  const answer = `Here's a quick way to approach "${question}": identify key terms, define them clearly, and relate them with examples.`
  return NextResponse.json({ answer })
}

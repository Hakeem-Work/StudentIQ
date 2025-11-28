import { NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const data = await pdfParse(buffer)
    const text = (data.text || '').trim().replace(/\s+/g, ' ')
    const sentences = text.split(/(?<=\.)\s+/).filter(Boolean)
    const summary = sentences.slice(0, 6).join(' ')
    return NextResponse.json({ summary })
  } catch {
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 })
  }
}

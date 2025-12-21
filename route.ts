import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json()

    if (!prompt || !model) {
      return NextResponse.json(
        { error: 'Missing prompt or model' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'HuggingFace request failed' },
        { status: 500 }
      )
    }

    const data = await response.json()

    const reply =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : data.generated_text || 'No reply'

    return NextResponse.json({ reply })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    )
  }
}

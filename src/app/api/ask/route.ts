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

    // Hugging Face OSS models
    const hfModels = ['gpt-oss-20b', 'gpt-oss-120b']
    // Gemini models
    const geminiModels = ['gemini-2.5-flash']

    // Hugging Face branch
    if (hfModels.includes(model)) {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.studentiq_HF_API_KEY}`,
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
    }

    // Gemini branch
    if (geminiModels.includes(model)) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.studentiq_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      )

      if (!response.ok) {
        return NextResponse.json(
          { error: 'Gemini request failed' },
          { status: 500 }
        )
      }

      const data = await response.json()
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply'

      return NextResponse.json({ reply })
    }

    // Unsupported model
    return NextResponse.json(
      { error: `Model ${model} is not supported` },
      { status: 400 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    )
  }
}

import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HF_API_KEY)

export async function POST(req: Request) {
  const { prompt, model } = await req.json()

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 })
  }

  const selectedModel =
    model === 'gpt-oss-120b' ? 'openai/gpt-oss-120b' : 'openai/gpt-oss-20b'

  const response = await hf.textGeneration({
    model: selectedModel,
    inputs: prompt,
    parameters: { max_new_tokens: 256, temperature: 0.7 }
  })

  return new Response(JSON.stringify({ output: response.generated_text }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

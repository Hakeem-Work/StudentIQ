export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to StudentIQ 🧠</h1>
      <p className="text-gray-400 mb-6">
        Your smart study companion — Summarize, Quiz, and Ask anything.
      </p>
      <a href="/dashboard" className="bg-white text-black px-6 py-3 rounded font-semibold">
        Go to Dashboard
      </a>
    </main>
  )
}

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 p-5 rounded-lg">
          <h2 className="text-lg font-semibold">📄 Summarize PDFs</h2>
          <p className="text-sm text-neutral-400 mb-4">Upload notes or textbooks and get concise summaries.</p>
          <a href="/dashboard/summarize" className="inline-block bg-white text-black px-4 py-2 rounded">Upload PDF</a>
        </div>

        <div className="bg-neutral-900 p-5 rounded-lg">
          <h2 className="text-lg font-semibold">🧠 Generate Quizzes</h2>
          <p className="text-sm text-neutral-400 mb-4">Create practice questions from your materials.</p>
          <a href="/dashboard/quiz" className="inline-block bg-white text-black px-4 py-2 rounded">Start Quiz</a>
        </div>

        <div className="bg-neutral-900 p-5 rounded-lg">
          <h2 className="text-lg font-semibold">💬 Ask Anything</h2>
          <p className="text-sm text-neutral-400 mb-4">Get instant answers to study questions.</p>
          <a href="/dashboard/ask" className="inline-block bg-white text-black px-4 py-2 rounded">Ask Now</a>
        </div>
      </section>
    </main>
  )
}

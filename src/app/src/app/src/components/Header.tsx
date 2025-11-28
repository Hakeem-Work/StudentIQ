export default function Header() {
  return (
    <header className="border-b border-neutral-800 bg-black">
      <div className="mx-auto max-w-6xl h-16 px-6 flex items-center justify-between">
        <span className="text-white text-xl font-semibold">StudentIQ</span>
        <nav className="flex gap-6 text-sm text-neutral-400">
          <a href="/dashboard" className="hover:text-white">Dashboard</a>
          <a href="/dashboard/summarize" className="hover:text-white">Summarize</a>
          <a href="/dashboard/quiz" className="hover:text-white">Quiz</a>
          <a href="/dashboard/ask" className="hover:text-white">Ask</a>
        </nav>
      </div>
    </header>
  )
}

import { VoiceTester } from '@/components/VoiceTester';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-8">
      <header className="w-full max-w-4xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-sm font-semibold text-slate-300 tracking-wide">LiveKit Voice AI Prototype</span>
        </div>
        <span className="text-xs text-slate-500 font-mono">MOSS RAG Enabled</span>
      </header>

      <section className="my-auto py-6">
        <VoiceTester />
      </section>

      <footer className="w-full max-w-4xl mx-auto px-4 text-center text-xs text-slate-600">
        Rural Health Voice Assistant • Built with LiveKit, OpenAI & MOSS Semantic Search
      </footer>
    </main>
  );
}

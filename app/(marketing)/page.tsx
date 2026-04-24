import { headers } from "next/headers";
import { detectOS } from "../../lib/platform";
import { InstallBlock } from "../../components/marketing/install-block";
import { FeatureGrid } from "../../components/marketing/feature-grid";
import { LocalInferenceSection } from "../../components/marketing/local-inference-section";
import { PrivacySection } from "../../components/marketing/privacy-section";
import { Footer } from "../../components/marketing/footer";

export default async function LandingPage() {
  const h = await headers();
  const initialOS = detectOS(h.get("user-agent"));

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <a href="/" className="font-semibold text-lg tracking-tight">Nymiria</a>
        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="/security" className="hover:text-white">Security</a>
          <a href="/download" className="hover:text-white">Download</a>
          <a
            href="/login"
            className="px-3 py-1.5 rounded-md border text-white hover:bg-white/5"
            style={{ borderColor: "var(--border)" }}
          >
            Web client
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-28 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-[1.05]">
          The AI orchestrator that runs on your machine.
        </h1>
        <p className="mt-6 text-lg text-neutral-400 max-w-2xl leading-relaxed">
          Coordinate Claude, Codex, Gemini, and local models from one desktop app.
          Works fully offline with Ollama. Your data never leaves your machine.
        </p>
        <div className="mt-10">
          <InstallBlock initialOS={initialOS} />
        </div>
      </section>

      <div id="features">
        <FeatureGrid />
      </div>
      <LocalInferenceSection />
      <PrivacySection />
      <Footer />
    </main>
  );
}

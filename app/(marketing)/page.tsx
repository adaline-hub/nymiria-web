import { InstallBlock } from "../../components/marketing/install-block";
import { FeatureGrid } from "../../components/marketing/feature-grid";
import { LocalInferenceSection } from "../../components/marketing/local-inference-section";
import { PrivacySection } from "../../components/marketing/privacy-section";
import { SecuritySection } from "../../components/marketing/security-section";
import { WaitlistSection } from "../../components/marketing/waitlist-section";
import { Footer } from "../../components/marketing/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(16, 20, 26, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <a href="/" className="font-semibold text-base tracking-tight flex items-center gap-2" style={{ color: "var(--text)" }}>
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--accent)", color: "#000" }}
          >
            N
          </span>
          Nymiria
        </a>
        <div className="flex items-center gap-5 text-sm" style={{ color: "var(--text-muted)" }}>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="/security" className="hover:text-white transition-colors">Security</a>
          <a href="/docs" className="hover:text-white transition-colors">Docs</a>
          <a
            href="#waitlist"
            className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--border-green)" }}
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-32 max-w-6xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8 mono"
          style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--border-green)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          Now available — v1.0.27
        </div>

        <h1 className="gradient-text text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.02]" style={{ fontFamily: "Manrope, sans-serif" }}>
          The AI orchestrator that runs on your machine.
        </h1>
        <p className="mt-6 text-lg max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Coordinate Claude, Codex, Gemini, and local models from one desktop app.
          Works fully offline with Ollama. In local mode, your data never leaves your machine.
        </p>
        <div className="mt-10" id="install">
          <InstallBlock initialOS="unknown" />
        </div>

        {/* Stat row */}
        <div className="mt-16 flex flex-wrap gap-8">
          {[
            { value: "3", label: "Platforms" },
            { value: "100%", label: "Local-first" },
            { value: "0", label: "Gateways exposed" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold" style={{ color: "var(--accent)", fontFamily: "Manrope, sans-serif" }}>{s.value}</div>
              <div className="text-sm mt-0.5" style={{ color: "var(--text-faint)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* App screenshot */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1px solid var(--border-green)",
            boxShadow: "0 0 60px rgba(78,222,163,0.08), 0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
          />
          <img
            src="/screenshots/master-agent.png"
            alt="Nymiria Master Agent — coordinate multiple AI models from one desktop app"
            className="w-full block"
            style={{ display: "block" }}
          />
        </div>
        <p className="text-center text-xs mt-4 mono" style={{ color: "var(--text-faint)" }}>
          Master Agent · coordinating Claude, Codex, and local models in one workspace
        </p>
      </section>

      <div id="features">
        <FeatureGrid />
      </div>
      <LocalInferenceSection />
      <PrivacySection />
      <div id="security">
        <SecuritySection />
      </div>
      <div id="waitlist">
        <WaitlistSection />
      </div>
      <Footer />
    </main>
  );
}

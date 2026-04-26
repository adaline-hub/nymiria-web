"use client";

import { useState } from "react";

const FEATURES = [
  {
    icon: "⬡",
    title: "Orchestrates every model you have",
    body: "Route Claude, Codex, Gemini, and local models from one desktop. Handoff preserves context; subagents run in parallel.",
  },
  {
    icon: "◎",
    title: "Runs fully offline when you need it to",
    body: "Built-in Ollama and llama.cpp support. Flip to Local Inference mode and your transcript never touches the network.",
  },
  {
    icon: "◈",
    title: "Remembers what matters",
    body: "Per-project memory, decisions, and manifest. Nothing is lost between sessions — and nothing syncs to a cloud unless you ask.",
  },
  {
    icon: "⟳",
    title: "Automates what repeats",
    body: "Native crons, skills, and a Kanban board built in. Schedule briefings, code reviews, or anything else without leaving.",
  },
  {
    icon: "⌥",
    title: "First-class CLI integration",
    body: "Shares state with Claude Code. One channel, one context, one source of truth across GUI and terminal.",
  },
  {
    icon: "◇",
    title: "Bring your own keys",
    body: "BYOK for every provider. Keys stay in your OS keychain. No middleman, no per-token markup.",
  },
];

function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="flex items-center gap-3 px-6 py-4 rounded-2xl" style={{ background: "rgba(78,222,163,0.08)", border: "1px solid rgba(78,222,163,0.2)" }}>
        <span className="text-2xl">✓</span>
        <div>
          <p className="font-semibold" style={{ color: "#4edea3" }}>You&rsquo;re on the list.</p>
          <p className="text-sm mt-0.5" style={{ color: "#9ca3af" }}>We&rsquo;ll reach out when access opens up.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#f0f1f5",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#4edea3")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="px-6 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
        style={{ background: "#4edea3", color: "#000" }}
      >
        {state === "loading" ? "Joining…" : "Get early access"}
      </button>
      {state === "error" && (
        <p className="text-xs mt-1 w-full" style={{ color: "#f87171" }}>
          Something went wrong — try again or email{" "}
          <a href="mailto:hi@nymiria.com" className="underline">hi@nymiria.com</a>.
        </p>
      )}
    </form>
  );
}

export default function ComingSoonPage() {
  return (
    <div style={{ background: "#10141a", color: "#f0f1f5", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Ambient gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(78,222,163,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 110%, rgba(16,185,129,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(16,20,26,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 font-semibold text-base tracking-tight">
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
              style={{ background: "#4edea3", color: "#000" }}
            >
              N
            </span>
            Nymiria
          </div>
          <a
            href="#early-access"
            className="px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            style={{ background: "rgba(78,222,163,0.10)", color: "#4edea3", border: "1px solid rgba(78,222,163,0.2)" }}
          >
            Get early access
          </a>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Hero */}
        <section className="px-6 pt-24 pb-20 max-w-6xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{ background: "rgba(78,222,163,0.10)", color: "#4edea3", border: "1px solid rgba(78,222,163,0.2)", fontFamily: "monospace" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4edea3" }} />
            Coming soon — join the waitlist for early access
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.02] mb-6"
            style={{
              fontFamily: "Manrope, system-ui, sans-serif",
              background: "linear-gradient(135deg, #f0f1f5 0%, #4edea3 60%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            The AI orchestrator that runs on your machine.
          </h1>

          <p className="text-lg max-w-2xl leading-relaxed mb-10" style={{ color: "#9ca3af" }}>
            Coordinate Claude, Codex, Gemini, and local models from one desktop app.
            Works fully offline with Ollama. In local mode, your data never leaves your machine.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mb-16">
            {[
              { value: "Mac · Windows · Linux", label: "All platforms" },
              { value: "100% local-first", label: "Your data stays yours" },
              { value: "BYOK", label: "Bring your own keys" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-base font-bold" style={{ color: "#4edea3", fontFamily: "Manrope, system-ui, sans-serif" }}>{s.value}</div>
                <div className="text-sm mt-0.5" style={{ color: "#6b7280" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Early access CTA */}
          <div
            id="early-access-hero"
            className="p-8 rounded-2xl max-w-lg"
            style={{
              background: "linear-gradient(135deg, rgba(78,222,163,0.06), rgba(16,185,129,0.02))",
              border: "1px solid rgba(78,222,163,0.15)",
              boxShadow: "0 0 40px rgba(78,222,163,0.08)",
            }}
          >
            <p className="text-sm font-medium mb-4" style={{ color: "#4edea3", fontFamily: "monospace" }}>EARLY ACCESS</p>
            <p className="font-semibold text-lg mb-5" style={{ fontFamily: "Manrope, system-ui, sans-serif" }}>Be first to know when we launch.</p>
            <EarlyAccessForm />
            <p className="text-xs mt-4" style={{ color: "#6b7280" }}>No spam. Unsubscribe any time.</p>
          </div>
        </section>

        {/* App screenshot */}
        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(78,222,163,0.15)",
              boxShadow: "0 0 60px rgba(78,222,163,0.08), 0 24px 64px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #4edea3, transparent)" }}
            />
            <img
              src="/screenshots/master-agent.png"
              alt="Nymiria — coordinate multiple AI models from one desktop app"
              className="w-full block"
            />
          </div>
          <p className="text-center text-xs mt-4" style={{ color: "#6b7280", fontFamily: "monospace" }}>
            Nymiria · coordinating Claude, Codex, and local models in one workspace
          </p>
        </section>

        {/* Features */}
        <section className="px-6 py-24 max-w-6xl mx-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="mb-12">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
              style={{ background: "rgba(78,222,163,0.10)", color: "#4edea3", border: "1px solid rgba(78,222,163,0.2)", fontFamily: "monospace" }}
            >
              CAPABILITIES
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "Manrope, system-ui, sans-serif" }}
            >
              Built for people who live in their tools.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl"
                style={{
                  background: i === 0 ? "linear-gradient(135deg, rgba(78,222,163,0.08), rgba(16,185,129,0.04))" : "rgba(30,35,43,1)",
                  border: i === 0 ? "1px solid rgba(78,222,163,0.2)" : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: i === 0 ? "0 0 40px rgba(78,222,163,0.08)" : "none",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm mb-4"
                  style={{
                    background: i === 0 ? "#4edea3" : "rgba(78,222,163,0.10)",
                    color: i === 0 ? "#000" : "#4edea3",
                    fontFamily: "monospace",
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: "Manrope, system-ui, sans-serif" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Local inference */}
        <section className="px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-5xl mx-auto">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
              style={{ background: "rgba(78,222,163,0.10)", color: "#4edea3", border: "1px solid rgba(78,222,163,0.2)", fontFamily: "monospace" }}
            >
              LOCAL INFERENCE MODE
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 max-w-3xl" style={{ fontFamily: "Manrope, system-ui, sans-serif" }}>
              The only AI orchestrator that works with zero network.
            </h2>
            <p className="text-lg max-w-2xl mb-10 leading-relaxed" style={{ color: "#9ca3af" }}>
              Flip one switch. Nymiria routes every request to Ollama or llama.cpp on your machine.
              No tokens leave the device, no keys required, no rate limits.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: "01", title: "Every chat, every tool call", body: "No provider fallback. If a request would touch the network, it doesn't fire." },
                { n: "02", title: "Models you choose", body: "Llama, Qwen, DeepSeek, Mistral — anything your hardware can run." },
                { n: "03", title: "Air-gapped visible proof", body: "Status badge in the window chrome shows network = 0 bytes out while the mode is on." },
              ].map((c) => (
                <div key={c.n} className="p-6 rounded-xl" style={{ background: "rgba(24,28,34,1)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-xs mb-2" style={{ color: "#6b7280", fontFamily: "monospace" }}>{c.n}</div>
                  <h3 className="font-medium mb-2" style={{ fontFamily: "Manrope, system-ui, sans-serif" }}>{c.title}</h3>
                  <p className="text-sm" style={{ color: "#9ca3af" }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="px-6 py-24 max-w-5xl mx-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ background: "rgba(78,222,163,0.10)", color: "#4edea3", border: "1px solid rgba(78,222,163,0.2)", fontFamily: "monospace" }}
          >
            PRIVACY
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ fontFamily: "Manrope, system-ui, sans-serif" }}>
            Your conversations stay yours.
          </h2>
          <p className="text-lg max-w-2xl mb-10 leading-relaxed" style={{ color: "#9ca3af" }}>
            Nymiria is a native desktop app. Your API keys live in the OS keychain.
            Your chat history lives on your machine. Nothing is sent to Nymiria servers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {[
              "Keys stored in OS keychain, never in plaintext",
              "Chat history saved locally only",
              "No telemetry by default — opt-in if you want",
              "Local Inference mode: zero bytes leave your machine",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(30,35,43,1)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="mt-0.5 flex-shrink-0" style={{ color: "#4edea3" }}>✓</span>
                <span className="text-sm" style={{ color: "#d1d5db" }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA / Early Access */}
        <section id="early-access" className="px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div
            className="max-w-2xl mx-auto text-center p-10 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(78,222,163,0.06), rgba(16,185,129,0.02))",
              border: "1px solid rgba(78,222,163,0.15)",
              boxShadow: "0 0 40px rgba(78,222,163,0.08)",
            }}
          >
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-6"
              style={{ background: "rgba(78,222,163,0.10)", color: "#4edea3", border: "1px solid rgba(78,222,163,0.2)", fontFamily: "monospace" }}
            >
              EARLY ACCESS
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "Manrope, system-ui, sans-serif" }}
            >
              Be the first to get Nymiria.
            </h2>
            <p className="text-base mb-8 leading-relaxed" style={{ color: "#9ca3af" }}>
              We&rsquo;re rolling out access gradually. Drop your email and we&rsquo;ll reach out
              when your spot is ready — plus updates on new features and local model support.
            </p>
            <div className="flex justify-center">
              <EarlyAccessForm />
            </div>
            <p className="mt-4 text-xs" style={{ color: "#6b7280" }}>No spam. Unsubscribe any time.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
                style={{ background: "#4edea3", color: "#000" }}
              >
                N
              </span>
              Nymiria
            </div>
            <p className="text-xs" style={{ color: "#6b7280" }}>
              © {new Date().getFullYear()} Nymiria. All rights reserved.
            </p>
            <a href="mailto:hi@nymiria.com" className="text-xs hover:underline" style={{ color: "#6b7280" }}>
              hi@nymiria.com
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}

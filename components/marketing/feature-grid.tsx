const FEATURES = [
  {
    icon: "⬡",
    title: "Orchestrates every model you have",
    body: "Route Claude, Codex, Gemini, and local models from one desktop. Handoff preserves context; subagents run in parallel.",
  },
  {
    icon: "◎",
    title: "Runs fully offline when you need it to",
    body: "Built-in Ollama and llama.cpp. Flip to Local Inference mode and your transcript never touches the network.",
  },
  {
    icon: "◈",
    title: "Remembers what matters",
    body: "Per-project memory, decisions, and manifest. Nothing is lost between sessions — and nothing syncs to a cloud unless you ask.",
  },
  {
    icon: "⟳",
    title: "Automates what repeats",
    body: "Native crons, skills, and a Kanban board live in the app. Schedule briefings, code reviews, or anything else without leaving.",
  },
  {
    icon: "⌥",
    title: "Shares state with the CLI you already use",
    body: "First-class integration with Claude Code. One channel, one context, one source of truth.",
  },
  {
    icon: "◇",
    title: "Bring your own keys",
    body: "BYOK for every provider. Keys stay in your OS keychain. No middleman, no per-token markup.",
  },
];

export function FeatureGrid() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mb-12">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 mono"
          style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--border-green)" }}
        >
          CAPABILITIES
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight"
          style={{ fontFamily: "Manrope, sans-serif", color: "var(--text)" }}
        >
          Built for people who live in their tools.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="p-6 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
            style={{
              background: i === 0 ? "linear-gradient(135deg, rgba(78,222,163,0.08), rgba(16,185,129,0.04))" : "var(--bg-card)",
              border: i === 0 ? "1px solid var(--border-green)" : "1px solid var(--border)",
              boxShadow: i === 0 ? "var(--shadow-glow)" : "none",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm mb-4 mono"
              style={{
                background: i === 0 ? "var(--accent)" : "var(--accent-muted)",
                color: i === 0 ? "#000" : "var(--accent)",
              }}
            >
              {f.icon}
            </div>
            <h3
              className="text-base font-semibold mb-2"
              style={{ color: "var(--text)", fontFamily: "Manrope, sans-serif" }}
            >
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

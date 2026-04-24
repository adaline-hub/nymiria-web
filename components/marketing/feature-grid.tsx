const FEATURES = [
  {
    title: "Orchestrates every model you have",
    body: "Route Claude, Codex, Gemini, and local models from one desktop. Handoff preserves context; subagents run in parallel.",
  },
  {
    title: "Runs fully offline when you need it to",
    body: "Built-in Ollama and llama.cpp. Flip to Local Inference mode and your transcript never touches the network.",
  },
  {
    title: "Remembers what matters",
    body: "Per-project memory, decisions, and manifest. Nothing is lost between sessions — and nothing syncs to a cloud unless you ask.",
  },
  {
    title: "Automates what repeats",
    body: "Native crons, skills, and a Kanban board live in the app. Schedule briefings, code reviews, or anything else without leaving.",
  },
  {
    title: "Shares state with the CLI you already use",
    body: "First-class integration with Claude Code. One channel, one context, one source of truth.",
  },
  {
    title: "Bring your own keys",
    body: "BYOK for every provider. Keys stay in your OS keychain. No middleman, no per-token markup.",
  },
];

export function FeatureGrid() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12">
        Built for people who live in their tools.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="p-6 rounded-xl border"
            style={{ background: "var(--bg-elev)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-medium mb-2">{f.title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const ROWS = [
  {
    nymiria: "No local server or gateway — nothing listens on a port",
    them: "Exposes a local WebSocket server any website can reach",
  },
  {
    nymiria: "No cross-origin attack surface inside the app",
    them: "Localhost exempted from rate limiting — brute-forceable in seconds",
  },
  {
    nymiria: "No device pairing over loopback with auto-approval",
    them: "Visiting one malicious site = full agent takeover, no click required",
  },
  {
    nymiria: "Credentials stored in OS keychain, never in config files",
    them: "Auth tokens accessible via config dump after gateway breach",
  },
  {
    nymiria: "Zero network-exposed surface for agent commands",
    them: "Tens of thousands of instances exposed to the internet by default",
  },
];

export function SecuritySection() {
  return (
    <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 mono"
          style={{ background: "rgba(255,80,80,0.10)", color: "#ff6060" }}
        >
          SECURITY ARCHITECTURE
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 max-w-3xl">
          No gateway. No exposure. By design.
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mb-4 leading-relaxed">
          Tools like OpenClaw open a local WebSocket server to bridge their agent to
          the browser. That gateway became the attack surface for{" "}
          <span style={{ color: "#ff6060" }}>ClawJacked</span> — a vulnerability that
          lets any website you visit silently take full control of your AI agent
          with zero clicks.
        </p>
        <p className="text-neutral-400 text-lg max-w-2xl mb-10 leading-relaxed">
          Nymiria has no gateway. Agent execution lives inside the app process.
          There is no port, no WebSocket server, and no loopback interface for
          malicious code to reach.
        </p>

        <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
          <div className="grid grid-cols-2 text-sm">
            <div className="px-6 py-3 font-medium" style={{ background: "rgba(124,92,255,0.08)" }}>
              Nymiria
            </div>
            <div
              className="px-6 py-3 font-medium border-l"
              style={{ background: "rgba(255,80,80,0.06)", borderColor: "var(--border)", color: "#ff6060" }}
            >
              Gateway-based agents (OpenClaw, etc.)
            </div>
          </div>
          {ROWS.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2 text-sm border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="px-6 py-4 text-neutral-200">{row.nymiria}</div>
              <div
                className="px-6 py-4 text-neutral-500 border-l"
                style={{ borderColor: "var(--border)" }}
              >
                {row.them}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-neutral-600">
          OpenClaw vulnerability references:{" "}
          <a
            href="https://thehackernews.com/2026/02/clawjacked-flaw-lets-malicious-sites.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-neutral-400"
          >
            The Hacker News
          </a>
          {" · "}
          <a
            href="https://www.oasis.security/blog/openclaw-vulnerability"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-neutral-400"
          >
            Oasis Security
          </a>
        </p>
      </div>
    </section>
  );
}

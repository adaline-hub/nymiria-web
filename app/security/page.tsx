import { Footer } from "../../components/marketing/footer";

const PRINCIPLES = [
  {
    title: "No gateway, no exposure",
    body: "Nymiria has no local WebSocket server, no open port, and no loopback listener. Agent execution lives inside the app process — completely unreachable from the browser or web.",
  },
  {
    title: "Keys stay in your OS keychain",
    body: "API keys are stored using your operating system's native credential store (Keychain on macOS, Credential Manager on Windows, libsecret on Linux). They are never written to disk in plaintext.",
  },
  {
    title: "Zero telemetry by default",
    body: "Nymiria does not phone home, collect usage analytics, or transmit session data. The only outbound connections are the AI provider calls you explicitly initiate.",
  },
  {
    title: "Local-first data model",
    body: "Your conversations, memory, and project state live in a local SQLite database. Nothing syncs to a cloud server unless you explicitly enable multi-device mode.",
  },
  {
    title: "BYOK — bring your own keys",
    body: "You authenticate directly with each AI provider using your own account. Nymiria is never in the token path and cannot see or intercept your provider responses.",
  },
  {
    title: "Local inference mode",
    body: "Flip one switch and all requests route exclusively to Ollama or llama.cpp on your machine. A status indicator confirms zero bytes leave the device while the mode is active.",
  },
  {
    title: "Remote Control — no open ports",
    body: "In multi-device mode the host server binds exclusively to the Tailscale interface (100.64.x.x) — never to 0.0.0.0 or your LAN. Every request requires a 32-character token. No port is reachable from the internet or any device outside your Tailscale network.",
  },
  {
    title: "WireGuard-encrypted device mesh",
    body: "Remote Control traffic travels over Tailscale's WireGuard mesh. Each device holds its own private key — Tailscale's coordination server cannot read your data. In direct-connection scenarios no third-party infrastructure is in the path at all.",
  },
];

const COMPARE = [
  { aspect: "Local gateway / open port", nymiria: "None", others: "WebSocket server on localhost" },
  { aspect: "Cross-origin attack surface", nymiria: "None", others: "Any website can connect" },
  { aspect: "Rate limiting on loopback", nymiria: "N/A — no listener", others: "Often exempt — brute-forceable" },
  { aspect: "Credential storage", nymiria: "OS keychain", others: "Config file or env var" },
  { aspect: "Telemetry", nymiria: "None by default", others: "Varies — often opt-out" },
  { aspect: "Offline capable", nymiria: "Yes — full local inference", others: "Rarely" },
  { aspect: "Multi-device transport", nymiria: "WireGuard (E2E encrypted)", others: "Cloud relay / unencrypted LAN" },
  { aspect: "Open port on host", nymiria: "None — Tailscale only", others: "LAN port or cloud tunnel" },
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto"
        style={{ borderBottom: "1px solid var(--border)", background: "rgba(16,20,26,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      >
        <a href="/" className="font-semibold text-base tracking-tight flex items-center gap-2" style={{ color: "var(--text)" }}>
          <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold" style={{ background: "var(--accent)", color: "#000" }}>N</span>
          Nymiria
        </a>
        <div className="flex items-center gap-5 text-sm" style={{ color: "var(--text-muted)" }}>
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/docs" className="hover:text-white transition-colors">Docs</a>
          <a href="https://nymiria.com/api/download" className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors" style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--border-green)" }}>Download</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 mono" style={{ background: "rgba(255,80,80,0.10)", color: "#ff6060", border: "1px solid rgba(255,80,80,0.2)" }}>
            SECURITY
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>
            Security architecture
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Nymiria is designed so that the attack surfaces that have compromised other AI agent tools
            simply don&rsquo;t exist. Here&rsquo;s exactly how.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "Manrope, sans-serif" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.body}</p>
            </div>
          ))}
        </div>

        {/* vs others table */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>How Nymiria compares</h2>
          <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            Referencing the <a href="https://thehackernews.com/2026/02/clawjacked-flaw-lets-malicious-sites.html" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--accent)" }}>ClawJacked vulnerability</a> in OpenClaw and similar gateway-based agents.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="grid grid-cols-3 text-xs font-medium py-3 px-6" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
              <div>Aspect</div>
              <div style={{ color: "var(--accent)" }}>Nymiria</div>
              <div>Gateway-based agents</div>
            </div>
            {COMPARE.map((row, i) => (
              <div key={i} className="grid grid-cols-3 text-sm px-6 py-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div style={{ color: "var(--text-muted)" }}>{row.aspect}</div>
                <div className="font-medium" style={{ color: "var(--accent)" }}>{row.nymiria}</div>
                <div style={{ color: "var(--text-faint)" }}>{row.others}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-device section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>Multi-device security model</h2>
          <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            When you connect a phone, tablet, or second laptop to your Nymiria host, here is exactly what happens at the network level — and what cannot happen.
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                step: "01",
                title: "Host binds to Tailscale only",
                body: "The Nymiria server process on your host machine binds exclusively to your Tailscale IP (100.64.0.0/10 CGNAT range). It never listens on 0.0.0.0, your LAN IP, or any public interface. A device with no Tailscale access cannot see the port at all — it does not exist on the network.",
              },
              {
                step: "02",
                title: "WireGuard tunnel between your devices",
                body: "Tailscale establishes a direct WireGuard peer-to-peer connection between your devices. WireGuard uses modern Curve25519 / ChaCha20-Poly1305 cryptography. Each device holds its own private key — neither Tailscale nor any relay server can decrypt the traffic.",
              },
              {
                step: "03",
                title: "Token auth on every request",
                body: "Even inside the encrypted tunnel, every API call must include a 32-character alphanumeric token in the X-Nymiria-Token header. The token is generated locally on first enable and stored in ~/.nymiria/server_token — never transmitted to Nymiria servers.",
              },
              {
                step: "04",
                title: "No data stored on remote devices",
                body: "Remote devices hold zero local copies of your chats, memory, kanban, or crons. All reads are live API calls to the host. If the connection drops, the remote device goes blank — there is nothing to exfiltrate from a stolen remote device.",
              },
              {
                step: "05",
                title: "API keys never leave the host",
                body: "AI provider keys are stored in the host's OS keychain and are never transmitted to remote devices — not even over the encrypted tunnel. Remote devices send messages to the host, which executes them using its local keys.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mono" style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--border-green)" }}>{item.step}</div>
                <div>
                  <h4 className="font-semibold mb-1.5 text-sm" style={{ color: "var(--text)", fontFamily: "Manrope, sans-serif" }}>{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclosure */}
        <div className="p-6 rounded-2xl" style={{ background: "var(--accent-muted)", border: "1px solid var(--border-green)" }}>
          <h3 className="font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "Manrope, sans-serif" }}>Responsible disclosure</h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Found a security issue? Email{" "}
            <a href="mailto:security@nymiria.com" className="underline" style={{ color: "var(--accent)" }}>security@nymiria.com</a>.
            We respond within 48 hours and will credit researchers who report valid issues.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

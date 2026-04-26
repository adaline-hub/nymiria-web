import { Footer } from "../../components/marketing/footer";

const SECTIONS = [
  {
    id: "install",
    title: "Installation",
    steps: [
      {
        platform: "macOS",
        code: "curl -fsSL https://nymiria.com/install.sh | bash",
        note: "Installs via .dmg. Requires macOS 12 or later.",
      },
      {
        platform: "Windows",
        code: "irm https://nymiria.com/install.ps1 | iex",
        note: "Runs the NSIS silent installer. Requires PowerShell 5.1+.",
      },
      {
        platform: "Linux",
        code: "curl -fsSL https://nymiria.com/install.sh | bash",
        note: "Installs as AppImage on all distros — supports in-app auto-update.",
      },
    ],
  },
  {
    id: "providers",
    title: "Connecting AI providers",
    items: [
      "Open Nymiria and go to **Setup → Providers**.",
      "Click **Add key** next to any provider (Anthropic, OpenAI, Google, etc.).",
      "Paste your API key — it's stored in your OS keychain immediately.",
      "Select the provider in any channel to start using it.",
    ],
  },
  {
    id: "local",
    title: "Local inference (offline mode)",
    items: [
      "Install [Ollama](https://ollama.com) and pull a model: `ollama pull llama3`",
      "In Nymiria, go to **Setup → Providers** and enable **Local Inference**.",
      "Flip the mode toggle in the channel toolbar — a status badge confirms zero network usage.",
      "Supported backends: Ollama, llama.cpp. Any model your hardware can run.",
    ],
  },
  {
    id: "channels",
    title: "Channels & workspaces",
    items: [
      "Each **channel** is an isolated conversation with its own provider, memory, and context.",
      "**Workspace** shows your files and lets you attach context to any message.",
      "**Projects** group channels, memory, and Kanban boards around a specific codebase or goal.",
      "Switch between channels without losing context — each resumes exactly where you left off.",
    ],
  },
  {
    id: "crons",
    title: "Automations & crons",
    items: [
      "Type `/cron` in any channel to schedule a recurring task.",
      "Example: `/cron Briefing | 0 9 * * * | Summarize my Kanban board`",
      "Crons run against whichever provider the channel is configured to use.",
      "Manage active crons from **Setup → Skills**.",
    ],
  },
  {
    id: "updates",
    title: "Keeping Nymiria updated",
    items: [
      "Nymiria checks for updates automatically on launch.",
      "When an update is available, a badge appears in the bottom status bar.",
      "Click it to download and install — no terminal required.",
      "You can also re-run the install one-liner to update manually.",
    ],
  },
];

export default function DocsPage() {
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
          <a href="/security" className="hover:text-white transition-colors">Security</a>
          <a href="https://nymiria.com/api/download" className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors" style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--border-green)" }}>Download</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20 flex gap-12">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block w-48 flex-shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 mono" style={{ color: "var(--text-faint)" }}>On this page</p>
            <nav className="flex flex-col gap-1">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="text-sm py-1 transition-colors hover:text-white" style={{ color: "var(--text-muted)" }}>
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-12">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 mono" style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--border-green)" }}>
              DOCS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>
              Getting started
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Everything you need to install Nymiria, connect your AI providers, and start orchestrating.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {/* Installation */}
            <section id="install">
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>Installation</h2>
              <div className="flex flex-col gap-4">
                {SECTIONS[0].steps!.map((step) => (
                  <div key={step.platform} className="p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <div className="text-xs font-semibold mb-3 mono" style={{ color: "var(--accent)" }}>{step.platform}</div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl mono text-sm mb-3" style={{ background: "var(--bg-elev)", border: "1px solid var(--border-green)" }}>
                      <span style={{ color: "var(--accent)" }}>$</span>
                      <code style={{ color: "var(--text)" }}>{step.code}</code>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-faint)" }}>{step.note}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Rest of sections */}
            {SECTIONS.slice(1).map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>{section.title}</h2>
                <ol className="flex flex-col gap-3">
                  {section.items!.map((item, i) => (
                    <li key={i} className="flex gap-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: "var(--accent-muted)", color: "var(--accent)" }}>{i + 1}</span>
                      <span dangerouslySetInnerHTML={{ __html: item
                        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>')
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--accent);text-decoration:underline">$1</a>')
                        .replace(/`([^`]+)`/g, '<code style="background:var(--bg-card);padding:1px 5px;border-radius:4px;font-family:monospace;color:var(--text)">$1</code>')
                      }} />
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

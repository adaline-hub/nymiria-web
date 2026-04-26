import { Footer } from "../../components/marketing/footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full"
        style={{ borderBottom: "1px solid var(--border)", background: "rgba(16,20,26,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      >
        <a href="/" className="font-semibold text-base tracking-tight flex items-center gap-2" style={{ color: "var(--text)" }}>
          <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold" style={{ background: "var(--accent)", color: "#000" }}>N</span>
          Nymiria
        </a>
        <div className="flex items-center gap-5 text-sm" style={{ color: "var(--text-muted)" }}>
          <a href="/docs" className="hover:text-white transition-colors">Docs</a>
          <a href="https://nymiria.com/api/download" className="px-3 py-1.5 rounded-md text-sm font-medium" style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--border-green)" }}>Download</a>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div
          className="w-full max-w-md p-10 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(78,222,163,0.06), rgba(16,185,129,0.02))",
            border: "1px solid var(--border-green)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-6" style={{ background: "var(--accent)", color: "#000", fontFamily: "Manrope, sans-serif" }}>N</div>
          <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>
            Web client — coming soon
          </h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            The Nymiria web client is in development. For now, download the desktop app for the full experience.
          </p>
          <a
            href="https://nymiria.com/api/download"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: "var(--accent)", color: "#000" }}
          >
            Download the desktop app
          </a>
          <p className="mt-6 text-xs" style={{ color: "var(--text-faint)" }}>
            Available for macOS, Windows, and Linux.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

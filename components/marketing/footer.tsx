export function Footer() {
  return (
    <footer
      className="px-6 py-10 text-sm"
      style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--accent)", color: "#000" }}
            >
              N
            </span>
            <span className="font-semibold" style={{ color: "var(--text)", fontFamily: "Manrope, sans-serif" }}>Nymiria</span>
          </div>
          <div style={{ color: "var(--text-faint)" }}>The AI orchestrator that runs on your machine.</div>
        </div>
        <div className="flex flex-wrap gap-6">
          <a href="https://nymiria.com/api/download" className="hover:text-white transition-colors">Download</a>
          <a href="/security" className="hover:text-white transition-colors">Security</a>
          <a href="/docs" className="hover:text-white transition-colors">Docs</a>
          <a href="/login" className="hover:text-white transition-colors">Web client</a>
        </div>
      </div>
    </footer>
  );
}

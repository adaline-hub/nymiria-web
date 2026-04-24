export function Footer() {
  return (
    <footer
      className="px-6 py-12 border-t text-sm text-neutral-400"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-white font-medium mb-1">Nymiria</div>
          <div>The AI orchestrator that runs on your machine.</div>
        </div>
        <div className="flex flex-wrap gap-6">
          <a href="/download" className="hover:text-white">Download</a>
          <a href="/security" className="hover:text-white">Security</a>
          <a href="/docs" className="hover:text-white">Docs</a>
          <a href="https://github.com/adaline-hub/Nymiria" className="hover:text-white">GitHub</a>
          <a href="/login" className="hover:text-white">Web client</a>
        </div>
      </div>
    </footer>
  );
}

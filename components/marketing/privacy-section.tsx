const ROWS = [
  { we: "Store your chats on your machine", we_not: "Store them in a cloud we control" },
  { we: "Use your own API keys (BYOK)", we_not: "Resell you tokens with a markup" },
  { we: "Support fully offline mode", we_not: "Require a network to function" },
  { we: "Keep keys in your OS keychain", we_not: "Keep keys in plaintext config" },
  { we: "Ship with zero telemetry by default", we_not: "Phone home for product analytics" },
  { we: "Open the source for what matters", we_not: "Hide the boundaries of our runtime" },
];

export function PrivacySection() {
  return (
    <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Privacy isn&rsquo;t a feature. It&rsquo;s the floor.
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mb-10 leading-relaxed">
          Every product tells you privacy matters. We designed the runtime so we
          couldn&rsquo;t violate yours even if we wanted to.
        </p>

        <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
          <div className="grid grid-cols-2 text-sm">
            <div className="px-6 py-3 font-medium bg-white/5">We do</div>
            <div className="px-6 py-3 font-medium bg-white/5 border-l" style={{ borderColor: "var(--border)" }}>We don&rsquo;t</div>
          </div>
          {ROWS.map((row, i) => (
            <div key={i} className="grid grid-cols-2 text-sm border-t" style={{ borderColor: "var(--border)" }}>
              <div className="px-6 py-4 text-neutral-200">{row.we}</div>
              <div className="px-6 py-4 text-neutral-500 border-l" style={{ borderColor: "var(--border)" }}>{row.we_not}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

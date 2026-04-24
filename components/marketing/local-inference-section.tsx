export function LocalInferenceSection() {
  return (
    <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 mono"
          style={{ background: "rgba(124,92,255,0.12)", color: "var(--accent)" }}>
          LOCAL INFERENCE MODE
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 max-w-3xl">
          The only AI orchestrator that works with zero network.
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mb-10 leading-relaxed">
          Flip one switch. Nymiria routes every request to Ollama or llama.cpp on
          your machine. No tokens leave the device, no keys required, no rate
          limits. Drop into an airplane, a sensitive site, or a poorly-connected
          cafe — Nymiria keeps working.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border" style={{ background: "var(--bg-elev)", borderColor: "var(--border)" }}>
            <div className="mono text-xs text-neutral-500 mb-2">01</div>
            <h3 className="font-medium mb-2">Every chat, every tool call</h3>
            <p className="text-neutral-400 text-sm">No provider fallback. If a request would touch the network, it doesn&rsquo;t fire.</p>
          </div>
          <div className="p-6 rounded-xl border" style={{ background: "var(--bg-elev)", borderColor: "var(--border)" }}>
            <div className="mono text-xs text-neutral-500 mb-2">02</div>
            <h3 className="font-medium mb-2">Models you choose</h3>
            <p className="text-neutral-400 text-sm">Llama, Qwen, DeepSeek, Mistral — anything your hardware can run.</p>
          </div>
          <div className="p-6 rounded-xl border" style={{ background: "var(--bg-elev)", borderColor: "var(--border)" }}>
            <div className="mono text-xs text-neutral-500 mb-2">03</div>
            <h3 className="font-medium mb-2">Air-gapped visible proof</h3>
            <p className="text-neutral-400 text-sm">Status badge in the window chrome shows network = 0 bytes out while the mode is on.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

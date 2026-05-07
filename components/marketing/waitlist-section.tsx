"use client";

import { useState } from "react";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    try {
      const res = await fetch("https://nymiria.com/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="px-6 py-24" style={{ borderTop: "1px solid var(--border)" }}>
      <div
        className="max-w-2xl mx-auto text-center p-10 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(78,222,163,0.06), rgba(16,185,129,0.02))",
          border: "1px solid var(--border-green)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-6 mono"
          style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--border-green)" }}
        >
          EARLY ACCESS
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "Manrope, sans-serif", color: "var(--text)" }}
        >
          Stay in the loop.
        </h2>
        <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Get notified about new releases, local inference updates, and early access to Nymiria Pro.
        </p>

        {state === "done" ? (
          <p className="text-lg font-medium" style={{ color: "var(--accent)" }}>
            You&rsquo;re on the list.
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "var(--bg-elev)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="px-5 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
              style={{ background: "var(--accent)", color: "#000" }}
            >
              {state === "loading" ? "Joining…" : "Notify me"}
            </button>
          </form>
        )}

        {state === "error" && (
          <p className="mt-3 text-sm" style={{ color: "#f87171" }}>
            Something went wrong — try again or email{" "}
            <a href="mailto:hi@nymiria.com" className="underline" style={{ color: "var(--accent)" }}>hi@nymiria.com</a>.
          </p>
        )}

        <p className="mt-4 text-xs" style={{ color: "var(--text-faint)" }}>No spam. Unsubscribe any time.</p>
      </div>
    </section>
  );
}

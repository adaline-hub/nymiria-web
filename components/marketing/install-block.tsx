"use client";

import { useEffect, useState } from "react";
import { detectOS, INSTALL_COMMANDS, type OS } from "../../lib/platform";

const OS_ORDER: OS[] = ["mac", "windows", "linux"];

export function InstallBlock({ initialOS }: { initialOS: OS }) {
  const [active, setActive] = useState<OS>(initialOS);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const detected = detectOS(navigator.userAgent);
      if (detected !== "unknown") setActive(detected);
    }
  }, []);

  const cmd = INSTALL_COMMANDS[active];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch { /* clipboard blocked */ }
  };

  return (
    <div className="w-full max-w-2xl">
      {/* OS tabs */}
      <div className="flex gap-1 mb-3">
        {OS_ORDER.map((os) => (
          <button
            key={os}
            onClick={() => setActive(os)}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
            style={active === os ? {
              background: "var(--accent-muted)",
              color: "var(--accent)",
              border: "1px solid var(--border-green)",
            } : {
              color: "var(--text-muted)",
              border: "1px solid transparent",
            }}
          >
            {INSTALL_COMMANDS[os].label}
          </button>
        ))}
      </div>

      {/* Command line */}
      <div
        className="flex items-center gap-3 px-4 py-4 rounded-xl mono text-sm"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-green)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        <span className="select-none" style={{ color: "var(--accent)" }}>$</span>
        <code className="flex-1 break-all" style={{ color: "var(--text)" }}>{cmd.command}</code>
        <button
          onClick={copy}
          className="shrink-0 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
          style={{
            background: copied ? "var(--accent)" : "var(--accent-muted)",
            color: copied ? "#000" : "var(--accent)",
            border: "1px solid var(--border-green)",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="mt-3 text-xs" style={{ color: "var(--text-faint)" }}>
        or{" "}
        <a href={cmd.download.href} className="underline transition-colors hover:text-white" style={{ color: "var(--text-muted)" }}>
          {cmd.download.label}
        </a>
        {" · "}
        <a href="https://nymiria.com/api/download" className="underline transition-colors hover:text-white" style={{ color: "var(--text-muted)" }}>
          all platforms
        </a>
      </div>
    </div>
  );
}

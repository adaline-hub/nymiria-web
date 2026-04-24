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
    } catch {
      /* clipboard blocked — do nothing */
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex gap-1 mb-3 text-sm">
        {OS_ORDER.map((os) => (
          <button
            key={os}
            onClick={() => setActive(os)}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              active === os
                ? "bg-white/10 text-white"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {INSTALL_COMMANDS[os].label}
          </button>
        ))}
      </div>

      <div
        className="flex items-center gap-3 px-4 py-4 rounded-lg border mono text-sm"
        style={{ background: "var(--bg-elev)", borderColor: "var(--border)" }}
      >
        <span className="text-neutral-500 select-none">$</span>
        <code className="flex-1 text-white break-all">{cmd.command}</code>
        <button
          onClick={copy}
          className="shrink-0 px-3 py-1.5 rounded-md text-xs font-medium bg-white text-black hover:bg-neutral-200 transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="mt-3 text-sm text-neutral-400">
        or{" "}
        <a href={cmd.download.href} className="underline hover:text-white">
          {cmd.download.label}
        </a>{" "}
        ·{" "}
        <a href="/download" className="underline hover:text-white">
          more install options
        </a>
      </div>
    </div>
  );
}

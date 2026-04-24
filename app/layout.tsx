import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nymiria — The AI orchestrator that runs on your machine",
  description:
    "Nymiria coordinates Claude, Codex, Gemini, and local models from a single desktop app. Works fully offline with Ollama. Your data never leaves your machine.",
  openGraph: {
    title: "Nymiria",
    description:
      "AI orchestrator for your desktop. Local-first, private by default.",
    url: "https://nymiria.com",
    siteName: "Nymiria",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

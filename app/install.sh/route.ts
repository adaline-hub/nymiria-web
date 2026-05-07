import { NextResponse } from "next/server";

const BODY = `#!/usr/bin/env bash
# Linux installer for Nymiria
#
# Usage: curl -fsSL https://nymiria.com/install.sh | bash
#
# Fetches the latest release from GitHub, downloads the AppImage,
# installs to ~/Applications/Nymiria.AppImage, and creates a symlink.

set -euo pipefail

REPO="adaline-hub/nymiria-updates"
API="https://api.github.com/repos/\${REPO}/releases/latest"

echo "Fetching latest Nymiria release..."
if command -v curl &>/dev/null; then
  TAG=$(curl -fsSL "$API" | grep '"tag_name"' | sed 's/.*"tag_name": *"\\([^"]*\\)".*/\\1/')
elif command -v wget &>/dev/null; then
  TAG=$(wget -qO- "$API" | grep '"tag_name"' | sed 's/.*"tag_name": *"\\([^"]*\\)".*/\\1/')
else
  echo "Error: curl or wget is required."
  exit 1
fi

if [ -z "$TAG" ]; then
  echo "Error: could not determine latest release tag."
  exit 1
fi

VERSION="\${TAG#v}"
echo "Latest version: \${TAG}"

APPIMAGE_NAME="Nymiria_\${VERSION}_amd64.AppImage"
APPIMAGE_URL="https://nymiria.com/api/download?asset=\${APPIMAGE_NAME}&tag=\${TAG}"
INSTALL_DIR="\${HOME}/Applications"
INSTALL_PATH="\${INSTALL_DIR}/Nymiria.AppImage"
BIN_DIR="\${HOME}/.local/bin"
BIN_LINK="\${BIN_DIR}/nymiria"

mkdir -p "$INSTALL_DIR" "$BIN_DIR"

echo "Downloading \${APPIMAGE_NAME}..."
if command -v curl &>/dev/null; then
  curl -fsSL -o "$INSTALL_PATH" "$APPIMAGE_URL"
else
  wget -qO "$INSTALL_PATH" "$APPIMAGE_URL"
fi
chmod +x "$INSTALL_PATH"

ln -sf "$INSTALL_PATH" "$BIN_LINK"

echo ""
echo "Nymiria \${TAG} installed to \${INSTALL_PATH}"
echo "Symlink created at \${BIN_LINK}"

case ":\${PATH}:" in
  *":\${BIN_DIR}:"*) ;;
  *)
    echo ""
    echo "Note: \${BIN_DIR} is not in your PATH."
    echo "Add this to your shell profile:"
    echo "  export PATH=\\"\$HOME/.local/bin:\$PATH\\""
    ;;
esac

echo ""
echo "Run: nymiria"
echo "Nymiria will check for updates automatically on launch."
`;

export const runtime = "edge";

export function GET() {
  return new NextResponse(BODY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

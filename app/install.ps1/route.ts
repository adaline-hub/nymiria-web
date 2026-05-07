import { NextResponse } from "next/server";

const BODY = `# Windows CLI installer for Nymiria
#
# Usage: irm https://nymiria.com/install.ps1 | iex
#
# Fetches the latest release, downloads the NSIS installer, and runs it silently.
# Requirements: PowerShell 5.1+ (ships with Windows 10/11)

$ErrorActionPreference = 'Stop'

$Repo    = 'adaline-hub/nymiria-updates'
$ApiUrl  = "https://api.github.com/repos/$Repo/releases/latest"

Write-Host "Fetching latest Nymiria release..."
try {
    $Release = Invoke-RestMethod -Uri $ApiUrl -UseBasicParsing
} catch {
    Write-Error "Failed to fetch release info: $_"
    exit 1
}

$Tag     = $Release.tag_name
$Version = $Tag.TrimStart('v')

if (-not $Tag) {
    Write-Error "Could not determine latest release tag."
    exit 1
}

Write-Host "Latest version: $Tag"

$ExeName = "Nymiria_\${Version}_x64-setup.exe"
$ExeUrl  = "https://nymiria.com/api/download?asset=$ExeName&tag=$Tag"

$TempDir  = [System.IO.Path]::GetTempPath()
$TempFile = Join-Path $TempDir $ExeName

Write-Host "Downloading $ExeName..."
try {
    Invoke-WebRequest -Uri $ExeUrl -OutFile $TempFile -UseBasicParsing
} catch {
    Write-Error "Download failed: $_"
    exit 1
}

Write-Host "Installing silently..."
$proc = Start-Process -FilePath $TempFile -ArgumentList '/S' -Wait -PassThru

if ($proc.ExitCode -ne 0) {
    Write-Error "Installer exited with code $($proc.ExitCode)"
    Remove-Item $TempFile -Force
    exit 1
}

Remove-Item $TempFile -Force

Write-Host ""
Write-Host "Nymiria $Tag installed successfully."
Write-Host "Launch it from the Start Menu or Desktop shortcut."
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

# scripts/install.ps1 — Windows CLI installer for Nymiria
#
# Usage (one-liner, hosted at nymiria.com/install.ps1):
#   irm https://nymiria.com/install.ps1 | iex
#
# What it does:
#   1. Fetches the latest release tag from nymiria-updates
#   2. Downloads the NSIS .exe installer
#   3. Runs it silently (/S flag)
#
# Requirements: PowerShell 5.1+ (ships with Windows 10/11), internet access

$ErrorActionPreference = 'Stop'

$Repo    = 'adaline-hub/nymiria-updates'
$ApiUrl  = "https://api.github.com/repos/$Repo/releases/latest"
$BaseUrl = "https://github.com/$Repo/releases/download"

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

# Filename pattern produced by tauri-action NSIS bundler:
# Nymiria_VERSION_x64-setup.exe
$ExeName = "Nymiria_${Version}_x64-setup.exe"
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

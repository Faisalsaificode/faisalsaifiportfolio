# ════════════════════════════════════════════════════════════════
#  Faisal's Portfolio v2.0 — ReactBits Edition
#  Run this in PowerShell from the project root
# ════════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "  ╔═══════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "  ║   Faisal's Portfolio — ReactBits Edition   ║" -ForegroundColor Magenta
Write-Host "  ╚═══════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "  [ERROR] Node.js is not installed!" -ForegroundColor Red
    Write-Host "  Download from: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

$nodeVersion = node -v
Write-Host "  [OK] Node.js $nodeVersion detected" -ForegroundColor Green
Write-Host ""
Write-Host "  Installing dependencies (Framer Motion + GSAP)..." -ForegroundColor Yellow

npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "  [ERROR] npm install failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "  [OK] Dependencies installed!" -ForegroundColor Green
Write-Host ""
Write-Host "  Starting dev server..." -ForegroundColor Yellow
Write-Host "  Portfolio will open at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "  Press Ctrl+C to stop" -ForegroundColor DarkGray
Write-Host ""

npm run dev

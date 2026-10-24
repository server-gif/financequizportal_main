<#
.SYNOPSIS
  Downloads the 14 article photographs into public\images\photos\.

.DESCRIPTION
  FinzoriaFinance article images are real photographs used under the Pexels Licence:
  free for commercial use, no attribution required (https://www.pexels.com/license/).
  Copyright stays with each photographer, so the Terms page deliberately does not
  describe photographs as FinzoriaFinance work.

  Files are self-hosted rather than hot-linked, so a removed or renamed upstream
  file can never break the live site.

  This script is idempotent: an existing valid file is skipped, so re-running it
  only fetches what is missing.

.PARAMETER Force
  Re-download every photo even if a valid copy already exists.

.PARAMETER PicsumFallback
  For any photo whose Pexels id no longer resolves, fetch a generic real
  photograph from picsum.photos instead. Keeps the site photographic, but the
  picture will not match the article topic, so use it only as a last resort.

.EXAMPLE
  npm run photos
  powershell -ExecutionPolicy Bypass -File .\scripts\fetch-photos.ps1 -Force
#>
[CmdletBinding()]
param(
  [switch]$Force,
  [switch]$PicsumFallback
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $root 'public\images\photos'

# slug => Pexels photo id. This table is the single source of truth; src/data
# and src/config never name a third-party image URL themselves.
$photos = [ordered]@{
  'how-compound-interest-works'          = 11391951
  'beginners-guide-to-investing'         = 5716016
  'how-to-build-an-emergency-fund'       = 7010128
  'smart-ways-to-save-money'             = 1602726
  'understanding-mutual-funds'           = 730564
  'what-is-a-credit-score'               = 19867473
  'how-to-create-a-monthly-budget'       = 4386339
  'stock-market-basics-for-beginners'    = 6770610
  'how-inflation-affects-your-money'     = 4971967
  'financial-planning-for-young-adults'  = 6963046
  'how-to-use-credit-cards-responsibly'  = 5239818
  'understanding-loans-and-interest-rates' = 8293750
  'tax-basics-everyone-should-know'      = 6863337
  'how-small-businesses-manage-cash-flow' = 4921267
}

New-Item -ItemType Directory -Force -Path $dest | Out-Null

# A real 1200px JPEG is tens of kilobytes; anything smaller is an error page
# saved with a .jpg name, which would render as a broken image.
function Test-ValidJpeg([string]$path) {
  if (-not (Test-Path $path)) { return $false }
  if ((Get-Item $path).Length -lt 20KB) { return $false }
  $magic = Get-Content -Path $path -Encoding Byte -TotalCount 2 -ErrorAction SilentlyContinue
  return ($magic.Count -eq 2 -and $magic[0] -eq 0xFF -and $magic[1] -eq 0xD8)
}

$ok = 0; $skipped = 0; $failed = @()

foreach ($slug in $photos.Keys) {
  $id = $photos[$slug]
  $out = Join-Path $dest "$slug.jpg"

  if (-not $Force -and (Test-ValidJpeg $out)) {
    Write-Host "SKIP  $slug (already present)" -ForegroundColor DarkGray
    $skipped++
    continue
  }

  $url = "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=1200"

  try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 60
  } catch {
    Write-Host "FAIL  $slug  ($($_.Exception.Message))" -ForegroundColor Red
    Remove-Item $out -ErrorAction SilentlyContinue
  }

  if (-not (Test-ValidJpeg $out) -and $PicsumFallback) {
    try {
      Invoke-WebRequest -Uri "https://picsum.photos/seed/$slug/1200/675" `
        -OutFile $out -UseBasicParsing -TimeoutSec 60
      Write-Host "WARN  $slug used a picsum.photos placeholder - not topic relevant" -ForegroundColor Yellow
    } catch {
      Remove-Item $out -ErrorAction SilentlyContinue
    }
  }

  if (Test-ValidJpeg $out) {
    Write-Host "OK    $slug  <-  pexels/$id" -ForegroundColor Green
    $ok++
  } else {
    $failed += $slug
  }
}

Write-Host ''
Write-Host "Downloaded: $ok   Skipped: $skipped   Missing: $($failed.Count)" -ForegroundColor Cyan

if ($failed.Count -gt 0) {
  Write-Host 'These articles have no photo yet. Pick any free image on pexels.com and' -ForegroundColor Yellow
  Write-Host "save it as public\images\photos\<slug>.jpg, or re-run with -PicsumFallback:" -ForegroundColor Yellow
  $failed | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
  Write-Host 'Until then each article shows its own illustration as a fallback.' -ForegroundColor Yellow
  exit 1
}

Write-Host 'All article photos are in place.' -ForegroundColor Green

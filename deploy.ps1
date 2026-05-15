# Deploy Grace in the Margins to GitHub Pages
# Builds the site, commits all changes, and pushes to origin/main.

Set-Location $PSScriptRoot

Write-Host "Building site..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed. Aborting deploy."
    exit 1
}

$status = git status --porcelain
if (-not $status) {
    Write-Host "Nothing to commit. Already up to date."
    exit 0
}

git add -A

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Deploy: $timestamp"
if ($LASTEXITCODE -ne 0) {
    Write-Error "Commit failed. Aborting deploy."
    exit 1
}

Write-Host "Pushing to GitHub..."
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Error "Push failed."
    exit 1
}

Write-Host "Done. Site is live."

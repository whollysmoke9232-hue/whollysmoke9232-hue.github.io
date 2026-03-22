# Deploy script for Grace in the Margins
# This script delegates to the repository root deploy script.

$rootDeployScript = Join-Path $PSScriptRoot "..\deploy.ps1"
powershell -ExecutionPolicy Bypass -File $rootDeployScript
exit $LASTEXITCODE

$ErrorActionPreference = "Stop"

. "$PSScriptRoot/../core/Logger.ps1"
. "$PSScriptRoot/../core/Scanner.ps1"
. "$PSScriptRoot/../core/ImportScanner.ps1"
. "$PSScriptRoot/../core/ExportScanner.ps1"

Write-Log "BUTTON MODULE AUDIT" STEP

$locations = Find-Component "Button"
$imports = Find-Imports "Button"
$exports = Find-Exports "Button"

Write-Log "Locations: $($locations.Count)" INFO

foreach ($location in $locations) {
    Write-Host ""
    Write-Host "Folder:" -ForegroundColor Yellow
    Write-Host "  $($location.FullName)"
}

Write-Host ""

Write-Log "Imports ($($imports.Count))" INFO

foreach ($import in $imports) {

    Write-Host ""
    Write-Host "File :" -ForegroundColor Cyan
    Write-Host "  $($import.File)"

    Write-Host "Line :" -ForegroundColor Cyan
    Write-Host "  $($import.Line)"

    Write-Host "Import :" -ForegroundColor Green
    Write-Host "  $($import.Import)"
}

Write-Host ""

Write-Log "Exports ($($exports.Count))" INFO

foreach ($export in $exports) {

    Write-Host ""
    Write-Host "File :" -ForegroundColor Yellow
    Write-Host "  $($export.File)"

    Write-Host "Line :" -ForegroundColor Yellow
    Write-Host "  $($export.Line)"

    Write-Host "Export :" -ForegroundColor Green
    Write-Host "  $($export.Export)"
}

Write-Host ""

Write-Log "Button audit completed." SUCCESS


Write-Log "APPLICATION CONSUMERS" STEP

$imports = Find-ExternalImports

$buttonConsumers = $imports | Where-Object {

    $_.Import -match "Button|buttons|button"

}

if ($buttonConsumers.Count -eq 0) {

    Write-Log "No application consumers found." WARNING

}
else {

    $buttonConsumers |
        Sort-Object File |
        Format-Table File, Line, Import -AutoSize

}
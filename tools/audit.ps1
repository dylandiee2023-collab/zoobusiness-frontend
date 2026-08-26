$ErrorActionPreference = "Stop"

. "$PSScriptRoot/core/Logger.ps1"
. "$PSScriptRoot/core/Utils.ps1"
. "$PSScriptRoot/core/Scanner.ps1"
. "$PSScriptRoot/core/ImportScanner.ps1"
. "$PSScriptRoot/core/ExportScanner.ps1"

Write-Log "ZooBUSINESS Refactor Audit" STEP

$components = @(
    "Button",
    "Input",
    "Card",
    "Avatar",
    "Badge",
    "Alert",
    "Spinner",
    "Pagination",
    "Tabs",
    "Overlay"
)

$report = @()

foreach ($component in $components) {

    Write-Log "Scanning $component..." INFO

    $locations = Find-Component $component
    $imports = Find-Imports $component
    $exports = Find-Exports $component

    $report += [PSCustomObject]@{

        Component = $component

        Locations = $locations.Count

        Imports = $imports.Count

        Exports = $exports.Count

    }

}

$report | Format-Table -AutoSize

$report |
    ConvertTo-Json -Depth 10 |
    Set-Content (Join-ProjectPath "tools/reports/audit.json")

Write-Log "Audit completed." SUCCESS
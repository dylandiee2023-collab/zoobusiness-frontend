function Get-ProjectRoot {
    return (Get-Location).Path
}

function Join-ProjectPath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$RelativePath
    )

    return Join-Path (Get-ProjectRoot) $RelativePath
}

function Test-ProjectPath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$RelativePath
    )

    $path = Join-ProjectPath $RelativePath

    return Test-Path $path
}

function Ensure-Directory {
    param(
        [Parameter(Mandatory = $true)]
        [string]$RelativePath
    )

    $path = Join-ProjectPath $RelativePath

    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
    }

    return $path
}

function Get-TimeStamp {
    return Get-Date -Format "yyyyMMdd-HHmmss"
}

function Save-Report {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,

        [Parameter(Mandatory = $true)]
        [string]$Content
    )

    Ensure-Directory "tools/reports" | Out-Null

    $file = Join-ProjectPath "tools/reports/$Name.txt"

    $Content | Set-Content $file

    return $file
}

function Save-BackupFolder {
    Ensure-Directory "tools/backups" | Out-Null

    $folder = Join-ProjectPath ("tools/backups/" + (Get-TimeStamp))

    New-Item -ItemType Directory -Path $folder -Force | Out-Null

    return $folder
}
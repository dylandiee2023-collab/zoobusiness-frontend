. "$PSScriptRoot/Utils.ps1"

function Get-SourceFiles {

    param(
        [string]$Root = "src"
    )

    $path = Join-ProjectPath $Root

    if (!(Test-Path $path)) {
        throw "Directory not found: $path"
    }

    return Get-ChildItem `
        -Path $path `
        -Recurse `
        -File `
        -Include *.ts,*.tsx,*.js,*.jsx
}

function Get-ComponentFolders {

    param(
        [string]$Root = "src"
    )

    $path = Join-ProjectPath $Root

    return Get-ChildItem `
        -Path $path `
        -Directory `
        -Recurse
}

function Find-Component {

    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    Get-ComponentFolders |
        Where-Object {
            $_.Name -ieq $Name
        }
}

function Find-FilesByName {

    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    Get-SourceFiles |
        Where-Object {
            $_.BaseName -ieq $Name
        }
}
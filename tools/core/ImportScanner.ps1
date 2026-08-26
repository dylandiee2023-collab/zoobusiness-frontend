. "$PSScriptRoot/Utils.ps1"
. "$PSScriptRoot/Scanner.ps1"

function Get-Imports {

    $files = Get-SourceFiles

    foreach ($file in $files) {

        $imports = Select-String `
            -Path $file.FullName `
            -Pattern '^\s*import\s+.*from\s+["''].*["'']'

        foreach ($import in $imports) {

            [PSCustomObject]@{

                File = $file.FullName

                Line = $import.LineNumber

                Import = $import.Line.Trim()

            }

        }

    }

}

function Find-Imports {

    param(

        [Parameter(Mandatory=$true)]

        [string]$Keyword

    )

    Get-Imports |

        Where-Object {

            $_.Import -match [Regex]::Escape($Keyword)

        }

}


function Find-ExternalImports {

    $Prefixes = @("@/")

    $files = Get-SourceFiles
    $results = @()

    foreach ($file in $files) {

        $lines = @(Get-Content -Path $file.FullName)

for ($i = 0; $i -lt $lines.Length; $i++) {

    $line = "$($lines[$i])".Trim()

           if ([string]::IsNullOrWhiteSpace($line)) {
    continue
}

if ($line -notmatch '^\s*import') {
    continue
}

            foreach ($prefix in $Prefixes) {

                if ($line.Contains($prefix)) {

                    $results += [PSCustomObject]@{
                        File   = $file.FullName
                        Line   = $i + 1
                        Import = $line
                    }

                    break
                }
            }
        }
    }

    return $results
}
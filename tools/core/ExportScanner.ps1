. "$PSScriptRoot/Utils.ps1"
. "$PSScriptRoot/Scanner.ps1"

function Get-Exports {

    $files = Get-SourceFiles

    foreach ($file in $files) {

        $exports = Select-String `
            -Path $file.FullName `
            -Pattern '^\s*export\s+'

        foreach ($export in $exports) {

            [PSCustomObject]@{

                File = $file.FullName

                Line = $export.LineNumber

                Export = $export.Line.Trim()

            }

        }

    }

}

function Find-Exports {

    param(

        [Parameter(Mandatory = $true)]

        [string]$Keyword

    )

    Get-Exports |

        Where-Object {

            $_.Export -match [Regex]::Escape($Keyword)

        }

}

function Find-BarrelFiles {

    Get-SourceFiles |

        Where-Object {

            $_.BaseName -eq "index"

        }

}
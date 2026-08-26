function Write-Log {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Message,

        [ValidateSet(
            "INFO",
            "SUCCESS",
            "WARNING",
            "ERROR",
            "STEP"
        )]
        [string]$Level = "INFO"
    )

    $time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

    switch ($Level) {

        "INFO" {
            Write-Host "[$time] [INFO]    $Message" -ForegroundColor Cyan
        }

        "SUCCESS" {
            Write-Host "[$time] [SUCCESS] $Message" -ForegroundColor Green
        }

        "WARNING" {
            Write-Host "[$time] [WARNING] $Message" -ForegroundColor Yellow
        }

        "ERROR" {
            Write-Host "[$time] [ERROR]   $Message" -ForegroundColor Red
        }

        "STEP" {
            Write-Host ""
            Write-Host "==========================================" -ForegroundColor Magenta
            Write-Host "$Message" -ForegroundColor Magenta
            Write-Host "==========================================" -ForegroundColor Magenta
            Write-Host ""
        }
    }
}
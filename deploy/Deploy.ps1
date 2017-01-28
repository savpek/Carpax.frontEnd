[CmdletBinding()]
Param()

function UploadFiles {
    Param(
        [Parameter(Mandatory)][string]$Source,
        [Parameter(Mandatory)][string]$Destination,
        [Parameter(Mandatory)][string]$userName,
        [Parameter(Mandatory)][string]$Pass,
        [Parameter(Mandatory)][string]$FtpAddr
        )
    $files = Get-ChildItem -File $Source
    $FtpAddr=
    $user= "carpaxstage\deploy02"
    $pass="deploy02"
    
    $webclient=New-Object System.Net.WebClient
    $webclient.Credentials = New-Object System.Net.NetworkCredential($user,$pass)

    $files | foreach {
        $uri = "$FtpAddr/$Destination/$($_.Name)"
        Write-Host "Uploading '$($_.FullName)'"
        $webclient.UploadFile((New-Object System.Uri($uri)) ,$_.FullName)
    }
}

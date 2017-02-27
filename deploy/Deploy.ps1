[CmdletBinding()]
Param(
    [ValidateSet("staging", "prod")]
    [Parameter(Mandatory)][string]$Target,
    [switch]$Push
)

$distFolder = "$PsScriptRoot\dist";
$distFrontendFolder = "$distFolder\app\"
$root = Resolve-Path "$PsScriptRoot\..\"

if(Test-Path $distFolder) {
    Remove-Item $distFolder -Recurse -Force
}

Push-Location $root
    npm install
    ng build --prod --env=$Target

    $indexHtml = (Get-Content "$root\dist\index.html" | Out-String) -replace "<base href=`"/`">","<base href=`"/app/`">"
    $indexHtml | Set-Content "$root\dist\index.html"

    git clone https://github.com/savpek/Carpax.webapp.built.git $distFolder

    Push-Location $distFolder
        switch ($Target) {
            "staging" { git checkout master }
            "prod" { git checkout prod }
            default { throw "Invalid target" }
        }

        Copy-Item "$root\dist\*" "$distFrontendFolder" -Recurse -Force
        Copy-Item "$PsScriptRoot\assets\*" "$distFrontendFolder" -Recurse -Force

        git add . -A
        git commit -am "Deployment script."

        if($Push) {
            git push
        }
    Pop-Location
Pop-Location
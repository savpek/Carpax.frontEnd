[CmdletBinding()]
Param(
    [ValidateSet("staging")]
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

git clone https://github.com/savpek/Carpax.webapp.built.git $distFolder

Copy-Item "$root\dist\" "$distFrontendFolder" -Recurse -Force
Copy-Item "$PsScriptRoot\assets\*" "$distFrontendFolder" -Recurse -Force

if($Push) {
    Push-Location $distFolder
    git add . -A
    git commit -am "Deployment script."
    git push
}
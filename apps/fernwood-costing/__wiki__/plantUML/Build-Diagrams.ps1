[CmdletBinding()]
param([Switch]$Watch)

begin
{
    $fileFilter = "$($PSScriptRoot)/**/*.puml";

    function Watch([ScriptBlock]$ScriptBlock)
    {
        $WatchDelaySeconds = 2;

        Write-Host "Watching for changes in $($PSScriptRoot)"

        while ($true)
        {
            # Run the script block if a file has changed in the last n seconds.
            $Now = Get-Date;
            $SourceFiles = Get-ChildItem $fileFilter -Recurse;
            $SourceFiles | ForEach-Object {
                $Diff = $Now - $_.LastWriteTime;
                if ($WatchDelaySeconds -gt $Diff.TotalSeconds) {
                    Write-Host "Rebuilding diagrams.";
                    $ScriptBlock.Invoke();
                    Write-Host "Watching for changes."
                }
            }

            Start-Sleep -Seconds $WatchDelaySeconds;
        }
    }

    function Build()
    {
        $installed = (choco list --local-only);

        if ($null -eq ($installed | select-string javaruntime)) {
            # Installs to C:\Program Files\Java\jre1.8.0_333\
            choco install javaruntime -y;
        }

        if ($null -eq ($installed | select-string plantuml)) {
            # Installs to C:\ProgramData\chocolatey\bin\
            choco install plantuml -y;
        }

        plantuml.exe $fileFilter;
    }
}

process
{
    Build;

    if($Watch) {
        Watch -ScriptBlock { Build; }
    } 
}

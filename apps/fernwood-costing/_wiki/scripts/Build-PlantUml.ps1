
$sourceFiles = Get-ChildItem "$PSScriptRoot\..\docs\plantuml-*.txt";
$sourceFiles | ForEach-Object {
  Write-Host $_.FullName;
  plantumlc.exe $_.FullName;
}

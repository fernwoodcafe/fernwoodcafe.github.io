if ($null -eq (get-command plantuml)) {
  choco install plantuml -y;
}

plantuml "$PSScriptRoot/*.uml"

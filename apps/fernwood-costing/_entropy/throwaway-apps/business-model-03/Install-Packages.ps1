# See https://quarto.org/docs/get-started/hello/vscode.html
# See also https://cloud.r-project.org/

Invoke-WebRequest `
  -Uri "https://cloud.r-project.org/bin/windows/base/R-4.2.2-win.exe" `
  -OutFile "~\Downloads\R.exe";

Invoke-Item "~\Downloads\R.exe";

Invoke-WebRequest `
  -Uri "https://github.com/quarto-dev/quarto-cli/releases/download/v1.2.280/quarto-1.2.280-win.msi" `
  -OutFile "~\Downloads\quarto.msi";

Invoke-Item "~\Downloads\quarto.msi";

RScript install.R;

py -m pip install jupyter matplotlib plotly

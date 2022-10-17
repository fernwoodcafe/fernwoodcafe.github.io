$widths = @(250, 500, 800);

$widths | ForEach-Object {

  $width = $_;
  $outDir = $width.ToString() + "w";

  New-Item -ItemType Directory $outDir -Force;

  magick.exe mogrify -resize $width -path $outDir *.png *.jpg
}

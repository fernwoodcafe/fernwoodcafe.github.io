[CmdletBinding(SupportsPaging=$true)]

Param ([string]$CsvFullPath)
Begin{

}
Process{

  $csv = Import-Csv $CsvFullPath;

  $props = @(
    "Item Name",
    "Category",
    "Price",
    "Tax - GST (5%)",
    "Tax - PST (7%)"
    "Modifier Set - Additional Pulls",
    "Modifier Set - Milk Type",
    "Modifier Set - Whipping Cream"
  );

  $csv |
    Where-Object Category -eq "Beverage (Bar)" |
    Select-Object -Property $props
}
End{}

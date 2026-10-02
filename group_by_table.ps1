# Group guests by table assignment
# This script reads the attending_guests_with_tables.csv and groups guests by their table

$guestsWithTables = Import-Csv "attending_guests.csv"

$highChairTables = @(4, 12, 15)
$boosterTables = @(2, 10, 11)

# Group by Table
$groupedByTable = $guestsWithTables | Group-Object -Property tableNumber | Sort-Object { [int]$_.Name }

# Display results in a formatted way
foreach ($tableGroup in $groupedByTable) {
    $tableName = "Table $($tableGroup.Name)"
    $guestCount = $tableGroup.Count

    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "$tableName ($guestCount guests)" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan

    # Sort guests by name within each table
    $sortedGuests = $tableGroup.Group | Sort-Object -Property Name

    foreach ($guest in $sortedGuests) {
        $foodInfo = if ($guest.Food -and $guest.Food -ne "N/A" -and $guest.Food -ne "" -and $guest.Food -ne "No Meal") { " - $($guest.Food)" } else { "" }
        $dietaryInfo = if ($guest.dietary -and $guest.dietary.Trim() -ne "None" -and $guest.dietary.Trim() -ne "") { " [Dietary: $($guest.dietary.Trim())]" } else { "" }
        $noMealFlag = ""
        if ($guest.Food -eq "No Meal" -or $guest.Food -eq "N/A" -or $guest.Food -eq "") {
            $tNum = [int]$guest.tableNumber
            if ($tNum -in $highChairTables) { $noMealFlag = " [ ] High Chair" }
            elseif ($tNum -in $boosterTables) { $noMealFlag = " [ ] Booster Seat" }
            else { $noMealFlag = " [ ] Booster/High Chair" }
        }
        Write-Host "$($guest.Name) `n $tableName" -ForegroundColor White -NoNewline
        if ($dietaryInfo) { Write-Host $dietaryInfo -ForegroundColor Red -NoNewline }
        if ($noMealFlag) { Write-Host $noMealFlag -ForegroundColor DarkYellow -NoNewline }
        Write-Host ""
    }

    # Meal count breakdown
    $mealCounts = $tableGroup.Group | Where-Object { $_.Food -and $_.Food -ne "N/A" -and $_.Food -ne "" } | Group-Object -Property Food | Sort-Object -Property Count -Descending
    if ($mealCounts) {
        Write-Host "  ----------------------------------------" -ForegroundColor DarkGray
        Write-Host "  Meal Breakdown:" -ForegroundColor Magenta
        foreach ($meal in $mealCounts) {
            Write-Host "    $($meal.Count)x $($meal.Name)" -ForegroundColor DarkYellow
        }
    }
}

# Also export to a CSV with grouped format
$outputData = foreach ($tableGroup in $groupedByTable) {
    $tableName = "Table $($tableGroup.Name)"
    $sortedGuests = $tableGroup.Group | Sort-Object -Property Name

    foreach ($guest in $sortedGuests) {
        $dietaryVal = if ($guest.dietary -and $guest.dietary.Trim() -ne "None" -and $guest.dietary.Trim() -ne "") { $guest.dietary.Trim() } else { "" }
        $seatType = ""
        if ($guest.Food -eq "No Meal" -or $guest.Food -eq "N/A" -or $guest.Food -eq "") {
            $tNum = [int]$guest.tableNumber
            if ($tNum -in $highChairTables) { $seatType = "High Chair" }
            elseif ($tNum -in $boosterTables) { $seatType = "Booster Seat" }
            else { $seatType = "TBD" }
        }
        [pscustomobject]@{
            Table = $tableName
            Name  = $guest.Name
            Food  = $guest.Food
            Dietary = $dietaryVal
            SeatNeeded = $seatType
            PartyID = $guest.PartyID
        }
    }
}

$outputData | Export-Csv "guests_grouped_by_table.csv" -NoTypeInformation

Write-Host "`n`nGrouped data exported to: guests_grouped_by_table.csv" -ForegroundColor Green
Write-Host "Total tables: $($groupedByTable.Count)" -ForegroundColor Green
Write-Host "Total guests: $($guestsWithTables.Count)" -ForegroundColor Green

# Overall meal totals
$overallMeals = $guestsWithTables | Where-Object { $_.Food -and $_.Food -ne "N/A" -and $_.Food -ne "" } | Group-Object -Property Food | Sort-Object -Property Count -Descending
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Overall Meal Totals" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
foreach ($meal in $overallMeals) {
    Write-Host "  $($meal.Count)x $($meal.Name)" -ForegroundColor White
}

# Export to Word (.docx) via Open XML
$basePath = "c:\Users\danocampo\Documents\our-wedding"
$docxPath = Join-Path $basePath "guests_grouped_by_table.docx"
$tempDir = Join-Path $env:TEMP "docx_build_$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
New-Item -ItemType Directory -Path "$tempDir\_rels" -Force | Out-Null
New-Item -ItemType Directory -Path "$tempDir\word\_rels" -Force | Out-Null

# [Content_Types].xml
@'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>
'@ | Out-File -LiteralPath "$tempDir\[Content_Types].xml" -Encoding utf8

# _rels/.rels
@'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
'@ | Out-File -FilePath "$tempDir\_rels\.rels" -Encoding utf8

# word/_rels/document.xml.rels
@'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>
'@ | Out-File -FilePath "$tempDir\word\_rels\document.xml.rels" -Encoding utf8

# Build document.xml body
$ns = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
$body = ""

# Helper: XML-escape text
function Esc($t) { return [System.Security.SecurityElement]::Escape($t) }

# Title
$body += @"
<w:p><w:pPr><w:jc w:val="center"/><w:pBdr><w:bottom w:val="single" w:sz="12" w:space="1" w:color="5B2C6F"/></w:pBdr></w:pPr>
<w:r><w:rPr><w:b/><w:sz w:val="36"/><w:color w:val="5B2C6F"/></w:rPr><w:t>Wedding Guest Seating &amp; Meals</w:t></w:r></w:p>
"@

# Summary line
$body += @"
<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="400"/></w:pPr>
<w:r><w:rPr><w:sz w:val="22"/><w:color w:val="666666"/></w:rPr><w:t>Total Tables: $($groupedByTable.Count)  |  Total Guests: $($guestsWithTables.Count)</w:t></w:r></w:p>
"@

foreach ($tableGroup in $groupedByTable) {
    $tName = "Table $($tableGroup.Name)"
    $gCount = $tableGroup.Count
    $sortedGuests = $tableGroup.Group | Sort-Object -Property Name

    # Table header
    $body += @"
<w:p><w:pPr><w:shd w:val="clear" w:color="auto" w:fill="5B2C6F"/><w:spacing w:before="300"/></w:pPr>
<w:r><w:rPr><w:b/><w:sz w:val="28"/><w:color w:val="FFFFFF"/></w:rPr><w:t xml:space="preserve">$(Esc $tName) ($gCount guests)</w:t></w:r></w:p>
"@

    # Guest rows
    foreach ($guest in $sortedGuests) {
        $hasDietary = $guest.dietary -and $guest.dietary.Trim() -ne "None" -and $guest.dietary.Trim() -ne ""
        $needsSeat = $guest.Food -eq "No Meal" -or $guest.Food -eq "N/A" -or $guest.Food -eq ""
        $mealDisplay = if (-not $needsSeat) { "  -  $(Esc $guest.Food)" } else { "" }

        $dietaryRun = ""
        if ($hasDietary) {
            $dText = Esc $guest.dietary.Trim()
            $dietaryRun = '<w:r><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="C0392B"/></w:rPr><w:t xml:space="preserve">  [Dietary: ' + $dText + ']</w:t></w:r>'
        }

        $seatRun = ""
        if ($needsSeat) {
            $tNum = [int]$guest.tableNumber
            $seatLabel = if ($tNum -in $highChairTables) { "High Chair" } elseif ($tNum -in $boosterTables) { "Booster Seat" } else { "Booster / High Chair" }
            $seatRun = '<w:r><w:rPr><w:sz w:val="20"/><w:color w:val="E67E22"/></w:rPr><w:t xml:space="preserve">  </w:t></w:r>'
            $seatRun += '<w:r><w:rPr><w:sz w:val="36"/><w:color w:val="E67E22"/></w:rPr><w:t>&#9744;</w:t></w:r>'
            $seatRun += '<w:r><w:rPr><w:sz w:val="20"/><w:color w:val="E67E22"/></w:rPr><w:t xml:space="preserve"> ' + $seatLabel + '</w:t></w:r>'
        }

        $body += @"
<w:p><w:pPr><w:spacing w:after="40"/></w:pPr>
<w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t xml:space="preserve">  $(Esc $guest.Name)$mealDisplay</w:t></w:r>$dietaryRun$seatRun</w:p>
"@
    }

    # Meal breakdown
    $mealCounts = $tableGroup.Group | Where-Object { $_.Food -and $_.Food -ne "N/A" -and $_.Food -ne "" } | Group-Object -Property Food | Sort-Object -Property Count -Descending
    if ($mealCounts) {
        $body += @"
<w:p><w:pPr><w:shd w:val="clear" w:color="auto" w:fill="F9F5FC"/><w:spacing w:before="80"/></w:pPr>
<w:r><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="5B2C6F"/></w:rPr><w:t xml:space="preserve">  Meal Breakdown:</w:t></w:r></w:p>
"@
        foreach ($meal in $mealCounts) {
            $body += @"
<w:p><w:pPr><w:shd w:val="clear" w:color="auto" w:fill="F9F5FC"/></w:pPr>
<w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:t xml:space="preserve">      $($meal.Count)x $(Esc $meal.Name)</w:t></w:r></w:p>
"@
        }
    }
}

# Overall meal totals
$body += @"
<w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="12" w:space="1" w:color="5B2C6F"/><w:left w:val="single" w:sz="12" w:space="4" w:color="5B2C6F"/><w:bottom w:val="single" w:sz="12" w:space="1" w:color="5B2C6F"/><w:right w:val="single" w:sz="12" w:space="4" w:color="5B2C6F"/></w:pBdr><w:spacing w:before="400"/></w:pPr>
<w:r><w:rPr><w:b/><w:sz w:val="28"/><w:color w:val="5B2C6F"/></w:rPr><w:t>Overall Meal Totals</w:t></w:r></w:p>
"@
foreach ($meal in $overallMeals) {
    $body += @"
<w:p><w:pPr><w:pBdr><w:left w:val="single" w:sz="12" w:space="4" w:color="5B2C6F"/><w:bottom w:val="single" w:sz="12" w:space="1" w:color="5B2C6F"/><w:right w:val="single" w:sz="12" w:space="4" w:color="5B2C6F"/></w:pBdr></w:pPr>
<w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t xml:space="preserve">  $($meal.Count)x $(Esc $meal.Name)</w:t></w:r></w:p>
"@
}

# Wrap in document.xml
$docXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="$ns">
<w:body>
$body
</w:body>
</w:document>
"@

$docXml | Out-File -FilePath "$tempDir\word\document.xml" -Encoding utf8

# Create .docx (ZIP)
if (Test-Path $docxPath) { Remove-Item $docxPath -Force }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $docxPath)
Remove-Item $tempDir -Recurse -Force

if (Test-Path $docxPath) {
    Write-Host "`nWord doc exported to: $docxPath" -ForegroundColor Green
} else {
    Write-Host "`nWord doc generation failed." -ForegroundColor Yellow
}

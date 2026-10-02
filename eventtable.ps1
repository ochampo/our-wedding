$guests  = Import-Csv "attending_guests.csv"

$joinedData = foreach ($guest in $guests) {

    # Find the matching name
    $match = $tables | Where-Object { $_.Name.Trim() -eq $guest.name.Trim() }

    # Combine the columns into one clean row
    [pscustomobject]@{
        Name    = $guest.name
        Food    = $guest.food
        PartyID = $guest.partyId
        # Notice the space after the word Table inside the single quotes!
        Table   = if ($match) { $match.'Table ' } else { "No Table Found" }
    }
}

$joinedData | Export-Csv "attending_guests_with_tables.csv"

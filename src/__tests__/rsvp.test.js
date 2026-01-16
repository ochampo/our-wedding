// NOTE: We are NOT importing 'vitest' here to avoid conflict errors.
// If you get "describe is not defined", uncomment the line below:
 import { describe, test, expect } from 'vitest';
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL; // <--- PASTE YOUR GOOGLE SCRIPT URL HERE

describe('RSVP Verification Test', () => {
  
  // Set timeout to 60 seconds
  test('should write data and verify it exists', async () => {
    
    // 1. Create a unique batch ID (so we don't count old data)
    const uniqueBatchId = `Test-${Date.now()}`;
    const numberOfRequests = 5;
    const requestPromises = [];
    
    // We will track exactly what names we sent
    const expectedNames = [];

    console.log(`Starting Batch: ${uniqueBatchId}`);

    // 2. Fire 5 Requests (Fire & Forget)
    for (let i = 0; i < numberOfRequests; i++) {
      const name = `${uniqueBatchId}-User-${i+1}`;
      expectedNames.push(name.toLowerCase()); 

      const payload = {
        partyResponse: [{
          name: name,
          attendance: "Yes",
          dietary: "Testing",
          music: "Verification Jam",
          date: new Date().toISOString()
        }]
      };

      // Send request but ignore errors (we only care if the data arrives)
      const req = fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => "Ignored");

      requestPromises.push(req);
    }

    // Wait for requests to go out
    await Promise.all(requestPromises);

    // 3. THE WAITING ROOM (Critical Step)
    // We wait 15 seconds to give Google's LockService time to process the queue.
    console.log("Requests sent. Waiting 15s for Google to write data...");
    await new Promise(r => setTimeout(r, 15000));

    // 4. VERIFY (The "Read" Request)
    console.log("Reading spreadsheet to verify...");
    
    // Fetch the current list of RSVPs
    const response = await fetch(SCRIPT_URL); 
    const json = await response.json();
    const rsvpMap = json.rsvpMap; // This assumes your doGet returns { rsvpMap: ... }

    // 5. Check if our unique names are there
    let successCount = 0;
    expectedNames.forEach(name => {
      // We check if the name exists in the map
      if (rsvpMap && rsvpMap[name]) {
        successCount++;
      } else {
        console.log(`Still waiting for: ${name}`);
      }
    });

    console.log(`Result: Found ${successCount} / ${numberOfRequests} names.`);
    
    // PASS if we found all 5
    // If this fails, it means the Lock is too slow or the script crashed
    if (successCount !== numberOfRequests) {
        throw new Error(`Only found ${successCount} of ${numberOfRequests} names in the sheet.`);
    }

  }, 60000); // 60s Timeout
});
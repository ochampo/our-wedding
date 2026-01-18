// src/__tests__/rsvp.test.js
import { describe, test, expect } from 'vitest';
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

describe('RSVP Verification Test', () => {

  // Use a helper to log exact time elapsed
  const startTime = Date.now();
  const log = (msg) => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`[ ⏱️ ${elapsed}s ] ${msg}`);
  };

  test('should write data and verify it exists', async () => {
    
    const uniqueBatchId = `Test-${Date.now()}`;
    const numberOfRequests = 20; // Increased load
    const requestPromises = [];
    const expectedNames = [];

    log(`STARTING BATCH: ${uniqueBatchId}`);

    // --- PHASE 1: SENDING ---
    for (let i = 0; i < numberOfRequests; i++) {
      const name = `${uniqueBatchId}-User-${i+1}`;
      expectedNames.push(name.toLowerCase()); 

      const payload = {
        partyResponse: [{
          name: name,
          attendance: "Yes",
          food: "Chicken",
          dietary: "Debug Mode", 
          date: new Date().toISOString()
        }]
      };

      // Create the cutoff switch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      log(`Firing request #${i+1}...`);

      const req = fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(() => clearTimeout(timeoutId))
      .catch((e) => {
        if (e.name === 'AbortError') return; 
      });

      requestPromises.push(req);
    }

    log(`Waiting for all ${numberOfRequests} fetch calls to complete/abort...`);
    await Promise.all(requestPromises);
    log(`PHASE 1 COMPLETE: All requests fired.`);

    // --- PHASE 2: WAITING ---
    log(`PHASE 2 START: Entering 20s waiting room...`);
    // We break this into chunks so you can see it's alive
    for(let i=1; i<=20; i++) {
        await new Promise(r => setTimeout(r, 1000));
        if(i % 5 === 0) log(`... waited ${i} seconds ...`);
    }
    log(`PHASE 2 COMPLETE: Wait finished.`);

    // --- PHASE 3: VERIFYING ---
    log(`PHASE 3 START: Fetching spreadsheet data...`);
    
    const response = await fetch(SCRIPT_URL); 
    log(`Received response headers. Parsing JSON...`);
    
    const json = await response.json();
    log(`JSON Parsed. Checking names...`);
    
    const rsvpMap = json.rsvpMap; 
    let successCount = 0;

    if (!rsvpMap) {
      log(`CRITICAL FAILURE: rsvpMap is undefined!`);
      throw new Error("Server returned bad data");
    }

    expectedNames.forEach(name => {
      if (rsvpMap[name]) successCount++;
    });

    log(`PHASE 3 COMPLETE: Found ${successCount}/${numberOfRequests}`);

    if (successCount !== numberOfRequests) {
        throw new Error(`Only found ${successCount} names.`);
    }

  }, 120000); // 120s Timeout
});
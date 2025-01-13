async function fetchSolanaStats() {
    try {
        // Retrieve current slot
        const slotResponse = await fetch('https://api.mainnet-beta.solana.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getSlot"
            }),
        });
        const slotData = await slotResponse.json();
        document.getElementById('current-slot').innerText = slotData.result;

        // Retrieve epoch information
        const epochResponse = await fetch('https://api.mainnet-beta.solana.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getEpochInfo"
            }),
        });
        const epochData = await epochResponse.json();
        
        // Calculate the time left in the current epoch
        const currentEpoch = epochData.result.epoch;
        const epochStart = epochData.result.absoluteSlot;
        const epochEnd = epochStart + 432000; // Slots per epoch (can change, check docs)
        const currentSlot = slotData.result;
        const slotsLeft = epochEnd - currentSlot;
        const secondsPerSlot = 0.4; // Average time per slot (approx)
        const secondsLeft = Math.ceil(slotsLeft * secondsPerSlot);
        const minutesLeft = Math.floor(secondsLeft / 60);
        const secondsRemainder = secondsLeft % 60;

        document.getElementById('time-left').innerText = `${minutesLeft}m ${secondsRemainder}s`;

        // Retrieve the TPS
        const tpsResponse = await fetch('https://api.mainnet-beta.solana.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getRecentBlockhash"
            }),
        });

        const tpsData = await tpsResponse.json();
        // TPS calculation depends on the returned data; adjust this as needed
        document.getElementById('tps').innerText = "Calculated based on recent transactions..."; // Placeholder value

    } catch (error) {
        console.error('Error fetching Solana stats:', error);
        document.getElementById('current-slot').innerText = 'Error';
        document.getElementById('time-left').innerText = 'Error';
        document.getElementById('tps').innerText = 'Error';
    }
}

// Call the function to fetch stats on load
window.onload = fetchSolanaStats;

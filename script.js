async function fetchSolanaStats() {
    try {
        // 1. Fetch the current slot
        const slotResponse = await fetch('https://api.mainnet-beta.solana.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getSlot',
                params: [],
            }),
        });
        const slotData = await slotResponse.json();
        document.getElementById('current-slot').innerText = slotData.result;

        // 2. Fetch the RPC endpoint for TPS
        // Fetch recent blockhashes to calculate TPS
        const recentBlockhashResponse = await fetch('https://api.mainnet-beta.solana.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getRecentBlockhash',
                params: [],
            }),
        });
        const recentBlockhashData = await recentBlockhashResponse.json();
        
        // You would typically compute TPS based on transactions in recent blocks.
        // This could be complex and may need more refined methods or metrics.
        document.getElementById('tps').innerText = 'Not calculated'; // Placeholder for now

        // 3. Fetch current leader
        // Get the currently active leader by fetching recent block production
        const leaderResponse = await fetch('https://api.mainnet-beta.solana.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getSlotLeaders',
                params: [slotData.result, 1],  // Get 1 slot leader for the current slot
            }),
        });
        const leaderData = await leaderResponse.json();
        document.getElementById('current-leader').innerText = leaderData.result[0];

    } catch (error) {
        console.error('Error fetching Solana stats:', error);
        document.getElementById('tps').innerText = 'Error';
        document.getElementById('current-slot').innerText = 'Error';
        document.getElementById('current-leader').innerText = 'Error';
    }
}

// Call the function to fetch stats on load
window.onload = fetchSolanaStats;

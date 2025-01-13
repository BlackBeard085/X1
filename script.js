const API_ENDPOINT = 'https://api.mainnet-beta.solana.com';

async function fetchEpochData() {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getEpochInfo",
                params: []
            }),
        });

        const data = await response.json();
        if (data.result) {
            const { epoch, slotIndex, slotsInEpoch } = data.result;

            document.getElementById('current-slot').textContent = slotIndex + 1; // Slot Index is zero-based.
            document.getElementById('epoch-time-left').textContent = `${calcTimeLeft(data.result)}`;
            document.getElementById('current-tps').textContent = await fetchTPS();
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function calcTimeLeft(epochInfo) {
    // Use epochInfo to calculate the time left. Placeholder for now.
    return "Time calculation not implemented";
}

async function fetchTPS() {
    // Placeholder for fetching TPS data
    return "TPS calculation not implemented";
}

// Call fetch function to get data
fetchEpochData();

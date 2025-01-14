async function fetchSolanaData() {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
  
    // Get the current slot
    const slot = await connection.getSlot();
    document.getElementById('current-slot').textContent = slot;

    // Get the epoch info to calculate time remaining
    const epochInfo = await connection.getEpochInfo();
    const slotDuration = 400; // Average slot duration in milliseconds for Solana
    const timeRemaining = (epochInfo.absoluteSlot + epochInfo.slotIndex + 1) * slotDuration - Date.now();
    
    const timeLeftInSeconds = Math.max(0, Math.round(timeRemaining / 1000));
    document.getElementById('time-left').textContent = timeLeftInSeconds + " seconds";

    // Get recent performance to retrieve TPS
    const { totalTxs, numSlots } = await connection.getRecentPerformanceSamples(1);
    const tps = (totalTxs / numSlots) || 0; // Calculate TPS; avoid division by zero
    document.getElementById('tps').textContent = tps.toFixed(2);
}

// Fetch data every few seconds
fetchSolanaData();
setInterval(fetchSolanaData, 5000); // Refresh the data every 5 seconds

const axios = require('axios');

async function fetchSolanaData() {
  const response = await axios.post(`https://rpc.testnet.x1.xyz`,
    {
      jsonrpc: "2.0",
      id: 1,
      method: "getEpochInfo",
      params: []
    }
  );

  return response.data.result;
}

async function fetchStakeInfo() {
  const response = await axios.post(`https://rpc.testnet.x1.xyz`,
    {
      jsonrpc: "2.0",
      id: 1,
      method: "getStakeActivation",
      params: [
        'HNezNfYC8YyzZBADNaJ7ZuLseqFWmMsFqriGuccZ9kCT'
      ]
    }
  );

  return response.data.result;
}

async function fetchValidatorInfo() {
  const response = await axios.post(`https://rpc.testnet.x1.xyz`,
    {
      jsonrpc: "2.0",
      id: 1,
      method: "getValidatorInfo",
      params: [
        'HNezNfYC8YyzZBADNaJ7ZuLseqFWmMsFqriGuccZ9kCT'
      ]
    }
  );

  return response.data.result;
}

async function fetchData() {
  try {
    const solanaData = await fetchSolanaData();
    const stakeInfo = await fetchStakeInfo();
    const validatorInfo = await fetchValidatorInfo();

    return {
      epoch: solanaData.epoch,
      validatorIcon: validatorInfo.identity,
      activeStake: stakeInfo.active_stake,
      delinquentStake: stakeInfo.delinquent_stake,
      nextValidatorLedgerSlot: validatorInfo.next_ledger_slot,
      leaderTimeUntilNextSlot: validatorInfo.leader_time_until_next_slot,
    };

  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = fetchData;

const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();
const mnemonic = '';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rpc-mumbai.matic.today'),
      network_id: 80001,
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 8 * 1000000,
      gasPrice: '1000000000' // 1 gwei
    },
    rsktestnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co'),
      network_id: 31,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6800000,
      gasPrice: '60000000' // 0.006 gwei
    },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.7.4",
      settings: {
       optimizer: {
         enabled: true,
         runs: 200
       },
       evmVersion: "istanbul"
      }
    }
  }
}

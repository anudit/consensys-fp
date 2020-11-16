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
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/9f34d0bf5e1b4b36914fd5bc66c50b05'),
      network_id: 3,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 8 * 1000000,
      gasPrice: '50000000000' // 50 gwei
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/9f34d0bf5e1b4b36914fd5bc66c50b05'),
      network_id: 4,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 8 * 1000000,
      gasPrice: '1000000000' // 1 gwei
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, 'https://kovan.infura.io/v3/9f34d0bf5e1b4b36914fd5bc66c50b05'),
      network_id: 42,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 8 * 1000000,
      gasPrice: '50000000000' // 50 gwei
    },
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, 'https://goerli.infura.io/v3/9f34d0bf5e1b4b36914fd5bc66c50b05'),
      network_id: 5,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 8 * 1000000,
      gasPrice: '2000000000' // 2 gwei
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rpc-mumbai.matic.today'),
      network_id: 80001,
      confirmations: 0,
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

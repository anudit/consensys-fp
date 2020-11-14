let Web3 = require('web3');
const fs = require('fs');
const { exit } = require('process');
;
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = fs.readFileSync(".secret").toString().trim();

let web3;
let networkId;
let gas;
var args = process.argv;
console.log(`Setting up on ${args[2]}.`)

if (args[2] == 'rsktestnet'){
    let rsktestnet_provider = new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co/');
    web3 = new Web3(rsktestnet_provider);
    networkId = 31;
    gas = 6800000
}
else {
    console.log('invalid network');
    exit(0);
}

function getContractInstance(name = '', network = networkId){

    let build = require(`./build/contracts/${name}.json`);
    let address = build.networks[network].address;
    let abi = build.abi;
    return new web3.eth.Contract(abi, address, {gas: gas});
}

let Saarthi = getContractInstance('Saarthi');

(async () => {

    console.log('Creating Fund 1')
    await Saarthi.methods.createFund('WHO', 'COVID-19 Solidarity Response Fund', '0x707aC3937A9B31C225D8C240F5917Be97cab9F20')
    .send({from: '0x707aC3937A9B31C225D8C240F5917Be97cab9F20'})
    .once('confirmation', function(confirmationNumber, receipt){
        console.log(`✅ Fund 1 Created: ${receipt.transactionHash}`)
    })

    console.log('Creating Fund 2')
    await Saarthi.methods.createFund('GlobalGiving', 'Coronavirus Relief Fund', '0x707aC3937A9B31C225D8C240F5917Be97cab9F20')
    .send({from: '0x707aC3937A9B31C225D8C240F5917Be97cab9F20'})
    .once('confirmation', function(confirmationNumber, receipt){
        console.log(`✅ Fund 2 Created: ${receipt.transactionHash}`)
    })

    console.log('Creating Fund 3')
    await Saarthi.methods.createFund('Binance Charity', 'Crypto Against COVID', '0x707aC3937A9B31C225D8C240F5917Be97cab9F20')
    .send({from: '0x707aC3937A9B31C225D8C240F5917Be97cab9F20'})
    .once('confirmation', function(confirmationNumber, receipt){
        console.log(`✅ Fund 3 Created: ${receipt.transactionHash}`)
    })

    await sleep(20000)
    exit(0)
})()


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

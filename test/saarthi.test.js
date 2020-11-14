const Saarthi = artifacts.require("Saarthi");

contract("Saarthi", accounts => {

    const owner = accounts[0];

    beforeEach(async () => {
        instance = await Saarthi.new()
    })

    it("should deploy successfully", async () => {
        const address = await instance.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    });

    it("should register user", async() =>{
        await instance.addUser({from: owner})
    })

    it("should create a Fund1", async() =>{
        await instance.createFund('WHO', 'COVID-19 Solidarity Response Fund', owner,{from: owner})
    })

    it("should create a Fund2", async() =>{
        await instance.createFund('GlobalGiving', 'Coronavirus Relief Fund',  owner,{from: owner})
    })

    it("should create a Fund3", async() =>{
        await instance.createFund('Binance Charity', 'Crypto Against COVID', owner,{from: owner})
    })

    it("should donate to Fund1", async() =>{
        await instance.createFund('WHO', 'COVID-19 Solidarity Response Fund', owner,{from: owner})
        await instance.donateToFund(0,{from: owner, value:web3.utils.toWei('1', 'ether')})
    })

    it("should create a Campaign", async() =>{
        await instance.addUser({from: owner})
        await instance.createCampaign('New campaign', {from: owner})
    })

    it("should donate to a campaign", async() =>{
        await instance.addUser({from: owner})
        await instance.createCampaign('New campaign', {from: owner})
        await instance.donateToUser(owner, {from: owner, value:web3.utils.toWei('1', 'ether')})
    })

    it("should stop campaign", async() =>{
        await instance.addUser({from: owner})
        await instance.createCampaign('New campaign', {from: owner})
        await instance.stopCampaign({from: owner})
    })

    it("should create a report", async() =>{
        await instance.addUser({from: owner})
        await instance.fileReport(
            'Anonymous',
            'Location',
            'Qm2m2',
            'Anonym Report',
        {from: owner})
    })

    it("should store a file", async() =>{
        await instance.addUser({from: owner})
        await instance.addRecord('Qm2m2',{from: owner})
    })

});


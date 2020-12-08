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

    it("should pause contract", async () => {
        await instance.togglePause({from: owner})
        let ps = await instance.paused({from: owner})
        assert.equal(ps, true);
    });

    it("should unpause contract", async () => {
        await instance.togglePause({from: owner})
        await instance.togglePause({from: owner})
        let ps = await instance.paused({from: owner})
        assert.equal(ps, false);
    });

    it("should register user", async() =>{
        await instance.addUser({from: owner})
        let uc = await instance.UserCnt({from: owner})
        assert.equal(uc.toString(), '1')
    })

    it("should create a Fund1", async() =>{
        await instance.createFund('WHO', 'COVID-19 Solidarity Response Fund', owner,{from: owner})
        let uc = await instance.fundCnt({from: owner})
        assert.equal(uc.toString(), '1')
    })

    it("should create a Fund2", async() =>{
        await instance.createFund('GlobalGiving', 'Coronavirus Relief Fund',  owner,{from: owner})
        let uc = await instance.fundCnt({from: owner})
        assert.equal(uc.toString(), '1')
    })

    it("should create a Fund3", async() =>{
        await instance.createFund('Binance Charity', 'Crypto Against COVID', owner,{from: owner})
        let uc = await instance.fundCnt({from: owner})
        assert.equal(uc.toString(), '1')
    })

    it("should donate to Fund1", async() =>{
        await instance.createFund('WHO', 'COVID-19 Solidarity Response Fund', owner,{from: owner})
        await instance.donateToFund(0,{from: owner, value:web3.utils.toWei('1', 'ether')})
        let fd = await instance.Funds('0', {from: owner})
        assert.equal(fd.donationCnt.toString(), '1');
    })

    it("should create a Campaign", async() =>{
        await instance.addUser({from: owner})
        await instance.createCampaign('New campaign', {from: owner})
        let ud = await instance.Users(owner, {from: owner})
        assert.equal(ud.hasCampaign, true)
    })

    it("should donate to a campaign", async() =>{
        await instance.addUser({from: owner})
        await instance.createCampaign('New campaign', {from: owner})
        await instance.donateToUser(owner, {from: owner, value:web3.utils.toWei('1', 'ether')})
        let ud = await instance.Users(owner, {from: owner})
        assert.equal(ud.donationCnt.toString(), '1')
    })

    it("should stop campaign", async() =>{
        await instance.addUser({from: owner})
        await instance.createCampaign('New campaign', {from: owner})
        await instance.stopCampaign({from: owner})
        let ud = await instance.Users(owner, {from: owner})
        assert.equal(ud.hasCampaign, false)
    })

    it("should create a report", async() =>{
        await instance.addUser({from: owner})
        await instance.fileReport(
            'Anonymous',
            'Location',
            'Qm2m2',
            'Anonym Report',
        {from: owner})
        let rc = await instance.reportCnt({from: owner})
        assert.equal(rc.toString(), '1')
    })

    it("should store a file", async() =>{
        await instance.addUser({from: owner})
        await instance.addRecord('Qm2m2',{from: owner})
        let ud = await instance.Users(owner, {from: owner})
        assert.equal(ud.recordHistoryCnt.toString(), '1')
    })

});


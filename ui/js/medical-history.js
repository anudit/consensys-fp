async function init(accounts) {

    document.getElementById("userAddress").innerText = trimAdd(accounts[0]);

    web3.eth.getBalance(accounts[0], function(error, result) {
        document.getElementById("userBalance").innerText = parseFloat(web3.utils.fromWei(result, "ether")).toFixed(2)+" RBTC";
    });
    refreshUI();
}

async function refreshUI(){
    showQR();

    let {billAmount, hasCampaign} = await getUserData();
    document.getElementById("medicalDues").innerText = billAmount;
    let donationAmt = await getDonationAmount();
    document.getElementById("donationsReceived").innerText = donationAmt;
    if (hasCampaign == true){
        document.getElementById("campaignStatus").innerHTML = "Enabled"
        document.getElementById("campDetails").remove()
        document.getElementById("campStart").remove()
    }
    else{
        document.getElementById("campaignStatus").innerHTML = "Disabled"
        document.getElementById("campStop").remove()
    }

};


async function getUserData(_userAddress = getAddress()) {

    let promise = new Promise((res, rej) => {

        Saarthi.methods.Users(_userAddress).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    let dict = {
        'userAddress':result[0],
        'recordHistoryCnt':parseInt(result[1]),
        'billAmount':parseFloat(web3.utils.fromWei(result[2])).toFixed(2),
        'donationCnt':parseInt(result[3]),
        'hasCampaign':result[4],
        'campaignData':result[5],
        'hasAllowedResearch':result[6],
    }
    // console.log(dict);
    return dict;
}

async function getDonationAmount(_userAddress = getAddress()) {

    let promise = new Promise((res, rej) => {

        Saarthi.methods.getDonationAmounts(_userAddress).call(function(error, result) {
            if (!error)
                res(result);
            else{
                res(['0']);
            }
        });

    });
    let results = await promise;
    let sum = 0;
    results.forEach((amount) =>{
        sum+= parseFloat(web3.utils.fromWei(amount))
    });
    return parseFloat(sum).toFixed(2);
}

async function getStoredFile(_index = 0, _userAddress = getAddress()) {

    let promise = new Promise((res, rej) => {

        Saarthi.methods.getRecord(_userAddress, _index).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return result;
}

async function showQR(){
    var qrcode = new QRCode("qrcode", {
        text: ethereum.selectedAddress,
        width: 256,
        height: 256,
        colorDark : "#63f363",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}


async function startCampaign() {

    let promise = new Promise((res, rej) => {
        let data = document.getElementById('campDetails').value;
        Saarthi.methods.createCampaign(data).send({from:getAddress()},function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}


async function stopCampaign() {

    let promise = new Promise((res, rej) => {

        Saarthi.methods.stopCampaign().send({from:getAddress()},function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

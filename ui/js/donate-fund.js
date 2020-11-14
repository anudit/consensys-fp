async function init(accounts) {

    document.getElementById("userAddress").innerText = trimAdd(accounts[0]);

    web3.eth.getBalance(accounts[0], function(error, result) {
        document.getElementById("userBalance").innerText = parseFloat(web3.utils.fromWei(result, "ether")).toFixed(2)+" RBTC";
    });
    refreshUI();
}

async function refreshUI(){
    getFundDetails();
};

async function getFundCnt() {

    let promise = new Promise((res, rej) => {

        Saarthi.methods.fundCnt().call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return parseInt(result);
}


async function getFundDetails() {

    let promise = new Promise(async (res, rej) => {

        const fundCnt = await getFundCnt();
        for (var i=0;i<fundCnt;i++){
            Saarthi.methods.Funds(i.toString()).call((error, result)=>{
                console.log(error, result);
                if (!error){

                    let fund = {
                        'orgID':parseInt(result[0]),
                        'orgName':result[1],
                        'fundName':result[2],
                        'fundAddress':result[3],
                        'donationAmount':web3.utils.fromWei(parseFloat(result[4]).toString()),
                        'donationCnt':parseInt(result[5]),
                    };

                    if(fund.fundName.length <= 23)
                        fund.fundName+="<br/><br/>"

                    document.getElementById('fundList').innerHTML += `<div class="col-md-4 mt-4"> \
                        <div class="card"> \
                            <div class="card-preview"> \
                                <img class="card-pic" src="/img/funds/${fund.orgName}.jpg" alt="" style=" max-height: 100px; "> \
                            </div> \
                            <div class="title title-2">${fund.donationAmount} <span class="text-sm" style="margin-top:0;margin-bottom:0;"> RBTC</span></div> \
                            <div class="title title-4"><a target='_blank' href="https://explorer.testnet.rsk.co/address/${fund.fundAddress}">${fund.orgName}<a></div> \
                            <div class="card-text">${fund.fundName}</div> \
                            <div class="row form-group center" style="margin: 0 0 10px;"> \
                                <input class="form-control" type="number" placeholder="Donation Amount 💰" required="" id="donationAmount${fund.orgID}"> \
                            </div> \
                            <button class="btn btn-primary" onclick="donate(${fund.orgID})" style="width:100%;">Donate ❤️</button> \
                        </div> \
                    </div>`;

                }
                else{
                    rej(false);
                }
            });
        }
        res(true);

    });

    let result = await promise;
    return result;

}

async function donate(_orgID) {

    let promise = new Promise((res, rej) => {

        let donationValue = parseFloat(document.getElementById(`donationAmount${_orgID}`).value);
        Saarthi.methods.donateToFund(parseInt(_orgID)).send({from:getAddress(),value: web3.utils.toWei(donationValue, 'ether')},function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return parseInt(result);
}

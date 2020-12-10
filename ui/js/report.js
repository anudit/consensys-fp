let fileHash = '';
let storage;

async function init(accounts) {

    document.getElementById("userAddress").innerText = trimAdd(accounts[0]);

    web3.eth.getBalance(accounts[0], function(error, result) {
        document.getElementById("userBalance").innerText = parseFloat(web3.utils.fromWei(result, "ether")).toFixed(2)+" ETH";
    });

    refreshUI();
}

async function refreshUI(){

    showReports()

    storage = new RsksmartRifStorage.Manager();
    storage.addProvider(RsksmartRifStorage.Provider.IPFS, { host: 'ipfs.infura.io', port: '5001', protocol: 'https' })


    $("#ipfsFile").on("change", function() {
        var reader = new FileReader();
        reader.onload = async function (e) {
            console.log("Uploading")
            const magic_array_buffer_converted_to_buffer = buffer.Buffer(reader.result);

            let promise = new Promise((res, rej) => {

                storage.put(magic_array_buffer_converted_to_buffer, (err, result) => {
                    if (!err){
                        res(result)
                    }
                    else{
                        rej(err)
                    }
                })

            });
            let result = await promise;
            console.log('https://ipfs.infura.io/ipfs/' + result);
            fileHash = result[0]['hash'];
            sendIPFSPinningRequests(fileHash);
        }
        reader.readAsArrayBuffer(this.files[0]);
    })

}

async function getLocation(){

    let promise = new Promise((res, rej) => {
        if (!navigator.geolocation){
            alert("No location Support");
            rej({
                latitude  : 0,
                longitude : 0
            })
        }
        else{

            navigator.geolocation.getCurrentPosition((position, error)=>{
                if (!error){
                    console.log(position);
                    res ({
                        latitude  : position.coords.latitude,
                        longitude : position.coords.longitude
                    })
                }
                else {
                    console.log(position);
                    rej ({
                        latitude  : 0,
                        longitude : 0
                    })
                }
            });
        }
    });
    let result = await promise;
    return result;

}

async function pickupCurrent(){

    const { latitude, longitude } = await getLocation();
    document.getElementById('location').value = `${latitude}, ${longitude}`;
}

async function submitReport() {

    let promise = new Promise((res, rej) => {

        let from = document.getElementById('from').value;
        if (from.trim() === ''){
            from = 'Anonymous';
        }
        let location = document.getElementById('location').value;
        let details = document.getElementById('details').value;
        Saarthi.methods.fileReport(from, location,fileHash , details).send({from:getAddress()},function(error, result) {
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

async function getReportCnt() {

    let promise = new Promise((res, rej) => {

        Saarthi.methods.reportCnt().call(function(error, result) {
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

async function getReport(_index = 0) {

    let promise = new Promise((res, rej) => {

        Saarthi.methods.Reports(_index).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    let dict = {
        userAddress:result[0],
        userName:result[1],
        location:result[2],
        file:result[3],
        details:result[4],
    }
    return dict;
}

async function getReports() {

    let promise = new Promise(async (res, rej) => {

        let reportCnt = parseInt(await getReportCnt());
        let reports = [];
        var i=0
        for(i=0;i<reportCnt;i++){
            let r= await getReport(i);
            reports.push(r);
        }
        res(reports);

    });
    let result = await promise;
    return result;
}

async function showReports(){

    let reports = await getReports();
    console.log(reports);
    let reportEle = document.getElementById('reportList');
    reports.forEach(report => {
        let html = `
        <div class='card' style='margin: 30px;padding: 20px 20px'>
            <div class="row" style="justify-content:space-around;padding-bottom :10px;">
                <a target='_blank' href='https://explorer.testnet.rsk.co/address/${report.userAddress}'>
                    ${report.userName}
                </a>
                <a target='_blank' href='https://ipfs.infura.io/ipfs/${report.file}'>
                    View Report 🕵️‍♀️
                </a>
            </div>
            <div style="width: 100%">
            <iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=18.5213,%2073.8523+(Incident%20Report)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            </div>
            <p>
                ${report.details}
                <br>
            </p>
        </div>
        `;

        reportEle.innerHTML += html;
    });

}

function showMap(location = ''){
    window.open(`https://www.google.com/maps/search/${location}`)
}

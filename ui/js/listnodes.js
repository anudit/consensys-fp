
async function init(accounts) {

    document.getElementById("userAddress").innerText = trimAdd(accounts[0]);

    web3.eth.getBalance(accounts[0], function(error, result) {
        document.getElementById("userBalance").innerText = parseFloat(web3.utils.fromWei(result, "ether")).toFixed(2)+" RBTC";
    });

    refreshUI();
    document.getElementById("refresh").addEventListener("click", reload);
}


async function refreshUI(){
    let nodeListElement = document.getElementById('nodeList');
    fetch(`${COORDINATOR_NODE}nodes`)
    .then((response) => {
        return response.json();
    })
    .then((nodelist) => {
        console.log(nodelist);
        for (const [key, value] of Object.entries(nodelist)) {
            nodeListElement.innerHTML += `<a class='vacancy-item'> \
                <div class='vacancy-title'>${key}</div> \
                <div class='vacancy-text'>${trimhash(value)}</div> \
                <div class='vacancy-arrow'> \
                <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'> \
                    <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon> \
                </svg> \
                </div> \
            </a>`;
        }
    }).catch(function() {
        Swal.fire({
            icon: 'warning',
            title: 'Check back again shortly',
            html: `Coordinator Node Seems Offine`
        });
    });
};

function reload(){
    location.reload();
}
function checkNodeHandler(){}

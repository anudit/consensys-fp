function nativeTreeWalker() {
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    var node;
    var textNodes = [];

    while(node = walker.nextNode()) {
        textNodes.push(node);
    }
    return textNodes;
}

async function translate(data="hello",to = "hi"){
    const supported_codes=["ar","bn","gu","hi","kn","ml","pa","mr","ta","te","ur"];
    if ( (supported_codes.includes(to.toLowerCase())) == false)
        return data;
    if ( data.toLowerCase().includes('aapka') || data.toLowerCase().includes('saarthi') )
        return data;
    // https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=hello
    // let url = `https://an-translate.azurewebsites.net/api/translate?to=${to}&data=${data}`;
    // let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl="+to+"&dt=t&q="+data;

    let url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${to}`;

    let respData = fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key':'917ed434ae7641b6b81931e85c2dae71' },
        body: JSON.stringify([{"Text":data}])
    })
    .then(async (response) => {
        let responseJson = await response.json();
        // console.log(responseJson);
        if (responseJson[0].translations.length >= 1)
            return responseJson[0].translations[0]['text'];
        else
            return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return data;
    });

    return respData;
}

async function translatePage(_to = "hi"){
    let data = nativeTreeWalker();
    let tcnt = 0;
    data.forEach(async (node)=>{
        if (node.textContent.trim() !== '' && node.parentNode.classList.contains('skip-translate') === false){
            translate(node.textContent.trim(), _to).then((translatedText)=>{
                node.textContent = translatedText;
            });
        }
    })
    console.log(`Translated ${tcnt} Elements`)
}

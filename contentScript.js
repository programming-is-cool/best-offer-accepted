function getUrl(listingElement) {
    let anchorElement = listingElement.getElementsByClassName('s-item__link');
    if(anchorElement.length == 1){
        return anchorElement[0].getAttribute('href');
    }
    return null;
}

function listingRequest(url) {
    var soldUrl = url + "&orig_cvip=true"
    fetch(soldUrl)
    .then((resp) => {
        return resp.text();
    })
    .then((html) => {
        console.log(html);
    })
    .catch((error) => {
        console.log(error)
    });
}

const saleInfo = document.getElementsByClassName('s-item__purchase-options-with-icon');
let urlList = []

for(i=0; i < saleInfo.length; i++) {
    if(saleInfo[i].innerHTML ==  'Best offer accepted') {
        let parentElement = saleInfo[i].closest('.s-item__info');
        let returnedUrl = getUrl(parentElement);
        if (returnedUrl == null) {
            console.log("The following element returned a null URL value:")
            console.log(parentElement.innerHTML)
            continue;
        }
        urlList.push(returnedUrl);
    }
}

console.log(urlList);

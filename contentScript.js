function getUrl(listingElement) {
    let anchorElement = listingElement.getElementsByClassName('s-item__link');
    if(anchorElement.length == 1){
        return anchorElement[0].getAttribute('href');
    }
    return null;
}


function getFinalPriceElement(price) {
    return `<div class="s-item__detail s-item__detail--primary"><span class="s-item__price"><span class="POSITIVE">$${price}</span></span></div>`
}

async function listingRequest(url) {
    var soldUrl = url + "&orig_cvip=true"
    let response = await fetch(soldUrl);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return response.text();
    }
}

const saleInfo = document.getElementsByClassName('s-item__purchase-options-with-icon');

for(i=0; i < saleInfo.length; i++) {
    if(saleInfo[i].innerHTML ==  'Best offer accepted') {
        let parentEle = saleInfo[i].closest('.s-item__info');
        let returnedUrl = getUrl(parentEle);
        if (returnedUrl == null) {
            console.log("The following element returned a null URL value:")
            console.log(parentEle.innerHTML)
            continue;
        }
        listingRequest(returnedUrl)
        .then((source) => {
            let startIndex = source.indexOf('taxExclusivePrice":', 100000);
            let endIndex = source.indexOf(',"', startIndex);
            let finalPrice = source.slice(startIndex + 20, endIndex -1);
            if(finalPrice != 'ul') {
                let finalPriceElement = getFinalPriceElement(finalPrice);
                let itemPriceElement = parentEle.getElementsByClassName('s-item__price')
                let priceElement = itemPriceElement[0].parentElement;
                priceElement.insertAdjacentHTML('afterend', finalPriceElement);
                console.log(priceElement);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}


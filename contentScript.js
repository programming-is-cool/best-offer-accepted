const saleInfo = document.getElementsByClassName('s-item__purchase-options-with-icon');

let listingInfoArray = [];

for(i=0; i < saleInfo.length; i++) {
    if(saleInfo[i].innerHTML ==  'Best offer accepted') {
        let parentElement = saleInfo[i].closest('.s-item__info');
        listingInfoArray.push(parentElement);
    }
}

console.log(listingInfoArray);

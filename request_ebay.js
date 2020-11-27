const url = "https://www.google.com/"

fetch(url)
.then((response) => {
    return response.text();
})
.then((html) => {
    console.log(html)
})
.catch((error) => {
    console.log(error);
})
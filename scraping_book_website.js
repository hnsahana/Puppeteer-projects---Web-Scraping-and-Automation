const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://books.toscrape.com/");

    const fetchDetails = await page.evaluate(() => {
        const allDetails = document.querySelectorAll('.product_pod');
        
        let detailsArray = [];
        allDetails.forEach(eachItem => {
            const itemTitle = eachItem.querySelector('h3').innerText;
            const itemPrice = eachItem.querySelector('.price_color').innerText;
            const imgUrl = eachItem.querySelector('img').src;

            detailsArray.push({
                title : itemTitle,
                price : itemPrice,
                imageURL : imgUrl
            });
        });
        return detailsArray;        
    })

    //call fetchDetails here which returns an array of objects
    console.log(fetchDetails);

    await browser.close();
})();
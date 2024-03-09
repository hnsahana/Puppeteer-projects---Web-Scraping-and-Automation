const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://www.scrapethissite.com/pages/simple/");

    await page.waitForSelector(".col-md-4.country");
    const allCountryDetails = await page.evaluate( () => {
        const allCountries = document.querySelectorAll(".col-md-4.country");
        let arrayOfArrays = [];
        allCountries.forEach(country => {
            const cName = country.querySelector('h3').innerText;
            const capital = country.querySelector('.country-capital').innerText;
            const population = country.querySelector('.country-population').innerText;
            const area = country.querySelector('.country-area').innerText;
            let array = [cName, capital, population, area];
            arrayOfArrays.push(array);
        })
        
        return arrayOfArrays;
    })
    const aoa = allCountryDetails;
    const workbook = xlsx.utils.book_new();
    const worsksheet = xlsx.utils.aoa_to_sheet(aoa);
    xlsx.utils.book_append_sheet(workbook, worsksheet);
    xlsx.writeFile(workbook, "Countries_details.xlsx");
    
})();
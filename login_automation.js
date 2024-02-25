// importing puppeteer
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    //automating login
    await page.type('#username', "student", {delay: 100});
    await page.type('#password', "Password123", {delay: 100});
    await page.click('#submit');

    // comment this to leave the browser open
    await browser.close();
})();
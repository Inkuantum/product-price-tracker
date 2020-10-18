//Web Scraper
const puppeteer = require('puppeteer');
//File System Manager
const fs = require('fs');
//Dotenv
const dotenv =require("dotenv");
dotenv.config();
//Email Sender
const nodemailer = require('nodemailer');
//Email sender data
const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASS
    }
});

//Writing Email
let mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: "[PPT] Product Price Tracker Alert!",
}
//Read json file data
let rawdata = fs.readFileSync('./data/input.json')
//Get all websites that need scraping
let websites = JSON.parse(rawdata);

//For each website
websites.map((website) => {
    //Scrape a product
    scrapeProduct(website);
})

//Constantly needs awaiting
async function scrapeProduct(website) {
    //Start browser
    const browser = await puppeteer.launch();
    //Open new browser page
    const page = await browser.newPage();
    //Go to the website
    await page.goto(website.url);
    //Find the price element (text-property)
    const [el] = await page.$x(website.pathX);
    const txt = await el.getProperty('textContent');
    //Get the price tag (ex. 550 £)
    const priceTag = await txt.jsonValue();
    //Get only the price number
    const price = parseFloat(priceTag);
    //Check if the price already exists and / or is different
    if(website.price === undefined) {
        website.price = price
        let data = JSON.stringify(websites);
        fs.writeFileSync('./data/input.json', data);
    }else if (website.price != price) {
        mailOptions.text = 'The Product "' + website.product + '" you are tracking in PPT (Price Product Tracker) on "' + website.website + '" (' + website.url + ") has changed its price from " + website.price.toFixed(2) + website.currency + " to " + price.toFixed(2) + website.currency + ". [PPT] Price Product Tracker was created by Kirill Inoz (www.inkuantum.com).";
        website.price = price
        let data = JSON.stringify(websites);
        fs.writeFileSync('./data/input.json', data);
        transporter.sendMail(mailOptions, function(error, info){
            if(error) {
                console.log(error);
            }else {
                console.log('Email sent: ' + info.response);
            }
        })
    }

    //Close the browser
    browser.close()
}
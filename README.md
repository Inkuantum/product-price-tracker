# Product Price Tracker
## About
A program to track product prices on internet (Amazon, Wish etc.). After downloading the reposotory, setting up the json file and a server to call the script, current price of selected products will be constantly (server fire rate) compared to previous price. If current price varies from the previous price, the user will be infromed with an email notification.
## Installation
* Download the folder
* Run `npm install`
* Create .env file in the folder `/`
* Fill out `data/input.json` file
* Upload the folder to the server
* Run `/index.js` script every X minutes/hours/days *(you can use .bat file included in the folder)*
## .env file
`SENDER_EMAIL=xxxxxxxxxx@xxxx.xxx` - email which should send the notification

`SENDER_EMAIL_PASS=xxxxxxx` - :point_up: password

`RECEIVER_EMAIL=xxxxxxxxxx@xxxx.xxx` - email which should receive the notification
## .json file
The json file already contains a few examples of data it needs to run the check.
The json file must always contain an array with one or multiple objects structered in the following way:

`{"website":"XXX",` - name of the website *(will be mentioned in the notification email)*

`"product":"XXX",` - name of the product *(will be mentioned in the notification email)*

`"url":"XXX"` - link to the website page which contains the product and most important the price *(used for the check)*

`"pathX":"XXX"` - unique path to the HTML element which contains the price *(used for the check)*

`"currency":"XXX"}` - currency of the price *(will be mentioned in the notification email)*

---
`"price":"XXX"` - last price the product had after the script was run *(will be added automaticly after running the script for the first time)*
## Additional information
The program was built using JavaScript, Node.js and [puppeteer](https://github.com/puppeteer/puppeteer).

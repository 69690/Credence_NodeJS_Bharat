//author Bharat Ahuja

//Dependencies
const axios = require('axios');
const fs = require('fs');
const axiosSaveFile = require('axios-savefile');
const express = require('express');
const exphbs = require('express-handlebars');

//Axios get request from the server
axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22').then((response) => {
    //console.log(response.data.weather);
});

//Saving the json file read from the server 
async function save() {
    await axiosSaveFile('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22','data/data.json');
    readFunction();
}

save();

//Reading from the saved file and saving our data in variables
function readFunction() {
    fs.readFile('data/data.json', function (err, data) {
        if (err)
            throw err;
        // console.log(JSON.parse(data));
        readdata = JSON.parse(data);
        xcity = readdata.name;
        xcurrtemp = readdata.main.temp;
        xweather = readdata.weather[0].main;
        xdesc = readdata.weather[0].description;
        xmaxtemp = readdata.main.temp_max;
        xmintemp = readdata.main.temp_min;
        xpressure = readdata.main.pressure;
        xhumidity = readdata.main.humidity;
        xvisibility = readdata.visibility;
        // console.log(xcity);
        // console.log(xcurrtemp);
        // console.log(xweather);
    });
}

var xcity;
var xweather;
var xdesc;
var xcurrtemp;
var xmaxtemp;
var xmintemp;
var xpressure;
var xhumidity;
var xvisibility;

// readFunction();
// data = readFunction();
// console.log(data);

//starting our app
const app = express();

//setting the apps engine to handlebars
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

//setting the request handler
app.get('/', (req, res) => {
    // console.log("HI________");
    //readFunction();
    res.render('template', {
        h1: xcity,
        current_temperature: xcurrtemp,
        sky_info: xdesc,
        city: xcity,
        weather: xweather,
        description: xdesc,
        curr_temp: xcurrtemp,
        max_temp: xmaxtemp,
        min_temp: xmintemp,
        pressure: xpressure,
        humidity: xhumidity,
        visibility: xvisibility
    });
});

//Starting a port to listen for requests
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});

//********************** STEPS: ********************** 
//Run app.js using VSCode
//Go to localhost:3000 to view the output



//sudo npm install -g --force nodemon
//Run using nodemon 
//Run the following command in terminal to launch app.js after installing nodemon
//nodemon app.js
//The website will be running on port 3000
//localhost:3000    
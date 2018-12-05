var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("website"));

app.listen(3000, listening);
function listening(){
   console.log("listening . . .");
}

app.use( ( req, res, next ) => {
    setTimeout(next, 400 );
 });

////////////
//MINA VARIABLER
var rRequest = require("request");
const fetch = require("node-fetch");
let parsedData = "";
let temp = "";
let city = "";
let svar = "";
var list = {};
// const url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7e3528d98d4f8d06d7ac8d1ea40592bd";


//Skriver ut formuläret från post_form_weather.pug  OK!
app.get('/weather', function(request, response){
    response.render('post_form_weather', list);
});


//Click på submit OK!
app.post('/clothes', function(request, response){

    city = request.body.city
    
    getData(city);
    
    return response.redirect('back');
    
});



// Hämtar API:n med FETCH
const getData = async function (city) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=7e3528d98d4f8d06d7ac8d1ea40592bd";

    try {
        const response = await fetch(url);
        const json = await response.json();
        list["name"] = json.name;
        list["temp"] = json.main.temp - 273;
        list["hum"] = json.main.humidity;
        list["lat"] = json.coord.lat;

    } catch (error) {
        console.log(error);
    }
};













    // //Hämtar API:n med REQUEST  OK!
    // rRequest("https://api.openweathermap.org/data/2.5/weather?q=London&APPID=7e3528d98d4f8d06d7ac8d1ea40592bd", function(error, response, body) {
    //     parsedData = JSON.parse(body);
    //     temp = parsedData.main.temp;
    //     svar = "Vädret i " + city + " är " + temp + " grader";
    //     console.log(svar);
    // });


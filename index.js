import fetch from 'node-fetch';
import express from 'express';

var app = express();
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    //Fetch variables
    let apiData = {};
    let url = "https://admin.kincaidit.com/api/";
    let settings = {
        method: "Get"
    };

    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            //Once data is received, render page.
            apiData = json;
            res.render('pages/index', {
                version: apiData.version,
                updateDate: formatDate(new Date(apiData.updateDate)),//Human readable date
                updateDateAlt: apiData.updateDate, //Actual date string
                environment: apiData.environment
            });
        });
});

function formatDate(dateToFormat){
    var formattedDate = "";
    var months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

    var month = months[dateToFormat.getUTCMonth()]; //Select month from array
    var day = dateToFormat.getUTCDate();
    var year = dateToFormat.getUTCFullYear();
    formattedDate = month + " " + day + ", " + year; //Asssemble the date
    return formattedDate;
}

app.listen(8080);
console.log('Server is listening on port 8080');
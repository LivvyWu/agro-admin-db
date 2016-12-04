var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var observationsUrl = "http://opendata.cwb.gov.tw/opendataapi?dataid=O-A0001-001&authorizationkey=CWB-3BCD868D-9D58-4DCC-A21A-B3BD69E5B6A5";
var cron = require('node-schedule');
var rule = new cron.RecurrenceRule();
rule.hour = 1;

var cwb = require('../models/cwb');

cron.scheduleJob('0 10 * * * *', function(){
    cwb.xmlToJson(observationsUrl, function(err, data){
        if (err) {
            return console.err(err);
        } else {
            cwb.empty();

            var locations = data.cwbopendata.location;

            locations.forEach(function(location){
                var params = location.parameter;
                var weatherElements = location.weatherElement;
                var lat = location.lat;
                var lon = location.lon;
                var city, city_sn, town, town_sn, elev, wdir, wdsd, temp, humd, pres, sun, h_24r, ws15m, wd15m, ws15t = '';
                var obsTime = new Date(location.time[0].obsTime);
                //console.log(obsTime);

                params.forEach(function(param){
                    if (param.parameterName == 'CITY') {
                        city = param.parameterValue;
                    } else if (param.parameterName == 'CITY_SN') {
                        city_sn = param.parameterValue;
                    } else if (param.parameterName == 'TOWN') {
                        town = param.parameterValue;
                    } else if (param.parameterName == 'TOWN_SN') {
                        town_sn = param.parameterValue;
                    }
                });

                weatherElements.forEach(function(elm){
                    if (elm.elementName == 'ELEV') {
                        elev = elm.elementValue[0].value;
                    } else if (elm.elementName == 'WDIR') {
                        wdir = elm.elementValue[0].value;
                    } else if (elm.elementName == 'WDSD') {
                        wdsd = elm.elementValue[0].value;
                    } else if (elm.elementName == 'TEMP') {
                        temp = elm.elementValue[0].value;
                    } else if (elm.elementName == 'HUMD') {
                        humd = elm.elementValue[0].value;
                    } else if (elm.elementName == 'PRES') {
                        pres = elm.elementValue[0].value;
                    } else if (elm.elementName == 'SUN') {
                        sun = elm.elementValue[0].value;
                    } else if (elm.elementName == 'H_24R') {
                        h_24r = elm.elementValue[0].value;
                    } else if (elm.elementName == 'WS15M') {
                        ws15m = elm.elementValue[0].value;
                    } else if (elm.elementName == 'WD15M') {
                        wd15m = elm.elementValue[0].value;
                    } else if (elm.elementName == 'WS15T') {
                        ws15t = elm.elementValue[0].value;
                    }
                });
                console.log([uuid.v4(), city, city_sn, town, town_sn, lat, lon, elev, wdir, wdsd, temp, humd, pres, sun, h_24r, ws15m, wd15m, ws15t, obsTime, new Date()]);
                cwb.create([uuid.v4(), city, city_sn, town, town_sn, lat, lon, elev, wdir, wdsd, temp, humd, pres, sun, h_24r, ws15m, wd15m, ws15t, obsTime, new Date()]);

                //console.log(city+","+city_sn+","+town+","+town_sn+","+lat+","+ lon);
            });
        }

    });
});

console.log('The cwb observation schdule has been initialzed');

module.exports = router;
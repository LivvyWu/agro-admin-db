var http = require('http');
var parseString = require('xml2js').parseString;
var connection = require('../connection');
const request = require('request');


function CWB() {

    this.getOneWeekFromApi = function(dataid, town) {

        console.log(dataid + "; " + town);

        const options = {
            uri: 'http://opendata.cwb.gov.tw/api/v1/rest/datastore/'+dataid+'?locationName='+town+'&elementName=MinT,MaxT,RH,Wx,WeatherDescription&sort=time',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'Authorization': 'CWB-3BCD868D-9D58-4DCC-A21A-B3BD69E5B6A5'
            }
        }

        request(options, function(err, res, body) {
            if (err) {
                console.log(err);
            } else {
                //let json = JSON.parse(body);
                console.log(body);
            }

        });

    }

    this.create = function (criteria) {
        connection.acquire(function (err, con) {

            con.query("insert into weather(id, city, city_sn, town, town_sn, lat, lon, elev, wdir, wdsd, temp, humd, pres, sun, h_24r, ws15m, wd15m, ws15t, obsTime, updated_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", criteria,
                function (err, result) {
                    con.release();
                    if (err) {
                        console.log("err");
                        console.log(err);
                        // res.send({status: 1, message: 'User creation failed'});
                        return false;
                    } else {
                        return true;
                    }
                });
        });
    };

    this.empty = function () {
        connection.acquire(function (err, con) {
            con.query("delete from weather where 1=1");
        });
    };

    this.findByTown = function(criteria, callback) {
        connection.acquire(function (err, con) {
            con.query("select * from weather where town = ?", criteria, function(err, rows){
                con.release();
                if (err) {
                    callback(err,null);
                } else {
                    callback(null, rows);
                }
            });
        });
    };


    this.xmlToJson = function(url, callback) {
        http.get(url, function(res) {
            var xml = '';

            res.on('data', function(chunk) {
                xml += chunk;
            });

            res.on('error', function(e) {
                callback(e, null);
            });

            res.on('timeout', function(e) {
                callback(e, null);
            });

            res.on('end', function() {
                parseString(xml, function(err, result) {
                    callback(null, result);
                });
            });
        });
    };

}

module.exports = new CWB();


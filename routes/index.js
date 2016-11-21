var express = require('express');
var router = express.Router();
var moment = require('moment');
var user = require('../models/user');
var field = require('../models/field');
var field_location = require('../models/field_location');
var sensor = require('../models/sensor');

var metrics = [
  { "itemCd" : "InAirTem", "val" : "25°C", "itemNm" : "空氣溫度" , "icon": "fa fa-thermometer-half", "link" : "datachart/1", "bcolor" : "bg-blue", "bcolor2" : "bg-maroon-active" },
  { "itemCd" : "InAirHumidity", "val" : "75", "itemNm" : "空氣濕度" , "icon": "fa fa-tint", "link" : "datachart/2", "bcolor" : "bg-olive", "bcolor2" : "bg-maroon-active" },
  { "itemCd" : "InAirIllumination", "val" : "40K", "itemNm" : "照度" , "icon": "fa fa-sun-o", "link" : "datachart/1", "bcolor" : "bg-yellow", "bcolor2" : "bg-maroon-active" },
  { "itemCd" : "InAirCO2", "val" : "25", "itemNm" : "空氣二氧化碳" , "icon": "fa fa-cloud", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
  { "itemCd" : "InSoilTemperature", "val" : "20°C", "itemNm" : "土壤溫度" , "icon": "fa fa-thermometer-full", "link" : "datachart/1", "bcolor" : "bg-blue", "bcolor2" : "bg-maroon-active" },
  { "itemCd" : "InSoilHumidity", "val" : "90", "itemNm" : "土壤濕度" , "icon": "fa fa-tint", "link" : "datachart/2", "bcolor" : "bg-olive", "bcolor2" : "bg-maroon-active" },
  { "itemCd" : "InSoilEC", "val" : "25", "itemNm" : "土壤電解質" , "icon": "fa fa-tachometer", "link" : "datachart/1", "bcolor" : "bg-yellow", "bcolor2" : "bg-maroon-active" },
  { "itemCd" : "InSoilPH", "val" : "5", "itemNm" : "土壤酸鹼值" , "icon": "fa fa-flask", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" }
];

router.use(function(req, res, next){
  res.locals.session = req.session;
  res.locals.session.user = req.session.user;
  next();
});

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});



router.post('/login', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }
  user.login([req.body.email, req.body.password], function (err, user) {
    if(err){
      res.render('login', { title: 'Express' });
    } else {

      req.session.user = user;
      req.session.islogin = true;
      res.redirect("/farm");
    }
  });
});

router.get('/logout', function (req, res, next) {
    req.session.islogin =false;
    res.redirect('/');
});

router.get('/farm/list', function(req, res, next) {

  var user = req.session.user;
  field.findAllByUserid([user.user_id], function (err, results) {
    if(err){
      res.render('login', { title: 'Express'});
    } else {
      res.render('farm/list', { title: 'farm' , farms : results});
    }
  })

});

router.get('/farm/info/:field_id', function(req, res, next) {

  field.findById([req.params.field_id], function (err, field) {

    if(err){
      res.redirect('/farm');
    } else {
      field_location.findById([field.fel_id], function (err, field_location) {
        if (err){
          res.redirect('/farm');
        } else {
          sensor.findByFieldId([field.field_id], function (err, sensors) {
            if (err){
              res.redirect('/farm');
            } else {
              res.render('farm/info', { title: 'farm' , metrics: metrics, farmInfo: field, field_location: field_location, sensors: sensors});
            }
          });
        }
      });
    }

  });
});

router.get('/farm/sensorRecord', function(req, res, next) {
  res.render('farm/sensorRecord');
});

router.get('/farm/:field_id/datachart/:type', function(req, res, next) {
  field.findById([req.params.field_id], function (err, field) {
    if(err){
      res.redirect('farm/info/'+ req.params.field_id);
    } else {
      console.log(field);
      res.render('farm/sensorpages/'+ req.params.type, { moment: moment, farmInfo: field });
    }
  })


});


router.post('/register/submit', function(req, res, next) {

  res.redirect("/farm");
});

router.get('/map', function(req, res, next) {
  res.render('map');
});

module.exports = router;

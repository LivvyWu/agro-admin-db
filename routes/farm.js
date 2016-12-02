var express = require('express');
var router = express.Router();
var moment = require('moment');
var farms = [
    { "FIELD_ID" : "0", "FIELD_NAME" : "中和農場 2場", "FIELD_AREA" : "0.21", "CROP_TYPE_VARIETY_ID" : " 全年小黃瓜", "PLAN_AREA_TYPE" : "錏管簡易網室" , "EQUIPMENTS": ["內循環風扇"],
        "metrics": [
            { "itemCd" : "InAirTem", "val" : "25°C", "itemNm" : "空氣溫度" , "icon": "fa fa-thermometer-half", "link" : "datachart/1", "bcolor" : "bg-blue", "bcolor2" : "bg-blue-active" },
            { "itemCd" : "InAirHumidity", "val" : "75%", "itemNm" : "空氣濕度" , "icon": "fa fa-tint", "link" : "datachart/2", "bcolor" : "bg-olive", "bcolor2" : "bg-olive-active" },
            { "itemCd" : "InAirIllumination", "val" : "40K", "itemNm" : "照度" , "icon": "fa fa-sun-o", "link" : "datachart/1", "bcolor" : "bg-yellow", "bcolor2" : "bg-yellow-active" },
            { "itemCd" : "InAirCO2", "val" : "25ppm", "itemNm" : "空氣二氧化碳" , "icon": "fa fa-cloud", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilTemperature", "val" : "20°C", "itemNm" : "土壤溫度" , "icon": "fa fa-thermometer-full", "link" : "datachart/1", "bcolor" : "bg-blue", "bcolor2" : "bg-blue-active" },
            { "itemCd" : "InSoilHumidity", "val" : "90%", "itemNm" : "土壤濕度" , "icon": "fa fa-tint", "link" : "datachart/2", "bcolor" : "bg-olive", "bcolor2" : "bg-olive-active" },
            { "itemCd" : "InSoilEC", "val" : "25μS/cm", "itemNm" : "土壤電解質" , "icon": "fa fa-tachometer", "link" : "datachart/1", "bcolor" : "bg-yellow", "bcolor2" : "bg-yellow-active" },
            { "itemCd" : "InSoilPH", "val" : "pH5", "itemNm" : "土壤酸鹼值" , "icon": "fa fa-flask", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" }
    ]},
    { "FIELD_ID" : "1", "FIELD_NAME" : "中和農場 3場-2", "FIELD_AREA" : "0.16", "CROP_TYPE_VARIETY_ID" : "全年小黃瓜", "PLAN_AREA_TYPE" : "簡固型溫室" , "EQUIPMENTS": ["天窗", "內遮陰網","側捲揚"],
        "metrics": [
            { "itemCd" : "InAirTem", "val" : "25°C", "itemNm" : "空氣溫度" , "icon": "fa fa-thermometer-half", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilHumidity", "val" : "90%", "itemNm" : "土壤濕度" , "icon": "fa fa-tint", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilEC", "val" : "25μS/cm", "itemNm" : "土壤電解質" , "icon": "fa fa-tachometer", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilPH", "val" : "pH5", "itemNm" : "土壤酸鹼值" , "icon": "fa fa-flask", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" }
        ]},
    { "FIELD_ID" : "2", "FIELD_NAME" : "中和農場 3場-3", "FIELD_AREA" : "0.16", "CROP_TYPE_VARIETY_ID" : "全年小黃瓜", "PLAN_AREA_TYPE" : "簡固型溫室" , "EQUIPMENTS": ["天窗", "內遮陰網","側捲揚"],
        "metrics": [
            { "itemCd" : "InAirTem", "val" : "25°C", "itemNm" : "空氣溫度" , "icon": "fa fa-thermometer-half", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InAirHumidity", "val" : "75%", "itemNm" : "空氣濕度" , "icon": "fa fa-tint", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InAirIllumination", "val" : "40K", "itemNm" : "照度" , "icon": "fa fa-sun-o", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InAirCO2", "val" : "25ppm", "itemNm" : "空氣二氧化碳" , "icon": "fa fa-cloud", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" }
        ]},
    { "FIELD_ID" : "3", "FIELD_NAME" : "福興農場 1區", "FIELD_AREA" : "0.15", "CROP_TYPE_VARIETY_ID" : "番茄、小黃瓜輪種", "PLAN_AREA_TYPE" : "簡固型溫室", "EQUIPMENTS": ["天窗", "側捲揚", "內遮光網", "內循環風扇", "噴霧"],
        "metrics": [
            { "itemCd" : "InAirIllumination", "val" : "40K", "itemNm" : "照度" , "icon": "fa fa-sun-o", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilTemperature", "val" : "20°C", "itemNm" : "土壤溫度" , "icon": "fa fa-thermometer-full", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilEC", "val" : "25μS/cm", "itemNm" : "土壤電解質" , "icon": "fa fa-tachometer", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilPH", "val" : "pH5", "itemNm" : "土壤酸鹼值" , "icon": "fa fa-flask", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" }
        ]},
    { "FIELD_ID" : "4", "FIELD_NAME" : "福興農場 5區", "FIELD_AREA" : "0.17", "CROP_TYPE_VARIETY_ID" : "番茄、小黃瓜輪種", "PLAN_AREA_TYPE" : "簡固型溫室", "EQUIPMENTS": ["天窗", "側捲揚", "內遮光網", "內循環風扇", "噴霧"],
        "metrics": [
            { "itemCd" : "InAirTem", "val" : "25°C", "itemNm" : "空氣溫度" , "icon": "fa fa-thermometer-half", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InAirHumidity", "val" : "75%", "itemNm" : "空氣濕度" , "icon": "fa fa-tint", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InAirIllumination", "val" : "40K", "itemNm" : "照度" , "icon": "fa fa-sun-o", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilEC", "val" : "25μS/cm", "itemNm" : "土壤電解質" , "icon": "fa fa-tachometer", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilPH", "val" : "pH5", "itemNm" : "土壤酸鹼值" , "icon": "fa fa-flask", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" }
        ]},
    { "FIELD_ID" : "5", "FIELD_NAME" : "福興農場 6區", "FIELD_AREA" : "0.2", "CROP_TYPE_VARIETY_ID" : "番茄、小黃瓜輪種", "PLAN_AREA_TYPE" : "簡固型溫室", "EQUIPMENTS": ["天窗", "側捲揚", "內遮光網", "內循環風扇", "噴霧"],
        "metrics": [
            { "itemCd" : "InAirTem", "val" : "25°C", "itemNm" : "空氣溫度" , "icon": "fa fa-thermometer-half", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InAirIllumination", "val" : "40K", "itemNm" : "照度" , "icon": "fa fa-sun-o", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InAirCO2", "val" : "25ppm", "itemNm" : "空氣二氧化碳" , "icon": "fa fa-cloud", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilTemperature", "val" : "20°C", "itemNm" : "土壤溫度" , "icon": "fa fa-thermometer-full", "link" : "datachart/1", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" },
            { "itemCd" : "InSoilPH", "val" : "pH5", "itemNm" : "土壤酸鹼值" , "icon": "fa fa-flask", "link" : "datachart/2", "bcolor" : "bg-maroon", "bcolor2" : "bg-maroon-active" }
        ]}
];

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


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('farm/list', { title: '農場列表' , farms : farms});
});

router.get('/info/:field_id', function(req, res, next) {
    res.render('farm/info', { title: 'farm' , metrics: metrics, farmInfo: farms[req.params.field_id]});
});

router.get('/farmDetail', function(req, res, next) {
    res.render('farm/farmDetail');
});


router.get('/sensorRecord', function(req, res, next) {
    res.render('farm/sensorRecord', {farms : farms});
});

router.get('/:field_id/datachart/:type', function(req, res, next) {
    res.render('farm/sensorpages/'+ req.params.type, { moment: moment , farmInfo: farms[req.params.field_id] });
});



module.exports = router;

var express = require('express');
var router = express.Router();


const { getWeather, getToday, getFiveDays } = require('../controller/dailyWeather')

router.route('/').get(getWeather)
router.route('/today').get(getToday)
router.route('/five-days').get(getFiveDays)



//export router to app.js
module.exports = router;




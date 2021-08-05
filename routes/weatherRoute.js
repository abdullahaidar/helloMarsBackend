var express = require('express');
var router = express.Router();


const { getWeather, getToday } = require('../controller/dailyWeather')

router.route('/').get(getWeather)
router.route('/today').get(getToday)

    

//export router to app.js
module.exports = router;




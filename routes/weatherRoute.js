var express = require('express');
var router = express.Router();


const { getWeather } = require('../controller/dailyWeather')
router.route('/').get(getWeather)
    

//export router to app.js
module.exports = router;




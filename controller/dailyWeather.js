const { Low, JSONFile } = require("lowdb");
var { join, dirname } = require("path");
const file = join(__dirname, "../data/db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);
const date = require('date-and-time');




exports.getWeather = async (req, res, next) => {
  try {
    await db.read()
    const { weather } = db.data
    res.status(200).send(weather);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.getToday = async (req, res, next) => {
  try {
    await db.read()
    const { weather } = db.data
    let now = new Date();
    let todayDate = date.format(now, 'YYYY-MM-DD');
    const todayWeather = weather.find(element => element.terrestrial_date == todayDate);
    res.status(200).send({
      date: todayWeather.date,
      sol: todayWeather.sol,
      season: todayWeather.season,
      minTemp: todayWeather.min_temp.toString(),
      maxTemp: todayWeather.max_temp.toString(),
      opacity: todayWeather.atmo_opacity,
      airPressure: todayWeather.pressure,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.getFiveDays = async (req, res, next) => {
  try {
    await db.read()
    const { weather } = db.data

    //  let now = date.format(new Date(), 'YYYY-MM-DD')
    let now = new Date();

    // Make an Array of the Dates
    const fiveDays = []
    const dayOne = date.addDays(now, -1);
    const dayTwo = date.addDays(now, -2);
    const dayThree = date.addDays(now, -3);
    const dayFour = date.addDays(now, -4);
    const dayFive = date.addDays(now, -5);

    // Convert Date format

    fiveDays.push(date.format(dayOne, 'YYYY-MM-DD'), date.format(dayTwo, 'YYYY-MM-DD'),
      date.format(dayThree, 'YYYY-MM-DD'), date.format(dayFour, 'YYYY-MM-DD'), date.format(dayFive, 'YYYY-MM-DD'))

    //initial Array for the Five days weather data
    let weatherForFiveDays = []

    // Search for the Dates in the Data Base
    fiveDays.forEach((element) => {
      let weatherData = weather.find(dateItem => dateItem.terrestrial_date == element)
      // push weather data to an Array
      // console.log(weatherData)

      weatherForFiveDays.push({
        date: weatherData.date,
        sol: weatherData.sol,
        // season: weatherData.season,
        minTemp: weatherData.min_temp.toString(),
        maxTemp: weatherData.max_temp.toString(),
        // opacity: weatherData.atmo_opacity,
        // airPressure: weatherData.pressure,
      })
    })
    res.status(200).send(weatherForFiveDays);
  } catch (error) {
    console.log(error);
    next(error);
  }
}


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
    console.log(now)
    let date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    console.log(date)
    const today = weather.find(element => element.terrestrial_date == date.toString());
    res.status(200).send({

      season: today.season,
      sol: today.sol,
      date: today.terrestrial_date,
      minTemp: today.min_temp.toString(),
      maxTemp: today.max_temp.toString(),
      opacity: today.atmo_opacity,
      airPressure: today.pressure,
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
        season: weatherData.season,
        sol: weatherData.sol,
        date: weatherData.terrestrial_date,
        minTemp: weatherData.min_temp.toString(),
        maxTemp: weatherData.max_temp.toString(),
        opacity: weatherData.atmo_opacity,
        airPressure: weatherData.pressure,
      })
    })
    res.status(200).send(weatherForFiveDays);
  } catch (error) {
    console.log(error);
    next(error);
  }
}


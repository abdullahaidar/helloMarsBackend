const { Low, JSONFile } = require("lowdb");
var { join, dirname } = require("path");
const file = join(__dirname, "../data/db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);



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
    let todaysDate = new Date();
    let date = todaysDate.getFullYear() + '-' + (todaysDate.getMonth() + 1) + '-' + todaysDate.getDate();
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



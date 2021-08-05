const { Low, JSONFile } = require("lowdb");
var { join, dirname } = require("path");
const file = join(__dirname, "../data/db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);



exports.getWeather = async (req, res, next) => {
  try {
    await db.read()
    const { weather } = db.data
    //  console.log(weather)
    console.log('hello mars')
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
    // console.log(db.data)

    // const marsArray = JSON.parse(weather)
    // console.log(marsArray)
    const today = weather.find(element => element.sol === 3233)
    console.log(today)

    // res.status(200).send(today.min_temp.toString(), today.max_temp.toString());

    res.status(200).send({
      minTemp: today.min_temp.toString(),
      maxTemp: today.max_temp.toString()
    });

  } catch (error) {
    console.log(error);
    next(error);
  }

}
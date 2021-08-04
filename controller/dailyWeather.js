const low = require ("lowdb");
const adapter = new JSONFile(file);
const db = new Low(adapter);
var { Low, JSONFile } = require("lowdb");

exports.getWeather = (req, res) => {
  try {
    // get all data
    const weather = db.get('weather').value();
    res.status(200).send(weather);
  } catch (error) {
    console.log(error);
    next(error);
  }
} 


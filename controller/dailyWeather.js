const { Low, JSONFile} = require ("lowdb");
var { join, dirname } = require("path");
const file = join(__dirname, "../data/db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);



exports.getWeather = async (req, res, next) => {
  try {
    // get all data
   await db.read()
console.log(db.data)
    
    const { weather } = db.data
            res.status(200).send(weather);
  } catch (error) {
    console.log(error);
    next(error);
  }
} 


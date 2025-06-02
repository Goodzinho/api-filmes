const sqlite = require("sqlite")
const sqlite3 = require("sqlite3")

async function connectDatabase(){
    var db = await sqlite.open({
        filename:  './database.db',
        driver: sqlite3.Database,
    })
    return db
}

module.exports = connectDatabase

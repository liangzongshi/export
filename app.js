const DB = require('./db')
const db = new DB()
const ObjectsToCsv = require('objects-to-csv')

const writeLog = async () => {
    const orders = (await db.system({}, 'orders'))[0].orders
    const logs = orders.slice(105, 10105)
    console.log(logs.length)
    const csv = new ObjectsToCsv(logs)
    await csv.toDisk(`./finfine.csv`, { bom: true })
    console.log('Write Log HFT')
}

writeLog()
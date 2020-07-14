const DB = require('./db')
const db = new DB()
const ObjectsToCsv = require('objects-to-csv')

const writeLog = async () => {
    const orders = (await db.system({}, 'orders'))[0].orders
    const logs = orders.slice(25105, 30105)
    var re_logs = []
    for ( var i = 0; i < logs.length; i++){
        console.log(i)
        re_logs.push({
            Timestamp: logs[i].timestamp,
            Type: logs[i].type,
            Amount: logs[i].amount,
            'Exchange Buy': logs[i].buy.exchanger,
            'Price Buy': logs[i].buy.price,
            'Exchange Sell': logs[i].sell.exchanger,
            'Price Sell': logs[i].sell.price,
            Profit: logs[i].profit
        })
    }

    const csv = new ObjectsToCsv(re_logs)
    await csv.toDisk(`./finfine5.csv`, { bom: true })
    console.log('Write Log HFT')
}

writeLog()

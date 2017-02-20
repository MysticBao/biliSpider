import sqlite3 from 'sqlite3'
import dbClient from './dbClient.js'

// var db = new sqlite3.Database('./data.db')

// create data db
function createDataDB(){
    db.run('CREATE TABLE IF NOT EXISTS detail('
        +'aid TEXT PRIMARY KEY'
        +', tid INTEGER'
        +', tname TEXT'
        +', title TEXT'
        +', author TEXT'
        +', view INTEGER'
        +', danmku INTEGER'
        +', favorite INTEGER'
        +', coin INTEGER)')
}

// create top10 table
function createTop10DB(){
    db.run('CREATE TABLE IF NOT EXISTS top10('
        +'year INTEGER'
        +', month INTEGER'
        +', aid TEXT'
        +', tid INTEGER'
        +', tname TEXT'
        +', title TEXT'
        +', author TEXT'
        +', view INTEGER'
        +', danmku INTEGER'
        +', favorite INTEGER'
        +', coin INTEGER)')
}

// createDataDB()
// createTop10DB()
// db.close()
// 测试
// function createDB(){
//     db.run("CREATE TABLE IF NOT EXISTS data(name TEXT PRIMARY KEY,remark TEXT)");
// }
// function insertRow(){
//   var sql01 = " INSERT OR REPLACE INTO table01(name,remark) VALUES (COALESCE((SELECT name FROM table01 WHERE name = ?), ?),?)";
//   db.run(sql01,["John","John","aaa"]);
//   db.run(sql01,["May","May","bbb"]);
//   db.run(sql01,["May","SSS",'SSS']);
//   db.run(sql01,["Kevin","Kevin","ddd"]);  
// }
// function query(){
//   var sql03_1 = "SELECT * FROM table01";
//   db.each(sql03_1, function(err, row) {
//   console.log(row.name + ' ' + row.remark);
//   })
// }
// function closeDB(){
//     db.close()
// }
// createDB()
// insertRow()
// query()
// closeDB()



dbClient.init()
dbClient.query('SELECT * FROM table01').then((data) => {
    console.log(data)
})

var datas = [['aaa','aaa','aaa'],['bbb','bbb','bbb']]
dbClient.upsert('INSERT OR REPLACE INTO table01(name,remark) VALUES (COALESCE((SELECT name FROM table01 WHERE name = ?), ?),?)',datas)

dbClient.query('SELECT * FROM table01').then((data) => {
    console.log(data)
})
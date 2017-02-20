import sqlite3 from 'sqlite3'

var db = new sqlite3.Database('./data.db') 

function init() {
    if(db === null) {
        db = new sqlite3.Database('./data.db')
    }
}
function query(sql) {
    return new Promise((resolve,reject) => {
        db.all(sql, (err,res) => {
            if(!err) {
                resolve(res)
            }else{
                reject(err)
            }
        })   
    })   
}
function upsert(sql,datas) {
    return new Promise((resolve,reject) => {
        datas.forEach((data) =>{
            db.run(sql, data, (err) => {
                if(!err) {
                    resolve(true)
                }else{
                    reject(err)
                }
            })
        })
    })
}
function syncData() {

}
function close() {
    db.close()
}

exports.init = init
exports.query = query
exports.upsert = upsert
exports.close = close

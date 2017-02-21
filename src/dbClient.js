import sqlite3 from 'sqlite3'

var db = new sqlite3.Database('./data.db') 

function init() {
    if(db === null)
        db = new sqlite3.Database('./data.db')
}
function query(sql) {
    return new Promise((resolve,reject) => {
        db.run(sql, (err,res) => {
            if(!err) 
                resolve(res)
            else
                reject(err)
        })   
    })   
}
function upsert(datas) {
    let upserts = []
    let sql = ''
    datas.forEach((data) =>{
        let item = []   
        let upsert = new Promise((resolve,reject) => {
            db.run(sql, item, (err)=> {
                if(err)
                    reject(err)
            })
        })
        upserts.push(upsert)
    })
    return Promise.all(upserts)   
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

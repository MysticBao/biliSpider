import sqlite3 from 'sqlite3'

var DBClient = {
    db: null,
    getDB: function() {
        return this.db
    },
    init: function() {
        if(this.db ===null)
            this.db = new sqlite3.Database('./data.db')
    },
    query: function(sql) {
        var result = new Promise((resolve,reject) => {
            db.all(sql, (err,res) => {
                if(!err){
                    resolve(res)
                }else{
                    reject(err)
                }
            })   
        })
        result.then((data) =>{
            this.syncData(data)
        }).catch((err) => {
            console.error(err)
        })     
    },
    upsert: function(sql,data) {
        db.run(sql,data)
    },
    syncData: function() {

    },
    close: function() {
        this.db.close()
    }

}
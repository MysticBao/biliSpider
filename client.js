var request = require('request')
//连载新番
const LZXF_TID = 33
//完结动画
const WZDH_TID = 32

function handleRequest(typeId){
    var requests = []
    // 获取pn的数量
    getPageNumbers(typeId).then((total_pn)=>{
        console.log(total_pn)
        // 申明request
        for(let i=1;i<=total_pn;i++){
            let p = new Promise((reslove,reject)=>{
                request(setParamData(typeId,i),(error,response,body)=>{
                    if(response.statusCode==200){
                        console.log('send: ' + i)
                        reslove(body)
                    }else{
                        reject(response.statusText)
                    }
                })
            })
            // add promise
            console.log('add ' + i)
            requests.push(p)
        }

        // 数据处理
        Promise.all(requests).then((values)=>{
            values.forEach((value)=>{                
                // let resJson = JSON.parse(value)
                // let dataJson = resJson.data
                // let pageObj = dataJson.page
                // console.log(JSON.stringify(pageObj))
            })
        })
    }).catch((error)=>{
        console.log(error)
    })
}

function getPageNumbers(typeId){
    return new Promise((reslove,reject)=>{
          request(setParamData(typeId,1),(error,response,body)=>{
            if(!error && response.statusCode==200){
                let resJson = JSON.parse(body)
                let dataJson = resJson.data
                let pageObj = dataJson.page
                console.log('Total count: ' + pageObj.count)                  
                reslove(Math.ceil(pageObj.count / pageObj.size))
            }else{
                console.log('Failed Execute API...')
                reject(error)
            }
        })
    })
}

function setParamData(tid,pn){
    return `http://api.bilibili.com/archive_rank/getarchiverankbypartion?type=jsonp&tid=${tid}&pn=${pn}`
}

/*
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})
 */

handleRequest(WZDH_TID);
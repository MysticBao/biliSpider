var request = require('request')
//连载新番
const LZXF_TID = 33
//完结动画
const WZDH_TID = 32
const PN_MAX = 999999
var pn = 1
var total_pn = PN_MAX 

 //递归Request方法 pn+1             
function handleRequest(){
    var request_url = setParamData(LZXF_TID,pn)
    // console.log(request_url)
    request(request_url,function(error,response,body){
            if(response.statusCode==200){
                var resJson = JSON.parse(body)
                // console.log(resJson)
                var dataJson = resJson.data
                if(pn==1){
                    var pageObj = dataJson.page
                    // console.log(pageObj)
                    console.log('Total count: ' + pageObj.count)                  
                    total_pn = Math.ceil(pageObj.count / pageObj.size)
                    console.log('Total Page Number: ' + total_pn)
                }
                handleData(dataJson)
                pn += 1
            }else{
                console.log('Error log: ' + error)
                return
            }

            if(total_pn!=PN_MAX && pn>total_pn){
                return
            }else{
                handleRequest()
            }
    })
}

function handleData(data){
    var dataArray = []
}

function setParamData(tid,pn){
    var url = 'http://api.bilibili.com/archive_rank/getarchiverankbypartion?type=jsonp&tid={tid}&pn={pn}'
    return url.replace('{tid}',tid).replace('{pn}',pn)
}

/*
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})
 */

handleRequest();
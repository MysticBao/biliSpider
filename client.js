var request = require('request')
//连载新番
const LZXF_TID = 33
//完结动画
const WZDH_TID = 32
const PN_MAX = 9999999999
var pn = 1
var total = PN_MAX 
             
function handleRequest(){
    var request_url = setParamData(LZXF_TID,pn)
    request(request_url,function(error,response,body){
            if(response.statusCode==200){
                console.log(request_url)
                pn += 1
            }else{
                throw error
            }

            if(total!=PN_MAX && pn>total){
                return
            }else{
                handleRequest()
            }
    })
}

function handleData(){

}

function setParamData(tid,pn){
    var url = "http://api.bilibili.com/archive_rank/getarchiverankbypartion?type=jsonp&tid={tid}&pn={pn}"
    return url.replace("{tid}",tid).replace("{pn}",pn)
}

/*
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})
 */

handleRequest();
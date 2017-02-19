import _ from 'lodash'
import rp from 'request-promise'
import fs from 'fs'

// get api request url
function fetchSearchPage(type, pageNo) {
  return rp(`http://api.bilibili.com/archive_rank/getarchiverankbypartion?type=jsonp&tid=${type}&pn=${pageNo}`)
}
// get page numbers
function handleSearchPage(content) {
    content = JSON.parse(content)
    let count = content.data.page.count
    let size = content.data.page.size
    let tid = content.data.archives[0].tid
    return {
        tid: tid,
        maxPageNo: Math.ceil(count / size)
    }
}
// excute by pageNo
function processTotalSearchResult(arg) {
    let range = _.range(1,arg.maxPageNo)
    let requests = range.map((pageNo) => {
        return fetchSearchPage(arg.tid,pageNo)
        .then((response) => {
            return filterData(response)
        })
    })
    return Promise.all(requests)
}
function filterData(data) {
    data = JSON.parse(data)
    let archives = data.data.archives
    let items = []
    _.forEach(archives,(archive, key) => {
        let item = {
            aid: archive.aid,
            tid: archive.tid,
            tname: archive.tname,
            title: archive.title,
            author: archive.author,
            view: archive.stat.view,
            danmku: archive.stat.danmaku,
            favorite: archive.stat.favorite,
            coin: archive.stat.coin
        }
        items.push(item)
    })
    return items
}
function storeResult(data) {
  let result = _.concat(data)
  result = _.flattenDeep(result)
  fs.writeFile('data.json', JSON.stringify(result))
  console.log('Write Data')
}
function updateTop10(data){
    
}
function execute(type){
    console.log('-----Start-----')
    Promise.resolve(fetchSearchPage(type,1))
    .then(handleSearchPage)
    .then(processTotalSearchResult)
    .then(storeResult)
    .catch((err) => console.error(err))
}

execute(32)

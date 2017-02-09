import _ from 'lodash'
import rp from 'request-promise'
import fs from 'fs'

const resultData = {}

function fetchSearchPage(type, pageNo) {
  return rp(`http://api.bilibili.com/archive_rank/getarchiverankbypartion?type=jsonp&tid=${type}&pn=${pageNo}`)
}
function handleSearchPage(data) {
  data = JSON.parse(data)
  let count = data.data.page.count
  let size = data.data.page.size
  return Math.ceil(count / size)
}
function processTotalSearchResult(maxPageNo) {
  maxPageNo = 5
  let range = _.range(1, maxPageNo)
  let requests = range.map((pageNo) => {
    return fetchSearchPage(32, pageNo)
    .then((response) => {
      return {
        pageNo: pageNo,
        response: JSON.parse(response)
      }
    })
  })
  return Promise.all(requests)
}
function storeResult (data) {
  console.log('bbbbbbbb', data)
  fs.writeFile('data.json', JSON.stringify(data))
}


Promise.resolve(fetchSearchPage(32, 1))
.then(handleSearchPage)
.then(processTotalSearchResult)
.then(storeResult)
.catch((err) => console.error(err))


console.log('abc')

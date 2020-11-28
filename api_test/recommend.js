// 파일 이름 및 경로 추천해주는 API

const db = require('./db')

function getDomain(url) {
    let domain = (new URL(url))
    domain = domain.hostname;
    console.log(domain)

}


db.SelectDlHistoryAll((result) => {
    result.forEach(element => {
        getDomain(element.URL)
    });
})
// 파일 이름 및 경로 추천해주는 API
// 다운로드 기록 조회(없을시 전체 기록 조회) -> 파일이름 유사도 돌리기 ->  

const db = require('./db')
const path = window.require('path')
// const similarity = require('string-cosine-similarity')
const stringComparison = window.require('string-comparison')

let cos = stringComparison.cosine
let ls = stringComparison.levenshtein


export function getRecommendList(url, filename, callback) {
    let candidates = []
    db.SelectDlHistory(url, (result) => {
        result.forEach(element => {
            let sim = ls.similarity(filename, element.Filename)
            candidates.push({
                similarity: sim,
                name: element.Filename,
                place: element.Place
            })
        });

        candidates.sort((first, second) => {
            return second.similarity - first.similarity
        })
        callback(candidates)
    })
}
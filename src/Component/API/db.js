/* 
DB 관련 입/출력을 래핑함.
ipc를 통해 쿼리를 입력받아, 렌더러 프로세스로 결과를 전달함.
*/
const path = window.require('path')
const { app } = window.require('electron').remote
const Database = window.require('better-sqlite3')

const dbPath = app.getPath('userData')

// DB 인스턴스 시작
export const db = new Database(path.join(dbPath, 'data.db'), { verbose: console.log })

export function SelectDlHistoryAll() {
    let select_all = db.prepare(`SELECT * FROM dl_history`)
    var result = select_all.all()
    return result
}



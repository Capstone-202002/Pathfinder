/* 
DB 관련 입/출력을 래핑함.
ipc를 통해 쿼리를 입력받아, 렌더러 프로세스로 결과를 전달함.
*/
const path = window.require('path')
// const path = window.require('path')
const { app } = window.require('electron').remote

const dbPath = path.join(app.getPath('userData'), 'data.db')
// const db = new Datastore({ filename: dbPath, autoload: true });


// // const { db } = require('./dbinit')

// export function getData(query, callback) {
//     console.log("여기서 되나?")
//     console.log(db)
//     db.find(query, (err, docs) => {
//         console.log(err)
//         console.log(docs)
//         if (!err) {
//             callback({ success: true, data: docs })
//         }
//         else {
//             callback({ success: false, data: null })
//         }
//     })
// }


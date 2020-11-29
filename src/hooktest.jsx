import React, { useState, useEffect, useRef } from "react";
import Visualization from "./Component/Visualization/Visualization";
import Mainframe from "./Component/Visualization/Mainframe/Mainframe";
import DownloadPopup from "./Component/Visualization/Popup/DownloadPopup"
import Popup from 'reactjs-popup'
import Dialog from '@material-ui/core/Dialog';

const { app } = window.require('electron').remote
const path = window.require('path')
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
// function 컴포넌트에서 state, effect 를 사용하기 위해 Hook을 사용합니다
function HookTest() {
  // 새로운 state 변수 선언, count
  // uststate(state의 초깃값), [해당 state, 변수 갱신 함수] 반환
  const [count, setCount] = useState(0);
  // componentDidMount, componentDidUpdate와 같은 방식으로 작동
  useEffect(() => {
    //브라우저 API를 이용하여 문서 타이틀을 업데이트
    //근데 electron은 nodejs 상에서 돌리기 때문에 안되는듯
    document.title = "Pathfinder에 어서오세요";
    
  }, [count]); // count state가 바뀔때만 useEffect 실행한다는 뜻, 과도하게 실행되어 발생하는 overhead 방지
  // -> 테스트코드


  const [open, setOpen] = useState(false);
  const [downloadedFile, setDownloadedFile] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [fileInfo, setfileInfo] = useState(null);

  function popupSubmit() {
    setOpen(false);
    // 파일 실질적 이동경로 변경 로직 추가
  }

  useEffect(() => {
    // db 코드 테스트
    const _path = require("path");
    ipcRenderer.on('download-request', (event, payload) => {
      setOpen(true);
      console.log("다운로드 요청 ipc로 받기")
      console.log(event)
      console.log('페이로드: ', payload)
      setDownloadedFile(_path.basename(payload.path));
      let name1 = payload.path;
      console.log('파일명1', name1)
      let name2 = _path.basename(payload.path);
      console.log('파일명2', name2)
      
      setRecommended(payload.place);
      setfileInfo(payload);
    })
  });

  return (
    <>
      <Mainframe />
      <Dialog
        open={open}
      >
        <DownloadPopup fileName={downloadedFile} recommended={recommended} fileInfo={fileInfo} popupSubmit={popupSubmit}/>
      </Dialog>
    </>
  );
}

export default HookTest;

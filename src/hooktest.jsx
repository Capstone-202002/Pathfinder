import React, { useState, useEffect, useRef } from "react";
import Visualization from "./Component/Visualization/Visualization";
import Mainframe from "./Component/Visualization/Mainframe/Mainframe";
import DownloadPopup from "./Component/Visualization/Popup/DownloadPopup"
import Popup from 'reactjs-popup'
import Dialog from '@material-ui/core/Dialog';
import RalewayRegular from './Component/Fonts/Raleway-Regular.ttf';
import NanumGothicRegular from './Component/Fonts/NanumGothic-Regular.ttf';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core";
import {useTracked} from './SettingContext';
const { app } = window.require('electron').remote
const path = window.require('path')
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
// function 컴포넌트에서 state, effect 를 사용하기 위해 Hook을 사용합니다

function HookTest() {
  const [settings, setSettings]=useTracked();
  function themeSettingReturn(){
    console.log('pathfinderTheme : ');
    console.log(settings.pathfinderTheme);
    if(settings.pathfinderTheme || settings.pathfinderTheme===undefined){
      return 'dark'
    }
    else if(!(settings.pathfinderTheme)){
      return 'light'
    }
  }
  const raleway = {
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('Raleway'),
      local('Raleway-Regular'),
      url(${RalewayRegular}) format('truetype')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  };
  const nanum ={
    fontFamily: 'NanumGothic',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('NanumGothic'),
      local('NanumGothic-Regular'),
      url(${NanumGothicRegular}) format('truetype')
    `,
    unicodeRange:
      'U+1100-11FF, U+3000-303F, U+3130-318F, U+3200-32FF, U+A960-A97F,U+AC00-D7AF,	U+D7B0-D7FF,	U+FF00-FFEF'
  };
  const theme = createMuiTheme({
    palette: {
      type : themeSettingReturn()
    },
    typography: {
      fontFamily:['RaleWay, Arial', 'NanumGothic, Arial']
    },
    overrides:{
      MuiCssBaseline:{
        '@global':{
          '@font-face':[raleway,nanum],
        },
      }
    }
    
  });
  
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
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Mainframe />
        <Dialog
          open={open}
        >
          <DownloadPopup fileName={downloadedFile} recommended={recommended} fileInfo={fileInfo} popupSubmit={popupSubmit}/>
        </Dialog>
      </ThemeProvider>
    </>
  );
}

export default HookTest;

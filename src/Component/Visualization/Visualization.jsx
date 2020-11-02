import React, { useState, useEffect, useTheme } from "react";
import {makeStyles} from  '@material-ui/core/styles';
import Base from "../Base/Base";
import Mainframe from "./Mainframe/Mainframe"
import Section from "./Functionframe/01_DirectoryAnalysis/Section";
import { getFileList, openDirectorySelectDialog } from "../API/io";
import SearchAndFilter from './Functionframe/01_DirectoryAnalysis/SearchAndFilter';
import Scrollbars from "react-custom-scrollbars";
import { FormatColorTextSharp } from "@material-ui/icons";
import clsx from 'clsx';
import DownloadAssistMain from "./Functionframe/02_DownloadAssist/DownloadAssistMain";
import DownloadPopup from "./Popup/DownloadPopup";
const path = window.require('path')

// 프로젝트 경로 하드코딩 되어있는거때문에 오류가 나니까 오류 안나게 바꿔드림.



function Visualization(props) {

  //const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    displayStyle:{
      display: "flex",
      height: "100%",
      width:'100%',
      overflowX: "auto",
      flexWrap: 'nowrap',
      flexDirection: 'row',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight:'0px'
    },
    displayShiftStyle:{
      display: "flex",
    height: "100%",
    width:'100%',
    overflowX: "auto",
    flexWrap: 'nowrap',
    flexDirection: 'row',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight:'300px'
    }
  }));

  const [dirName, setDirName] = useState('클릭하여 탐색할 디렉토리를 지정하세요.');
  const [renderSection, setRenderSection] = useState([]);  // render 될 section들을 담는 state
  const [pathTracker, setPathTracker] = useState([]);

  function setDefaultDir(e) { // 디렉토리를 지정하는 함수, title 지정까지 같이함
    e.preventDefault();
      openDirectorySelectDialog( (result) => {
        if (!result.canceled){
          setDirName(result.filePaths[0]);
          let newDirInfo = getFileList(result.filePaths[0]);
          setRenderSection([newDirInfo]);
          setPathTracker([]);
        }
    })
  }

  function pathChecker(currentPath) {
    for (var idx = 0; idx < pathTracker.length; idx++) {
      if (currentPath === pathTracker[idx]) {
        //console.log(idx);
        return idx;
      }
    }
    return 'null';
  }

  function folderClicked(info) {  // 폴더요소 클릭시의 처리

    //console.log('패스트래커: ', pathTracker);
    //console.log(renderSection);
    //console.log(info);
    var newpathTracker = pathTracker;
    var newRenderSection = renderSection;

    var checkResult = pathChecker(info.currentPath);
    if (checkResult !== 'null') {
      newpathTracker = pathTracker.slice(0, checkResult);
      newRenderSection = renderSection.slice(0, checkResult + 1);
    }

    setPathTracker(newpathTracker.concat(info.currentPath));
    var newInfo = [getFileList(info.absPath)];
    setRenderSection(newRenderSection.concat(newInfo));

    //console.log(pathTracker);
    //console.log(renderSection);
  }

  // 검색 & 필터 정보 받아오는 부분
  const [searchInfo, setSearchInfo] = useState({
    searchName: '',
    searchExt: '',
    searchMinVol: 0,
    searchMaxVol: 0,
});
  function searchChanger(info, ob, ub) { //info: searchDisplay의 state정보가 담겨있음
    setSearchInfo({
      ...searchInfo,
      searchName: info.searchName,
      searchExt: info.searchExt,
      searchMinVol: info.searchMinVol * ob,
      searchMaxVol: info.searchMaxVol * ub
    })
    //setSearchInfo(info);
  }
  
  // 검색 & 필터 바 오픈 여부 받아오는 부분
  const [isSearching, setIsSearching] = useState(false);
  function isSearchingChanger(isSearching) {
    setIsSearching(isSearching);
  }

  useEffect(()=> {  // 검색부분 변화있으면 실행됨
    //console.log(searchInfo);
    //console.log('검색바 오픈: ', isSearching);
    //console.log(searchInfo);
  }, [searchInfo, isSearching])

  

  var visualizationRenderer = renderSection.map((renderInfo, index) => (
    <Section sectionInfo={renderInfo} 
              folderClicked={folderClicked} 
              key={index} 
              isSearching={isSearching}
              searchInfo={searchInfo} />
  ));

  //왼쪽 메뉴로부터 값 읽어오기
  //TODO
  //menu State : Mainframe으로부터 동기화하여 아래 setContents()를 바뀔때마다 콘텐츠 변경
  //UI 개발을 위해 메뉴값을 1로 고정해둠 나중에 바꿀것
  const [menu, setMenu] = useState('');
  const test = 1
  function getMenu(data){
    setMenu(data);
    
    //console.log(test)
}
  useEffect(()=>{
    console.log(menu)
  });
  const classes = useStyles();

  //State를 이용하여 메인프레임에 콘텐츠 전송
  function setContents(){
    console.log(menu);
    if(menu === 0){
      return (<>
      {/*Directory Analysis*/}
          <div className={clsx(classes.displayStyle,{[classes.displayShiftStyle]:isSearching,})}>
            {visualizationRenderer}
          </div>
          <SearchAndFilter searchChanger={searchChanger} isSearchingChanger={isSearchingChanger}/>
      </>
      );
    }
    else if(test  === 1){
      return(<>
      {/*DownloadAssist*/}
      <DownloadAssistMain/>
      </>);
    }
    else if(menu === 2){
      return(<>
      
        {/*Applied Sortistics*/}
        
        </>);
    }
    else if(menu === 3){
      return(<>
      
        {/*Settings*/}
        
        </>);
    }
  }


  var contents = (
            <>
              <div className={clsx(classes.displayStyle,{[classes.displayShiftStyle]:isSearching,})}>
                  {visualizationRenderer}
              </div>
              <SearchAndFilter searchChanger={searchChanger} isSearchingChanger={isSearchingChanger}/>
            </>
              )

  return (
    <>
                                                                                            {/*메뉴 번호 받는 함수 일시적으로 Disable*/}
      <Mainframe contents={setContents()} titleName={dirName} onTitleClicked={setDefaultDir} menu={getMenu}></Mainframe>
    </>
  );
}

export default Visualization;

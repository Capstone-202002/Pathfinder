import React, { useState, useEffect, useTheme } from "react";
import {makeStyles} from  '@material-ui/core/styles';
import Base from "../Base/Base";
import Mainframe from "../UI/Mainframe/Mainframe"
import Section from "./Section";
import { getFileList, openDirectorySelectDialog } from "../API/io";
import SearchAndFilter from './SearchAndFilter';
import Scrollbars from "react-custom-scrollbars";
import { FormatColorTextSharp } from "@material-ui/icons";
import clsx from 'clsx';
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

  var title = "디렉토리 시각화";  // 이부분도 정리

  const test = [props.defaultDirInfo];
  const [renderSection, setRenderSection] = useState(test);  // render 될 section들을 담는 state
  const [pathTracker, setPathTracker] = useState([]);

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

  function setDefaultDir(e) {
    e.preventDefault();
    openDirectorySelectDialog( (result) => {
      if (!result.canceled){
          let newDirInfo = getFileList(result.filePaths[0]);
          setRenderSection([newDirInfo]);
          setPathTracker([]);
      }
  })
    
  //   const test = [props.defaultDirInfo];
  // const [renderSection, setRenderSection] = useState(test);  // render 될 section들을 담는 state
  // const [pathTracker, setPathTracker] = useState([]);
  }

  var visualizationRenderer = renderSection.map((renderInfo, index) => (
      <Section sectionInfo={renderInfo} 
               folderClicked={folderClicked} 
               key={index} 
               isSearching={isSearching}
               searchInfo={searchInfo} />
  ));
  const classes = useStyles();
  var contents = (
            <>
              <div className={clsx(classes.displayStyle,{[classes.displayShiftStyle]:isSearching,})}>
              <button onClick={setDefaultDir}>asdfasdf</button>
                  {visualizationRenderer}
                         
              </div>
              <SearchAndFilter searchChanger={searchChanger} isSearchingChanger={isSearchingChanger}/>
            </>
              )

  return (
    <>
      <Mainframe contents={contents} title={title}></Mainframe>
    </>
  );
}

export default Visualization;

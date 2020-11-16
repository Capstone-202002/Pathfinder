import React, { useState, useEffect, useTheme } from "react";
import { makeStyles } from '@material-ui/core/styles';
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
import SettingsMain from "./Functionframe/04_Settings/SettingsMain";
import { Typography } from "@material-ui/core";
import AppliedSortisticsMain from "./Functionframe/03_AppliedSortistics/AppliedSortisticsMain";
import { motion } from 'framer-motion';
import VirtualDirectoryMain from "./Functionframe/00_VirtualDirectory/VirtualDirectoryMain";
import RightClickSnackbar from "./Popup/RightClickSnackbar";
const path = window.require('path')



function Visualization(props) {

  //const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    displayStyle: {
      display: "flex",
      height: "100%",
      width: '100%',
      overflowX: "auto",
      flexWrap: 'nowrap',
      flexDirection: 'row',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: '0px'
    },
    displayShiftStyle: {
      display: "flex",
      height: "100%",
      width: '100%',
      overflowX: "auto",
      flexWrap: 'nowrap',
      flexDirection: 'row',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: '300px'
    }
  }));

  //const [dirName, setDirName] = useState('클릭하여 탐색할 디렉토리를 지정하세요.');
  const [renderSection, setRenderSection] = useState(props.defaultRenderSection);  // render 될 section들을 담는 state
  const [pathTracker, setPathTracker] = useState(props.defaultPathTracker);
  
  useEffect(() => {  // 검색부분 변화있으면 실행됨
    // setRenderSection(props.defaultRenderSection);
    // setPathTracker(props.defaultPathTracker);
  }, [renderSection, pathTracker])

  // function setDefaultDir(e) { // 디렉토리를 지정하는 함수, title 지정까지 같이함
  //   e.preventDefault();
  //   openDirectorySelectDialog((result) => {
  //     if (!result.canceled) {
  //       setDirName(result.filePaths[0]);
  //       let newDirInfo = getFileList(result.filePaths[0]);
  //       setRenderSection([newDirInfo]);
  //       setPathTracker([]);
  //     }
  //   })
  // }

  function pathChecker(currentPath) {
    for (var idx = 0; idx < pathTracker.length; idx++) {
      if (currentPath === pathTracker[idx]) {
        //console.log(idx);
        return idx;
      }
    }
    return 'null';
  }

  // db 코드 테스트

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

  useEffect(() => {  // 검색부분 변화있으면 실행됨
    //console.log(searchInfo);
    //console.log('검색바 오픈: ', isSearching);
    //console.log(searchInfo);
  }, [searchInfo, isSearching])



  var visualizationRenderer = renderSection.map((renderInfo, index) => (
    <Section sectionInfo={renderInfo}
      folderClicked={folderClicked}
      key={index}
      isSearching={isSearching}
      searchInfo={searchInfo} 
      />
  ));

  //왼쪽 메뉴로부터 값 읽어오기
  //TODO
  //menu State : Mainframe으로부터 동기화하여 아래 setContents()를 바뀔때마다 콘텐츠 변경
  //UI 개발을 위해 메뉴값을 1로 고정해둠 나중에 바꿀것
  const classes = useStyles();
  
  return (
  <>
        {/*Directory Analysis*/}
        <motion.div className={clsx(classes.displayStyle, { [classes.displayShiftStyle]: isSearching, })}
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {visualizationRenderer}
        </motion.div>
        <SearchAndFilter searchChanger={searchChanger} isSearchingChanger={isSearchingChanger}/>
    </>
  );
}

export default Visualization;

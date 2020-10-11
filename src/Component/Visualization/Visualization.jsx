import React, { useState, useEffect } from "react";
import Base from "../Base/Base";
import Mainframe from "../UI/Mainframe/Mainframe"
import Section from "./Section";
import { getFileList } from "../API/io";
const path = window.require('path')

function Visualization() {
  var defaultDir = path.join('C://테스트경로');              // 우선 하드코딩
  var defaultDirInfo = getFileList(defaultDir);  // 이부분 받아오는걸로 변경예정

  var displayStyle = {     // style이므로 정리 필요
    display: "flex",
  };

  var title = "디렉토리 시각화";  // 이부분도 정리
 
  const test = [defaultDirInfo];
  const [renderSection, setRenderSection] = useState(test);  // render 될 section들을 담는 state
  const [pathTracker, setPathTracker] = useState([]);

  function pathChecker(currentPath) {
    for (var idx=0; idx < pathTracker.length; idx++) {
      if (currentPath === pathTracker[idx]) {
        console.log(idx);
        return idx;
      }
    }
    return 'null';
  }

  function folderClicked(info) {  // 폴더요소 클릭시의 처리
    
    //console.log(pathTracker);
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

    console.log(pathTracker);
    console.log(renderSection);
  }
  

  var visualizationRenderer = renderSection.map((renderInfo, index) => (
      <Section sectionInfo={renderInfo} folderClicked={folderClicked}/>
  ));

  var contents = (<div style={displayStyle}>{visualizationRenderer}</div>)

  return (
    <>
      <Mainframe contents={contents} title={title}></Mainframe>
    </>
  );
}

export default Visualization;

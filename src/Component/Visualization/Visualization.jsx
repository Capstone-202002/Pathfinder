import React, { useState, useEffect } from "react";
import Base from "../Base/Base";
import Mainframe from "../UI/Mainframe/Mainframe"
import Section from "./Section";
import { getFileList } from "../API/io";
import SearchAndFilter from './SearchAndFilter';
import Scrollbars from "react-custom-scrollbars";
const path = window.require('path')

// 프로젝트 경로 하드코딩 되어있는거때문에 오류가 나니까 오류 안나게 바꿔드림.



function Visualization(props) {


  var displayStyle = {     // style이므로 정리 필요
    display: "flex",
    height: "100%",
    width:'100%',
    overflowX: "auto",
    flexWrap: 'nowrap',
    flexDirection: 'row'
  };

  var title = "디렉토리 시각화";  // 이부분도 정리

  const test = [props.defaultDirInfo];
  const [renderSection, setRenderSection] = useState(test);  // render 될 section들을 담는 state
  const [pathTracker, setPathTracker] = useState([]);

  function pathChecker(currentPath) {
    for (var idx = 0; idx < pathTracker.length; idx++) {
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
      <Section sectionInfo={renderInfo} folderClicked={folderClicked} key={index}/>
  ));

  var contents = (
            <>
              <div style={displayStyle}>
                
                  {visualizationRenderer}
                         
              </div>
              <SearchAndFilter/>
            </>
              )

  return (
    <>
      <Mainframe contents={contents} title={title}></Mainframe>
    </>
  );
}

export default Visualization;

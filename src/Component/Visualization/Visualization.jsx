import React, { useState, useEffecct } from "react";
import Base from "../Base/Base";
import Mainframe from "../UI/Mainframe/Mainframe"
import Section from "./Section";
import { getFileList } from "../API/io";

function Visualization() {
  var defaultDir = "C://테스트경로";              // 우선 하드코딩
  var defaultDirInfo = getFileList(defaultDir);  // 이부분 받아오는걸로 변경예정

  var displayStyle = {     // style이므로 정리 필요
    display: "flex",
  };

  var title = "디렉토리 시각화";  // 이부분도 정리
 
  const test = [defaultDirInfo];
  const [renderSection, setRenderSection] = useState(test);

  function folderClicked(info) {  // 폴더요소 클릭시의 처리
    console.log(info);
    setRenderSection(renderSection.concat(test));
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

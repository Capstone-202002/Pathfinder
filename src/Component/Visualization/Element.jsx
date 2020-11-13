import React, { useState, useEffect } from "react";
import File from "./File";
import Folder from "./Folder";

function Element(props) {
  // 기타 정보들이
  if (props.info.is_dir) {
    return <Folder totalSize={props.totalSize} info={props.info} 
                   folderClicked={props.folderClicked}/>;
  }
  return <File info={props.info} 
               isSearching={props.isSearching}
               searchInfo={props.searchInfo}
               doubleClicked={props.doubleClicked}/>;
}

export default Element;

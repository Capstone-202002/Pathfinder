import React, { useState, useEffect } from "react";
import File from "./File";
import Folder from "./Folder";

function Element(props) {
  const name = props.name;
  const isFolder = props.isFolder;
  // 기타 정보들이

  if (isFolder) {
    return <Folder name={name} />;
  }
  return <File name={name} />;
}

export default Element;

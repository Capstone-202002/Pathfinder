import React, { useState, useEffect } from "react";
import Element from "./Element";
import {makeStyles} from  '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  wrapper:{
    height : "100%",
    width : "210px"
  }

}))

function Section(props) {
  const classes = useStyles();

  var sectionInfo = props.sectionInfo;

  var total = 0;
  // 임시로 폴더 총 용량 구하는 부분, 추후 백엔드에 포함 예정
  for(var i=0; i < sectionInfo.length; i++){
    total += sectionInfo[i].size;
  }

  var section = sectionInfo.map((file, index) => (
    <div>
      <Element info={file} totalSize={total} name={file.name} isDir={file.is_dir} folderClicked={props.folderClicked} />
    </div>
  ));


  return (
    <>
      {/*<div style={sectionStyle}>{section}</div>*/}
      <div className={classes.wrapper}>
        {section}
      </div>
    </>
  );
}

export default Section;

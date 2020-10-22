import React, { useState, useEffect } from "react";
import Element from "./Element";
import {makeStyles} from  '@material-ui/core/styles';
import {Scrollbars} from 'react-custom-scrollbars';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  wrapper:{
    height : "100%",
    width : "230px",
    paddingTop: '20px',
    //borderRight : '2px solid grey',
    overflowY : 'auto'
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
      <Scrollbars 
        style={{width: '100%', height: '100%'}}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        >
        <h1>hELLO</h1>
        <Element info={file} totalSize={total} name={file.name} isDir={file.is_dir} folderClicked={props.folderClicked} />
      </Scrollbars>
    </div>
  ));


  return (
    <>
      {/*<div style={sectionStyle}>{section}</div>*/}
      <div className={classes.wrapper}>
        {section}
      </div>
      <Divider variant="middle" orientation="vertical" flexItem/>
    </>
  );
}

export default Section;

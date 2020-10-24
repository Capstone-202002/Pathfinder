import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import { InsertDriveFileSharp } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import {motion} from "framer-motion";


function File(props) {
  function searchName(fi, si) {
    if (fi.name.indexOf(si.searchName) !== -1) {
      if (si.searchName === '') {
        return 'blank';
      }
      return true;
    }
    return false;
  }
  function searchExt(fi, si) {
    if (si.searchExt === '') {
      return 'blank';
    }
    if (fi.extension.replace(".", "") === si.searchExt) {
      //console.log(fi.extension, si.searchExt);
      //console.log("확장자 비교 true!");
      return true;
    }
    return false;
  }
  
  function searchResult(fi, si) { // searchInfo: si, fileInfo: fi
    const nameResult = searchName(fi, si);
    const extResult = searchExt(fi, si);
    let sizeCompare = false;
    // console.log(fi, si);
    if (fi.size >= si.searchMinVol) {
      if (si.searchMaxVol == 0) {
        sizeCompare = true;
        console.log('asdfasjd;fljas;lkdj;asklf');
      }
      else if (fi.size <= si.searchMaxVol) {
        sizeCompare = true;
      }
    }
    // console.log('비교하는거: ', fi.size >= si.searchMinVol);
    // console.log('비교하는거2: ', si.searchMaxVol == 0);
    // console.log('sizeCompare: ', sizeCompare);

    if (nameResult === 'blank' && extResult === 'blank') {
      return false;
    }
    if (nameResult === 'blank' || extResult === 'blank') {
      if (nameResult === 'blank') {
        return extResult && sizeCompare;
      }
      else {
        return nameResult && sizeCompare;
      }
    }
    else {
      return nameResult && extResult && sizeCompare;
    }
  }

  function ChangeFileNameColor(fi, si){
    const size = fi.size;
    //console.log('파일인포: ', fi);
    if (props.isSearching === true) {
      //console.log(searchResult(fi, si));
      if (searchResult(fi, si)) {
        return '#F6FD25'
      }
      return '#545454';
    }
    //if (searchResult())

    if (size < 104857600) {
      return '#AEE1FF';
    }
    else if (size < 268435456) {
      return '#ACFFBA';
    }
    else if (size < 536870912) {
      return '#E0FFB8';
    }
    else if (size < 1073741824) {
      return '#FFEF9F';
    }
    else if (size < 2147483648) {
      return '#FFD175';
    }
    else {
      return '#FF8D8D';
    }
    //ChangeFileName's Color by here
    //const theme = useTheme();
    //const hex = '#FF0000'
    //return hex;
    
    //Level 1  #FF8D8D    0~~
    //Level 2  #FFD175    104857600
    //Level 3  #FFEF9F    268435456
    //Level 4  #E0FFB8    536870912
    //Level 5  #ACFFBA    1073741824
    //Level 6  #AEE1FF    2147483648    
    //usage : color : '#FFFFFF' // color = '#FFFFFF'
  }

  const useStyles = makeStyles((theme) => ({
    fileDiv:{
      display: 'flex',
      width: "170px",
      height : "40px",
      paddingLeft : "20px"
    },
    fileIcon:{
      width : "20px",
      color : theme.palette.text.primary
    },
    fileName:{
      width  : "150px",
      //color : theme.palette.text.primary
      color : ChangeFileNameColor(props.info, props.searchInfo)
    }
  }))
  const classes = useStyles();
  const info = props.info;
  // 기타 정보들이

  return (
    <>
      {/*<div style={divStyle}>이름: {name}, 파일임</div>*/}
      <motion.div className={classes.fileDiv}
        whileHover = {{scale : 1.2, originX:0}}
      >
        <InsertDriveFileSharp className={classes.fileIcon}/>
        <Typography className={classes.fileName}>{info.name}</Typography>
      </motion.div>
    </>
  );
}

export default File;
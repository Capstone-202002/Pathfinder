import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import { InsertDriveFileSharp } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import {motion} from "framer-motion";
import AssignmentIcon from '@material-ui/icons/Assignment';
import ImageIcon from '@material-ui/icons/Image';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MovieIcon from '@material-ui/icons/Movie';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import {useTracked} from '../../SettingContext';
function File(props) {
  const theme = useTheme();
  const [settings, setSettings] = useTracked();
  function searchName(fi, si) {
    if (fi.name.toLowerCase().indexOf(si.searchName.toLowerCase()) !== -1) {
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
    if (fi.extension.replace(".", "").toLowerCase() === si.searchExt.toLowerCase()) {
      return true;
    }
    return false;
  }
  
  function searchResult(fi, si) { // searchInfo: si, fileInfo: fi
    if (si === {}) {
      return false;
    }
    const nameResult = searchName(fi, si);
    const extResult = searchExt(fi, si);
    
    const sizeBothZero = (si.searchMinVol == 0) && (si.searchMaxVol == 0);
    let sizeResult = false;
    let sizeCompareResult1 = (fi.size >= si.searchMinVol) && (si.searchMaxVol == 0);
    let sizeCompareResult2 = (fi.size >= si.searchMinVol) && (fi.size <= si.searchMaxVol);
    if (sizeBothZero) {
      sizeResult = true;
    }
    else if (sizeCompareResult1) {
      sizeResult = true;
    }
    else if (sizeCompareResult2) {
      sizeResult = true;
    }

    if (nameResult === 'blank' && extResult === 'blank') {
      if (sizeBothZero) {
        return false;
      }
      else if (sizeResult) {
        return true;
      }
      else {
        return false;
      }
    }
    if (nameResult === 'blank' || extResult === 'blank') {
      if (nameResult === 'blank') {
        return extResult && sizeResult ;
      }
      else {
        return nameResult && sizeResult;
      }
    }
    else {
      return nameResult && extResult && sizeResult;
    }
  }

  function ChangeFileNameColor(fi, si){
    if(settings.directoryViewFileTextColorOperation===false){
      return theme.palette.text.primary
    }
    const size = fi.size;
    //console.log('파일인포: ', fi);
    if (props.isSearching) {
      //console.log(searchResult(fi, si));
      if (props.doubleClicked) {
        if (searchResult(fi, si)) {
          return '#F6FD25'
        }
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
  const documents=['.ppt','.pptx','.doc','.docx','.xls','.pdf','.ai','.psd','.hwp','.txt']
  const images = ['.bmp','.gif','png','.jpg','.jpeg','.raw','.webp','.ico','.pcx','.swf']
  const musics = ['.wav','.wma','.mp3']
  const videos = ['.mkv','.webm','.mp4','.flv','.mov','.avi']
  const zips = ['.zip','.alz','.egg','.rar','.arj','.lzh']

  function setIcon(){
    
    
    if(documents.includes(info.extension)){
      return <AssignmentIcon className={classes.fileIcon}/>;
    }
    if(images.includes(info.extension)){
      return <ImageIcon className={classes.fileIcon}/>;
      }
    if(musics.includes(info.extension)){
      return <MusicNoteIcon className={classes.fileIcon}/>;
    }
    if(videos.includes(info.extension)){
      return <MovieIcon className={classes.fileIcon}/>;
    }
    if(zips.includes(info.extension)){
      return <WorkOutlineIcon className={classes.fileIcon}/>;
    }
    return <InsertDriveFileSharp className={classes.fileIcon}/>;
    
  }
  const info = props.info;
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
      color : ChangeFileNameColor(props.info, props.searchInfo),
      overflow : 'hidden',
      '&:hover':{
        transition: 'text-indent 3s linear',
        textIndent: returnIndentNumber()
      }
    }
  }))
  function returnIndentNumber(){
    if(info.name.length>14){
      return -(info.name.length);
    }
    else{
      return 0;
    }
  }
  const classes = useStyles();
  // 기타 정보들이
  //console.log(info);
  return (
    <>
      {/*<div style={divStyle}>이름: {name}, 파일임</div>*/}
      <motion.div className={classes.fileDiv}
        whileHover = {{scale : 1.2, originX:0}}
      >
        
        {setIcon()}
          <Typography noWrap className={classes.fileName}>{info.name}</Typography>
      </motion.div>
    </>
  );
}

export default File;
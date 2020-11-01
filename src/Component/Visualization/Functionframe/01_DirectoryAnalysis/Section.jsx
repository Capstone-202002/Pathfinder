import React, { useState, useEffect } from "react";
import Element from "../../Element";
import {makeStyles} from  '@material-ui/core/styles';
import {Scrollbars} from 'react-custom-scrollbars';
import Divider from '@material-ui/core/Divider';
import {motion} from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  sectionWrapper:{
    height : "100%",
    width : "240px",
    //paddingTop: '10px',
    float : 'left',
    //paddingLeft: '10px',
    //borderRight : '2px solid grey',
    overflow : 'hidden',
    flexShrink:'0',
  },
  divider:{
    margin:'0'
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
       <Element info={file} totalSize={total} name={file.name} isDir={file.is_dir} 
                folderClicked={props.folderClicked} key={index}
                isSearching={props.isSearching}
                searchInfo={props.searchInfo}
                />
   </div>
  ));


  return (
    <>
      {/*<div style={sectionStyle}>{section}</div>*/}
      <motion.div className={classes.sectionWrapper}
        initial={{x:-250, opacity:0}}
        animate={{x:0, opacity:1}}
        transition={{delay:0.2, duration : 0.5}}
      >
        <Scrollbars
        style={{height: '100%'}}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}
        renderView={props => (
          <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
      )}
        >
          
          {section}
        </Scrollbars>

      </motion.div>
      <Divider className={classes.divider} variant="middle" orientation="vertical" flexItem/>
    </>
  );
}

export default Section;

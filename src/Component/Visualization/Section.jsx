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
  
  var section = sectionInfo.map((file, index) => (
    <div>
      <Element info={file} name={file.name} isDir={file.is_dir} folderClicked={props.folderClicked} />
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

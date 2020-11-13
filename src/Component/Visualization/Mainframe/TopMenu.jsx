import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import HelpOutline from "@material-ui/icons/HelpOutline";
import {TitlebarMac} from 'electron-titlebar-react-component';
import {motion} from 'framer-motion';
//import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    mainTextWrapper : {
        display:'flex',
        flexDirection:'column',
        width : '100%'
    },
    draggableRegion:{
        width : 'calc(100%-200px)',
        height : '20px',
        WebkitAppRegion : "drag",
        backgroundColor : "#212121"
    },
    mainText:{
        display: 'flex',
        alignItems : 'center',
        width : 'calc(100%-200px)',
        height : '100%',
        backgroundColor : theme.palette.background.default,
        borderRadius : '0',
        paddingLeft : '25px',
        //WebkitAppRegion : "drag"
    },
    rightFunctionArea:{
        display:'flex',
        width : '200px',
        height : '100%',
        alignItems : 'center',
        backgroundColor : theme.palette.background.default,
        borderRadius : '0',
        flexDirection : 'vertical'
    },
    helpButton:{
        width : '40px',
        height : '40px',
        marginLeft : '30px',
        //marginTop : '10px',
    },
    titleBar:{
        position : 'absolute',
        marginLeft : '100px',
        marginBottom : '20px'
    }

}));

//props에 디렉토리 경로를 넣어주세요 . 적용됩니다.
export default function TopMenu(props){
    const classes = useStyles();
    return (
        <>
            <div className={classes.mainTextWrapper}>
                <div className={classes.draggableRegion}></div>
                <Paper className={classes.mainText}>
                    <motion.div
                        whileHover = {{scale:1.1, originX:0}}
                        whileTap = {{scale:0.9}}
                        onClick = {props.onTitleClicked}
                    >
                    <Typography>{props.mainText}</Typography>
                    </motion.div>
                    
                </Paper>
            </div>
            <div>
                <Paper className={classes.rightFunctionArea}>
                    <div className={classes.titleBar}>
                        <TitlebarMac style={{background:'transparent'}}/>
                    </div>
                    <Tooltip title = '도움말' arrow className={classes.helpButton}>
                        <IconButton aria-label="help" className={classes.helpButton}>
                            <HelpOutline/>
                        </IconButton>
                    </Tooltip>
                </Paper>
            </div>
        </>
    )
}
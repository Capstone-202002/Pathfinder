import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import HelpOutline from "@material-ui/icons/HelpOutline";
import TitlebarMac from '../TitlebarMac/TitlebarMac';
import {motion} from 'framer-motion';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import HelpMain from "../Popup/HelpMain";
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
    },
    helpMain:{
        width:'940px',
        height:'600px',
    },
    helpMainRoot:{
        '& .MuiDialogContent-root':{
            padding:'0'
        }
    }

}));

//props에 디렉토리 경로를 넣어주세요 . 적용됩니다.
export default function TopMenu(props){
    const classes = useStyles();
    function setOnClick(){
        if(props.disable){
            return;
        }
        else{
            return props.onTitleClicked
        }
    }
    function setTitleText(){
        if(props.disable){
            return;
        }else{
            return props.mainText;
        }
    }
    const [open, setOpen] = React.useState(false);
    const handleHelpOpen = () => {
        setOpen(true);
    };
    const handleHelpClose = () => {
        setOpen(false);
    }
    return (
        <>
            <div className={classes.mainTextWrapper}>
                <div className={classes.draggableRegion}></div>
                <Paper className={classes.mainText}>
                    <motion.div
                        whileHover = {{scale:1.1, originX:0}}
                        whileTap = {{scale:0.9}}
                        onClick = {setOnClick()}
                        
                    >
                    <Typography>{setTitleText()}</Typography>
                    </motion.div>
                    
                </Paper>
            </div>
            <div>
                <Paper className={classes.rightFunctionArea}>
                    <div className={classes.titleBar}>
                        <TitlebarMac style={{background:'transparent'}}/>
                    </div>
                    <Tooltip title = '도움말' arrow className={classes.helpButton}>
                        <IconButton aria-label="help" className={classes.helpButton} onClick={handleHelpOpen}>
                            <HelpOutline/>
                        </IconButton>
                        
                    </Tooltip>
                    <Dialog open={open} onClose={handleHelpClose} maxWidth={false} PaperProps={classes.helpMain} className={classes.helpMainRoot}>
                            <DialogContent>
                                <HelpMain menu={0} closeOnClick={handleHelpClose}/>
                            </DialogContent>
                        </Dialog>
                </Paper>
            </div>
        </>
    )
}
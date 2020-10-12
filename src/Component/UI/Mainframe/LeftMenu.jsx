import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import Paper from '@material-ui/core/Paper'
import { Typography,AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InsertEmoticon  from "@material-ui/icons/InsertEmoticon";

const menuTexts = ['디렉토리 뷰', '다운로드 어시스트', '자동 폴더 정리', '설정']
const useStyles = makeStyles((theme) => ({
    iconSection:{
        display: "flex",
        flexDirection: "column",
        width : '100%',
        height : "220px",
        alignItems : "center",
        backgroundColor : theme.palette.background.default,
        //verticalAlign: "middle",
    },
    virtualDirectorySection:{
        width : '100%',
        
    },
    virtualDirectoryAccordion:{
        width : '100%',
        maxHeight : '200px',
        backgroundColor : theme.palette.divider, 
    },
    menuButtonsSection:{
        display : 'flex',
        flexDirection: 'column',
        height : "240px",
        width : "100%"
    },
    menuButtons:{
        //display : 'flex',
        width : '100%',
        height : '60px',
        //paddingLeft : '25px',
        //verticalAlign : 'center',
        textAlign : 'left',
        float : 'left'
    }
}))
export default function LeftMenu(props){
    const classes = useStyles();
    const theme = useTheme();
    return(
        <>
            <div>
                <Paper className={classes.iconSection}>
                    <InsertEmoticon fontSize='large' color="#fff"/>
                    <Typography size='40px' color={theme.palette.text.primary}>PATHFINDER</Typography>
                </Paper>
            </div>
            <div className={classes.virtualDirectorySection}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography> 가상 디렉토리 </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
            </div>
            <div id='directory_view' className={classes.menuButtonsSection}>
                <div className={classes.menuButtons}>
                    <Button className={classes.menuButtons}>
                        {menuTexts[0]}
                    </Button>
                </div>
                <div id='download_assist' className={classes.menuButtons}>
                    <Button className={classes.menuButtons}>
                        {menuTexts[1]}
                    </Button>
                </div>
                <div id='applied_sortistics' className={classes.menuButtons}>
                    <Button className={classes.menuButtons}>
                        {menuTexts[2]}
                    </Button>
                </div>
                <div id='settings' className={classes.menuButtons}>
                    <Button className={classes.menuButtons}>
                        {menuTexts[3]}
                    </Button>
                </div>
            </div>
        </>

    );
}
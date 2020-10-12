import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import HelpOutline from "@material-ui/icons/HelpOutline";
//import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    mainTextWrapper : {
        width : '100%'
    },
    mainText:{
        display: 'flex',
        alignItems : 'center',
        width : 'calc(100%-200px)',
        height : '100%',
        backgroundColor : theme.palette.background.default,
        borderRadius : '0',
        paddingLeft : '25px',
        WebkitAppRegion : "drag"
    },
    rightFunctionArea:{
        display:'flex',
        width : '200px',
        height : '100%',
        alignItems : 'center',
        backgroundColor : theme.palette.background.default,
        borderRadius : '0',
    },
    helpButton:{
        width : '40px',
        height : '40px',
        marginLeft : '120px',
        marginTop : '10px',
    }

}));

export default function SystemMessage(props){
    const classes = useStyles();
    return (
        <>
            <div className={classes.mainTextWrapper}>
                <Paper className={classes.mainText}>
                    <Typography>{props.mainText}</Typography>
                </Paper>
            </div>
            <div>
                <Paper className={classes.rightFunctionArea}>
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
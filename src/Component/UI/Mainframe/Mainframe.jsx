import React from "react";
import Box from '@material-ui/core/Box';
import {sizing} from '@material-ui/system';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { CssBaseline, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    spacing : 10,
    //application itself
    root: {
        display: 'flex',
        verticalAlign: 'middle',
        flexDirection: 'column',
        width : "100%",
        height : "100%",
        minWidth: 940,
        minHeight: 600,
        color : '#0090FF',
        backgroundColor : '#0090FF'
        
    },
    //except system message
    app:{
        display: 'flex',
        height: "100%",
        width: '100%',
        height:'calc(100% - 20px)',
        color: theme.palette.background.default,
        backgroundColor : theme.palette.background.default
    },
    //App's Left Side
    menu: {
        display: 'flex',
        flexDirection: 'column',
        width : 250,
        minHeight:500,
        height: "100%"
    },
    //App's Right Side
    right: {
        display: 'flex',
        flexDirection: 'column',
        height : "100%",
        width : 'calc(100% - 250px)',
        minWidth : 690,
        minHeight : 580
    },
    //Top title Area
    title: {
        height: 60,
        width : "100%",
        WebkitUserSelect : "none",
        WebkitAppRegion : "drag"
    },
    //Main function area
    display: {
        width : "100%",
        height : "calc(100%-60px)"
    },
    //System Message area
    message:{
        width : "100%",
        height : 20
    },
    inner:{
        flexBasis: "auto",
        width : "100%",
        height : "100%"
    }
}))

export default function Mainframe(props){
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    document.body.style.backgroundColor = "transparent";
    document.body.style.color = "transparent";
    return(
        <Paper className={classes.root} color="#0090FF" style={{borderBottomLeftRadius : '160px'}}>
            <CssBaseline />
            
            <Paper className={classes.app} style={{borderBottomLeftRadius : '140px'}}>
                {/* application space*/}
                <div className={classes.menu}>
                    {/*App's Left Menu Section*/}

                </div>
                <div className={classes.right}>
                    {/*App's Right Display Section*/}
                    <div className={classes.title}>
                        {/*title bar section*/}

                    </div>
                    <div className={classes.display}>
                        {/*App's Main function display Section*/}
                        {props.contents}
                    </div>


                </div>
            </Paper>
            <div className={classes.message}>
                {/*system message space*/}
            </div>
        </Paper>
    );
}
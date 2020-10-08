import React from "react";
import Box from '@material-ui/core/Box';
import {sizing} from '@material-ui/system';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    spacing : 10,
    //application itself
    root: {
        display: 'flex',
        verticalAlign: 'middle',
        flexDirection: 'column',
        width : 1366,
        height : 768,
        minWidth: 940,
        minHeight: 600,
    },
    //except system message
    app:{
        display: 'flex',
        width: '100%',
        height:'calc(100% - 20px)'
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
    }
}))

export default function Mainframe(props){
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    return(
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.app}>
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
            </div>
            <div className={classes.message}>
                {/*system message space*/}
            </div>
        </div>
    );
}
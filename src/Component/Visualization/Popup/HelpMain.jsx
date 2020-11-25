import React,{useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Paper, Typography, Button, Divider, IconButton} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Scrollbars from 'react-custom-scrollbars';
import {motion} from 'framer-motion';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
    helpMainWrapper:{
        height : '600px',
        width:'940px',
    },
    helpMainWrapperPaper:{
        height:'100%',
        width : '100%',
        display:'flex',
        flexDirection:'column',
    },
    helpMainTitle:{
        height:'50px',
        width:'100%',
    },
    helpMainMiddleSection:{
        height:'500px',
        width:'100%',
        display:'flex',
        flexDirection:'column'
    },
    helpMainMiddleWrapperSection:{
        height:'500px',
        width:'100%',
    },
    helpMainNextButtons:{
        height : '100%',
        width:'40px',
    },
    helpMainContentSection:{
        width:'100%',
        height:'calc(100%-50px)',
    },
    helpMainSubtitleSection:{
        width:'100%',
        height:'50px',
    },
    helpMainStepperSection:{
        width:'100%',
        height: '50px',
    }

}));
const menuSubtitles = [
    ['디렉토리 뷰 도움말1','디렉토리 뷰 도움말2','디렉토리 뷰 도움말3','디렉토리 뷰 도움말4'],
    [],
    [],
    [],
];
export default function HelpMain(props){
    const [mainContents, setMainContents] = useState(props.menu);

    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return (
        <>
            <div className={classes.helpMainWrapper}>
                <Paper className={classes.helpMainWrapperPaper} elevation={0}>
                    <div className={classes.helpMainTitle}>
                        <Typography>
                            도움말
                        </Typography>
                        <IconButton onClick={props.closeOnClick}>

                        </IconButton>
                    </div>
                    <div className={classes.helpMainMiddleSection}>
                            <div className={classes.helpMainContentSection}>
                                {/*도움말 메인 콘텐츠 섹션*/}
                                <Typography>
                                    helper
                                </Typography>
                            </div>
                            <div className={classes.helpMainSubtitleSection}>
                                <Typography>
                                    {menuSubtitles[mainContents][activeStep]}
                                </Typography>
                            </div>
                    </div>
                    <div className={classes.helpMainStepperSection}>
                    <MobileStepper
                        variant="dots"
                        steps={menuSubtitles[mainContents].length}
                        position="static"
                        activeStep={activeStep}
                        className={classes.root}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === menuSubtitles[mainContents].length}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                            </Button>
                        }
                        />
                    </div>
                </Paper>
            </div>
        </>
    );
}
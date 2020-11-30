import React,{useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Paper, Typography, Button, Divider, IconButton} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Scrollbars from 'react-custom-scrollbars';
import {motion} from 'framer-motion';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import helper_aps_1 from '../Asset/helper/helper_APS_1.svg';
import helper_directory_view_1 from '../Asset/helper/helper_directory_view_1.svg';
import helper_directory_view_2 from '../Asset/helper/helper_directory_view_2.svg';
import helper_directory_view_3 from '../Asset/helper/helper_directory_view_3.svg';
import helper_directory_view_4 from '../Asset/helper/helper_directory_view_4.svg';
import helper_download_assist_1 from '../Asset/helper/helper_download_assist_1.svg';
import helper_setting_1 from '../Asset/helper/helper_setting_1.svg';
import helper_setting_2 from '../Asset/helper/helper_setting_2.svg';
import helper_virtual_directory_1 from '../Asset/helper/helper_virtual_directory_1.svg';
import helper_virtual_directory_2 from '../Asset/helper/helper_virtual_directory_2.svg';

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
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    helpMainMiddleSection:{
        height:'500px',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        
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
        height:'400px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    helpMainSubtitleSection:{
        width:'100%',
        height:'100px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    helpMainStepperSection:{
        width:'100%',
        height: '50px',
    }

}));
const menuTitles=['디렉토리 뷰 도움말', '다운로드 어시스트 도움말', '자동 폴더 정리 도움말', '설정 도움말','가상 디렉토리 도움말']
const menuSubtitles = [
    ['디렉토리 바에서는 타이틀 바를 클릭해서 기능을 시작할 수 있어요!','폴더를 클릭해서 다음 폴더로 진행!','폴더를 우클릭해서 메뉴를 선택할 수도 있어요.','오른쪽의 검색 & 필터 팝업을 통해 검색과 필터를 동시에!'],
    ['다운로드 어시스트의 도움말은 공사중이에요 ;ㅁ;'],
    ['자동 폴더 정리의 도움말은 공사중이에요 ;ㅁ;'],
    ['패스파인더의 설정은 다양한 기능을 제공한답니다.', '빨간 버튼을 누를 때에는 주의하세요!'],
    ['가상 디렉토리에서는 폴더를 자유자재로 움직일 수 있어요.', '가상 디렉토리의 폴더를 우클릭해서 기능을 사용해보세요!']
];
const contents = [[helper_directory_view_1, helper_directory_view_2,helper_directory_view_3,helper_directory_view_4],[helper_download_assist_1],[helper_aps_1],[helper_setting_1, helper_setting_2],[helper_virtual_directory_1,helper_virtual_directory_2]]
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
                        <Typography variant={'h6'}>
                            {menuTitles[mainContents]}
                        </Typography>
                        <IconButton onClick={props.closeOnClick}>

                        </IconButton>
                    </div>
                    <div className={classes.helpMainMiddleSection}>
                            <div className={classes.helpMainContentSection}>
                                <Paper className={classes.helpMainContentSection} elevation={0}>
                                {/*도움말 메인 콘텐츠 섹션*/}
                                    <img src={contents[mainContents][activeStep]} alt='help main contents'/>
                                </Paper>
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
                            <Button size="small" onClick={handleNext} disabled={activeStep === menuSubtitles[mainContents].length-1}>
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
import React,{useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Paper, Typography, Button, Divider} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Scrollbars from 'react-custom-scrollbars';
import {motion} from 'framer-motion';
const useStyles = makeStyles((theme) => ({
    popupRoot:{
        height :'480px',
        width : '400px',
    },
    popupRootPaper:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection :'column',
        padding:'20px'
    },
    initText:{
        height : '20px',
        width:'100%',
    },
    buttons:{
        marginTop : '5px',
        marginBottom:'20px',
        height : '40px',
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'flex-start',
        backgroundColor:theme.palette.background.default,
    },
    detailPaper:{
        height : '180px',
        width:'100%',
        backgroundColor:theme.palette.background.default,
        padding:'10px',
    },
    endButtonDiv:{
        marginTop:'5px',
        width:'100%',
        display:'flex',
        justifyContent :'center',
    }
}));

export default function DownloadPopup(props){
    const classes = useStyles();
    const theme = useTheme();
    return(<>
            <div className={classes.popupRoot}>
                <Paper className={classes.popupRootPaper}>
                    <Typography style={{marginBottom:'20px', display:'flex', flexDirection:'row',alignItem:'center', justifyContent:'flex-start'}} variant='h6' className={classes.initText} align='left'>
                        <HelpIcon style={{marginRight:'10px'}}/>
                        파일을 어떻게 저장할까요?
                        </Typography>
                    <Typography variant='subtitle2' className={classes.initText} align='left'> 다운로드 파일명 </Typography>
                    <Divider marginBottom="10px"></Divider>
                
                    {/*TODO*/}
                    {/*버튼 온클릭 구현 : 다운로드한 파일 이름 변경*/}
                    <Button className={classes.buttons}>
                                <Typography variant='subtitle2' align='left'>
                                    dev.file.name
                                    {/*TODO*/}
                                    {/*버튼내부에 파일명 텍스트 세팅 함수 구현*/}
                                </Typography>
                    </Button>
                    <Typography variant='subtitle2' className={classes.initText} align='left'> 저장될 디렉토리 </Typography>
                    <Divider marginBottom="10px"></Divider>
                
                    {/*TODO*/}
                    {/*버튼 온클릭 구현 : 다운로드한 파일 저장 디렉토리 변경*/}
                    <Button className={classes.buttons}>
                                <Typography variant='subtitle2' align='left'>
                                    dev.file.downloadDirectory
                                    {/*TODO*/}
                                    {/*버튼내부에 다운로드 디렉토리 경로 세팅 함수 구현*/}
                                </Typography>
                    </Button>
                    <Typography variant='subtitle2' className={classes.initText} align='left'> 파일 상세정보 </Typography>
                    <Divider marginBottom="10px"></Divider>
                    <Scrollbars>
                        <Paper className={classes.detailPaper} elevation={0} >
                            {/* 타이포 그래피 안에 파일의 디테일을 보여주는 함수 추가 */}
                            <Typography variant='subtitle2'>
                                dev.file.details
                            </Typography>
                        </Paper>
                    </Scrollbars>
                    <motion.div className={classes.endButtonDiv}
                        whileHover={{scale:1.2}}
                        whileTap={{scale:0.9, opacity:0.9}}
                    >
                        {/*TODO*/}
                        {/*버튼 온클릭 구현 : 완료버튼/ 종료하고 메인프로그램에 넘김*/}
                        <div style={{backgroundColor:theme.palette.background.default,borderRadius:'15px'}}>
                            <Typography variant='button' style={{margin:'20px'}} noWrap={true}> 이대로 저장해주세요 </Typography>
                        </div>
                    </motion.div>
                </Paper>
            </div>
        </>
    );
}
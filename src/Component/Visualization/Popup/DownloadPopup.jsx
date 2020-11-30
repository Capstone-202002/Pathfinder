import React,{useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Paper, Typography, Button, Divider} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Scrollbars from 'react-custom-scrollbars';
import {motion} from 'framer-motion';
import { updateDlHistoryPlace } from "../../API/db";
import { openDirectorySelectDialog, changeFileDirectory } from "../../API/io";
const useStyles = makeStyles((theme) => ({
    popupRoot:{
        height :'480px',
        width : '400px',
        backgroundColor:'#0090FF'
    },
    popupRootPaper:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection :'column',
        padding:'20px',
        borderTopRightRadius:'80px',
        borderTopLeftRadius:'0px',
        borderBottomRightRadius:'0px',
        borderBottomLeftRadius:'0px',
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
    function fileInfoRenderer(){
        if (props.fileInfo == null) {
            return (<Typography variant='subtitle2'>null</Typography>)
        }
        else {
            return  (<>
            <Typography variant='subtitle2'>
                확장자: {props.fileInfo.extension}
            </Typography>
            <Typography variant='subtitle2'>
                다운로드 초기 경로: {props.fileInfo.pathj}
            </Typography>
            <Typography variant='subtitle2'>
                다운로드 URL: {props.fileInfo.URL}
            </Typography>
        </>)
        }
    }
    function setDir(){
        const _path = require("path");
        openDirectorySelectDialog((result) => {
            if (!result.canceled) {
                console.log(result.filePaths[0]);
                console.log(props);
                updateDlHistoryPlace(props.fileID, result.filePaths[0]);
                changeFileDirectory(_path.dirname(props.fileInfo.path), result.filePaths[0], props.fileName);
                props.popupSubmit();
            }
        })
    }

    function onClickHandler(num){
        const _path = require("path");
        updateDlHistoryPlace(props.fileID, props.recList[num].place);
        // 파일 실제적으로 위치 이동시키는 로직 추가하면됨
        changeFileDirectory(_path.dirname(props.fileInfo.path), props.recList[num].place, props.fileName);
        props.popupSubmit();
    }
    function recListRenderer(){
        console.log('askl;dfja;ksldfja;sdfklajsfdl;k', props.recList);
        if (props.recList == []){
            return (<><Button className={classes.buttons}>
                        <Typography variant='subtitle2' align='left'>
                            추천된 경로값이 없습니다.
                            {/*TODO*/}
                            {/*버튼내부에 다운로드 디렉토리 경로 세팅 함수 구현*/}
                        </Typography>
                    </Button></>)
        }
        else {
            var recL = props.recList.map((rec, index) => (
                <>
                <Button className={classes.buttons} onClick={() => onClickHandler(index)} style={{marginBottom:'0px'}}>
                <Typography variant='subtitle2' align='left'>
                    {rec.place}
                    {/*TODO*/}
                    {/*버튼내부에 다운로드 디렉토리 경로 세팅 함수 구현*/}
                </Typography>
                </Button>
                </>
            ))
            return (recL.slice(0, 3))
        }
    }
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
                                    {props.fileName}
                                    {/*TODO*/}
                                    {/*버튼내부에 파일명 텍스트 세팅 함수 구현*/}
                                </Typography>
                    </Button>
                    <Typography variant='subtitle2' className={classes.initText} align='left'> 저장될 디렉토리를 클릭하세요 </Typography>
                    <Divider marginBottom="10px"></Divider>
                
                    {/*TODO*/}
                    {/*버튼 온클릭 구현 : 다운로드한 파일 저장 디렉토리 변경*/}
                    {recListRenderer()}

                    <Typography variant='subtitle2' className={classes.initText} align='left' style={{marginTop:'20px'}}> 파일 상세정보 </Typography>
                    <Divider marginBottom="10px"></Divider>
                    <Scrollbars>
                        <Paper className={classes.detailPaper} elevation={0} >
                            {fileInfoRenderer()}
                            {/* 타이포 그래피 안에 파일의 디테일을 보여주는 함수 추가 */}
                        </Paper>
                    </Scrollbars>
                    <motion.div className={classes.endButtonDiv}
                        whileHover={{scale:1.2}}
                        whileTap={{scale:0.9, opacity:0.9}}
                    >
                        {/*TODO*/}
                        {/*버튼 온클릭 구현 : 완료버튼/ 종료하고 메인프로그램에 넘김*/}
                        <div style={{backgroundColor:theme.palette.background.default,borderRadius:'15px'}}>
                            <Typography variant='button' style={{margin:'20px'}} noWrap={true} onClick={setDir}> 직접 디렉토리를 지정할게요 </Typography>
                        </div>
                    </motion.div>
                </Paper>
            </div>
        </>
    );
}
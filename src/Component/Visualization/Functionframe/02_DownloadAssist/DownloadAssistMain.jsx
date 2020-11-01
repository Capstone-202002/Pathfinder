import React, {useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Paper, Typography, Button, Divider, Switch} from '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid';
import {Scrollbars} from 'react-custom-scrollbars';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles((theme) => ({
    downloadAssistWrapper:{
        width:'100%',
        minHeight:'100%'
    },
    mainPaper:{
        width:'100%',
        //minHeight : '100%',
        padding : '30px',
        paddingBottom : '0px',
        display : 'flex',
        flexDirection : 'column',
    },
    baseDownloadDirectoryWrapper:{
        width : '100%',
        height : '80px',
        display :'flex',
        flexDirection :'column',
    },
    baseDownloadDirectoryText:{
        height : '20px',
        width:'100%',
    },
    baseDownloadDirectorySet:{
        marginTop : '5px',
        height : '40px',
        width : '100%',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'flex-start',
        backgroundColor:theme.palette.background.default,
    },
    baseDownloadDirectoryOutputBusControlWrapper:{
        width : '100%',
        height : '90px',
        marginBottom:'30px',
    },
    baseDownloadDirectoryOutputBusControlSet:{
        width:'100%',
        height : '60px',
        marginTop : '5px',
        backgroundColor :'red'
    },
    willDownloadDirectoryRecommendationWrapper:{
        height : '130px',
        width : '100%',
        marginBottom : '30px',
        display:'flex',
        flexDirection :'row',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor:theme.palette.background.default,
        borderRadius :'15px'
    },
    downloadHistorySectionWrapper:{
        minHeight : '300px',
        width : '100%',
    },
    downloadHistoryDataGrid:{
        marginTop:'5px',
        width : '100%',
        marginBottom:'30px'
    }
}));

export default function DownloadAssistMain(props){
    const classes = useStyles();
    //assist : 디렉토리 자동 추천 기능 사용여부
    const [state, setState] = React.useState({
        assist: true,
    });
    const handleChange = (event) =>{
        setState({...state, [event.target.name]: event.target.checked});
    };
    const columns = [
        {field:'name', headerName:'이름', width : 130},
        {field:'type', headerName:'확장자',width:110},
        {field:'size', headerName:'크기', width : 110},
        {field:'time', headerName:'다운로드 일시', width : 170},
        {field:'dir', headerName:'저장위치', width : 450},
    ]

    //다운로드 히스토리를 DB에 저장해야함
    //다운로드 히스토리를 DB로부터 불러와서 아래와 같은 형태로 내보내야함
    //ID값은 row고유값을 가짐
    const rows = [
        {id:1,name:'testData', type:'.jpg', size:'20mb',time:'2020.03.24. 22:00', dir:'D:/helpme/'}
    ]
    return (
        <>
            <Scrollbars>
            <div className={classes.downloadAssistWrapper}>
                <Paper className={classes.mainPaper} elevation={0}>
                    <div className={classes.baseDownloadDirectoryWrapper}>
                        {/*기본 다운로드 디렉토리 섹션*/}
                        <Typography variant='subtitle2' className={classes.baseDownloadDirectoryText} align='left'> 기본 다운로드 디렉토리 </Typography>
                        <Divider marginBottom="10px"></Divider>
                        {/*TODO*/}
                        {/*버튼 온클릭 구현 : 누르면 기본 다운로드 경로를 변경함*/}
                        <Button className={classes.baseDownloadDirectorySet}>
                            <FolderIcon></FolderIcon>
                            <Typography variant='subtitle2' align='left'>
                                dev.Directory Name
                                {/*TODO*/}
                                {/*버튼내부에 기본 다운로드 디렉토리 텍스트 붙여넣기*/}
                            </Typography>
                        </Button>
                    </div>
                    <div className={classes.baseDownloadDirectoryOutputBusControlWrapper}>
                        {/*다운로드폴더 규칙 지정 섹션*/}
                        <Typography variant='subtitle2' className={classes.baseDownloadDirectoryText} align='left'> 여기서 기본 다운로드 폴더의 규칙을 지정할 수 있어요. </Typography>
                        <Divider marginBottom="10px"></Divider>
                        <div className = {classes.baseDownloadDirectoryOutputBusControlSet}>

                            {/*TODO*/}
                            {/*Applied Sortistics 관련 기능 집어넣기*/}
                        </div>
                    </div>
                    <div className={classes.willDownloadDirectoryRecommendationWrapper}>
                        <Typography style={{marginRight:'30px'}}variant='subtitle1' align='left'>
                                PathFinder의 스마트한 다운로드 경로 추천을 받으실래요?
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                괜찮아요.
                        </Typography>
                        <Switch
                            checked={state.assist}
                            onChange={handleChange}
                            name = "assist"
                        ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                좋아요!
                        </Typography>
                        {/*경로추천 기능 on/off 섹션*/}
                    </div>
                    <div className={classes.downloadHistorySectionWrapper}>
                        {/* 다운로드 히스토리 섹션 */}
                        <Typography variant='subtitle2' className={classes.baseDownloadDirectoryText} align='left'> 다운로드 히스토리 </Typography>
                        <Divider marginBottom="10px"></Divider>
                        <DataGrid className={classes.downloadHistoryDataGrid} rows={rows} columns={columns} checkboxSelection ></DataGrid>
                    </div>
                </Paper>
            </div>
            </Scrollbars>
        </>
    );
}
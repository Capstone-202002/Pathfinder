import React, {useState, useEffect} from "react";
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import {Paper, Typography, Button, Divider, Switch, Slider} from '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid';
import {Scrollbars} from 'react-custom-scrollbars';
import FolderIcon from '@material-ui/icons/Folder';
import {motion} from 'framer-motion';
import { SelectDlHistoryAll } from "../../../API/db";
import {useTracked, setValue} from '../../../../SettingContext';
const path = require('path');
const { app } = window.require('electron').remote;
const appPath = app.getPath('userData');
const storage = window.require('electron-json-storage');
storage.setDataPath(appPath);
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
        marginBottom:'30px',
        '& .MuiDataGrid-columnsContainer':{
            backgroundColor:theme.palette.background.default
        }
    },
    downloadedFileAutoDeleteSlider:{
        width:'100%',
        marginTop:'50px',
    },
    dataGridHeader:{
        backgroundColor:theme.palette.background.default
    },
    dataGridCell:{
        backgroundColor:theme.palette.background.paper
    },
}));

export default function DownloadAssistMain(props){
    const [settings, setSettings] = useTracked();
    storeSettings(settings)
    const handleToggle=(event)=>{
        const targetName = event.target.name;
        const targetValue = event.target.checked;
        setSettings((s)=>(
            {
            ...s,
            [targetName]:targetValue,
        }
        ))
        //storeSettings()
    }
    function storeSettings(value){
        console.log(value)
        console.log(JSON.stringify(value))
        setValue(value)
        storage.set('config',value,function(err){console.log('setValueInSetting'); console.log(err)})
    }   
    const PrettoSlider = withStyles({
        root: {
          color: '#52af77',
          height: 8,
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          marginTop: -8,
          marginLeft: -12,
          '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
          },
        },
        active: {},
        valueLabel: {
          left: 'calc(-50% + 4px)',
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
        },
      })(Slider);
    const classes = useStyles();
    //assist : 디렉토리 자동 추천 기능 사용여부
    const [state, setState] = React.useState({
        assist: true,
    });
    const handleChange = (event) =>{
        setState({...state, [event.target.name]: event.target.checked});
    };


    //State: autoDelete : 기본 다운로드 디렉토리에서 해당 기간동안 삭제되지 않는 놈은 자동으로 삭제됨
    //TODO : 해당 일수를 받아서 실제 백그라운드에서 이용할것
    const [autoDelete, setAutoDelete] = useState(30);
    const handleAutoDeleteChange = (event, value) =>{
        setAutoDelete(value);
        console.log(value);
    };

    const columns = [
        {field:'name', headerClassName:classes.dataGridHeader, headerName:'이름', width : 170},
        {field:'type', headerClassName:classes.dataGridHeader,headerName:'확장자',width:110},
        {field:'url', headerClassName:classes.dataGridHeader,headerName:'다운로드 URL', width : 190},
        {field:'dir', headerClassName:classes.dataGridHeader,headerName:'저장위치', width : 350},
    ];
    var downloadHistory;
    SelectDlHistoryAll((result)=>downloadHistory=result);
    console.log(downloadHistory);
    var dlHistoryRenderer = downloadHistory.map((renderInfo, index)=>(
        createData(renderInfo.ID, renderInfo.Filename, renderInfo.Extension,renderInfo.URL, renderInfo.Place)
    ));
    
    //다운로드 히스토리를 DB에 저장해야함
    //다운로드 히스토리를 DB로부터 불러와서 아래와 같은 형태로 내보내야함
    //ID값은 row고유값을 가짐
    function createData(dhid, dhname, dhtype, dhurl, dhdir){
        return {id:dhid, name:dhname, type:dhtype, url:dhurl, dir:dhdir}
    }
    const rows = dlHistoryRenderer;
    useEffect(()=>{
        props.systemText('DownloadAssistReady');
    })
    return (
        <>
            
            <motion.div className={classes.downloadAssistWrapper}
                initial={{x:-250, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{delay:0.2, duration : 0.5}}
            >
                <Scrollbars>
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
                    {/*
                    <div className={classes.baseDownloadDirectoryOutputBusControlWrapper}>
                        
                        <Typography variant='subtitle2' className={classes.baseDownloadDirectoryText} align='left'> 여기서 기본 다운로드 폴더의 규칙을 지정할 수 있어요. </Typography>
                        <Divider marginBottom="10px"></Divider>
                    
                    <div className = {classes.baseDownloadDirectoryOutputBusControlSet}>

                            
                        </div>
                    </div>
                     */}
                    {/*
                    <div className={classes.baseDownloadDirectoryOutputBusControlWrapper}>
                        
                        <Typography variant='subtitle2' className={classes.baseDownloadDirectoryText} align='left'> 다운로드 된 파일 중 자동으로 정리되지 않은 파일은 며칠 뒤에 삭제할까요? (0으로 설정할 경우 삭제하지 않습니다.)</Typography>
                        <Divider marginBottom="10px"></Divider>
                        <div className = {classes.downloadedFileAutoDeleteSlider}>
                            <PrettoSlider valueLabelDisplay='on' defaultValue={30} max={365} onChangeCommitted={handleAutoDeleteChange}/>
                        </div>
                    </div>
                    */}
                    
                    <div className={classes.willDownloadDirectoryRecommendationWrapper}>
                        <Typography style={{marginRight:'30px'}}variant='subtitle1' align='left'>
                                PathFinder의 스마트한 다운로드 경로 추천을 받으실래요?
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                괜찮아요.
                        </Typography>
                        <Switch
                            checked={settings.downloadPathAssist}
                            onChange={handleToggle}
                            name = "downloadPathAssist"
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
                        <DataGrid className={classes.downloadHistoryDataGrid} rows={rows} columns={columns} checkboxSelection disableSelectionOnClick></DataGrid>
                    </div>
                </Paper>
                </Scrollbars>
            </motion.div>
            
        </>
    );
}
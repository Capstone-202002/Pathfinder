import React, {useEffect, useForceUpdate} from "react";
import Box from '@material-ui/core/Box';
import {sizing} from '@material-ui/system';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { CssBaseline, Paper } from "@material-ui/core";
import LeftMenu from './LeftMenu';
import TopMenu from './TopMenu';
import SystemMessage from './SystemMessage';
import { Scrollbars } from 'react-custom-scrollbars'
import { SettingsPowerSharp } from "@material-ui/icons";
import {useTracked} from '../../../SettingContext';
//임시용
import Visualization from '../Visualization';
import DownloadAssistMain from '../Functionframe/02_DownloadAssist/DownloadAssistMain';
import AppliedSortisticsMain from '../Functionframe/03_AppliedSortistics/AppliedSortisticsMain';
import SettingsMain from '../Functionframe/04_Settings/SettingsMain';
import VirtualDirectoryMain from '../Functionframe/00_VirtualDirectory/VirtualDirectoryMain';
import { getFileList, openDirectorySelectDialog } from "../../API/io";
//임시용

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
        //minHeight: 600,
        color : '#0090FF',
        backgroundColor : '#0090FF'
        
    },
    //except system message
    app:{
        display: 'flex',
        //height: "100%",
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
        display: 'flex',
        flexDirection : 'row',
        height: 60,
        width : "100%",
        WebkitUserSelect : "none",
        //WebkitAppRegion : "drag",
        //alignItems:'left'
    },
    //Main function area
    display: {
        display: 'flex',
        width : "100%",
        height : 'calc(100% - 60px)',
        backgroundColor: theme.palette.background.paper,
        overflow:'auto'
    },
    //System Message area
    message:{
        width : "100%",
        height : 20,
        overflow: 'hidden'
    },
    inner:{
        flexBasis: "auto",
        width : "100%",
        height : "100%"
    }
}))

export default function Mainframe(props){
    const [settings, setSettings] = useTracked();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [programCount, setProgramCount] = React.useState(0);
    const [systemState, setSystemState]= React.useState('Online');
    //menu State: LeftMenu.jsx 로부터 동기화 하여 visualization.jsx 로 넘겨줘야 함
    const [menu, setMenu] = React.useState(4);
    //왼쪽 메뉴로부터 값 읽어오기
    function settingInitiation(){
        if(programCount===0){
            //setSystemState('ready');
            setMenu(3);
            setMenu(4);
            setSettings((s)=>({
                ...s,
                pathfinderTheme : getTheme(settings.pathfinderTheme)
            }))
            setSettings((s)=>({
                ...s,
                pathfinderTheme : getTheme(settings.pathfinderTheme)
            }))
            setProgramCount(9);
            return;
        }
    }
    function getTheme(bool){
        if(bool){
            return false;
        }
        else{
            return true;
        }
    }
    function getMenu(data){
        
        //console.log(menu)
        setMenu(data);
        //props.menu(data);
    }
    function getSystemText(data){
        setSystemState(data);
    }
    function setSystemText(){
        switch(systemState){
            case 'ready':
                return '패스파인더가 시스템을 준비중이에요.'
            case 'Online':
                return '패스파인더가 준비되었습니다.'
            case 'VirtualDirectoryReady':
                return '패스파인더가 가상 디렉토리를 준비했어요.'
            case 'VisualizationReady':
                return '패스파인더가 디렉토리를 뒤적이고 있어요.'
            case 'DownloadAssistReady':
                return '패스파인더가 다운로드 패킷을 확인하고 있어요.'
            case 'AppliedSortisticsReady':
                return '패스파인더가 필터를 준비했습니다.'
            case 'SettingReady':
                return '패스파인더가 사용자의 설정을 받아적을 준비를 했어요.'
            case 'SearchAndFilter':
                return '패스파인더가 폴더와 파일을 분류하고 있어요.'
            default:
                return '패스파인더가 디렉토리를 뒤적이고 있어요'
        }
    }

    const [titleText, setTitleText] = React.useState("클릭하여 탐색할 디렉토리를 설정하세요");
    const [defaultRenderSection, setDefaultRenderSection] = React.useState([]);
    const [defaultPathTracker, setDefaultPathTracker] = React.useState([]);
    function titleHandler() {
        openDirectorySelectDialog((result) => {
            if (!result.canceled) {
                setTitleText(result.filePaths[0])
                //setDirName(result.filePaths[0]);
                let newDirInfo = getFileList(result.filePaths[0]);
                setDefaultRenderSection([newDirInfo]);
                setDefaultPathTracker([]);
                setMenu(1); // forceUpdate를 위한 state 변환... 다른 방법 찾으면 수정 예정
                setMenu(0);
            }
        })
    }

    function setContents() {
        //console.log(menu);
        setTimeout(settingInitiation,600)
        //setSystemState('Online')
        if (menu === 0) {
          //setSystemState('VisualizationReady');
          return (<>
            {/*Directory Analysis*/}
            <Visualization defaultRenderSection={defaultRenderSection} defaultPathTracker={defaultPathTracker} systemText={getSystemText}/>
          </>
          );
        }
        else if (menu === 1) {
          return (<>
            {/*DownloadAssist*/}
            <DownloadAssistMain systemText={getSystemText}/>
          </>);
        }
        else if (menu === 2) {
          return (<>
    
            {/*Applied Sortistics*/}
            <AppliedSortisticsMain systemText={getSystemText}/>
          </>);
        }
        else if (menu === 3) {
          return (<>
    
            {/*Settings*/}
            <SettingsMain systemText={getSystemText}/>
          </>);
        }
        else if (menu === 4) {
          return (<>
            {/*Virtual Directory*/}
            <VirtualDirectoryMain systemText={getSystemText}/>
          </>)
        }
    }

    

    document.body.style.backgroundColor = "transparent";
    document.body.style.color = "transparent";
    function setTitleButtonDisable(){
        if(menu!==0){
            return true;
        }
        else{
            return false;
        }
    }
    
    return(
        <Paper className={classes.root} color="#0090FF" style={{borderBottomLeftRadius : '160px'}}>
            
            <Paper className={classes.app} style={{borderBottomLeftRadius : '140px'}}>
                {/* application space*/}
                <div className={classes.menu}>
                    {/*App's Left Menu Section*/}
                    <LeftMenu menu={getMenu}/>
                </div>
                <div className={classes.right}>
                    {/*App's Right Display Section*/}
                    <div className={classes.title}>
                        {/*title bar section*/}
                        <TopMenu mainText={titleText} onTitleClicked={titleHandler} disable={setTitleButtonDisable()}/>
                    </div>
                    
                    <div className={classes.display}>
                        {/*App's Main function display Section*/}
                        {setContents()}
                    </div>


                </div>
            </Paper>
            <div className={classes.message}>
                {/*system message space*/}
                <SystemMessage systemText={setSystemText()}/>
            </div>
        </Paper>
    );
}


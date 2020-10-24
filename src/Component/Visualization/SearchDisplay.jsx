import React, { useState, useEffect } from "react";
import {makeStyles, useTheme, withStyles} from  '@material-ui/core/styles';
import { Divider, TextField, Typography} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import Scrollbars from "react-custom-scrollbars";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
const CssTextField = withStyles({
    root:{
        '& label.Mui-focused': {
            color: '#ffffff',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff',
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
          },
        },
          
})(TextField);
const useStyles = makeStyles((theme) => ({
    searchDisplayMainWrapper:{
        display:'flex',
        flexDirection:'column',
        paddingLeft:'20px',
        paddingRight:'20px',
        paddingTop:'20px',
    },
    
    horizonWrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems : 'center',
        marginBottom: theme.spacing(2),
    },

    topBottomMargins:{
        marginBottom : theme.spacing(2)
    }

}));

export default function SearchDisplay(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [overByte, setOverByte] = useState(1);
    const handleOverChange = (event) =>{
        setOverByte(event.target.value);
    }
    const [underByte, setUnderByte] = useState(1);
    const handleUnderChange = (event) =>{
        setUnderByte(event.target.value);
    }
    // const [searchName, setSearchName] = useState('');
    // const [searchExt, setSearchExt] = useState('');
    // const [searchMinVol, setSearchMinVol] = useState(0);
    // const [searchMaxVol, setSearchMaxVol] = useState(0);
    const [state, setState] = React.useState({
        searchName: '',
        searchExt: '',
        searchMinVol: 0,
        searchMaxVol: 0
    });

    function setAllElementToInitialState() {
        setState({
            ...state,
            searchName: '',
            searchExt: '',
            searchMinVol: 0,
            searchMaxVol: 0,
        });
    }

    function handleInputChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }
    useEffect(() => {
        props.searchChanger(state, overByte, underByte);
    }, [state, overByte, underByte])


    const [nameChangeNumber, setNameChangeNumber] = React.useState(0);
    const handleNameChangeNumberChange = (event) =>{
        setNameChangeNumber(event.target.value);
    }

    return(
        <>
            <Scrollbars>
            <div className={classes.searchDisplayMainWrapper}>
                    <Typography>텍스트로 검색</Typography>

                    <Divider className={classes.topBottomMargins}></Divider>
                    {/* 파일이름 검색 텍스트 필드가 존재하는 곳. 내부값은 id로 검색하는 게 빠름 */}
                    <CssTextField id="searchDisplayNameTextField"
                            label="이름"
                            //defaultValue=""
                            helperText="파일이름으로 검색할 수 있어요"
                            variant="outlined"
                            
                            value={state.searchName}
                            name='searchName'
                            onChange={handleInputChange}
                            
                            className={classes.topBottomMargins}
                            >
                    </CssTextField>
                    {/* 파일 확장자 검색 텍스트 필드가 존재하는 곳. 내부값은 id로 검색하는 게 빠름 */}
                    <CssTextField id="searchDisplayTypeTextField"
                            label="확장자"
                            defaultValue=""
                            helperText="확장자명으로 검색할 수 있어요"
                            variant="outlined"
                            
                            value={state.searchExt}
                            name='searchExt'
                            onChange={handleInputChange}

                            className={classes.topBottomMargins}
                            >
                    </CssTextField>
                    <Typography>용량으로 검색</Typography>

                    <Divider className={classes.topBottomMargins}></Divider>

                    
                    <div className={classes.horizonWrapper}>
                         {/* ~바이트 '이상' 을 감지하는 텍스트 필드가 존재하는 곳. 내부값은 id로 검색하는 게 빠름 */}
                        <CssTextField id="searchDisplayOverByteTextField"
                                label="이상"
                                defaultValue="0"
                                helperText=""
                                value={state.searchMinVol}
                                name='searchMinVol'
                                onChange={handleInputChange}                               
                                className={classes.topBottomMargins}
                                >
                        </CssTextField>
                        {/* ~바이트 '이상' 을 감지하는 셀렉터가 있음. 0,1,2,3,4 값으로 각각 단위를 나타냄 */}
                        <Select
                            value={overByte}
                            onChange={handleOverChange}
                            id = 'searchDisplayOverByteSelect'
                        >
                            <MenuItem value={1}> BYTE </MenuItem>
                            <MenuItem value={1000}> KB </MenuItem>
                            <MenuItem value={1e+6}> MB </MenuItem>
                            <MenuItem value={1e+9}> GB </MenuItem>
                            <MenuItem value={1e+12}> TB </MenuItem>
                        </Select>
                    </div>
                    <div className={classes.horizonWrapper}>
                        {/* ~바이트 '이하' 를 감지하는 텍스트 필드가 존재하는 곳. 내부값은 id로 검색하는 게 빠름 */}
                        <CssTextField id="searchDisplayUnderByteTextField"
                                label="이하"
                                defaultValue="0"
                                helperText=""
                                value={state.searchMaxVol}
                                name='searchMaxVol'
                                onChange={handleInputChange}                                
                                className={classes.topBottomMargins}
                                >
                        </CssTextField>
                        {/* ~바이트 '이하' 를 감지하는 셀렉터가 있음. 0,1,2,3,4 값으로 각각 단위를 나타냄 */}
                        <Select
                            value={underByte}
                            onChange={handleUnderChange}
                            id = 'searchDisplayUnderByteSelect'
                        >
                            <MenuItem value={1}> BYTE </MenuItem>
                            <MenuItem value={1000}> KB </MenuItem>
                            <MenuItem value={1e+6}> MB </MenuItem>
                            <MenuItem value={1e+9}> GB </MenuItem>
                            <MenuItem value={1e+12}> TB </MenuItem>
                        </Select>
                    </div>





                    <Typography>선택된 파일 이름 일괄 변경</Typography>

                    <Divider ></Divider>
                    <Typography marginTop = '2px' variant='caption'>이름을 입력한 후, 접미 숫자의 자릿수를 설정해주세요. (ex. 파일이름, 3자리 {">"} 파일이름001.txt)</Typography>
                    <div className={classes.horizonWrapper}>
                        {/* 파일이름 변경 접두 텍스트 */}
                        <CssTextField id="searchDisplayChangeNameTextField"
                                label="파일 이름"
                                defaultValue=""
                                helperText=""                               
                                className={classes.topBottomMargins}
                                >
                        </CssTextField>
                        {/* ~접미 자릿수 셀렉터가 있음. 0,1,2,3,4 값으로 각각 단위를 나타냄 */}
                        <Select
                            value={nameChangeNumber}
                            onChange={handleNameChangeNumberChange}
                            id = 'searchDisplayNameChangeNumberSelect'
                        >
                            <MenuItem value={0}> 1자리 </MenuItem>
                            <MenuItem value={1}> 2자리 </MenuItem>
                            <MenuItem value={2}> 3자리 </MenuItem>
                            <MenuItem value={3}> 4자리 </MenuItem>
                            <MenuItem value={4}> 5자리 </MenuItem>
                        </Select>
                        <Button onClick={nameChangeButtonClicked}> 변경 </Button>
                    </div>


                    <Button onClick={setAllElementToInitialState}>초기화</Button>
                </div>
            </Scrollbars>
        </>

    );
}

function nameChangeButtonClicked(){
    //TODO
}
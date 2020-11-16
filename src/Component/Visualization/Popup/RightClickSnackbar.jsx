import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function RightClickSnackbar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    function returnAction(){
        if(props.SnackbarType==='DirectoryAnalysis'){
            return (
                <>
            <Button size="small">
                가상 디렉토리로
            </Button>
            <Button size="small">
                폴더 탐색
            </Button>
            <Button size="small">
                탐색기에서 열기
            </Button>
            <Button size="small">
                삭제
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
            </IconButton>
        </>
            );
        }
        else if(props.SnackbarType==='VirtualDirectory'){
            return (
                <>
                    <Button color="primary" size="small">
                        탐색기에서 열기
                    </Button>
                    <Button color="secondary" size="small">
                        가상 디렉토리에서 삭제
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                    </IconButton>
                </>);
        }
    }
    function handleOpen(){
        if(props.isFolderClicked){
            setOpen(true)
        }
    }   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

  return (
    <div className={classes.root}>

      <Snackbar message="패스파인더가 어떤 동작을 할까요?" open={props.folderOpen} onClose={handleClose} action={returnAction()} anchorOrigin={{vertical:'bottom', horizontal:'center'}}/>
    </div>
  );
}
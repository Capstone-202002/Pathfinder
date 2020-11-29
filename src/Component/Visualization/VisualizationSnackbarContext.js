import React from 'react';

export const SnackbarContext = React.createContext({
    open : false,
    toggleOpen : ()=>{this.open=true},
    toggleClose: ()=>{this.open=false}
})
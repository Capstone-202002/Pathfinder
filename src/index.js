import React from "react";
import ReactDOM from "react-dom";
import HookTest from "./hooktest";
import * as serviceWorker from "./serviceWorker";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core";
import RalewayRegular from './Component/Fonts/Raleway-Regular.ttf';
import NanumGothicRegular from './Component/Fonts/NanumGothic-Regular.ttf';

const raleway = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${RalewayRegular}) format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
const nanum ={
  fontFamily: 'NanumGothic',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('NanumGothic'),
    local('NanumGothic-Regular'),
    url(${NanumGothicRegular}) format('truetype')
  `,
  unicodeRange:
    'U+1100-11FF, U+3000-303F, U+3130-318F, U+3200-32FF, U+A960-A97F,U+AC00-D7AF,	U+D7B0-D7FF,	U+FF00-FFEF'
};
const theme = createMuiTheme({
  palette: {
    type : "dark"
  },
  typography: {
    fontFamily:['RaleWay, Arial', 'NanumGothic, Arial']
  },
  overrides:{
    MuiCssBaseline:{
      '@global':{
        '@font-face':[raleway,nanum],
      },
    }
  }
  
});



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <HookTest />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
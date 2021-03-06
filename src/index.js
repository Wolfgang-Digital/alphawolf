import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#2ea861',
      light: '#57b980',
      dark: '#207543'
    },
    secondary: {
      main: '#bf3da7',
      light: '#cb63b8',
      dark: '#852a74'
    },
    light: '#fafafa',
    dark: '#333'
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </MuiThemeProvider>, 
  document.getElementById('root')
);
serviceWorker.register();

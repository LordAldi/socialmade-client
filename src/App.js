import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

//component
import Navbar from './components/Navbar';


const theme =createMuiTheme({
  palette: {
    primary:{
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
    
  },
  typography: {
    useNextVariants: true
  }
  
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
      <Router>
      <Navbar/>
        <div className='container'>
          <Switch>
            <Route exact path="/" component={ home}/>
            <Route path="/login" component={login}/>
            <Route path="/signup" component={signup}/>
          </Switch>
        </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;

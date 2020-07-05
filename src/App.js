import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'

//redux
import {Provider} from 'react-redux'
import store from './redux/store'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
//component
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute'


const theme =createMuiTheme(themeFile)

const token = localStorage.FBIdToken;
let authenticated 
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false
  }else {
    authenticated = true
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
        <Navbar/>
          <div className='container'>
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute path="/login" component={login} authenticated={authenticated}/>
              <AuthRoute path="/signup" component={signup} authenticated={authenticated}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

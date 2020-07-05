import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

//component
import Navbar from './components/Navbar';

function App() {
  return (
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
  );
}

export default App;

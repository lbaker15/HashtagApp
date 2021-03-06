import './App.css';
import './components/login.css';
import React from 'react';
import {Button} from 'reactstrap';
import {HashRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import FbLogin from './components/fbLogin';
import Login from './components/login';
import Dashboard from './components/dashboard';

class App extends React.Component {
  state = {
    loggedIn: false,
    accessToken: '',
    loggedOut: false
  }
  redirectPage = (value) => {
    this.setState({
      loggedIn: value
    })
  }
  redirectPageLogout = (value) => {
    this.setState({
      loggedOut: value
    })
  }
  setAccess = (number) => {
    this.setState({
      accessToken: number
    })
  }
  render() {
    const {loggedIn, loggedOut, accessToken} = this.state;
    let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
    let access = localStorage.getItem('access')
    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render={(props) => {
        //This will need to be document.cookie AND accesstoken
        if (cookie && access) {
          return <Component {...props} {...rest} />
        } else {
          return <Redirect to={{pathname: '/', state: {from: props.location} }} />
        }
      }}/>  
    )
      return (
        // IF NAVIGATE TO PAGE NOT LOGGED IN - ALWAYS REDIRECT TO LOGIN THEN DASHBOARD
        <Router basename='/'>
          <Switch>
                <Route exact path="/">
                  
                    <div className="form">
                    <div className="rowMine">
                      <Login showBtn={this.showBtn} />
                    </div>
                    </div>
                  
                </Route>       
                <Route path="/fb">
                    {/* FB NEEDS TO  BE PROTECTED SO CANT ACCESS WITHOUT COOKIE */}
                    <div className="form">
                    <div className="rowMine">
                      <FbLogin loggedIn={loggedIn} redirectPage={this.redirectPage} redirectPageLogout={this.redirectPageLogout} setAccess={this.setAccess} accessToken={accessToken} />
                    </div>
                    </div>
                  
                </Route>
                {/* MAKE SO CANT ACCESS WITH COOKIE AND WINDOW FB */}
                <PrivateRoute component={Dashboard} path='/dashboard' loggedOut={loggedOut} redirectPageLogout={this.redirectPageLogout} redirectPage={this.redirectPage} accessToken={accessToken} />
          </Switch>
        </Router>
      )
  }
}

export default App;

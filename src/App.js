import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Home/Home';
import Profile from './Profile/Profile';
import { Nav } from './Nav/Nav';
import React from 'react';
import { Auth } from './Auth/Auth';
import { withRouter } from 'react-router';
import Callback from './Callback/Callback';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(props.history)
  }
  render() {
    return (
      <div className="App">
        <Nav auth={this.auth}/>
       <Switch>
         <Route path="/profile" component={Profile}/>
         <Route path="/callback" render={props => (<Callback auth={this.auth} {...props}/>)} exact={true}/>
         <Route path="/" render={props => (<Home auth={this.auth} {...props}/>)} exact={true}/>
       </Switch>
      </div>
    );
  }
  
}

export default withRouter(App);

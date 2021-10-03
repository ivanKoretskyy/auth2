import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './Home/Home';
import Profile from './Profile/Profile';
import { Nav } from './Nav/Nav';
import React from 'react';
import { Auth } from './Auth/Auth';
import { withRouter } from 'react-router';
import Callback from './Callback/Callback';
import { Public } from './Public/Public';
import { Private } from './Private/Private';
import { Courses } from './Courses/Courses';

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
         <Route path="/profile"
            render={props => this.auth.isAuthenticated()
              ? <Profile auth={this.auth} {...props}/>
              : <Redirect to="/"/>
              }/>
         <Route path="/callback" render={props => (<Callback auth={this.auth} {...props}/>)} exact={true}/>
         <Route path="/" render={props => (<Home auth={this.auth} {...props}/>)} exact={true}/>
         <Route path="/public" component={Public}/>
          <Route
            path="/private"
            render={props => this.auth.isAuthenticated()
              ? <Private auth={this.auth} {...props} />
              : <Redirect to="/"/>
            }/>
          <Route
            path="/courses"
            render={props => (this.auth.isAuthenticated() && this.auth.userHasScope(['read:courses']))
              ? <Courses auth={this.auth} {...props} />
              : <Redirect to="/"/>
            }/>
       </Switch>
      </div>
    );
  }
  
}

export default withRouter(App);

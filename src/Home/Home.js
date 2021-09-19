import React from "react";

import { NavLink } from 'react-router-dom';

import s from './Home.module.scss';

export class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        {
          this.props.auth.isAuthenticated() 
          ? <NavLink to="/profile" className={s.link} activeClassName={s.selected}>Go to Profile</NavLink>
          : <button onClick={this.props.auth.login}>LogIn</button>
        }
        
      </div>
    )
    
  }
}
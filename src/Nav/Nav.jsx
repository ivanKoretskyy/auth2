import classNames from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import s from './Nav.module.scss';

export const Nav = (props) => {

  return (
    <div className={s.navBar}>
      <div className={s.pages}>
        <NavLink to="/" exact={true} className={s.link} activeClassName={s.selected}>Home</NavLink>
        <NavLink to="/profile" className={s.link} activeClassName={s.selected}>Profile</NavLink>
        <NavLink to="/public" className={s.link} activeClassName={s.selected}>Public</NavLink>
        {props.auth.isAuthenticated() && <NavLink to="/private" className={s.link} activeClassName={s.selected}>Private</NavLink>}
        {props.auth.isAuthenticated() && props.auth.userHasScope(['read:courses']) && <NavLink to="/courses" className={s.link} activeClassName={s.selected}>Courses</NavLink>}
      
      </div>
     
      <div className={s.rightSide}>
        {props.auth.isAuthenticated()
          ? <button onClick={props.auth.logout}>logOut</button>
          : <button onClick={props.auth.login}>Login</button>}
        </div>
    </div>
  )
}
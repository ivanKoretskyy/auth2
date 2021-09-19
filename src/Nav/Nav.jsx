import classNames from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import s from './Nav.module.scss';

export const Nav = (props) => {
  console.info(props)
  return (
    <div className={s.navBar}>
      <div className={s.pages}>
        <NavLink to="/" exact={true} className={s.link} activeClassName={s.selected}>Home</NavLink>
        <NavLink to="/profile" className={s.link} activeClassName={s.selected}>Profile</NavLink>
      </div>
     
      <div className={s.rightSide}>
        {props.auth.isAuthenticated()
          ? <button onClick={props.auth.logout}>logOut</button>
          : <button onClick={props.auth.login}>Login</button>}
        </div>
    </div>
  )
}
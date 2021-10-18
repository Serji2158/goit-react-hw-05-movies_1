import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navigation.module.css'

const Navigation = () => (
  <nav>
    <NavLink
      exact
      to="/"
      className={s.navigationListItemLink}
      activeClassName={s.navigationListItemLinkActive}
    >
      Home
    </NavLink>

    <NavLink
      to="/movies"
      className={s.navigationListItemLink}
      activeClassName={s.navigationListItemLinkActive}
    >
      Movies
    </NavLink>

  </nav>
);



export default Navigation;


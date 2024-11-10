import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import routes from '../../routes'
import "./title.css"; 

const Title = ({route, sub}) => {
    const r = route;
    const location = useLocation(); // Get the current path
    const currentPath = location.pathname;

    if(!sub){
        sub = [

        ];
    }

    const subMenu = (children) => children.map((r_sub) => {
        if(r_sub){
            return (
            <NavLink to={`${r_sub.route}`} className={sub.key !== r_sub.key ? "sub-nav-item" : "sub-nav-item-active" }>
                <img src={`/images/${r_sub.icon}`} className="sub-nav-image"/>
                <span className="sub-nav-linkname" >{r_sub.name}</span>
            </NavLink>);
        }
    });


  return(
    <div className="title-container">
        <div className="title-left">
            <img src={`/images/${r.icon}`} alt="Route icon" className="title-image" />
        </div>
        <div className="title-content">
            <div className="title-right">
                <h1 className="title-name">{r.name}</h1>
            </div>
            <div className="sub-navigation">
                <nav className="sub-nav-menu">
                {subMenu(r.children)}
                </nav>
            </div>
        </div>
    </div>
  );
}

export default Title;
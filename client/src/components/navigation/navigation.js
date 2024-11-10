import React, {useEffect, useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import routes from '../../routes'
import './navigation.css';



const Navigation = ({isSidebarVisible, toggleSidebar}) => {
    const [isAdmin, setisAdmin] = useState(sessionStorage.getItem('isAdmin') || 0);
    const location = useLocation(); // Get the current path
    const currentPath = location.pathname.split("/")[1];;
    
    const getRoutes = (allRoutes) => allRoutes.map((route) => {
        if(route.collapse){
            return getRoutes(route.collapse);
        }
        
        if(route.admin)
            if(!isAdmin)
                return null;

        if(route.route){
            var progress = 0;
            if(route.total_sets != 0)
                progress = (route.completed_sets / route.total_sets) * 100;
            if(route.sets){
                return (
                    <li className={!route.bottom ? "nav-item" : "nav-item-bottom"}>
                        <div className={currentPath !== route.key ? "nav-progress" : "nav-progress-active" }>
                            <NavLink to={route.route} className="nav-link">
                                <div className="nav-progress-bar" style={{ width: `${progress}%` }}></div>
                                <div className="nav-progress-text">
                                    <img src={`/images/${route.icon}`} alt="Route icon" className={isSidebarVisible ? "nav-image" : "nav-image-hidden"} />
                                    <span className="nav-linkname" hidden={!isSidebarVisible}>{route.name}</span>
                                    <span className="nav_completation" hidden={!isSidebarVisible}>{route.completed_sets}/{route.total_sets}</span>
                                </div>
                            </NavLink>
                        </div>
                    </li>);
            }
            else {
                return (
                    <li className={!route.bottom ? "nav-item" : "nav-item-bottom"}>
                        <div className={currentPath !== route.key ? "nav-progress" : "nav-progress-active" }>
                            <NavLink to={route.route}>
                                <div className="nav-progress-text">
                                    <img src={`/images/${route.icon}`} alt="Route icon" className={isSidebarVisible ? "nav-image" : "nav-image-hidden"} />
                                    <span className="nav-linkname" hidden={!isSidebarVisible}>{route.name}</span>
                                </div>
                            </NavLink>
                        </div>
                    </li>
                );
            }
        }
    
        return null;
    });
    
    
    return(
        <div className="navbar">
            <nav>
                <ul>
                    {getRoutes(routes)}
                </ul>
            </nav>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isSidebarVisible ? 'Hide' : 'Show'}
            </button>
        </div>
    );
}

export default Navigation;

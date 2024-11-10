import React from 'react';
import "./admin.css"; 
import { NavLink, useLocation } from 'react-router-dom';
import Activity from './components/addActivities';

const Admin = () => {
    const location = useLocation(); // Get the current path
    const currentPath = location.pathname.split("/")[1];;
    return(
        <div className="admin-container">
            <Activity />
        </div>
    );
}

export default Admin;
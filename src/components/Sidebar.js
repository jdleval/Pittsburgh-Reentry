import { NavLink } from 'react-router-dom';

//styles and pictures
import './Sidebar.css';
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import Admin from '../assets/admin_panel_settings_black_24dp.svg';
import Resume from '../assets/build_resume.svg';
import FindWork from '../assets/find_work.svg';
import Housing from '../assets/housing.svg';
import Support from '../assets/support.svg';
import Treatment from '../assets/treatment.svg';
import Unauthorized from '../pages/unauthorized/Unauthorized';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from './Avatar.js';

import React from 'react';

export default function Sidebar() {
  const {user} = useAuthContext()

  return (
    <div className="sidebar">
      <div className="sidebar-content">
      {user && 
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey, {user.displayName}</p>
        </div>
        }
        <nav className="links">
          <hr />
          <h3>Paths</h3>
          <ul>
            <li>
              <NavLink to="/housing">
                <img src={Housing} alt="hosing icon" />
                <span>Find Housing</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/support">
                <img src={Support} alt="support icon" />
                <span>Find Support</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/treatment">
                <img src={Treatment} alt="hosing icon" />
                <span>Find Treatment</span>
              </NavLink>
            </li>
          </ul>
          <hr />
          <ul>
            <h3>Find Work</h3>
            <li>
              <NavLink to="/resume">
                <img src={Resume} alt="resume icon" />
                <span>Build A Resume</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/jobsearch">
                <img src={FindWork} />
                <span>Search Job Listings</span>
              </NavLink>
            </li>
          </ul>
          <hr />
          <ul>
            <h3>Current Projects</h3>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
          <hr />
          <ul>
            <li>
              <NavLink to="/admin">
                <img src={Admin} alt="admin icon" />
                <span>Admin</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

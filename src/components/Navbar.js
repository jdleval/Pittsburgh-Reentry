import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

//styles and images
import './Navbar.css';
import Logo from '../assets/logo2.png';

import React from 'react';

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Logo} alt="logo" />
          <span>pittsburghreeentry.com</span>
        </li>

        {!user && (
          <>
            <li className="link">
              <Link to="/login">Login</Link>
            </li>
            <li className="link">
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Loading...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}

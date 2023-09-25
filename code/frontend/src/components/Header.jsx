import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    // This only checks if there is something in `user`. Not anywhere safe for production of course.
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.stringify(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return ( 
    user ? (
    <header className='nav-header'>
        <nav className='nav'>
            <NavLink to="/home" className='nav-link'>Home</NavLink>
            <NavLink to="/logout" className='nav-link'>Log out</NavLink>
        </nav>
    </header>
    ) : (
      <header className='nav-header'><h2 className='login-title'>Log in</h2></header>
    )
  )
}

export default Header
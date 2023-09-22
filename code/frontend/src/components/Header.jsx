import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className='nav-header'>
        <nav className='nav'>
            <NavLink to="/" className='nav-link'>Home</NavLink>
            <NavLink to="/login" className='nav-link'>Log in</NavLink>
        </nav>
    </header>
  )
}

export default Header
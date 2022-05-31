import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='container mt-2'>
        <ul className='d-flex'>
            <li className='mx-1 fw-bold'>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li className='mx-1 fw-bold'>
                <NavLink to='/create'>Crear</NavLink>
            </li>
        </ul>

    </nav>
  )
}

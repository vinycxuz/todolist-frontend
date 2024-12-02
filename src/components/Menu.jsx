import React from 'react';
import { Link } from 'react-router';

const Menu = () => {
  return (
    <nav className='flex w-full justify-center'>
      <ul className='flex w-2/4 justify-between'>
        <li className='font-semibold'>
          <Link to="/">Login</Link>
        </li>
        <li className='font-semibold'>
          <Link to="/register">Register</Link>
        </li>
        <li className='font-semibold'>
          <Link to="/tasks">Tasks</Link>
        </li>
        <li className='font-semibold'>
          <Link to="/tasks/create">Create Task</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
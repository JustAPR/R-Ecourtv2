import React from 'react';
import Button from './Button';

const Header = (props) => {
  return (
    <header className='header'>
      {/* <h2>{props.title}</h2> */}
      <h1>Task tracker</h1>
      <Button color='green' text='Add'/>
    </header>

  )
    }
  
export default Header;

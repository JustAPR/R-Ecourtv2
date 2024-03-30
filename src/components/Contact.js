import React from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';

const Info = styled.div`
border-sizing:border-box;
border:2px solid black;
  margin-left:10px;
  margin-right:10px;
  padding: 15px;
  color:#081c15;

`;

const Cont = styled.div`
  margin-top: 60px; 
  padding: 20px;
`;

const Contact = () => {
  return (
    <Cont>
      <Info>
        <p> <h3>e-mail : </h3>g-158@gmail.com</p> <br />
<p> <h3>Contact Details : </h3>245522748004 </p>
        </Info>
    </Cont>
  );
};

export default Contact;




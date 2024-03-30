import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const StyledContent = styled.div`
  margin-top:50px;
  margin-bottom:20px;
  margin-left:15px;
  margin-right:15px;
`;

const Info = styled.p`
padding:15px;
box-sizing:border-box;
border:3px solid black;

`;

const Judges = () => {
  return (
    <StyledContent>
      <Navbar />
      <Info>
        </Info>
    </StyledContent>
  );
};

export default Judges;





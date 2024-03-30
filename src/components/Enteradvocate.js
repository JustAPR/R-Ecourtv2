import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
`;

const ButtonsContainer = styled.div`
  text-align: center;
`;

const Button = styled.button`
  width:150px;
  height:120px;
  margin: 80px;
  padding: 10px 20px;
  font-size: 20px;
  font-weight:600;
  border-sizing:border-box;
  border:3px solid black;
  border-radius:25px;
  &:hover{
    background-color: #4caf50;
    color:white;
    border:white;
  }
`;

const Enteradvocate=()=>{
    const handleNewButtonClick = () => {
        console.log("clicked 1");
        window.location.href = '/new';
        
      };
    
      const handleExistingButtonClick = () => {
        console.log("clicked 2");
        window.location.href = '/Navbar2';

      };
    
      return (
        <Container>
          <ButtonsContainer>
            <Button onClick={handleNewButtonClick}>New</Button>
            <Button onClick={handleExistingButtonClick}>Exist</Button>
          </ButtonsContainer>
        </Container>
      );
  
}

export default Enteradvocate;

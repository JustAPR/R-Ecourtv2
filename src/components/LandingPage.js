import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import clientImage from './patient.png';
import advocateImage from './advocate.png';
import registrarImage from './judge.png';
import judgeImage from './judge.png';

const LandingContainer = styled.div`
background-color:#212529;
background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const LogoButton = styled(Link)`
  display: block;
  background-color:#eb1e30;
  border: 2px solid white;
  color: #fff;
  padding: 15px;
  margin: 10px;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  &:hover{
    border: 2px solid white;
    background-color:#4caf50;
  }

`;

const LandingPage = () => {
  return (
    <LandingContainer>
      <Column>
        <Image src={clientImage} alt="Client" />
        <LogoButton to="/login">Client</LogoButton>
      </Column>

      <Column>
        <Image src={advocateImage} alt="Advocate" />
        <LogoButton to="/login2">Advocate</LogoButton>
      </Column>

      <Column>
        <Image src={registrarImage} alt="Registrar" />
        <LogoButton to="/login3">Registrar</LogoButton>
      </Column>

    </LandingContainer>
  );
};

export default LandingPage;

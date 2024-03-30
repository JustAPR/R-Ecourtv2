// FirstPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import law from './statue.jpg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align items to the top */
  background: url('https://thefactfactor.com/wp-content/uploads/2019/02/Justice-001.png') no-repeat center center fixed;
  background-size: cover; /* Cover the entire container */
  /* Add a pseudo-element to create the blur effect */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(5px); /* Apply blur effect */
    z-index: -1; /* Ensure the blur is in the background */
  }
  /* Ensure the content itself isn't blurred by positioning it above the pseudo-element */
  position: relative;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  flex: 1; /* Take up remaining space */
  height: 70vh;
  width: 10vh;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: 30px;
`;

const Heading = styled.h4`
  font-size: 22px;
  margin-left: 20px;
  color: white;
`;

const ContentBox = styled.div`
  max-width: 850px;
  margin: 100px auto;
  padding: 20px;
  border: 2px solid #212529;
  border-radius: 8px;
  color:#081c15;
  background-color: #fff;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
`;

const ContentParagraph = styled.p`
  font-size: 16px;
  line-height: 2.5;
  color: #333;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 18px;
  margin-left: 50px;
  margin-right: 40px;
  cursor: pointer;

  &:hover {
    border-sizing: border-box;
    border: 2px solid white;
    border-radius: 8px;
    padding: 4px;
    background-color: white;
    color: black;
  }
`;

const CaseCountWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  margin-bottom:30px;
`;
const LinksBox = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center; 
  width: 230px;
  margin: 50px 30px;
  padding: 25px;
  border: 2px solid #212529;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);

`;



const BoxLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color:#081c15;
  padding:13px;
  font-size: 15px;
  font-weight: 700;
  border: 2px solid white; 
  border-radius: 10px; 
  &:hover{
    background-color:#007bff;
  }
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  background-color: #212529;
  color: black;
`;

const CaseCountBox = styled.div`
  flex: 0;
  padding: 15px;
  border: 2px solid #212529;
  border-radius: 8px;
  margin-left: 20px;
  background-color: #fff;
  text-align: center;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
`;

const CaseCountTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;
  color: #212529;
`;

const CaseCountNumber = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #007bff; /* Change the color as needed */
`;



const Footer = styled.footer`
  background-color: #212529;
  color: white;
  padding: 10px;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const pendingCivilCases = 100;
const pendingCriminalCases = 50;
const pendingFamilyCases = 30;


const FirstPage = () => {
  return (
    <div>
      <Navbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={law} alt="law" />
          <Heading>CaseForCase</Heading>
        </div>

        <Navigation>
          <NavItem to="/about">About us</NavItem>
          <NavItem to="/contact">Contact Us</NavItem>
          <NavItem to="/landing">Login / Signup</NavItem>
        </Navigation>
      </Navbar>

      <Container>
        <ContentWrapper>
          <ContentBox>
            <ContentParagraph>
              Welcome To Case For Case, Ensuring Security and Justice,
            </ContentParagraph>
          </ContentBox>
        </ContentWrapper>
      </Container>
        

      <Footer>
        &copy;    Designed and Developed by G-158
      </Footer>
    </div>
  );
};

export default FirstPage;

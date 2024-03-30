import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


const NavItem = styled.div`
  margin-bottom: 10px; /* Add some space between rows */
`;

const Button = styled.button`
  font-family: 'Poppins', sans-serif;
  border-radius:15px;
  background-color:#ffff;
  padding: 10px;
  font-size: 20px;
  font-weight:500;
  cursor: pointer;
  &:hover{
    backgound-color:green;
  }
`;

const RowContainer = styled.div`
  // display: flex;
  // justify-content: space-between;
  background-image:linear-gradient(#858e96,#60696b);
  padding: 20px;
`;
const AdvocateContainer = styled.div`
display: flex;
  justify-content: space-between;
  margin-bottom:40px;

`;

const Navigation = () => {
  return (
    <div>
      <NavItem>
        <RowContainer>
          <AdvocateContainer>
            <NavLink to="/advocatelist" activeClassName="active-link">
              <Button>Advocates list</Button>
            </NavLink>
            <NavLink to="/Casestatus" activeClassName="active-link">
              <Button>Case status</Button>
            </NavLink>
            <NavLink to="/Documents" activeClassName="active-link">
              <Button>Documents</Button>
            </NavLink>
          </AdvocateContainer>
          <AdvocateContainer>
            <NavLink to="/Messages" activeClassName="active-link">
              <Button>Messages</Button>
            </NavLink>
            <NavLink to="/mycalendar" activeClassName="active-link">
              <Button>Calendar</Button>
            </NavLink>
            <NavLink to="/Profile" activeClassName="active-link">
              <Button>Profile</Button>
            </NavLink>
          </AdvocateContainer>
        </RowContainer>
      </NavItem>


    </div>
  );
};

export default Navigation;

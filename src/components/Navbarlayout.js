import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Advocates from './Advocates';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
`;

const NavbarContainer = styled.div`
  flex-shrink: 0;
  flex-basis: 200px;
  background-color: #333;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const Navbarlayout = () => {
    return (
        <LayoutContainer>
            <NavbarContainer>
                <Navbar />
            </NavbarContainer>
            <ContentContainer>
                <Routes>
                    <Route path="/Navbar" element={<Navbar />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/Advocates" element={<Advocates />} />
                </Routes>
            </ContentContainer>
        </LayoutContainer>
    );
}

export default Navbarlayout;

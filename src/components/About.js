import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
border-sizing:border-box;
border:2px solid black;
  margin-left:30px;
  margin-right:30px;
  padding: 20px;
  color:#081c15;
  font-size:3 0px;
`;

const Cont = styled.div`
  margin-top: 60px; 
  padding: 20px;
  height: 100px;
`;
const About = () => {
    return (
        <Cont>
            <Info>
                <h3>CaseForCase: E-Portal for Case Management</h3>
                <p>Welcome to <strong>CaseForCase</strong> – a comprehensive e-portal designed for efficient and effective case management. This platform is tailored for legal professionals, people seeking a streamlined approach to manage, track, and report on various cases.
                <p><strong>Features</strong></p></p>
                <p>1)Case Tracking:** Real-time tracking of case statuses.</p>
                <p>2)Document Management:** Securely store and easily access case-related documents.</p>
<p>3)Customizable Dashboards:** Tailor the interface to meet individual or organizational needs.</p>
<p>4)User-Friendly Interface:** Intuitive design ensures ease of use for all skill levels.</p>
            </Info>
        </Cont>
    );
};

export default About;




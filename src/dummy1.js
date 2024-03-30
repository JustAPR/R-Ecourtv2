// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Navbar from './Navbar';
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';
// import Advocates from './Advocates';
// import styled from 'styled-components';

// const LayoutContainer = styled.div`
//   display: flex;
// `;

// const NavbarContainer = styled.div`
//   flex-shrink: 0;
//   flex-basis: 200px;
//   background-color: #333;
// `;

// const ContentContainer = styled.div`
//   flex-grow: 1;
//   padding: 20px;
// `;

// const Navbarlayout = () => {
//     return (

//         <LayoutContainer>
//             <NavbarContainer>
//                 <Navbar />
//             </NavbarContainer>
//             <ContentContainer>
//                 <Routes>
//                     <Route path="/Navbar" element={<Navbar />} />
//                     <Route path="/" element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/contact" element={<Contact />} />
//                     <Route path="/Advocates" element={<Advocates />} />
//                 </Routes>
//             </ContentContainer>
//         </LayoutContainer>

//     );
// }

// export default Navbarlayout;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Loginpage from './components/loginpage';
// import Signup from './components/signup';
// import Navbarlayout from'./components/Navbarlayout';


// const App = () => {
//   return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Loginpage />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/components" element={<Navbarlayout />} />
    //   </Routes>
    // </Router>

//   );
// };

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import styled from 'styled-components'
// import About from './components/About';
// import Contact from './components/Contact';
// import Advocates from './components/Advocates';

// const LayoutContainer = styled.div`
//   display: flex;
// `;

// const NavbarContainer = styled.div`
//   flex-shrink: 0;
//   flex-basis: 200px;
//   background-color: #333;
// `;

// const ContentContainer = styled.div`
//   flex-grow: 1;
//   padding: 20px;
// `;
// const App = () => {
//   return (
    // <Router>
    //   <LayoutContainer>
    //     <NavbarContainer>
    //       <Navbar />
    //     </NavbarContainer>
    //     <ContentContainer>
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/about" element={<About />} />
    //         <Route path="/contact" element={<Contact />} />
    //         <Route path="/Advocates" element={<Advocates />} />
    //       </Routes>
    //     </ContentContainer>
    //   </LayoutContainer>
    // </Router>
//   );
// };

// export default App;


<LayoutContainer>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Advocates" element={<Advocates />} />
            <Route path="/advocatelist" element={<AdvocatesList/>}/>
          </Routes>
        </ContentContainer>
      </LayoutContainer>



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import styled from 'styled-components'
import About from './components/About';
import Contact from './components/Contact';
import Advocates from './components/Advocates';
import AdvocatesList from './components/advocatelist';
import Loginpage from './components/loginpage';
import axios from 'axios'

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
const App = () => {
   axios.get('https://reqres.in/api/users?page=2',(req,res)=>{
    console.log(res)
   })

  return (
    <></>
   
  );
};

export default App;
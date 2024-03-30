import React from 'react';
import { createBrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/loginpage';
import Signup from './components/signup';
import Login2 from './components/loginpage2';
import Signup2 from './components/signup2';
import Login3 from './components/loginpage3';
import Signup3 from './components/signup3';
import Firstpage from './components/firstpage';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Navbar3 from './components/Navbar3';
import Contact from './components/Contact';
import AdvocatesList from './components/advocatelist';
import About from './components/About';
import Casestatus from './components/Casestatus' 
import Messages from './components/Messages';
import Documents from './components/Documents';
import Enteradvocate from './components/Enteradvocate';
import New from './components/New';
import CaseFiling from './components/Casefiling';
import ClientsList from './components/Clientslist';
import CasesList from './components/caseslist';
import PendingCases from './components/Pendingcases';
import ForgotPassword from './components/forgotpassword1';
import Casestatus2 from './components/Casestatus2';
import Documents2 from './components/Documents2';
import AcceptedComponent from './components/Acceptedcases';
import IssuingDates from './components/Issuingdates';
import Pretrial from './components/Pretrial';
import Caserecord from './components/Caserecord';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Navbar2" element={<Navbar2 />} />
        <Route path="/Navbar3" element={<Navbar3 />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/login3" element={<Login3 />} />
        <Route path="/signup3" element={<Signup3 />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/advocateslist" element={<AdvocatesList />} />
        <Route path="/about" element={<About />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/casestatus" element={<Casestatus />} />
        <Route path="/casestatus2" element={<Casestatus2 />} />
        <Route path="/uploads" element={<Documents />} />
        <Route path="/uploads2" element={<Documents2 />} />
        <Route path="/entry" element={<Enteradvocate />} />
        <Route path="/new" element={<New />} />
        <Route path="/casefiling" element={<CaseFiling/>} />
        <Route path="/clientslist" element={<ClientsList/>} />
        <Route path="/caseslist" element={<CasesList/>} />
        <Route path="/pendingcases" element={<PendingCases/>} />
        <Route path="/forgot1" element={<ForgotPassword/>} />
        <Route path="/accepted" element={<AcceptedComponent/>} />
        <Route path="/dates" element={<IssuingDates/>} />
        <Route path="/pretrial" element={<Pretrial/>} />
        <Route path="/caserecord" element={<Caserecord/>} />

      </Routes>

  );
}

export default App;

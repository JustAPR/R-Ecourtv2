import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar3 from './Navbar3';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.div`
  max-width: 400px;
  margin: auto;
  background-color:#212529;
  padding: 30px;
  margin-top: 50px;
  border:2px solid black;
  border-radius:8px;
  color:white;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  &:hover{
    background-color:#4caf50;
  }  
`;

const Alert = styled.div`
  margin-top: 10px;
  padding: 10px 90px;
  border-radius: 5px;
  background-color: ${(props) => (props.success ? '#28a745' : '#dc3545')};
  color: #fff;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const IssuingDates = () => {
  const [cnrNumber, setCnrNumber] = useState('');
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadyIssued, setAlreadyIssued] = useState(false);

  const handleSubmit = async () => {
    try {
      // Send data to the server
      await axios.post('http://localhost:5000/api/issuing-dates', {
        cnrNumber,
        day,
        date,
        time,
      });

      // Update state to indicate submission
      setSubmitted(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // HTTP status 409 indicates that the CNR number has already been issued
        setAlreadyIssued(true);
      } else {
        console.error('Error submitting issuing dates:', error);
      }
    }
  };

  const handleAlert = () => {
    if (alreadyIssued) {
      toast.error('Already been issued!');
    } else {
      toast.success('Issuing dates submitted successfully.');
    }
  };
  

  useEffect(() => {
    if (submitted || alreadyIssued) {
      // Call the handleAlert function after submission or if already issued
      handleAlert();
    }
  }, [submitted, alreadyIssued]);

  return (
    <div>
      <Navbar3 />
      <Container>
        <Label htmlFor="cnrNumber">CNR Number:</Label>
        <Input
          type="text"
          id="cnrNumber"
          value={cnrNumber}
          onChange={(e) => setCnrNumber(e.target.value)}
        />

        <Label htmlFor="day">Day:</Label>
        <Input
          type="text"
          id="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />

        <Label htmlFor="date">Date:</Label>
        <Input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Label htmlFor="time">Time:</Label>
        <Input
          type="text"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default IssuingDates;

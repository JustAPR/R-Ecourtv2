import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import Navbar3 from './Navbar3';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  color: white;
  background-color: #212529;
  padding: 30px;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #4caf50;
  }
`;

const EmailSection = styled.div`
  margin-top: 20px;
`;

const EmailTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Email = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const StartMeetingButton = styled.a`
  display: block;
  text-align: center;
  margin-top: 20px;
  text-decoration: none;
  color: white;
  background-color: #007bff;
  padding: 10px;
  border-radius: 4px;
  &:hover {
    background-color: #4caf50;
  }
`;

const Pretrial = () => {
  const [cnrNumber, setCnrNumber] = useState('');
  const [defendantEmail, setDefendantEmail] = useState('');
  const [plaintiffEmail, setPlaintiffEmail] = useState('');
  const [advocateEmail, setAdvocateEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send request to backend to fetch case details based on CNR number
      const response = await axios.post('http://localhost:5000/fetch-case-details', { cnrNumber });
      const { plaintiffName, defendantName, plaintiffAdvocate } = response.data;

      // Use the names to query respective collections for emails
      const plaintiffResponse = await axios.get(`http://localhost:5000/fetch-user-email/${plaintiffName}`);
      const defendantResponse = await axios.get(`http://localhost:5000/fetch-user-email/${defendantName}`);
      const advocateResponse = await axios.get(`http://localhost:5000/fetch-advocate-email/${plaintiffAdvocate}`);

      // Set emails in state
      setPlaintiffEmail(plaintiffResponse.data.email);
      setDefendantEmail(defendantResponse.data.email);
      setAdvocateEmail(advocateResponse.data.email);
    } catch (error) {
      console.error('Error fetching case details:', error);
      // Handle error if case details cannot be fetched
    }
  };

  return (
    <>
      <Navbar3/>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="cnrNumber">CNR Number:</Label>
            <Input
              type="text"
              id="cnrNumber"
              value={cnrNumber}
              onChange={(e) => setCnrNumber(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">Fetch Emails</Button>
        </Form>

        {/* Display defendant, plaintiff, and advocate emails */}
        <EmailSection>
          <EmailTitle>Defendant Email:</EmailTitle>
          <Email>{defendantEmail}</Email>
          <EmailTitle>Plaintiff Email:</EmailTitle>
          <Email>{plaintiffEmail}</Email>
          <EmailTitle>Advocate Email:</EmailTitle>
          <Email>{advocateEmail}</Email>
        </EmailSection>

        <StartMeetingButton href="https://meet.google.com/?pli=1" target="_blank">Schedule Meeting</StartMeetingButton>
      </Container>
    </>
  );
};

export default Pretrial;

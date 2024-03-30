import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar2 from './Navbar2';
import { toast, ToastContainer } from 'react-toastify';

const AdvocateBox = styled.div`
  border: 2px solid black;
  margin: 15px 5px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0);
`;

const Container = styled.div`
  text-align: center;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
`;

const EntryContainer = styled.div`
  width: 490px;
  margin: 0 auto;
  color: white;
  margin-bottom: 40px;
  background-color: #212529;
  border: 2px solid black;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Label = styled.label`
  flex: 1;
  margin-right: 10px;
  font-size: 16px;
`;

const Input = styled.input`
  flex: 2;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 2px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
  margin-bottom:15px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  &:hover{
    background-color:#4caf50;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 6px;
  text-align: center;
  padding:30px;
`;

const TableHeader = styled.th`
  border: 2px solid black;
  padding: 15px;
  text-align: center;
  color: black;
  font-size: 16px;
`;

const TableRow = styled.tr`
    background-color: #f2f2f2;

`;

const TableCell = styled.td`
  text-align: center;
  border: 2px solid black;
  padding: 15px;
  font-size: 16px;
`;

const CaseDetails = ({ caseData, onRemovePlaintiffAdvocate }) => (
  <TableRow key={caseData.cnrNumber}>
    <TableCell>{caseData.cnrNumber}</TableCell>
    <TableCell>{caseData.plaintiffName}</TableCell>
    <TableCell>{caseData.plaintiffAddress}</TableCell>
    <TableCell>{caseData.pmobileNumber}</TableCell>
    <TableCell>{caseData.defendantName}</TableCell>
    <TableCell>{caseData.subject}</TableCell>
    <TableCell>{caseData.issuingDate}</TableCell>
    <TableCell>{caseData.issuingDay}</TableCell>
    <TableCell>{caseData.issuingTime}</TableCell>
    <TableCell>
      <Button onClick={() => onRemovePlaintiffAdvocate(caseData.cnrNumber)}>
        Completed
      </Button>
    </TableCell>
  </TableRow>
);

const AcceptedComponent = () => {

  const [advocateUsername, setAdvocateUsername] = useState('');
  const [password, setPassword] = useState('');
  const [casesData, setCasesData] = useState([]);
  const [showTableHeader, setShowTableHeader] = useState(false);

  const handleFetchCases = async () => {
    if (!advocateUsername || !password) {
      toast.error('Please enter your username and password.', { autoClose: 3000 });
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/login3`, {
        username: advocateUsername,
        password: password
      });

      if (response.data.success) {
        const casesResponse = await axios.get(`http://localhost:5000/api/cases/${advocateUsername}`);
        setCasesData(casesResponse.data);
        setShowTableHeader(true);
      } else {
        toast.error(response.data.message, { autoClose: 3000 });
        setCasesData([]);
        setShowTableHeader(false);
      }
    } catch (error) {
      console.error('Error fetching cases:', error);
      setCasesData([]);
      setShowTableHeader(false);
    }
  };


  const handleRemovePlaintiffAdvocate = async (caseId) => {
    try {
      await axios.post(`http://localhost:5000/api/removePlaintiffAdvocate/${caseId}`);
      // Update the local state after successful removal
      const updatedCasesData = casesData.map((caseItem) => {
        if (caseItem.cnrNumber === caseId) {
          return {
            ...caseItem,
            plaintiffAdvocate: '', // Replace with the actual property you want to remove
          };
        }
        return caseItem;
      });
      setCasesData(updatedCasesData);
      // Show toast notification
      toast.success('Case closed successfully!', { autoClose: 3000 }); // 3000 milliseconds (3 seconds)
    } catch (error) {
      console.error('Error removing plaintiff advocate:', error);
      toast.error('Error removing plaintiff advocate. Please try again.', { autoClose: 3000 });
    }
  };

  return (
    <div>
      <Navbar2 />
      <Container>
        <EntryContainer>
          <InputContainer>
            <Label htmlFor="advocateUsername">Enter Username:</Label>
            <Input
              type="text"
              id="advocateUsername"
              value={advocateUsername}
              onChange={(e) => setAdvocateUsername(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">Enter Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputContainer>
          <Button onClick={handleFetchCases}>Fetch Cases</Button>
        </EntryContainer>

        <TableContainer>
          {showTableHeader && (
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>CNR Number</TableHeader>
                  <TableHeader>Plaintiff Name</TableHeader>
                  <TableHeader>Plaintiff Address</TableHeader>
                  <TableHeader>Plaintiff Mobile Number</TableHeader>
                  <TableHeader>Defendant Name</TableHeader>
                  <TableHeader>Subject</TableHeader>
                  <TableHeader>Issuing Date</TableHeader>
                  <TableHeader>Issuing Day</TableHeader>
                  <TableHeader>Issuing Time</TableHeader>
                  <TableHeader>Action</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {casesData.length > 0 ? (
                  casesData.map((caseItem) => (
                    <CaseDetails
                      key={caseItem.cnrNumber}
                      caseData={caseItem}
                      onRemovePlaintiffAdvocate={handleRemovePlaintiffAdvocate}
                    />
                  ))
                ) : (
                  <AdvocateBox>
                    <h3>No cases accepted </h3>
                  </AdvocateBox>
                )}
              </tbody>
            </Table>
          )}
        </TableContainer>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default AcceptedComponent;

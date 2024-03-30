import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import Navbar3 from './Navbar3';

const AdvocateBox = styled.div`
text-align:center;
  padding: 20px;
  margin: 40px 50px;
`;

const Info = styled.div`
  border-sizing: border-box;
  margin-left: 20px;
  margin-right: 20px;
  padding: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #4caf50;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 2px solid black;
  padding: 8px;
`;

const TableCell = styled.td`
  border: 2px solid black;
  padding: 4px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const CasesList = () => {
  const [district, setDistrict] = useState('');
  const [cases, setCases] = useState([]);

  const handleChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to fetch cases for the entered district with count equal to 1
      const response = await axios.get(
        `http://localhost:5000/api/cases?district=${district}&count=1`
      );

      // Update the cases state with the fetched data
      setCases(response.data);
    } catch (error) {
      console.error('Error fetching cases:', error);
      // Handle error fetching cases
    }
  };

  const handleGenerateCNR = async (caseId) => {
    try {
      // Make an API call to generate CNR for the selected case
      const response = await axios.post('http://localhost:5000/api/generate-cnr', { caseId });

      // Update the cases state after successful CNR generation
      setCases((prevCases) => {
        // Find the case by caseId and update its cnrNumber and count
        const updatedCases = prevCases.map((caseItem) =>
          caseItem._id === caseId
            ? { ...caseItem, cnrNumber: response.data.cnrNumber, count: 2 }
            : caseItem
        );
        return updatedCases;
      });

      // Notify user of success (you can use a notification library for better UX)
      toast.success('CNR generated successfully!')
    } catch (error) {
      console.error('Error generating CNR:', error);
      // Handle error generating CNR
    }
  };

  return (
    <>
      <Navbar3 />
      <AdvocateBox>
        <Info>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="district">
              <h3>Select Your District:</h3>
            </Label>
            <StyledSelect name="district" value={district} onChange={handleChange} required>
              <option value="">Select Districts</option>
              <option value="adilabad">Adilabad</option>
              <option value="bhadradri">Bhadradri</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="jagitial">Jagitial</option>
              <option value="jayashankar">Jayashankar</option>
              <option value="jogulamba">Jogulamba</option>
              <option value="kamareddy">Kamareddy</option>
              <option value="karimnagar">Karimnagar</option>
              <option value="khammam">Khammam</option>
              <option value="komarambheem">Komaram Bheem</option>
              <option value="mahabubabad">Mahabubabad</option>
              <option value="mahabubnagar">Mahabubnagar</option>
              <option value="mancherial">Mancherial</option>
              <option value="medak">Medak</option>
              <option value="medchal">Medchal</option>
              <option value="nagarkurnool">Nagarkurnool</option>
              <option value="nalgonda">Nalgonda</option>
              <option value="nirmal">Nirmal</option>
              <option value="nizamabad">Nizamabad</option>
              <option value="peddapalli">Peddapalli</option>
              <option value="rajanna">Rajanna</option>
              <option value="rangareddy">Rangareddy</option>
              <option value="sangareddy">Sangareddy</option>
              <option value="siddipet">Siddipet</option>
              <option value="suryapet">Suryapet</option>
              <option value="vikarabad">Vikarabad</option>
              <option value="wanaparthy">Wanaparthy</option>
              <option value="warangalurban">Warangal Urban</option>
              <option value="warangalrural">Warangal Rural</option>
              <option value="yadadri">Yadadri</option>
            </StyledSelect>
            <Button type="submit">Submit</Button>
          </Form>

          {cases.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <TableHeader>Plaintiff Name</TableHeader>
                  <TableHeader>Defendant Name</TableHeader>
                  <TableHeader>Subject</TableHeader>
                  <TableHeader>Case Type</TableHeader>
                  <TableHeader>Filing Date</TableHeader>
                  <TableHeader>Action</TableHeader>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem) => (
                  <TableRow key={caseItem._id}>
                    <TableCell>{caseItem.plaintiffName}</TableCell>
                    <TableCell>{caseItem.defendantName}</TableCell>
                    <TableCell>{caseItem.subject}</TableCell>
                    <TableCell>{caseItem.caseType}</TableCell>
                    <TableCell>{caseItem.filingDate}</TableCell>
                    <TableCell>
                      {caseItem.count === 1 && (
                        <div>
                          <p>Assign CNR</p>  <br />
                          <Button onClick={() => handleGenerateCNR(caseItem._id)}>
                            Generate CNR
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </Info>
      </AdvocateBox>
      <ToastContainer />
    </>
  );
};

export default CasesList;

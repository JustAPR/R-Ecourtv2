import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from './Navbar';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 2px solid white;
  padding: 18px;
  color: #081c15;
  text-align: center;
  background-color: #212529;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: white;
  }
`;

const TableCell = styled.td`
  border: 2px solid white;
  color: white;
  text-align: center;
  background-color: #212529;
  padding: 18px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 9px 14px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  &:hover {
    background-color: red;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const BackButton = styled.button`
background-color: #4caf50;
color: white;
padding: 10px 12px;
margin-left:20px;
cursor: pointer;
border: none;
border-radius: 8px;
&:hover {
  background-color: red;
}
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AdvocatesList = () => {
  const [advocates, setAdvocates] = useState([]);
  const [selectedAdvocate, setSelectedAdvocate] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    caseOverview: '',
    caseType:'',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch the list of advocates from your API
    const fetchAdvocates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/advocates'); // Replace with your API endpoint
        setAdvocates(response.data);
      } catch (error) {
        console.error('Error fetching advocates:', error);
      }
    };

    fetchAdvocates();
  }, []);

  const handleSelectAdvocate = (advocate) => {
    setSelectedAdvocate(advocate);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save client details to the clientslist collection
      const response = await axios.post('http://localhost:5000/api/clientslist', {
        advocateUsername: selectedAdvocate.username,
        clientUsername: formData.username,
        clientEmail: formData.email,
        caseOverview: formData.caseOverview,
        caseType: formData.caseType,
      });

      if (response.data.success) {
        console.log('Client details saved successfully.');
        // Optionally, you can reset the form and selected advocate state here
        setFormData({
          username: '',
          email: '',
          caseOverview: '',
          caseType: '',
        });
        setSelectedAdvocate(null);
        setShowModal(false);
        window.location.reload(); // Refresh the page after submitting client details
      } else {
        console.error('Error saving client details:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving client details:', error);
    }
  };

  const handleBackButtonClick = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Years of Experience</TableHeader>
              <TableHeader>Cases Dealt With</TableHeader>
              <TableHeader>District</TableHeader>
              <TableHeader>State</TableHeader>
              <TableHeader>Choose</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {advocates.map((advocate) => (
              <TableRow key={advocate._id}>
                <TableCell>{advocate.username}</TableCell>
                <TableCell>{advocate.yearsOfExperience}</TableCell>
                <TableCell>{advocate.casesDealtWith}</TableCell>
                <TableCell>{advocate.district}</TableCell>
                <TableCell>{advocate.state}</TableCell>
                <TableCell>
                  <Button onClick={() => handleSelectAdvocate(advocate)}>Choose</Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>

        {/* Modal for entering client details */}
        {showModal && selectedAdvocate && (
          <ModalOverlay>
            <Modal>
              <form onSubmit={handleFormSubmit}>
                <FormGroup>
                  <label htmlFor="username">Your Registered Username:</label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="email">Your Registered Email:</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="caseType">Case Type:</label>
                  <Input
                    type="text"
                    id="caseType"
                    name="caseType"
                    value={formData.caseType}
                    onChange={handleFormChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="caseOverview">Case Overview:</label>
                  <Input
                    type="text"
                    id="caseOverview"
                    name="caseOverview"
                    value={formData.caseOverview}
                    onChange={handleFormChange}
                    required
                  />
                </FormGroup>
                <Button type="submit">Submit</Button>
                <BackButton onClick={handleBackButtonClick}>Back</BackButton>
              </form>
            </Modal>
          </ModalOverlay>
        )}
      </Container>
    </div>
  );
};

export default AdvocatesList;

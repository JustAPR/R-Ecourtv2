import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar2 from './Navbar2';
import { toast, ToastContainer } from 'react-toastify';

const AdvocateBox = styled.div`
  padding: 20px;
  margin: 20px 60px;
  border-radius: 8px;
`;

const Info = styled.div`
  border-sizing: border-box;
  margin: 40px auto;
  border: 2px solid black;
  background-color: #212529;
  border-radius: 8px;
  padding: 10px;
  width: 500px;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 20px auto;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  flex: 1;
  margin-right: 10px;
`;

const Input = styled.input`
  flex: 2;
  width: 100%;
  padding: 8px;
  border: 3px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin: 5px 10px;
  &:hover {
    background-color: #4caf50;
  }
`;

const DeclineButton = styled(Button)`
  background-color: #dc3545;
  border: 2px solid white;
`;

const Table = styled.table`
text-align:center;
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  border: 2px solid #212529;
  padding: 8px;
  background-color: #212529;
  color: white;
`;

const TableCell = styled.td`
  border: 2px solid #212529;
  padding: 8px;
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

const FormGroupModal = styled(FormGroup)`
  margin-bottom: 0; 
`;

const ReasonInput = styled.textarea`
  width: 300px;
  height: 100px;
  padding: 8px;
  border: 2px solid black;
  border-radius: 8px;
`;

const ClientsList = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clientDetails, setClientDetails] = useState(null);
  const [error, setError] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/validate-advocate', {
        username,
        password,
      });

      if (response.data.success) {
        const response = await axios.get(`http://localhost:5000/api/client-details/${username}`);

        if (response.data.success) {
          setClientDetails(response.data.client);
          setError('');
        } else {
          setClientDetails(null);
          setError(response.data.message || 'No client details found.');
        }
      } else {
        setClientDetails(null);
        setError('Invalid credentials.');
      }
    } catch (error) {
      console.error('Error validating credentials:', error);
      setClientDetails(null);
      setError('Error validating credentials.');
    }
  };

  const handleDeclineCase = async (client) => {
    try {
      if (!client || !client.clientEmail) {
        console.error('Invalid client details or email');
        return;
      }

      // Show the reason modal overlay
      setShowReasonModal(true);
      setSelectedClient(client);
    } catch (error) {
      console.error('Error declining case:', error);
      // Show error toast notification
      toast.error('Error declining case. Please try again.', { autoClose: 3000 });
    }
  };

  const handleSubmitDeclineReason = async (e) => {
    e.preventDefault();

    try {
      // Send the decline reason to the backend
      const emailResponse = await axios.post('http://localhost:5000/api/declined', {
        advocateUsername: username,
        clientUsername: selectedClient.clientUsername,
        to: selectedClient.clientEmail,
        subject: 'Advocate Declined Your Case',
        text: `Dear ${selectedClient.clientUsername},\n\nYour case has been declined by the advocate.\n Reason: ${declineReason}. \n\nPlease choose another advocate for assistance.`,
      });

      if (emailResponse.data.success) {
        console.log('Decline email sent successfully');

        // Clear client details to prevent it from being displayed again
        setClientDetails(null);

        // Show success toast notification
        toast.success('Case declined successfully!', { autoClose: 3000 }); // 3000 milliseconds (3 seconds)

        // Close the reason modal overlay
        setShowReasonModal(false);
      } else {
        console.error('Error sending decline email:', emailResponse.data.message);
        // Show error toast notification
        toast.error('Error sending decline email. Please try again.', { autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error declining case:', error);
      // Show error toast notification
      toast.error('Error declining case. Please try again.', { autoClose: 3000 });
    }
  };

  const handleAcceptCase = async (client) => {
    try {
      if (!client || !client.clientEmail) {
        console.error('Invalid client details or email');
        return;
      }

      const emailResponse = await axios.post('http://localhost:5000/api/accepted', {
        to: client.clientEmail,
        subject: 'Advocate Accepted Your Case',
        text: `Dear ${client.clientUsername},\n\nYour case has been accepted by the advocate. You can now proceed for case filing.`,
      });

      if (emailResponse.data.success) {
        console.log('Email sent successfully');

        // Mark the case as accepted on the backend
        const markAcceptedResponse = await axios.post(`http://localhost:5000/api/mark-case-accepted/${username}`);

        if (markAcceptedResponse.data.success) {
          console.log('Case marked as accepted on the backend');
          // Show success toast notification
          toast.success('Case accepted successfully!', { autoClose: 3000 }); // 3000 milliseconds (3 seconds)
        } else {
          console.error('Error marking case as accepted on the backend:', markAcceptedResponse.data.message);
          // Show error toast notification
          toast.error('Error marking case as accepted on the backend. Please try again.', { autoClose: 3000 });
        }

        // Clear client details to prevent it from being displayed again
        setClientDetails(null);
      } else {
        console.error('Error sending email:', emailResponse.data.message);
        // Show error toast notification
        toast.error('Error sending email. Please try again.', { autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error accepting case:', error);
      // Show error toast notification
      toast.error('Error accepting case. Please try again.', { autoClose: 3000 });
    }
  };


  return (
    <div>
      <Navbar2 />
      <Info>
        <Form onSubmit={handleCredentialsSubmit}>
          <FormGroup>
            <Label htmlFor="username">Enter Username:</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Enter Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </Info>

      {clientDetails && (
        <div>
          <AdvocateBox>
            
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Client Name</TableHeader>
                  <TableHeader>Case Type</TableHeader>
                  <TableHeader>Case Overview</TableHeader>
                  <TableHeader>Action</TableHeader>
                  <TableHeader>Action</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>{clientDetails.clientUsername}</TableCell>
                  <TableCell>{clientDetails.caseType}</TableCell>
                  <TableCell>{clientDetails.caseOverview}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleAcceptCase(clientDetails)}>Accept Case</Button>
                  </TableCell>
                  <TableCell>
                    <DeclineButton onClick={() => handleDeclineCase(clientDetails)}>Decline Case</DeclineButton>
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
          </AdvocateBox>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ToastContainer />

      {/* Reason Modal Overlay */}
      {showReasonModal && (
        <ModalOverlay>
          <Modal>
            <Form onSubmit={handleSubmitDeclineReason}>
              <FormGroup>
                <Label htmlFor="reason">Reason:</Label>
                <ReasonInput
                  id="reason"
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroupModal>
                <Button type="submit">Submit</Button>
                <Button onClick={() => setShowReasonModal(false)}>Cancel</Button>
              </FormGroupModal>
            </Form>
          </Modal>
        </ModalOverlay>
      )}
    </div>
  );
};

export default ClientsList;

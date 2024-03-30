import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar3 from './Navbar3';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  margin: 30px 100px;
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
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

const CountsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CountBox = styled.div`
  margin: 0 50px;
  border: 4px solid black;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const CountLabel = styled.h3`
  margin-bottom: 5px;
  color: #333;
`;

const CountValue = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #007bff;
`;

const CaseDetail = styled.div`
  margin-bottom: 10px;
`;

const CaseDetailsContainer = styled.div`
  margin: 40px 120px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
`;

const CaseDetailLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

const CaseDetailValue = styled.span`
  margin-left: 10px;
  color: #555;
`;

const Caserecord = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [cnrNumber, setCnrNumber] = useState('');
  const [completedCasesCount, setCompletedCasesCount] = useState(0);
  const [dismissalCasesCount, setDismissalCasesCount] = useState(0);
  const [caseDetails, setCaseDetails] = useState(null);
  const [judge, setJudge] = useState('');
  const [decision, setDecision] = useState('');
  const [decisionDate, setDecisionDate] = useState('');
  const [isDecisionFilled, setIsDecisionFilled] = useState(false);
  const [isDecisionDateFilled, setIsDecisionDateFilled] = useState(false);
  const [isJudgeFilled, setIsJudgeFilled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/completed-dismissal-cases?district=${selectedDistrict}`);
      const { completedCount, dismissalCount } = response.data;
      setCompletedCasesCount(completedCount);
      setDismissalCasesCount(dismissalCount);
    } catch (error) {
      console.error('Error fetching completed and dismissal cases:', error);
    }
  };

  const handleCnrNumberSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/case-details?cnrNumber=${cnrNumber}`);
      const caseData = response.data;
      setCaseDetails(caseData);
      setIsDecisionFilled(!!caseData.decision);
      setIsDecisionDateFilled(!!caseData.decisionDate);
      setIsJudgeFilled(!!caseData.judge);
    } catch (error) {
      console.error('Error fetching case details:', error);
    }
  };

  const handleUpdateCaseDetails = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/update-case-details/${cnrNumber}`, {
        judge,
        decision,
        decisionDate
      });
      // Update the case details after successful update
      handleCnrNumberSubmit(e);
    } catch (error) {
      console.error('Error updating case details:', error);
    }
  };

  return (
    <>
      <Navbar3 />
      <Container>
      <CountsContainer>
          <CountBox>
            <CountLabel>Completed Cases:</CountLabel>
            <CountValue>{completedCasesCount}</CountValue>
          </CountBox>
          <CountBox>
            <CountLabel>Dismissed Cases:</CountLabel>
            <CountValue>{dismissalCasesCount}</CountValue>
          </CountBox>
        </CountsContainer>

        <Form onSubmit={handleSubmit}>
          <StyledSelect
            id="district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            required
          >
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

        <Form onSubmit={handleCnrNumberSubmit}>
          <InputField
            type="text"
            placeholder="Enter CNR Number"
            value={cnrNumber}
            onChange={(e) => setCnrNumber(e.target.value)}
            required
          />
          <Button type="submit">Submit CNR Number</Button>
        </Form>

        {caseDetails && (
          <CaseDetailsContainer>
            <h3>Plaintiff details:</h3>
            <div>
              <CaseDetailLabel>Plaintiff Name:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.plaintiffName}</CaseDetailValue>
            </div>
            <div>
              <CaseDetailLabel>Plaintiff Father/Mother Name:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.plaintiffFatherOrMotherName}</CaseDetailValue>
            </div>
            <div>
              <CaseDetailLabel>Plaintiff Caste:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.plaintiffCaste}</CaseDetailValue>
            </div>
            <div>
              <CaseDetailLabel>Plaintiff Advocate:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.plaintiffAdvocate}</CaseDetailValue>
            </div>
            <div>
              <CaseDetailLabel>Plaintiff Address:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.plaintiffAddress}</CaseDetailValue>
            </div>
            <br />
            <h3>Defendant details:</h3>
            <div>
              <CaseDetailLabel>Defendant Name:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.defendantName}</CaseDetailValue>
            </div>
            <div>
              <CaseDetailLabel>Defendant Father/Mother Name:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.defendantFatherOrMotherName}</CaseDetailValue>
            </div>
            <div>
              <CaseDetailLabel>Defendant Caste:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.defendantCaste}</CaseDetailValue>
            </div>
            <div>
              <CaseDetailLabel>Defendant Address:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.defendantAddress}</CaseDetailValue>
            </div>
            <div>
              <CaseDetailLabel>Filing Date:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.filingDate}</CaseDetailValue>
            </div>
            <div>
              <CaseDetailLabel>Subject:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.subject}</CaseDetailValue>
            </div> <br />
            <div>
              <CaseDetailLabel>Progress Level:</CaseDetailLabel>
              <CaseDetailValue>{caseDetails.progressLevel}</CaseDetailValue>
            </div>  <br />
            {isJudgeFilled && (
              <div>
                <CaseDetailLabel>Judge:</CaseDetailLabel>
                <CaseDetailValue>{caseDetails.judge}</CaseDetailValue>
              </div>
            )}
            {isDecisionFilled && (
              <div>
                <CaseDetailLabel>Decision:</CaseDetailLabel>
                <CaseDetailValue>{caseDetails.decision}</CaseDetailValue>
              </div>
            )}
            {isDecisionDateFilled && (
              <div>
                <CaseDetailLabel>Decision Date:</CaseDetailLabel>
                <CaseDetailValue>{caseDetails.decisionDate}</CaseDetailValue>
              </div>
            )}
            {(!isDecisionFilled || !isDecisionDateFilled || !isJudgeFilled) && (
              <Form onSubmit={handleUpdateCaseDetails}>
                {!isJudgeFilled && (
                  <div>
                    <CaseDetailLabel>Judge:</CaseDetailLabel>
                    <InputField
                      type="text"
                      placeholder="Enter Judge Name"
                      value={judge}
                      onChange={(e) => setJudge(e.target.value)}
                      required
                    />
                  </div>
                )}
                {!isDecisionFilled && (
                  <div>
                    <CaseDetailLabel>Decision:</CaseDetailLabel>
                    <InputField
                      type="text"
                      placeholder="Enter Decision"
                      value={decision}
                      onChange={(e) => setDecision(e.target.value)}
                      rows="3"
                      required
                    />
                  </div>
                )}
                {!isDecisionDateFilled && (
                  <div>
                    <CaseDetailLabel>Decision Date:</CaseDetailLabel>
                    <InputField
                      type="date"
                      value={decisionDate}
                      onChange={(e) => setDecisionDate(e.target.value)}
                      required
                    />
                  </div>
                )}
                <Button type="submit">Update Case Details</Button>
              </Form>
            )}
          </CaseDetailsContainer>
        )}
      </Container>
    </>
  );
};

export default Caserecord;





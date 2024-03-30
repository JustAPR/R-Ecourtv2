import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar3 from './Navbar3';

const AdvocateBox = styled.tr`
  border: 2px solid black;
  text-align:center;
`;
const Info = styled.div`
  border-sizing: border-box;
  margin-left: 8px;
  margin-right: 8px;
  padding: 15px;
`;

const PendingCasesWrapper = styled.div`
  padding: 40px;
  margin: 10px 55px;
  border-radius: 10px;
 
`;
const TableHeader = styled.th`
  border: 2px solid black;
  padding: 10px;
`;

const TableCell = styled.td`
  border: 2px solid black;
  padding: 10px;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 10px;
  background-color: #f0f0f0;
  margin-bottom: 25px;
  border-radius: 10px;
  overflow: hidden; /* Ensure the progress bar doesn't exceed its container */
`;

const ProgressLevel = styled.div`
  height: 100%;
  border-radius: 5px;
  background-color: #32CD32; /* Single color for progress level */
  transition: width 0.5s; /* Add transition for smooth animation */
`;

const SubmitLevelButton = styled.button`
  padding: 10px 20px;
  background-color: #212529;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CnrNumberInput = styled.input`
  width: 30%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  border: 2px solid black;
  box-sizing: border-box;
`;

const SelectDistrict = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const RadioButton = styled.input`
  margin-right: 0px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
`;

const OptionText = styled.span`
  margin-right: 20px;
`;

const PendingCases = () => {
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [searchCnrNumber, setSearchCnrNumber] = useState('');
    const [pendingCases, setPendingCases] = useState([]);
    const [progressLevels, setProgressLevels] = useState({});

    useEffect(() => {
        const fetchPendingCases = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cases', {
                    params: {
                        district: selectedDistrict,
                        cnrNumber: searchCnrNumber,
                    },
                });
                setPendingCases(response.data);
                // Fetch progress levels for the fetched cases
                const progressLevelsResponse = await axios.get('http://localhost:5000/api/progress-levels');
                setProgressLevels(progressLevelsResponse.data);
            } catch (error) {
                console.error('Error fetching pending cases:', error);
                // Handle error fetching pending cases
            }
        };

        // Trigger the fetch when either district or CNR number changes
        if (selectedDistrict || searchCnrNumber) {
            fetchPendingCases();
        }
    }, [selectedDistrict, searchCnrNumber]);

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setProgressLevels({}); // Reset progress levels when district changes
    };

    const handleLevelChange = (caseId, level) => {
        setProgressLevels((prevLevels) => ({ ...prevLevels, [caseId]: level }));
    };

    const handleSubmitLevel = async (caseId) => {
        try {
            // Make an API call to update the progress level for the selected case
            await axios.post('http://localhost:5000/api/update-progress', {
                caseId,
                progressLevel: progressLevels[caseId],
            });

            // You may want to refetch the pending cases after updating the progress level
            // For simplicity, refetching all cases here
            const response = await axios.get('http://localhost:5000/api/cases', {
                params: {
                    district: selectedDistrict,
                    cnrNumber: searchCnrNumber,
                },
            });
            setPendingCases(response.data);

            // Fetch updated progress levels for the fetched cases
            const progressLevelsResponse = await axios.get('http://localhost:5000/api/progress-levels');
            setProgressLevels(progressLevelsResponse.data);
        } catch (error) {
            console.error('Error updating progress level:', error);
            // Handle error updating progress level
        }
    };

    return (
        <>
            <Navbar3 />

            <Info>
                <PendingCasesWrapper>
                    <h2>Pending Cases:</h2> <br />
                    <SelectDistrict
                        name="district"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        required
                    >
                        <option value="">Select Your District</option>
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
                    </SelectDistrict>

                    <label htmlFor="cnrNumber">Search by CNR Number: </label>
                    <CnrNumberInput
                        type="text"
                        id="cnrNumber"
                        value={searchCnrNumber}
                        onChange={(e) => setSearchCnrNumber(e.target.value)}
                    />

                    <table>
                        <thead>
                            <tr>
                                <TableHeader>Case Number</TableHeader>
                                <TableHeader>Filing Date</TableHeader>
                                <TableHeader>Progress</TableHeader>
                                <TableHeader>Action</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingCases.map((caseItem) => (
                                <AdvocateBox key={caseItem._id}>
                                    <TableCell>{caseItem.cnrNumber}</TableCell>
                                    <TableCell>{caseItem.filingDate}</TableCell>
                                    <TableCell>
                                        <ProgressBar>
                                            <ProgressLevel
                                                style={{
                                                    width: `${progressLevels[caseItem._id] === 'firstCourt'
                                                        ? '25%'
                                                        : progressLevels[caseItem._id] === 'pending'
                                                            ? '50%'
                                                            : progressLevels[caseItem._id] === 'completed'
                                                                ? '100%'
                                                                : progressLevels[caseItem._id] === 'dismissal'
                                                                    ? '0.05%'
                                                                    : '0%'
                                                        }`,
                                                }}
                                            />
                                        </ProgressBar>

                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup>
                                            <OptionLabel>
                                                <RadioButton
                                                    type="radio"
                                                    name={`level_${caseItem._id}`}
                                                    checked={progressLevels[caseItem._id] === 'firstCourt'}
                                                    onChange={() => handleLevelChange(caseItem._id, 'firstCourt')}
                                                />
                                                <OptionText>First Court</OptionText>
                                            </OptionLabel>
                                            <OptionLabel>
                                                <RadioButton
                                                    type="radio"
                                                    name={`level_${caseItem._id}`}
                                                    checked={progressLevels[caseItem._id] === 'pending'}
                                                    onChange={() => handleLevelChange(caseItem._id, 'pending')}
                                                />
                                                <OptionText>Pending</OptionText>
                                            </OptionLabel>
                                            <OptionLabel>
                                                <RadioButton
                                                    type="radio"
                                                    name={`level_${caseItem._id}`}
                                                    checked={progressLevels[caseItem._id] === 'completed'}
                                                    onChange={() => handleLevelChange(caseItem._id, 'completed')}
                                                />
                                                <OptionText>Completed</OptionText>
                                            </OptionLabel>
                                            <OptionLabel>
                                                <RadioButton
                                                    type="radio"
                                                    name={`level_${caseItem._id}`}
                                                    checked={progressLevels[caseItem._id] === 'dismissal'}
                                                    onChange={() => handleLevelChange(caseItem._id, 'dismissal')}
                                                />
                                                <OptionText>Dismissal</OptionText>
                                            </OptionLabel>
                                            <OptionLabel>
                                                <RadioButton
                                                    type="radio"
                                                    name={`level_${caseItem._id}`}
                                                    checked={!progressLevels[caseItem._id]}
                                                    onChange={() => handleLevelChange(caseItem._id, '')}
                                                />
                                                <OptionText>None</OptionText>
                                            </OptionLabel>
                                        </RadioGroup>

                                        <SubmitLevelButton onClick={() => handleSubmitLevel(caseItem._id)}>
                                            Submit Level
                                        </SubmitLevelButton>
                                    </TableCell>
                                </AdvocateBox>
                            ))}
                        </tbody>
                    </table>
                </PendingCasesWrapper>
            </Info>
        </>
    );
};

export default PendingCases;

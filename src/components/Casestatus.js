import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from './Navbar';

const StatusWrapper = styled.div`
  margin: 20px  70px;
  padding: 30px;
  border: 2px solid white;
  background-color: #212529;
  border-radius: 8px;
`;

const StatusTitle = styled.h3`
color:white;
  margin-bottom: 10px;
`;

const StatusText = styled.p`
color:white;
  font-size: 16px;
  transition: opacity;
  opacity: ${(props) => (props.isLoading ? 0.8 : 1)};
`;

const AnimatedProgressBar = styled.div`
  width: 100%;
  height: 10px;
  border:1px solid white;
  background-color:white;
  margin-bottom: 15px;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBarLevel = styled.div`
  height: 100%;
  border-radius: 5px;
  background: linear-gradient(to right, #d00000, #ffbe0b, #52b788); 
  transition: width 0.5s; 
`;

const InputBox = styled.input`
  margin-right: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 2px solid grey;
`;


const Casestatus = () => {
  const [progressLevel, setProgressLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cnrNumber, setCnrNumber] = useState('');

  const handleCnrNumberChange = (e) => {
    setCnrNumber(e.target.value);
  };

  useEffect(() => {
    const fetchProgressLevel = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/progress-level', {
          params: {
            cnrNumber: cnrNumber,
          },
        });
        setProgressLevel(response.data.progressLevel);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching progress level:', error);
        setIsLoading(false);
        // Handle error fetching progress level
      }
    };

    if (cnrNumber) {
      setIsLoading(true);
      fetchProgressLevel();
    }
  }, [cnrNumber]);

  return (
    <div>
      <Navbar />
   
        <StatusWrapper>
          <StatusTitle>Case Status:</StatusTitle>   <br />
          <div>
            <InputBox
              type="text"
              value={cnrNumber}
              onChange={handleCnrNumberChange}
              placeholder="Enter CNR Number"
            />
          </div>    <br />
          <StatusText isLoading={isLoading}>
            {isLoading
              ? 'None  ....'
              : `The Status for CNR Number ${cnrNumber} ---> "${progressLevel}"`}
          </StatusText>    <br />
          {!isLoading && (
            <AnimatedProgressBar>
              <ProgressBarLevel
                style={{
                  width: `${
                    progressLevel === 'firstCourt' ? '20%' : progressLevel === 'pending' ? '50%' : progressLevel === 'completed' ? '100%': '0%'
                  }`,
                }}
              />
            </AnimatedProgressBar>
          )}
        </StatusWrapper>
 
    </div>
  );
};

export default Casestatus;

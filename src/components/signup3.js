import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';

const AppContainer = createGlobalStyle`
  body {
    background: linear-gradient(to right, #07204e, #854c93);
    background-size: cover;
  }
`;


const RegistrationFormWrapper = styled.div`
  background-color: #f2f3f4;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 2px solid black;
  border-radius: 8px;
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 60%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
`;

const FormSection = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const RadioWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
`;

const RadioLabel = styled.label`
  margin-right: 8px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;


const Signup3 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    username: '',
    gender: '',
    courtType: '',
    mobileNumber: '',
    password: '',
    email: '',
    otp: '',
  });

  const [error, setError] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerateOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-otp', {
        mobileNumber: formData.mobileNumber,
        email: formData.email,
      });
      console.log('OTP sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', {
        email: formData.email,
        otp: formData.otp,
      });

      if (response.data.success) {
        // Redirect to the login page on successful OTP verification
        window.location.href = '/login3';
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Error during OTP verification. Please try again.');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register3', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <AppContainer />
      <RegistrationFormWrapper>
        <h2>Registrar Registration</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <FormSection>
            <Label>State:</Label>
            <Input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </FormSection>

          <FormSection>
            <Label>District</Label>
            <StyledSelect
              name="district"
              value={formData.district}
              onChange={handleChange}
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
          </FormSection>


          <FormSection>
            <Label>Name:</Label>
            <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </FormSection>

          <FormSection>
            <Label>Gender:</Label>
            <RadioWrapper>
              <RadioLabel>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  required
                />
                Male
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  required
                />
                Female
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleChange}
                  required
                />
                Other
              </RadioLabel>
            </RadioWrapper>
          </FormSection>

          <FormSection>
            <Label>Type of Court:</Label>
            <StyledSelect
              name="courtType"
              value={formData.courtType}
              onChange={handleChange}
              required
            >
              <option value="">Select Court Type</option>
              <option value="district">District Court</option>
              <option value="sessions">Sessions Court</option>
              <option value="high">High Court</option>
            </StyledSelect>
          </FormSection>

          <FormSection>
            <Label>Mobile Number:</Label>
            <Input
              type="tel"
              name="mobileNumber"
              pattern="[0-9]{10}"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </FormSection>

          <FormSection>
            <Label>Password:</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <EyeIcon onClick={handleTogglePassword}>
              👁️
            </EyeIcon>
          </FormSection>

          <FormSection>
            <Label>Email:</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormSection>

          <FormSection>
            <Label>OTP:</Label>
            <Input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              required
            />
            <Button type="button" onClick={handleGenerateOTP}>
              Generate OTP
            </Button>
          </FormSection>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit">Submit</SubmitButton>
        </form>
      </RegistrationFormWrapper>
    </>
  );
};

export default Signup3;
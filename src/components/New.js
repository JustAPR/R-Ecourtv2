import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const RegistrationFormWrapper = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 2px solid black;
  border-radius: 8px;
`;

const FormSection = styled.div`
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
  background-color:  #4caf50;
  border:2px solid white;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius:10px;
`;

const New = () => {
  const [formData, setFormData] = useState({
    state: '',
    barRegistrationNumber: '',
    username: '',
    dateOfBirth: '',
    gender: '',
    courtType: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };


  return (
    <RegistrationFormWrapper>
      <h2>Advocate Registration</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <FormSection>
          <Label>State:</Label>
          <Input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </FormSection>

        <FormSection>
          <Label>Bar Registration Number:</Label>
          <Input
            type="text"
            name="barRegistrationNumber"
            value={formData.barRegistrationNumber}
            onChange={handleChange}
            required
          />
        </FormSection>

        <FormSection>
          <Label>Name:</Label>
          <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </FormSection>

        <FormSection>
          <Label>Date of Birth:</Label>
          <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
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
          <RadioWrapper>
            <RadioLabel>
              <input
                type="radio"
                name="courtType"
                value="district"
                checked={formData.courtType === 'district'}
                onChange={handleChange}
                required
              />
              District
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="courtType"
                value="highCourt"
                checked={formData.courtType === 'highCourt'}
                onChange={handleChange}
                required
              />
              High Court
            </RadioLabel>
          </RadioWrapper>
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
          <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </FormSection>

        <FormSection>
          <Label>Confirm Password:</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </FormSection>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </RegistrationFormWrapper>
  );
};

export default New;


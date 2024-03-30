import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';

const AppContainer = createGlobalStyle`
  body {
    background: linear-gradient(to right, #07204e, #854c93);
    background-size: cover;
  }
`;

const ForgotPasswordWrapper = styled.div`
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
  position: relative; /* Important for positioning the eye icon */
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

const StyledSelect = styled.select`
font-size:15px;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
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

const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        otp: '',
        newPassword: '',
        userType:'client',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            const response = await axios.post('http://localhost:5000/api/forgotpassword', {
                username: formData.username,
                email: formData.email,
                userType: formData.userType,
            });

            console.log('OTP sent successfully:', response.data);
            setSuccess('OTP sent successfully. Check your email.');
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError('Error sending OTP. Please try again.');
        }
    };


    const handleUpdatePassword = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', {
                email: formData.email,
                otp: formData.otp,
            });

            if (response.data.success) {
                // Update password if OTP is verified
                const updateResponse = await axios.post('http://localhost:5000/api/update-password', {
                    username: formData.username,
                    userType: formData.userType,                    
                    newPassword: formData.newPassword,
                });

                if (updateResponse.data.success) {
                    alert('Password updated successfully. You can now login with your new password.');
                    window.location.href = '/landing';
                } else {
                    setError('Error updating password. Please try again.');
                }
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error during password update:', error);
            setError('Error during password update. Please try again.');
        }
    };

    return (
        <>
            <AppContainer />
            <ForgotPasswordWrapper>
                <h2>Forgot Password</h2>
                <br />
                <form>
                    <FormSection>
                        <label htmlFor="userType">Select User Type: </label>
                        <StyledSelect
                            id="userType"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                        >
                            <option value="client">Client</option>
                            <option value="registrar">Registrar</option>
                            <option value="advocate">Advocate</option>
                        </StyledSelect>
                    </FormSection>
                    <FormSection>
                        <Label>Username:</Label>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
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

                    <FormSection>
                        <Label>New Password:</Label>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                        <EyeIcon onClick={handleTogglePassword}>
                            👁️
                        </EyeIcon>
                    </FormSection>

                    <Button type="button" onClick={handleUpdatePassword}>
                        Update Password
                    </Button>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </form>
            </ForgotPasswordWrapper>
        </>
    );
};

export default ForgotPassword;

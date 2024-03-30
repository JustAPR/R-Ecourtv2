import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import courtImage from './dark.jpg';

const AppContainer = styled.div`
  background-image: url(${courtImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 250px;
  padding: 10px;
  box-sizing: border-box;
  border-radius:8px;
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Button = styled.button`
  width: 150px;
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <AppContainer>
      <LoginContainer>
        <h2>Login</h2>
        <br />

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <PasswordContainer>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <EyeIcon onClick={handlePasswordVisibility}>👁️</EyeIcon>
            </PasswordContainer>
          </FormGroup>

          <Button type="submit">Login</Button>
        </Form>
        <br />
        <Link to="/signup">Don't have an account? Sign Up</Link>

      </LoginContainer>
    </AppContainer>
  );
};

export default Login;

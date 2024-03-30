import React, { useState} from 'react';
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';

const AppContainer = styled.div`
  background: linear-gradient(to right, #07204e, #854c93);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupContainer = styled.div`
  background: rgba(255, 255, 255, 0.6); 
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  text-align: center;
  backdrop-filter: blur(2px);
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
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 250px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
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
  &:hover {
    background-color: #6f00ff;
  }
`;

const Login3 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate3 = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Retrieve username from the server (assuming it's included in the response)
        const { username } = data;

        // Pass the username to the Navbar component
        navigate3('/caseslist');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <AppContainer>
      <SignupContainer>
        <h2>Login</h2>
        <br />

        <Form>
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

          <Button type="button" onClick={handleLogin}>
            Login
          </Button>
        </Form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        <Link to="/signup3">Don't have an account?</Link>  <br />
        <Link to="/forgot1">Forgot password</Link>
      </SignupContainer>
    </AppContainer>
  );
};

export default Login3;

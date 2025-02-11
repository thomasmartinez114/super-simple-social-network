import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 400px;
  width: 90%;
  margin: 2rem auto;
  padding: var(--spacing-xl);
  background: var(--surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  
  @media (max-width: 768px) {
    width: 95%;
    padding: var(--spacing-lg);
    margin: var(--spacing-md) auto;
    border-radius: var(--border-radius);
  }
`;

const LoginInput = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--border-radius);
  background: white;
  color: var(--text-primary);
  font-size: 16px; // Prevents zoom on mobile
  
  @media (max-width: 768px) {
    padding: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(52,152,219,0.2);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  padding: var(--spacing-md);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 16px;
  
  @media (max-width: 768px) {
    padding: var(--spacing-sm);
  }
  
  &:hover {
    background: var(--primary-dark);
  }
`;

// Add error and success message styling
const Message = styled.p`
  margin-top: var(--spacing-sm);
  text-align: center;
  font-size: 14px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // Reset error state
    setSuccess(false); // Reset success state

    try {
      const response = await axios.post(
        'http://localhost:3000/api/login',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Handle successful login
        setSuccess(true);
        localStorage.setItem('loggedUsername', username); // save username to localstorage
        navigate(`/home`); // Navigate to the dashboard
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Login failed. Please check your username and password.');
      }
    }
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <LoginInput
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="username"
        />
        <LoginInput
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="password"
        />
        <LoginButton type="submit">
          Login
        </LoginButton>
        {error && <Message style={{ color: 'var(--error)' }}>{error}</Message>}
        {success && <Message style={{ color: 'var(--success)' }}>Login successful!</Message>}
      </form>
    </LoginContainer>
  );
};

export default Login;

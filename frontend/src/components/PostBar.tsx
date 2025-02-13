import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PostBarContainer = styled.div`
  background: var(--surface);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  width: 100%;
  max-width: 800px;
  margin: var(--spacing-xl) auto var(--spacing-lg);
  
  @media (max-width: 768px) {
    padding: var(--spacing-sm);
    margin: var(--spacing-lg) var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-sm);
  }
`;

const PostInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: var(--spacing-md);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-md);
  font-family: inherit;
  resize: vertical;
  background: white;
  color: var(--text-primary);
  font-size: 16px;
  
  @media (max-width: 768px) {
    min-height: 60px;
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

const PostButton = styled.button`
  background: var(--primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;
  font-size: 16px;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: var(--spacing-sm);
  }
  
  &:hover {
    background: var(--primary-dark);
  }
  
  &:disabled {
    background: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const PostBar = () => {
  const username = localStorage.getItem('loggedUsername');
  const [content, setContent] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    // alert(`content posted by ${username}`)

    const apiEndpoint = 'http://localhost:3000/api/addPost';

    const payload = {
      username: username,
      content: content,
    };

    // send post request to API
    try {
      const response = await axios.post(apiEndpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // check if the request was successful
      if (response.status === 200 || response.status === 201) {
        console.log(`Content posted by ${username}`);
        setContent(''); // clear the textarea
        window.location.reload(); // refresh the page when successfull
      } else {
        console.log('Faield to post content');
      }
    } catch (error) {
      console.error('Error posting content:', error);
      console.log('An error occurred while posting content');
    }
  };

  return (
    <PostBarContainer>
      <form onSubmit={handleSubmit}>
        <PostInput
          placeholder={`What's on your mind ${username}?`}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <PostButton type="submit" disabled={!content.trim()}>
          + Add
        </PostButton>
      </form>
    </PostBarContainer>
  );
};

export default PostBar;

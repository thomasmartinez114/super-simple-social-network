import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import defaultPhoto from '../images/default-user-photo.jpg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: var(--spacing-md);

  @media (max-width: 768px) {
    padding: var(--spacing-sm);
    margin: var(--spacing-md) auto;
  }
`;

const ProfileCard = styled.div`
  background: var(--surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-xl);
  text-align: center;
  margin-bottom: var(--spacing-xl);

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
    border-radius: var(--border-radius);
  }
`;

const Username = styled.h1`
  color: var(--text-primary);
  font-size: 2rem;
  margin-bottom: var(--spacing-md);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-lg);

  @media (max-width: 768px) {
    gap: var(--spacing-lg);
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: var(--spacing-xs);
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: var(--spacing-lg);

  &:hover {
    color: var(--primary);
  }
`;

interface UserStats {
  postsCount: number;
  likesReceived: number;
}

interface Post {
  id: number;
  content: string;
  created_at: string;
  likes: number;
  dislikes: number;
}

const UserPage = () => {
  const username = localStorage.getItem('loggedUsername');
  const [posts, setPosts] = useState<Post[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    postsCount: 0,
    likesReceived: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;

      try {
        setLoading(true);

        // Fetch user stats
        const statsResponse = await axios.get(
          `http://localhost:3000/api/users/${username}/stats`
        );
        console.log('Stats response:', statsResponse.data);
        setUserStats(statsResponse.data);

        // Fetch user posts
        const postsResponse = await axios.get(
          `http://localhost:3000/api/user/${username}/posts`
        );
        console.log('Posts response:', postsResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (!username) {
    return <div>Please log in to view your profile.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <ProfileContainer>
        <BackLink to='/home'>← Back to Home</BackLink>

        <ProfileCard>
          <Username>{username}</Username>
          <StatsContainer>
            <StatItem>
              <StatValue>{userStats.postsCount}</StatValue>
              <StatLabel>Posts</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{userStats.likesReceived}</StatValue>
              <StatLabel>Likes Received</StatLabel>
            </StatItem>
          </StatsContainer>
        </ProfileCard>

        {posts.length > 0 ? (
          <div className='container'>
            <div className='row'>
              {posts.map(post => (
                <div key={post.id} className='col-md-12 mb-4 mt-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <p className='card-text'>{post.content}</p>
                    </div>
                    <div className='post-footer'>
                      <div className='post-footer-timestamp'>
                        {new Date(post.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            No posts yet
          </div>
        )}
      </ProfileContainer>
    </>
  );
};

export default UserPage;

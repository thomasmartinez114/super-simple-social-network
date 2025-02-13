import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import moment from 'moment';
import styled from 'styled-components';

// Add interface for Post type
interface Post {
  id: number;
  username: string;
  content: string;
  created_at: string;
  likes?: number;
  dislikes?: number;
}

const PostsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-md);

  @media (max-width: 768px) {
    padding: var(--spacing-sm);
  }
`;

const PostCard = styled.div`
  background: var(--surface);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  @media (max-width: 768px) {
    padding: var(--spacing-md);
    margin: 0 var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-sm);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const PostAuthor = styled.span`
  font-weight: 600;
  color: var(--text-primary);
  margin-right: var(--spacing-sm);
`;

const PostDate = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const PostContent = styled.p`
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-sm);
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
`;

const InteractionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--primary);
  }

  svg {
    font-size: 1.2em;
  }
`;

const PostsAll = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        console.log('Fetching posts...');
        setLoading(true);
        const res = await axios.get('http://localhost:3000/api/posts/all');
        console.log('API Response:', res);
        console.log('Posts data:', res.data);
        setPosts(res.data);
      } catch (err) {
        console.error('Error details:', err);
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchAllPosts();
  }, []);

  const handleLike = async postId => {
    try {
      await axios.post(`http://localhost:3000/api/posts/${postId}/like`);
      console.log('Post has been liked');
    } catch (err) {
      console.error('Error liking post:', err);
    }

    alert(`Liked Post ID: ${postId}`);
  };

  const handleDislike = async postId => {
    // try {
    //   await axios.post(`http://localhost:3001/api/posts/${postId}/dislike`)
    //   setPosts((prevPosts) =>
    //     prevPosts.map((post) =>
    //       post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
    //     )
    //   )
    //   alert("Post has been disliked")
    // } catch (err) {
    //   console.error("Error disliking post:", err)
    // }

    alert(`Disliked Post ID: ${postId}`);
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <PostsContainer>
      {posts.map(post => (
        <PostCard key={post.id}>
          <PostHeader>
            <PostAuthor>
              <Link to={`/users/${post.username}`}>{post.username}</Link>
            </PostAuthor>
            <PostDate>
              {moment(post.created_at).format('YYYY/MM/DD HH:mm:ss')}
            </PostDate>
          </PostHeader>
          <PostContent>{post.content}</PostContent>
          <PostFooter>
            <div>
              <InteractionButton href='#' onClick={() => handleLike(post.id)}>
                <FaRegThumbsUp /> {post.likes || 0}
              </InteractionButton>
              <InteractionButton
                href='#'
                onClick={() => handleDislike(post.id)}
              >
                <FaRegThumbsDown /> {post.dislikes || 0}
              </InteractionButton>
            </div>
          </PostFooter>
        </PostCard>
      ))}
    </PostsContainer>
  );
};

export default PostsAll;

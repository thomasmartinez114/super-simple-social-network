import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const User = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/${username}/posts`
        );
        console.log(res.data);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPosts();
  }, []);

  return (
    <>
      <Navbar />
      <h2>{username}'s Posts</h2>
      <div className='container'>
        <br />
        <div className='row'>
          {posts.map(post => (
            <div key={post.id} className='col-md-12 mb-4 mt-4'>
              <div className='card'>
                <div className='card-body'>
                  <p className='card-text'>{post.content}</p>
                </div>
                <div className='post-footer'>
                  <div className='post-footer-interactions'>
                    {/* <a href="#" className="card-link" onClick={handleLike}>
                      <FaRegThumbsUp />
                      {post.likes}
                    </a> */}
                    {/* <a href="#" className="card-link" onClick={handleDislike}>
                      <FaRegThumbsDown />
                      {post.dislikes}
                    </a> */}
                  </div>
                  <div className='post-footer-timestamp'>{post.created_at}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default User;

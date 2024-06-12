import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa"
import moment from "moment"

const PostsAll = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/posts/all")
        console.log(res.data)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchAllPosts()
  }, [])

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:3000/api/posts/${postId}/like`)
      console.log("Post has been liked")
    } catch (err) {
      console.error("Error liking post:", err)
    }

    alert(`Liked Post ID: ${postId}`)
  }

  const handleDislike = async (postId) => {
    // try {
    //   await axios.post(`http://localhost:3000/api/posts/${postId}/dislike`)
    //   setPosts((prevPosts) =>
    //     prevPosts.map((post) =>
    //       post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
    //     )
    //   )
    //   alert("Post has been disliked")
    // } catch (err) {
    //   console.error("Error disliking post:", err)
    // }

    alert(`Disliked Post ID: ${postId}`)
  }

  return (
    <>
      <div className="container">
        {/* Posts - All */}
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-12 mb-4 mt-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">
                    <Link to={`/users/${post.username}`}>{post.username}</Link>
                  </h6>
                  <p className="card-text">{post.content}</p>
                </div>
                <div className="post-footer">
                  <div className="post-footer-interactions">
                    <a
                      href="#"
                      className="card-link"
                      onClick={() => handleLike(post.id)}
                    >
                      <FaRegThumbsUp />
                      {post.likes}
                    </a>
                    <a
                      href="#"
                      className="card-link"
                      onClick={() => handleDislike(post.id)}
                    >
                      <FaRegThumbsDown />
                      {post.dislikes}
                    </a>
                  </div>
                  <div className="post-footer-timestamp">
                    {moment(post.created_at).format("YYYY/MM/DD HH:mm:ss")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* End of Posts All */}
      </div>
    </>
  )
}

export default PostsAll

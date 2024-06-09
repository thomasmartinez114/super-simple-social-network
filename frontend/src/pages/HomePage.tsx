import React from "react"
import Navbar from "../components/Navbar"
import PostBar from "../components/PostBar"
import PostsAll from "../components/PostsAll"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <PostBar />
      <PostsAll />
    </>
  )
}

export default HomePage

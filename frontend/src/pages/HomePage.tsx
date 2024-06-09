import React from "react"
import Navbar from "../components/Navbar"
import PostsAll from "../components/PostsAll"

const HomePage = () => {
  const loggedUser = localStorage.getItem("loggedUsername")
  console.log("logged in username: " + loggedUser)

  return (
    <>
      <Navbar />
      <p>{loggedUser}</p>
      <PostsAll />
    </>
  )
}

export default HomePage

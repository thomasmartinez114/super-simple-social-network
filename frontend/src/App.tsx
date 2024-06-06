import { useState } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import PostsAll from "./components/PostsAll"

function App() {
  return (
    <>
      <Navbar />
      <PostsAll />
      <h3>Footer</h3>
    </>
  )
}

export default App

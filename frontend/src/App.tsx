import "./App.css"
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"
// import MainLayout from "./layouts/MainLayout"
// import HomePage from "./pages/HomePage"
// import CreatePost from "./pages/HomePage"
import Navbar from "./components/Navbar"
import PostsAll from "./components/PostsAll"

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<MainLayout />}>
//       <Route index element={<HomePage />} />
//       <Route path="/create" element={<CreatePost />} />
//     </Route>
//   )
// )

const App = () => {
  return (
    <>
      <Navbar />
      <PostsAll />
    </>
  )
}

export default App

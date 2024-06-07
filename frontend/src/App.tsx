import "./App.css"
// import {
//   Route,
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
// } from "react-router-dom"
// import MainLayout from "./layouts/MainLayout"
// import HomePage from "./pages/HomePage"
// import CreatePost from "./pages/HomePage"

import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

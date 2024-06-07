import "./App.css"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import User from "./pages/User"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:username" element={<User />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

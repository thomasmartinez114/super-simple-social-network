import "./App.css"
import HomePage from "./pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserPage from "./pages/UserPage"
import LoginPage from "./pages/LoginPage"
import LogoutPage from "./pages/LogoutPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/users/:username" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

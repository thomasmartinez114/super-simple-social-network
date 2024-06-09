import React from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // clear localstorage when button pressed
    localStorage.clear()

    // redirect to home page
    navigate("/login")
  }

  return (
    <form className="logout-form">
      <div className="logout-container">
        <div id="logout-button">
          <p className="logout-text">Click below to logout</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </form>
  )
}

export default Logout

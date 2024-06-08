import React, { useState } from "react"
import axios from "axios"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("") // Reset error state
    setSuccess(false) // Reset success state

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.status === 200) {
        // Handle successful login
        setSuccess(true)
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error)
      } else {
        setError("Login failed. Please check your username and password.")
      }
    }
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="login-form-username">
          {/* <label>Username: </label> */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="username"
          />
        </div>
        <div className="login-form-password">
          {/* <label>Password:</label> */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="password"
          />
        </div>
        <button className="btn-info" type="submit">
          Login
        </button>
        {error && <p>{error}</p>}
        {success && <p>Login successful!</p>}
      </form>
    </div>
  )
}

export default Login

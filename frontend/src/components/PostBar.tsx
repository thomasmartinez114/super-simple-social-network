import React, { useState } from "react"
import axios from "axios"

const PostBar = () => {
  const username = localStorage.getItem("loggedUsername")
  const [content, setContent] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // alert(`content posted by ${username}`)

    const apiEndpoint = "http://localhost:3001/api/addPost"

    const payload = {
      username: username,
      content: content,
    }

    // send post request to API
    try {
      const response = await axios.post(apiEndpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      // check if the request was successful
      if (response.status === 200 || response.status === 201) {
        console.log(`Content posted by ${username}`)
        setContent("") // clear the textarea
        window.location.reload() // refresh the page when successfull
      } else {
        console.log("Faield to post content")
      }
    } catch (error) {
      console.error("Error posting content:", error)
      console.log("An error occurred while posting content")
    }
  }

  return (
    <>
      <div className="container postbar">
        <form>
          <div className="form-group">
            <textarea
              className="form-control"
              id="textArea"
              rows="2"
              placeholder={`What's on your mind ${username}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div id="post-button">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                + Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default PostBar

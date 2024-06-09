import React from "react"

const PostBar = () => {
  const username = localStorage.getItem("loggedUsername")

  return (
    <>
      <div className="container postbar">
        <form>
          <div className="form-group">
            {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              placeholder={`What's on your mind ${username}?`}
            ></textarea>
            <div id="post-button">
              <button type="button" className="btn btn-success">
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

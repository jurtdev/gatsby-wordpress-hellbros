import React, { useState } from "react"

const CommentForm = () => {
  const defaultValues = {
    name: ``,
    email: ``,
    comment: ``,
  }
  const [values, setValues] = useState(defaultValues)

  const handleChange = event => {
    event.persist()
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
    console.log(values)
  }

  return (
    <form
      id="comment-form"
      onSubmit={event => {
        event.preventDefault()
      }}
    >
      <h3>Leave a Reply</h3>
      <p>
        <label htmlFor="comment-field">Comment</label>
        <textarea
          name="comment"
          id="comment-field"
          onChange={handleChange}
          value={values.comment}
        ></textarea>
      </p>
      <div className="meta">
        <p>
          <label htmlFor="name-field">Name</label>
          <input
            type="text"
            name="name"
            id="name-field"
            value={values.name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="email-field">Email</label>
          <input
            type="text"
            name="email"
            id="email-field"
            value={values.email}
            onChange={handleChange}
            required
          />
        </p>
        <br />
        <p>
          <input type="submit" value="Submit" id="submit-button" />{" "}
        </p>
      </div>
    </form>
  )
}

export default CommentForm

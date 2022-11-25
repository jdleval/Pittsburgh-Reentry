import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from '../../hooks/useFirestore'

import React from 'react'

export default function ProjectComments({project}) {
  const {updateDocument, response} = useFirestore('projects')
  const { user } = useAuthContext()
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    //Make a new comment to represent the data
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }
    await updateDocument(project.id , {
      comments: [...project.comments, commentToAdd],
    })
    if(!response.error){
      setNewComment('');
    }
  }


  return (
    <div className="project-comments">
    <h4>Project Comments</h4>
    <form className="add-comment" onSubmit={handleSubmit}>
      <label>
        <span>Add new comment:</span>
        <textarea
          required
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
        ></textarea>
      </label>
      <button className="btn">Add Comment</button>
    </form>
  </div>

  )
}

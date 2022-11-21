import { Link } from 'react-router-dom'
import './ProjectList.css'
import Avatar from '../components/Avatar'

import React from 'react'

export default function ProjectList({projects}) {
  return (
    <div className='project-list'>
      {projects.length === 0 && <p>No projects yet</p>}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by: {project.dueDate.toDate().toDateString()}</p>
          <div className='assigned-to'>
          <ul>
             {project.assignedUserList.map(user => (
              <li key={user.photoURL}>
              <Avatar src={user.photoURL} />
            </li>

             ))}
            </ul>
          </div>
          </Link>
      ))}
    </div>
  )
}

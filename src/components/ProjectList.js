import './ProjectList.css'

import React from 'react'

export default function ProjectList({projects}) {
  return (
    <div>
      {projects.length === 0 && <p>No projects yet</p>}
      {projects.map(project => (
        <p key={project.id}>{project.name}</p>
      ))}
    </div>
  )
}

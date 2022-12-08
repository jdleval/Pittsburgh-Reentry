//styles
import './Dashboard.css'

import { useCollection } from '../../hooks/useCollection'

import React from 'react'
import ProjectList from '../../components/ProjectList'

export default function Dashboard() {
  const {documents, error} =useCollection('projects')
  return (
    <div>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </div>
  )
}

import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'


//styles
import './Project.css'
import React from 'react'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'

export default function Project() {
  //extract the id we need
  const {id} = useParams()
  const {document, error} =useDocument('projects', id)
  //create an error check
  if(error){
    return <div className='error'>{error}</div>
  }
  //in the meantime, waiting for the document
  if(!document){
    return <div className='loading'>Loading...</div>
  }
  return (
    //display the document title
    <div className='project-details'>
     <ProjectSummary project={document} />
     <ProjectComments project={document} />
    </div>
  )
}

import './Create.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore} from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function Create() {
  const {addDocument, response} = useFirestore('projects')
  const history = useHistory('');
  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  const { user } = useAuthContext();

  //select states
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError ] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    //check category is selected
    if (!category) {
      setFormError('Please select a project category');
      return;
    }
    //Check that users are assigned to project
    if (assignedUsers.length < 1) {
      setFormError('Please assign at least one user to the project');
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    };

    const assignedUserList = assignedUsers.map((userAssigned) => {
      return {
        displayName: userAssigned.value.displayName,
        photoURL: userAssigned.value.photoURL,
        id: userAssigned.value.id,
      };
    });
    //create document to be saved to firestore
    //TODO: Add other items to be saved
    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comment: [],
      createdBy,
      assignedUserList,
    };

    await addDocument(project);
    if(!response.error){
      history.push('/');
    }
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input required type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea required onChange={(e) => setDetails(e.target.value)} value={details}></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input required type="date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
        </label>
        <label>
          <span>Project category:</span>
          <Select onChange={(option) => setCategory(option)} options={categories} />
        </label>
        <label>
          <span>Assign to:</span>
          <Select onChange={(option) => setAssignedUsers(option)} options={users} isMulti />
        </label>

        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import Select from 'react-select';
//styles
import './Signup.css';

import React from 'react';
import { useCollection } from '../../hooks/useCollection';

//!Select Components
const statusCategories = [
  { value: 'onPaper', label: 'On Paper' },
  { value: 'workRelease', label: 'Work Release' },
  { value: 'housingProvider', label: 'Housing Provider' },
  { value: 'socialWorker', label: 'Social Worker' },
  { value: 'probParolOfficer', label: 'Probation/ Parole Officer' },
  { value: 'concernedFamilyMemeber', label: 'Concerned Family Member' },
  { value: 'treatmentProvider', label: 'Treatment Provider' },
];

const inmateHopesCategories = [
  { value: 'findHosing', label: 'Find Housing' },
  { value: 'createResume', label: 'Create Resume' },
];

const housingManagerHopesCategories = [{ value: 'listHousing', label: 'List Housing' }];

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  // const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const [hopesCategory, setHopesCategory] = useState([]);
  // const [progress, setProgress] = useState('');
  // const [terms, setTerms] = useState('');
  const { signup, isPending, error } = useSignup();
  const { documents } = useCollection('users');

  //select states
  const [statusCategory, setStatusCategory] = useState('');
  const [formError, setFormError] = useState(null);

  //!code to change values best on status
  const handleSelectChange = (e) => {
    if (e.value === 'onPaper') {
      setHopesCategory(inmateHopesCategories);
      setStatusCategory(e.value);
    } else if (e.value === 'housingProvider') {
      setHopesCategory(housingManagerHopesCategories);
      setStatusCategory(e.value);
    } else {
      setHopesCategory([]);
    }
    console.log(e.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    if (!statusCategory) {
      setFormError('Please select status');
      return;
    }

    signup(email, password, displayName, thumbnail, statusCategory.value, hopesCategory.value);
    console.log(statusCategory.value);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selectedItem = e.target.files[0];

    console.log(selectedItem);

    //ensure file is selected
    if (!selectedItem) {
      setThumbnailError('You must select a file');
      return;
    }
    if (!selectedItem.type.includes('image')) {
      setThumbnailError('Your file must be an image');
      return;
    }
    if (selectedItem.size > 100000) {
      setThumbnailError('Image file size cannot exceed 100kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selectedItem);
    console.log('thumbnail updated');
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Signup</h2>
      <label>
        <span>Display Name:</span>
        <input required type="text" placeholder="display name" onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
      </label>
      <label>
        <span>Email:</span>
        <input required type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>Password:</span>
        <input required type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </label>
      <label className="radio">
        <span>Male</span>
        <input type="radio" name="radiogroup" id="rd1" onChange={(e) => setGender(e.target.value)} value={gender} />
        <span>Female</span>
        <input type="radio" name="radiogroup" id="rd2" onChange={(e) => setGender(e.target.value)} value={gender} />
      </label>

      <label>
        <span>Select Your Status</span>
        <Select onChange={(option) => handleSelectChange(option)} options={statusCategories} />
      </label>
      <label>
        <span>What Do You Hope To Accomplish</span>
        <Select onChange={(option) => setHopesCategory(option)} options={hopesCategory} isMulti />
      </label>

      <label>
        <span>Profile thumbnail:</span>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      {(error || formError) && (
        <div className="error">
          {error}
          {formError}
        </div>
      )}
      {/* <div className="agreecheckbox">
        <input id="checkbox" type="checkbox" onChange={(e) => setTerms(e.target.value)} value={terms}/>
        <label id='agreecheckbox'> I agree to the Terms and Conditions.</label>
    </div> */}
    </form>
  );
}

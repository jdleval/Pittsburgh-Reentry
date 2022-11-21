import { useState, useEffect } from 'react';
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  //TODO: Add more values for signup, DOB, Gender, Role, Progress, etc
  const signup = async (email, password, displayName, thumbnail, statusCategory) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      //upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const thumbnailImg = await projectStorage.ref(uploadPath).put(thumbnail);
      const thumbnailImgUrl = await thumbnailImg.ref.getDownloadURL();

      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: thumbnailImgUrl });

      //create user and all document that has all attributes associated with the user
      await projectFirestore.collection('users').doc(res.user.uid).set({
        //TODO: add properties for users
        online: true,
        displayName,
        photoURL: thumbnailImgUrl,
        statusCategory: statusCategory,
      });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};

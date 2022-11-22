import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    //refence to the document
    const ref = projectFirestore.collection(collection).doc(id);
    //get a reference of the data changes and store an unsubscribe reference
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if(snapshot.data()) {
        //update the document state to reflect what we recieve
        setDocument({ ...snapshot.data(), id: snapshot.id });
        //reset any prior errors
        setError(null);
        } else {
          setError('no such document exists')
        }
      },
      //function to handle any errors
      (err) => {
        console.log(err.message);
        setError('failed to get document');
      }
    );
    //clean up function
    return () => unsubscribe();
  }, [collection, id]);
  return { document, error };
};

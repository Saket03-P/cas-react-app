import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../configs/firebase';

const MyPetitions = () => {
  const [petitions, setPetitions] = useState([]);
  const authUser = useSelector(state => state.authRed.user);

  useEffect(() => {
    const fetchPetitions = async () => {
      if (authUser) {
        // Fetch petitions submitted by the user from Firestore
        const petitionsRef = db.collection('UserPetitions').where('formData.uid', '==', authUser.uid);
        const snapshot = await petitionsRef.get();
        const fetchedPetitions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPetitions(fetchedPetitions);
      }
    };

    fetchPetitions();
  }, [authUser]);

  return (
    <div>
      {petitions.length > 0 ? (
        <ul>
          <h2>My Petitions</h2>
          {petitions.map(petition => (
            <li key={petition.id}>
              <strong>Title:</strong> {petition.formData.title}<br />
              <strong>Cause:</strong> {petition.formData.cause}<br />
              <strong>Message:</strong> {petition.formData.message}<br />
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <h3 style={{ color: 'red' }}>You haven't broadcasted any Petitions yet...</h3>
      )}
    </div>
  )
}

export default MyPetitions
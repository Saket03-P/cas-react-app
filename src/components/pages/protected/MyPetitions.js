import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../configs/firebase';
import { Card } from 'react-bootstrap';

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
    <div>      {petitions.length > 0 ? (         <div><h2>My Petitions</h2><div className="card-container">            {petitions.map(petition => (               <Card key={petition.id} style={{ width: '18rem' }} className="mb-3"><Card.Body><Card.Title>{petition.formData.title}</Card.Title><Card.Text><strong>Cause:</strong> {petition.formData.cause}<br /><strong>Message:</strong> {petition.formData.message}<br /></Card.Text>                  {petition.formData.images && (                     <Card.Img src={petition.formData.images} alt="Petition Image" />                  )}                   {/* Add more details as needed */}                 </Card.Body></Card>            ))}           </div></div>      ) : (         <h3 style={{ color: 'red' }}>You haven't broadcasted any Petitions yet...</h3>      )}     </div>
    // <div>
    //   {petitions.length > 0 ? (
    //     <ul>
    //       <h2>My Petitions</h2>
    //       {petitions.map(petition => (
    //         <li key={petition.id}>
    //           <strong>Title:</strong> {petition.formData.title}<br />
    //           <img src={petition.formData.images} width={100} height={100} /><br />
    //           <strong>Cause:</strong> {petition.formData.cause}<br />
    //           <strong>Message:</strong> {petition.formData.message}<br />
    //           {/* Add more details as needed */}
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <h3 style={{ color: 'red' }}>You haven't broadcasted any Petitions yet...</h3>
    //   )}
    // </div>
  )
}

export default MyPetitions
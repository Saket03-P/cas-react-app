import React, { useState, useEffect } from 'react';
import { db } from './configs/firebase'; // Import db from Firebase configuration
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
 
const JoinPetitions = () => {
  const [petitions, setPetitions] = useState([]);
  const [isJoined, setIsJoined]= useState(false)
 
  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        const snapshot = await db.collection('UserPetitions').get();
        const petitionsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPetitions(petitionsData);
      } catch (error) {
        console.error('Error fetching petitions:', error);
      }
    };
 
    fetchPetitions();
 
    return () => {
      // Unsubscribe from real-time updates if implemented
    };
  }, []);
 
  const incrementUserCount = async (petitionId) => {
    try {
      const petitionRef = db.collection('UserPetitions').doc(petitionId);
      const petitionDoc = await petitionRef.get();
 
      if (petitionDoc.exists) {
        const currentCount = petitionDoc.data().userCount || 0;
        const newCount = currentCount + 1;
 
        await petitionRef.update({
          userCount: newCount
        });
 
        console.log('Petition userCount updated successfully');
        setIsJoined(true)
      } else {
        console.error('Petition document not found');
      }
    } catch (error) {
      console.error('Error updating petition userCount:', error);
    }
  };
 
  const handleJoinPetition = async (petitionId) => {
    try {
      await incrementUserCount(petitionId);
    } catch (error) {
      console.error('Error joining petition:', error);
    }
  };
 
  return (
    <div>
      <h2>Join Petitions</h2>
      <div className="card-container">
        {petitions.map(petition => (
          <Card key={petition.id} style={{ width: '18rem' }} className="mb-3">
            <Card.Body>
              <Card.Title>{petition.formData.title}</Card.Title>
              <Card.Text>{petition.formData.message}</Card.Text>
              <Button onClick={() => handleJoinPetition(petition.id)} variant="primary" disabled={isJoined}>Join Petition</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};
 
export default JoinPetitions;
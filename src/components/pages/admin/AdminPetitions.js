import React, {useEffect, useState} from 'react'
import {db} from '../../configs/firebase'

const AdminPetitions = () => {
  const [petitions, setPetitions] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [showTextBox, setShowTextBox] = useState(false);
  const [selectedPetitionId, setSelectedPetitionId] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('UserPetitions').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPetitions(data);
      console.log(data);
    };
 
    fetchData();
  }, []);
 
  const respondToPetition = (id) => {
    setShowTextBox(true);
    setSelectedPetitionId(id);
  };
 
  const markForReview = async (id) => {
    await db.collection('UserPetitions').doc(id).update({ review: true });
    setPetitions(petitions.map(petition => petition.id === id ? { ...petition, review: true } : petition));
  };
 
  const handleSubmit = async () => {
    if (responseMessage.trim() !== '') {
      if (showTextBox && selectedPetitionId) {
        await db.collection('UserPetitions').doc(selectedPetitionId).update({ review: true, response: responseMessage });
        setPetitions(petitions.map(petition => petition.id === selectedPetitionId ? { ...petition, review: true, response: responseMessage } : petition));
        setShowTextBox(false);
        setSelectedPetitionId(null);
        setResponseMessage('');
      }
    } else {
      alert('Please enter a response message.');
    }
  };
 
  return (
    <div>
      <h3>Petitions</h3>
      <div style={{ display: 'inline-grid', flexDirection: 'column' }}>
        {petitions.map(petition => (
          <div key={petition.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
            <p>{petition.formData.title}</p>
            <p>Description: {petition.formData.message}</p>
            {/* <p>Signatures: {petition.signatures}</p> */}
            <p>Review: {petition.review ? 'Marked' : 'Not Marked'}</p>
            {showTextBox && selectedPetitionId === petition.id ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter response message"
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                />
                <button onClick={handleSubmit}>Submit</button>
              </div>
            ) : (
              <div>
                <button onClick={() => respondToPetition(petition.id)}>Respond</button>
                <button onClick={() => markForReview(petition.id)}>Mark for Review</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPetitions
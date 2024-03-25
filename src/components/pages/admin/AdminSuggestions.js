import React, { useEffect, useState } from 'react'
import { db } from '../../configs/firebase';

const AdminSuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [showTextBox, setShowTextBox] = useState(false);
    const [selectedSuggestionId, setSelectedSuggestionId] = useState(null);
   
    useEffect(() => {
      const fetchData = async () => {
        const snapshot = await db.collection('suggestions').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSuggestions(data);
      };
   
      fetchData();
    }, []);
   
    const respondToSuggestion = (id) => {
      setShowTextBox(true);
      setSelectedSuggestionId(id);
    };
   
    const markForReview = async (id) => {
      await db.collection('suggestions').doc(id).update({ review: true });
      setSuggestions(suggestions.map(suggestion => suggestion.id === id ? { ...suggestion, review: true } : suggestion));
    };
   
    const handleSubmit = async () => {
      if (responseMessage.trim() !== '') {
        await db.collection('suggestions').doc(selectedSuggestionId).update({ review: true, response: responseMessage });
        setSuggestions(suggestions.map(suggestion => suggestion.id === selectedSuggestionId ? { ...suggestion, review: true, response: responseMessage } : suggestion));
        setShowTextBox(false);
        setSelectedSuggestionId(null);
        setResponseMessage('');
      } else {
        alert('Please enter a response message.');
      }
    };
   
    return (
      <div>
        <h3>Suggestions</h3>
        <div style={{ display: 'inline-grid', flexDirection: 'column' }}>
          {suggestions.map(suggestion => (
            <div key={suggestion.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
             
              <p>{suggestion.message}</p>
              <p>Review: {suggestion.review ? 'Marked' : 'Not Marked'}</p>
              {showTextBox && selectedSuggestionId === suggestion.id ? (
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
                  <button onClick={() => respondToSuggestion(suggestion.id,'Responded')}>Respond</button>
                  <button onClick={() => markForReview(suggestion.id,'Marked for Review')}>Mark for Review</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default AdminSuggestions;
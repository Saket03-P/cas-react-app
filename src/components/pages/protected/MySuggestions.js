import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth, db } from '../../configs/firebase';

const MySuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const authUser = useSelector(state => state.authRed.user);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestionsRef = db.collection('suggestions').where('uid', '==', authUser.uid);
        const snapshot = await suggestionsRef.get();
        const fetchedSuggestions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSuggestions(fetchedSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions: ', error);
      }
    };

    if (authUser) {
      fetchSuggestions();
    }
  }, [authUser]);

  return (
    <div>
      <h2>My Suggestions</h2>
      <ul>
        {suggestions.map(suggestion => (
          <li key={suggestion.id}>
            <p><strong>Category:</strong> {suggestion.category}</p>
            <p><strong>Message:</strong> {suggestion.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MySuggestions
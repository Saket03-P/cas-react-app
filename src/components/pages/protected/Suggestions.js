import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { auth, db } from '../../configs/firebase'; // Import Firebase Firestore configuration
import { useDispatch, useSelector } from "react-redux";

const Suggestions = () => {
  const [category, setCategory] = useState('roads');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
    const authUser = useSelector(state => state.authRed.user);
    const uid=authUser.uid;
    const email= authUser.email

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if message is not empty
    if (message.trim() === '') {
      setErrorMessage('Please enter your suggestion before submitting.');
      return;
    }

    try {
      // Add suggestion to Firestore
      await db.collection('suggestions').add({
        uid,
        email,
        category,
        message,
        timestamp: new Date()
      });
      // Set submitted state to true
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting suggestion: ', error);
      // Handle error if necessary
    }
  };

  return (
    <div className="container">
      {submitted ? (
        <div>
          <h2>Suggestion Submitted</h2>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Message:</strong> {message}</p>
          <p>Thank you for your suggestion!</p>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      ) : (
        <div>
          <h2>Submit Your Suggestion</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select id="category" className="form-control" value={category} onChange={handleCategoryChange}>
                <option value="roads">Roads</option>
                <option value="hygiene">Hygiene</option>
                <option value="pipeline">Pipeline</option>
                <option value="muncipality">Muncipality</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Suggestion:</label>
              <textarea id="message" className="form-control" value={message} onChange={handleMessageChange} rows={5} placeholder='write your suggestion here'></textarea>
              {errorMessage && <div className="text-danger">{errorMessage}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Suggestions;
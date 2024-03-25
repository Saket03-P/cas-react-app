import React, { useState, useEffect } from 'react';
import { db } from '../../configs/firebase';
import { useSelector } from 'react-redux';

const MyComplaints = () => {
  const authUser = useSelector(state => state.authRed.user);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const complaintsRef = db.collection('UserComplaints').where('formData.uid', '==', authUser.uid);
        const snapshot = await complaintsRef.get();
        const fetchedComplaints = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComplaints(fetchedComplaints);
      } catch (error) {
        console.error('Error fetching complaints: ', error);
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      console.log(authUser.uid);
      fetchComplaints();
    }
  }, [authUser]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : complaints.length === 0 ? (
        <h3 style={{ color: 'red' }}>You haven't raised any Complaints yet...</h3>
      ) : (
        <ul>
          <h2 style={{ color: 'red' }}>My Complaints</h2>
          {complaints.map(complaint => (
            <li key={complaint.id}>Complaint: {complaint.formData.title}<br /> Message: {complaint.formData.message}</li>
            // Adjust the display based on your complaint data structure
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyComplaints
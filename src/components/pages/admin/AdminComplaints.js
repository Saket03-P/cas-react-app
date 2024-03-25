import React, { useEffect, useState } from 'react'
import { db } from '../../configs/firebase'


const AdminComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [showTextBox, setShowTextBox] = useState(false); // State to toggle the visibility of the text box
    const [selectedComplaintId, setSelectedComplaintId] = useState(null); // State to store the id of the selected complaint
   
    useEffect(() => {
      const fetchData = async () => {
        const snapshot = await db.collection('UserComplaints').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComplaints(data);
      };
   
      fetchData();
    }, []);
   
    const respondToComplaint = async (id, status) => {
      if (status === 'Resolved') {
        setShowTextBox(true); // Show the text box when resolving a complaint
        setSelectedComplaintId(id); // Set the id of the selected complaint
      } else {
        await updateComplaint(id, status, ''); // For other statuses, update without a message
      }
    };
   
    const updateComplaint = async (id, status, message) => {
      await db.collection('UserComplaints').doc(id).update({ response: status, message });
      setComplaints(complaints.map(complaint => complaint.id === id ? { ...complaint, response: status, message } : complaint));
      // Reset states
      setShowTextBox(false);
      setSelectedComplaintId(null);
      setResponseMessage('');
    };
   
    const handleSubmit = async () => {
      if (responseMessage.trim() !== '') {
        await updateComplaint(selectedComplaintId, 'Resolved', responseMessage);
      } else {
        // Handle empty message
        alert('Please enter a response message.');
      }
    };
    return (
      <div>
        <h3>Complaints</h3>
        <div style={{ display: 'inline-grid', flexDirection: 'column' }}>
          {complaints.map(complaint => (
            <div key={complaint.id} style={{ border: '2px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
              <p>User Email: {complaint.formData.email}</p>
              <p>Message: {complaint.formData.message}</p>
              <p>Your Response: {complaint.response || 'No response yet.'}</p>
              {showTextBox && selectedComplaintId === complaint.id && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter response message"
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                  />
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              )}
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => respondToComplaint(complaint.id, 'Resolved')}>Resolve</button>
                <button onClick={() => respondToComplaint(complaint.id, 'Under Review')}>Under Review</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
              }

    export default AdminComplaints;
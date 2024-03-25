import React from 'react';
import './CreateComplaint.css'; // Import your CSS file for styling
 
const CreateComplaint = ({ formData }) => {
  return (
    <div className="complaint-post-container">
      <h2 className='text-primary'>Complaint Ticket Raised!!!</h2>
      <div className="complaint-details">
        {/* <p><strong>Name:</strong> {formData.name}</p> */}
        <p><strong>Title:</strong> {formData.title}</p>
        <p><strong>Area:</strong> {formData.area}</p>
        <p><strong>Pincode:</strong> {formData.pincode}</p>
        <p><strong>Message:</strong> {formData.message}</p>
        <h3 className='text-warning'>WE WILL REACH YOU SOON</h3>
      </div>
    </div>
  );
};
 
export default CreateComplaint;
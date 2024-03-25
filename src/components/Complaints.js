import React, { useState } from 'react';
import './Complaints.css';
import CreateComplaint from './pages/createForms/CreateComplaint'
import {db} from './configs/firebase';
import { useDispatch, useSelector } from "react-redux";

const Complaints = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.authRed.user);
const [formData, setFormData] = useState({
  uid:authUser.uid,
  name: '',
  title: '',
  area: '',
  pincode: '',
  photo: '',
  message: ''
});
const [submitted, setSubmitted] = useState(false);

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
  

};

const handleSubmit = (event) => {
  event.preventDefault();
  // Handle form submission logic here
  // For now, let's just set submitted state to true
  db.collection('UserComplaints')
                .doc()
               .set({ formData })
  setSubmitted(true);
};

  return (
    <>
      <h2 className='text-danger p-2'>RAISE YOUR COMPLAINT</h2>
      <div className="container">
        <div className="row mx-0 justify-content-center">
          <div className="">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group pb-4">
                  <label htmlFor="name" className="d-block mb-2">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group pb-4">
                  <label htmlFor="title" className="d-block mb-2">Complaint Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Enter complaint title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group pb-4">
                  <label htmlFor="area" className="d-block mb-2">Area</label>
                  <input
                    id="area"
                    name="area"
                    type="text"
                    className="form-control"
                    placeholder="Enter your area"
                    value={formData.area}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group pb-4">
                  <label htmlFor="pincode" className="d-block mb-2">Pincode</label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    className="form-control"
                    placeholder="Enter pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group pb-4">
                  <label htmlFor="photo" className="d-block mb-2">Image Link</label>
                  <input
                    id="photo"
                    name="photo"
                    type="text"
                    className="form-control"
                    value={formData.photo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group pb-4">
                  <label htmlFor="message" className="d-block mb-2">Complaint Description</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Describe your complaint"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-danger px-3">Raise complaint</button>
                </div>
              </form>
            ) : (
              <CreateComplaint formData={formData} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Complaints
import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import './Petition.css';
import CreatePetition from './pages/createForms/CreatePetition';
import {db} from './configs/firebase';
import { useSelector } from 'react-redux';

const Petitions = () => {
  const authUser = useSelector(state => state.authRed.user);
 
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isCauseFocused, setIsCauseFocused] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isImagesFocused, setIsImagesFocused] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);
 
  const handleFocus = (field) => {
    switch (field) {
      case 'name':
        setIsNameFocused(true);
        break;
      case 'cause':
        setIsCauseFocused(true);
        break;
      case 'title':
        setIsTitleFocused(true);
        break;
      case 'images':
        setIsImagesFocused(true);
        break;
      case 'message':
        setIsMessageFocused(true);
        break;
      default:
        break;
    }
  };
 
  const handleBlur = (field) => {
    switch (field) {
      case 'name':
        setIsNameFocused(false);
        break;
      case 'cause':
        setIsCauseFocused(false);
        break;
      case 'title':
        setIsTitleFocused(false);
        break;
      case 'images':
        setIsImagesFocused(false);
        break;
      case 'message':
        setIsMessageFocused(false);
        break;
      default:
        break;
    }
  };
 
  const [formData, setFormData] = useState({
    uid:authUser.uid,
    name: '',
    cause: '',
    title: '',
    message: ''
  });
 
  const [showChild, setShowChild] = useState(false);
 
 
 
 
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    db.collection('UserPetitions')
                  .doc()
                 .set({ formData })
    setShowChild(true);
 
    console.log('Form submitted!');
    console.log(formData);
  };
 
 
  return (
    <>
   
{/* <div className="container">
<div className="row">
  <div className='col-md-4'></div>
      <div className="col-md-4">
      <h2 className='text-info'>SUBMIT YOUR PETITION</h2>
      </div>
      <div className="col-md-4">
      <img src="https://static.news.bitcoin.com/wp-content/uploads/2019/06/UQrij24L-india-petition.png" alt="" style={{ maxWidth: '20%', height: 'auto' }} clasName="img-fluid"/>
      </div>
</div>
</div> */}
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<h2 className="text-info" style={{ marginRight: '20px' }}>SUBMIT YOUR PETITION</h2>
<img
        src="https://static.news.bitcoin.com/wp-content/uploads/2019/06/UQrij24L-india-petition.png"
        alt="Your Image"
        style={{ maxWidth: '7%', height: 'auto' }}
      />
 
</div>
 
        {!showChild ? (
 
   
 
    <div className="container mt-5">
      <div className="row mx-0 justify-content-center">
        <div className="">
          <form
            method="POST"
            className="w-100 rounded p-4 border bg-white"
            action="https://herotofu.com/start"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="form-group pb-4">
              <label htmlFor="name" className={isNameFocused ? 'd-block mb-2 active' : 'd-block mb-2'}>Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                placeholder="Joe Bloggs"
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                onChange={handleChange}
              />
            </div>
 
            <div className="form-group pb-4">
              <label htmlFor="cause" className={isCauseFocused ? 'd-block mb-2 active' : 'd-block mb-2'}>Cause</label>
              <input
                id="cause"
                name="cause"
                type="text"
                className="form-control"
                placeholder="joe.bloggs@example.com"
                onFocus={() => handleFocus('cause')}
                onBlur={() => handleBlur('cause')}
                onChange={handleChange}
 
              />
            </div>
 
            <div className="form-group pb-4">
              <label htmlFor="title" className={isTitleFocused ? 'd-block mb-2 active' : 'd-block mb-2'}>Petition Title</label>
              <input
                id="title"
                name="title"
                type="text"
                className="form-control"
                placeholder="keep it short and focus on the solution"
                onFocus={() => handleFocus('title')}
                onBlur={() => handleBlur('title')}
                onChange={handleChange}
 
              />
            </div>
 
            <div className="form-group pb-4">
              <label htmlFor="receipt" className={isImagesFocused ? 'd-block mb-2 active' : 'd-block mb-2'}>Add relevant images</label>
              <div className="form-control h-auto">
                <input
                  id="images"
                  name="images"
                  type="text"
                  className="form-control"
                  onFocus={() => handleFocus('images')}
                  onBlur={() => handleBlur('images')}
                  onChange={handleChange}
 
                />
              </div>
            </div>
 
            <div className="form-group pb-4">
              <label htmlFor="message" className={isMessageFocused ? 'd-block mb-2 active' : 'd-block mb-2'}>Explain your problem</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows="5"
                placeholder="Please describe your problem"
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                onChange={handleChange}
 
              ></textarea>
            </div>
 
            <div className="form-group mb-3">
              <button onSubmit={handleSubmit} type="submit" className="btn btn-primary px-3">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>):(<CreatePetition details={formData}></CreatePetition>)
}
    </>
   
  )
}

export default Petitions
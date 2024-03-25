import React, { useEffect, useState } from 'react';
import { addPost } from '../../configs/data';
import { Form, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CreatePost = () => {
    // const [content, setContent] = useState('');
    // const [image, setImage] = useState(''); // State to manage the image file
    // const uid = useSelector(state => state.authRed.user.uid);

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   if (!content.trim()) return;
  
    //   const postData = {
    //     uid,
    //     content,
    //     image, // Include the image file in the postData
    //     likes: 0,
    //     comments: [],
    //     timestamp: new Date()
    //   };
    //   console.log(postData);
    //   await addPost(postData);
    //   setContent('');
    //   setImage('');
    // }

    const [show, setShow]= useState(true)
    useEffect(() => {
        setShow(!show)
    })
    const handleClose = () => setShow(false)

  return (
    <>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create a Post</Modal.Title>
                <Modal.Body>Woohoo!!!</Modal.Body>
                <Modal.Footer>
                    <Button>Saved</Button>
                </Modal.Footer>
            </Modal.Header>
        </Modal>
    </>
  )
}

export default CreatePost
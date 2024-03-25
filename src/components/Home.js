import React, { useEffect, useState } from 'react'
import { addPost, getPosts, addComment, updateLikes } from './configs/data'
import { Card, Button, Modal, Form } from 'react-bootstrap'
// import CreatePost from './pages/createForms/CreatePost'
import { useSelector } from 'react-redux'
 import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [posts, setPosts]= useState([])
  const [newComment, setNewComment] = useState('');
  const isLoggedIn= useSelector(state => state.authRed.isLoggedIn)
  const navigate= useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts= await getPosts()
      setPosts(fetchedPosts)
    }
 
    fetchPosts()
  }, [])
 
  const handleLike = async (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
    await updateLikes(postId, updatedPosts.find(post => post.id === postId).likes);
  };
 
  const handleSubmitComment = async (postId) => {
    if (!newComment.trim()) return;
 
    const updatedComments = await addComment(postId, newComment);
    setPosts(prevPosts => {
      return prevPosts.map(prevPost => {
        if (prevPost.id === postId) {
          return { ...prevPost, comments: updatedComments };
        }
        return prevPost;
      });
    });
    setNewComment('');
  };
 
  const sortPosts = (posts) => {
    return posts.sort((a, b) => {
      if (a.likes !== b.likes) {
        return b.likes - a.likes;
      } else if (a.comments.length !== b.comments.length) {
        return b.comments.length - a.comments.length;
      } else {
        return b.timestamp - a.timestamp;
      }
    });
  };
 
  const [content, setContent] = useState('');
  const [image, setImage] = useState(''); // State to manage the image file
 
  const authUser = useSelector(state => state.authRed.user);
  let uid= 111
  if (authUser != null) {
    uid=authUser.uid;
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
 
    const postData = {
      uid,
      content,
      image, // Include the image file in the postData
      likes: 0,
      comments: [],
      timestamp: new Date()
    };
    console.log(postData);
    await addPost(postData);
    setContent('');
    setImage(''); // Clear the image state after submission
  };
 
  const [showModal, setShowModal]= useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
 
 
  return (
    <div className="container mt-4" style={{ display: 'contents', justifyContent: 'center' }}>
  <h2 className="text-center mb-4">Feed</h2>

      {
        isLoggedIn && (
          <>
            <Button variant="danger" onClick={handleShow}>
              Create a Post
            </Button>

            <Button variant="warning" onClick={() => navigate('/join-petitions')}>
              Join a Petition
            </Button>
 
            <Modal show={showModal} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Create a Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
 
              <Form onSubmit={handleSubmit}>
              <Form.Group controlId="content">
                <Form.Control
                  as="textarea"
                 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post here..."
                  rows="4"
                />
              </Form.Group>
 
                <Form.Group controlId="image">
                <Form.Control
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Upload your image here"
                />
                </Form.Group>
              <Button variant="success" type="submit">
                Post
              </Button>
            </Form>
              </Modal.Body>
            </Modal>
          </>
        )
      }

  {sortPosts(posts).map((post) => (
    <Card key={post.id} className="mb-7 p-3" style={{ maxWidth: '500px', maxHeight: '800px' }}>
      {post.image && <Card.Img variant="top" src={post.image} style={{ maxHeight: '400px' }} />}
      <Card.Body>
        <Card.Text>{post.content}</Card.Text>
        <Button variant="primary" onClick={() => handleLike(post.id)}>
          UpVote ({post.likes})
        </Button>
        <Form.Group controlId={`comment-${post.id}`} className="mt-3">
          <Form.Control
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" onClick={() => handleSubmitComment(post.id)}>
          Submit
        </Button>
        <div className="mt-3">
          {/* Render comments */}
          {post.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p><strong>{comment.content}</strong>: {comment.userEmail}</p>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  ))}
</div>
    // <div className="container mt-4" style={{ display: 'contents', justifyContent: 'center' }}>
    //   <h2 className="text-center mb-4">Feed</h2>
 
    //   {
    //     isLoggedIn && (
    //       <>
    //         <Button variant="danger" onClick={handleShow}>
    //           Create a Post
    //         </Button>
 
    //         <Modal show={showModal} onHide={handleClose} centered>
    //           <Modal.Header closeButton>
    //             <Modal.Title>Create a Post</Modal.Title>
    //           </Modal.Header>
    //           <Modal.Body>
 
    //           <Form onSubmit={handleSubmit}>
    //           <Form.Group controlId="content">
    //             <Form.Control
    //               as="textarea"
                 
    //               value={content}
    //               onChange={(e) => setContent(e.target.value)}
    //               placeholder="Write your post here..."
    //               rows="4"
    //             />
    //           </Form.Group>
 
    //             <Form.Group controlId="image">
    //             <Form.Control
    //               type="text"
    //               value={image}
    //               onChange={(e) => setImage(e.target.value)}
    //               placeholder="Upload your image here"
    //             />
    //             </Form.Group>
    //           <Button variant="success" type="submit">
    //             Post
    //           </Button>
    //         </Form>
    //           </Modal.Body>
    //         </Modal>
    //       </>
    //     )
    //   }
 
    //   {sortPosts(posts).map((post) => (
    //     <Card key={post.id} className="mb-7 p-3" style={{ maxWidth: '500px', maxHeight: '800px' }}>
    //       {post.image && <Card.Img variant="top" src={post.image} style={{ maxHeight: '400px' }} />}
    //       <Card.Body>
    //         <Card.Text>{post.content}</Card.Text>
    //         <Button variant="primary" onClick={() => handleLike(post.id)}>
    //           UpVote ({post.likes})
    //         </Button>
    //         <Form.Group controlId={`comment-${post.id}`} className="mt-3">
    //           <Form.Control
    //             type="text"
    //             placeholder="Add a comment..."
    //             value={newComment}
    //             onChange={(e) => setNewComment(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Button variant="success" onClick={() => handleSubmitComment(post.id)}>
    //           Submit
    //         </Button>
 
    //         <div className="mt-3">
    //         <Card className="comment-box">
    //           <Card.Body>
    //             {post.comments.map((comment, index) => (
    //               <>
    //                 {/* <h4 key={index} className='mb-1'>{email}</h4> */}
    //                 <p key={index} className="mb-1">{comment}</p>
    //               </>
    //             ))}
    //           </Card.Body>
    //         </Card>
    //       </div>
 
    //       </Card.Body>
    //     </Card>
    //   ))}
    // </div>
  )
}
 
export default Home
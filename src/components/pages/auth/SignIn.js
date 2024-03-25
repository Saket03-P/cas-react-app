// import React, { useState } from "react";
// import { auth } from '../../configs/firebase';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { setUserData } from "../../redux/slices/AuthSlice";
// import { useDispatch, useSelector } from "react-redux"; 
// import { useNavigate } from "react-router-dom";

// const SignIn=()=>{
//     const dispatch= useDispatch()
//     const navigate= useNavigate()

//     const [signInInput, setSignInInput]= useState({ username: '', password: '' })

//     const handleSignIn = (evt) => {
//         setSignInInput({ ...signInInput, [evt.target.name]: evt.target.value })
//     }

//     const submitSignIn = (evt) => {
//         signInWithEmailAndPassword(auth, signInInput.username, signInInput.password)
//             .then((userCredentials) => {
//                 const user= { email: userCredentials.user.email, uid: userCredentials.user.uid }
//                 dispatch(setUserData(user))
//                 console.log('Signed In User ', user.email)
//             })
//             .then(() => navigate('/'))
//             .catch((err) => {
//                 console.log(err)
//             })

//             setSignInInput({ username: '', password: '' })
//         evt.preventDefault()
//     }

//     return(
//         <div className="sign-in-container">
//             <form onSubmit={ submitSignIn }>
//                 <h1>Sign In as User</h1>
//                 <input type="email" name="username" value={ signInInput.username } onChange={ handleSignIn } />
//                 <br />
//                 <input type="password" name="password" value={ signInInput.password } onChange={ handleSignIn } />
//                 <br />
//                 <button type="submit">Sign In</button>
//             </form>
//         </div>
//     )
// }
 
// export default SignIn;



// import React, { useState } from "react";
// import { auth } from '../../configs/firebase';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { setUserData } from "../../redux/slices/AuthSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
 
// const SignIn = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [signInInput, setSignInInput] = useState({ username: '', password: '' });
//     const [error, setError] = useState(null);
 
//     const handleSignIn = (evt) => {
//         setSignInInput({ ...signInInput, [evt.target.name]: evt.target.value });
//     }
 
//     const submitSignIn = (evt) => {
//         evt.preventDefault();
//         signInWithEmailAndPassword(auth, signInInput.username, signInInput.password)
//             .then((userCredentials) => {
//                 const user = { email: userCredentials.user.email, uid: userCredentials.user.uid };
//                 dispatch(setUserData(user));
//                 console.log('Signed In User ', user.email);
//                 navigate('/');
//             })
//             .catch((err) => {
//                 setError(err.message);
//                 console.error(err);
//             })
//             .finally(() => {
//                 setSignInInput({ username: '', password: '' });
//             });
//     }
 
//     return (
// <Container>
// <Row className="justify-content-center">
// <Col md={6}>
// <Form onSubmit={submitSignIn}>
// <h1 className="text-center mb-4">Sign In as User</h1>
// <Form.Group controlId="formBasicEmail">
// <Form.Label>Email address</Form.Label>
// <Form.Control type="email" name="username" value={signInInput.username} onChange={handleSignIn} placeholder="Enter email" required />
// </Form.Group>
// <Form.Group controlId="formBasicPassword">
// <Form.Label>Password</Form.Label>
// <Form.Control type="password" name="password" value={signInInput.password} onChange={handleSignIn} placeholder="Password" required />
// </Form.Group>
//                         {error && <Alert variant="danger">{error}</Alert>}
// <Button variant="primary" type="submit" className="w-100 mt-3">Sign In</Button>
// </Form>
// </Col>
// </Row>
// </Container>
//     );
// }
 
// export default SignIn;



import React, { useState } from "react";
import { auth } from '../../configs/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUserData } from "../../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import signInImage from './signInImage.jpg'; // Importing an example image
 
const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signInInput, setSignInInput] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
 
    const handleSignIn = (evt) => {
        setSignInInput({ ...signInInput, [evt.target.name]: evt.target.value });
    }
 
    const submitSignIn = (evt) => {
        evt.preventDefault();
        signInWithEmailAndPassword(auth, signInInput.username, signInInput.password)
            .then((userCredentials) => {
                const user = { email: userCredentials.user.email, uid: userCredentials.user.uid };
                dispatch(setUserData(user));
                console.log('Signed In User ', user.email);
                navigate('/');
            })
            .catch((err) => {
                setError(err.message);
                console.error(err);
            })
            .finally(() => {
                setSignInInput({ username: '', password: '' });
            });
    }
 
    return (
<Container>
<Row className="justify-content-center">
<Col md={6}>
<div className="text-center mb-4">
<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyZDthuctvwlZtkG6r8j02rjMD6lbzVBmlb2eIrMI_DVgMlXhpSnjTtrlh08WQTBrRYAA&usqp=CAU' alt="Sign In" className="img-fluid" style={{ maxHeight: '200px' }} />
</div>
<Form onSubmit={submitSignIn}>
<h1 className="text-center mb-4">Sign In as User</h1>
<Form.Group controlId="formBasicEmail">
<Form.Label>Email address</Form.Label>
<Form.Control type="email" name="username" value={signInInput.username} onChange={handleSignIn} placeholder="Enter email" required />
</Form.Group>
<Form.Group controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<Form.Control type="password" name="password" value={signInInput.password} onChange={handleSignIn} placeholder="Password" required />
</Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
<Button variant="primary" type="submit" className="w-100 mt-3">Sign In</Button>
</Form>
</Col>
</Row>
</Container>
    );
}
 
export default SignIn;
import './App.css';
// import AppRoutes from './components/AppRoutes';
// import AuthDetails from './components/auth/AuthDetails';
// import SignIn from './components/auth/SignIn';
// import SignUp from './components/auth/SignUp';

import React, { useEffect } from 'react';

import { BrowserRouter, Link, Route, Router, Routes, Switch } from 'react-router-dom';
import SignUp from './components/pages/auth/SignUp';
import SignIn from './components/pages/auth/SignIn';
import Ideas from './components/pages/Ideas';
import Suggestions from './components/pages/protected/Suggestions';

// import { initializeAuth } from 'firebase/auth';
import firebaseConfig from './components/configs/firebase';
import { getAuth, initializeAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './components/configs/firebase';
// import { getAnalytics } from 'react/analytics';

import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './components/redux/slices/AuthSlice';
// import ProtectedRoute from './components/utils/ProtectedRoute';

function App() {
  // const app= initializeAuth(firebaseConfig)
  // // const analytics= getAnalytics(app)
  // const auth= getAuth(app)
  const user= useSelector(store => store.authRed.userData)
  console.log('User from State', user)

  const dispatch= useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserData(user.refreshToken))
      } else {
        dispatch(setUserData(null))
      }
    })
  }, [auth, dispatch])


  return (
    <div className="App">
      City Administration System

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home Ideas</Link>
            </li>
            <li>
              <Link to='/signin'>Sign In</Link>
            </li>
            <li>
              <Link to='/signup'>Sign Up</Link>
            </li>
            <li>
              <Link to='/suggestions-protected'>Protected Pages</Link>
            </li>
            <li>
              <Link to='#'>Log Out</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path='/signin' element={ <SignIn /> } />
          <Route exact path='/signup' element={ <SignUp /> } />
          <Route exact path='/' element={ <Ideas /> }>
            <Route exact path='suggestions-protected' element={ <Suggestions /> } />
          </Route>
          {/* <ProtectedRoute exact path='/protected' component={ <Suggestions /> } /> */}
          {/* <Route exact path='/signin' element={ <SignIn /> } /> */}

          {/* <Route exact path='/signin'><SignIn /></Route>
          <Route exact path='/signup'><SignUp /></Route>
          <Route exact path='/protected'><Suggestions /></Route>
          <ProtectedRoute exact path='/protected' component={ <Suggestions /> } />
          <Route exact path='/'><Ideas /></Route> */}
        </Routes>
      </BrowserRouter>

      {/* <Router>


        <Switch>
          <Route exact path='/signin'><SignIn /></Route>
          <Route exact path='/signup'><SignUp /></Route> */}
          {/* <Route exact path='/protected'><Suggestions /></Route> */}
          {/* <ProtectedRoute exact path='/protected' component={ <Suggestions /> } />
          <Route exact path='/'><Ideas /></Route>
        </Switch>
      </Router> */}

      {/* <SignUp />
      <SignIn /> */}
      {/* <AuthDetails />
      <AppRoutes /> */}
    </div>
  );
}

export default App;

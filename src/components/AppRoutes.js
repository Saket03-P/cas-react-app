import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuBar from './MenuBar';
import Home from './Home';
import Page404 from './Page404';
import Suggestions from './pages/protected/Suggestions';
import Complaints from './Complaints';
import Petitions from './Petitions';
import Ideas from './Ideas';
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import MyProfile from './pages/protected/MyProfile'
import MySuggestions from './pages/protected/MySuggestions'
import MyComplaints from './pages/protected/MyComplaints'
import MyPetitions from './pages/protected/MyPetitions'
import ProtectedRoute from './utils/ProtectedRoute';

const AppRoutes = () => {
  return (
    <>
        <BrowserRouter>
            <>
                <MenuBar />
            </>

            <Routes>
                <Route exact path='/' element={ <Home /> } />
                <Route exact path='/home' element={ <Home /> } />
                <Route path='*' element={ <Page404 /> } />

                <Route path='/signup' element={ <SignUp /> } />
                <Route path='/signin' element={ <SignIn /> } />

                <Route path='/my-profile' element={ <ProtectedRoute><MyProfile /></ProtectedRoute> } />
                <Route path='/my-suggestions' element={ <ProtectedRoute><MySuggestions /></ProtectedRoute> } />
                <Route path='/my-complaints' element={ <ProtectedRoute><MyComplaints /></ProtectedRoute> } />
                <Route path='/my-petitions' element={ <ProtectedRoute><MyPetitions /></ProtectedRoute> } />

                <Route path='/suggestions' element={ <ProtectedRoute><Suggestions /></ProtectedRoute> } />
                <Route path='/complaints' element={ <ProtectedRoute><Complaints /></ProtectedRoute> } />
                <Route path='/petitions' element={ <ProtectedRoute><Petitions /></ProtectedRoute> } />
                <Route path='/ideas' element={ <ProtectedRoute><Ideas /></ProtectedRoute> } />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRoutes
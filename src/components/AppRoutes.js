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
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminSuggestions from './pages/admin/AdminSuggestions';
import AdminPetitions from './pages/admin/AdminPetitions';
import AdminSignIn from './pages/admin/AdminSignIn';
import JoinPetitions from './JoinPetitions';

const AppRoutes = () => {
  return (
    <>
        <BrowserRouter>
            <>
                <MenuBar />
            </>

            <Routes>
                <Route exact path='/' element={ <ProtectedRoute><Home /></ProtectedRoute> } />
                <Route exact path='/home' element={ <ProtectedRoute><Home /></ProtectedRoute> } />
                <Route path='*' element={ <Page404 /> } />

                <Route path='/signup' element={ <SignUp /> } />
                <Route path='/signin' element={ <SignIn /> } />
                <Route path='/admin-signin' element={ <AdminSignIn /> } />

                <Route path='/my-profile' element={ <ProtectedRoute><MyProfile /></ProtectedRoute> } />
                <Route path='/my-suggestions' element={ <ProtectedRoute><MySuggestions /></ProtectedRoute> } />
                <Route path='/my-complaints' element={ <ProtectedRoute><MyComplaints /></ProtectedRoute> } />
                <Route path='/my-petitions' element={ <ProtectedRoute><MyPetitions /></ProtectedRoute> } />

                <Route path='/suggestions' element={ <ProtectedRoute><Suggestions /></ProtectedRoute> } />
                <Route path='/complaints' element={ <ProtectedRoute><Complaints /></ProtectedRoute> } />
                <Route path='/petitions' element={ <ProtectedRoute><Petitions /></ProtectedRoute> } />
                <Route path='/join-petitions' element={ <ProtectedRoute><JoinPetitions /></ProtectedRoute> } />
                <Route path='/ideas' element={ <ProtectedRoute><Ideas /></ProtectedRoute> } />

                <Route path='/admin-dashboard' element={ <ProtectedRoute><AdminDashboard /></ProtectedRoute> } />
                <Route path='/admin-suggestions' element={ <ProtectedRoute><AdminSuggestions /></ProtectedRoute> } />
                <Route path='/admin-complaints' element={ <ProtectedRoute><AdminComplaints /></ProtectedRoute> } />
                <Route path='/admin-petitions' element={ <ProtectedRoute><AdminPetitions /></ProtectedRoute> } />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRoutes
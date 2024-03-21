import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuBar from './MenuBar';
import Home from './Home';
import Page404 from './Page404';
import Suggestions from './pages/protected/Suggestions';
import Complaints from './Complaints';
import Petitions from './Petitions';
import Ideas from './pages/Ideas';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import ProtectedRoute from './utils/ProtectedRoute';

const AppRoutes = () => {
  return (
    <>
        <BrowserRouter>
            <>
                <MenuBar />
            </>

            <Routes>
                <Route exact path='' element={ <Home /> } />
                <Route exact path='home' element={ <Home /> } />
                <Route path='*' element={ <Page404 /> } />

                <Route path='/signup' element={ <SignUp /> } />
                <Route path='/signin' element={ <SignIn /> } />

                <Route path='/suggestions' element={ <ProtectedRoute children={ <Suggestions /> } /> } />
                <Route path='/complaints' element={ <ProtectedRoute children={ <Complaints /> } /> } />
                <Route path='/petitions' element={ <ProtectedRoute children={ <Petitions /> } /> } />
                <Route path='/ideas' element={ <ProtectedRoute children={ <Ideas /> } /> } />
            </Routes>
        </BrowserRouter>
        
        {/* <BrowserRouter>
            <>
                <MenuBar />
            </>

            <div>
                <Routes>
                    <Route exact path='' element={ <Home /> } />
                    <Route exact path='home' element={ <Home /> } />
                    <Route path='*' element={ <Page404 /> } />

                    <Route path='/signup' element={ <SignUp /> } />
                    <Route path='/signin' element={ <SignIn /> } />

                    <Route exact path='/suggestions' element={ <Suggestions /> } />
                    <Route exact path='/complaints' element={ <Complaints /> } />
                    <Route exact path='/petitions' element={ <Petitions /> } />
                    <Route exact path='/ideas' element={ <Ideas /> } />
                </Routes>
            </div>
        </BrowserRouter> */}
    </>
  )
}

export default AppRoutes
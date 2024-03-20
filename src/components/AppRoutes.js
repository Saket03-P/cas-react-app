import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuBar from './MenuBar';
import Home from './Home';
import Page404 from './Page404';
import Suggestions from './Suggestions';
import Complaints from './Complaints';
import Petitions from './Petitions';
import Ideas from './Ideas';

const AppRoutes = () => {
  return (
    <>
        <BrowserRouter>
            <>
                <MenuBar />
            </>

            <div>
                <Routes>
                    <Route exact path='' element={ <Home /> } />
                    <Route exact path='home' element={ <Home /> } />
                    <Route path='*' element={ <Page404 /> } />

                    <Route exact path='/suggestions' element={ <Suggestions /> } />
                    <Route exact path='/complaints' element={ <Complaints /> } />
                    <Route exact path='/petitions' element={ <Petitions /> } />
                    <Route exact path='/ideas' element={ <Ideas /> } />
                </Routes>
            </div>
        </BrowserRouter>
    </>
  )
}

export default AppRoutes
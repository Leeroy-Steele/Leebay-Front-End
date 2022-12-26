import {  Route, Routes } from "react-router-dom"
import React from 'react' // needed here for lazy loading
import './App.css';

import { AuthProvider } from './components/Auth'
import Comp from './components/Comp'  //test page

const HomePage = React.lazy(()=>import('./components/HomePage'))
const SignInPage = React.lazy(()=>import('./components/SignInPage'))
const SignUpPage = React.lazy(()=>import('./components/SignUpPage'))
const ProfilePage = React.lazy(()=>import('./components/ProfilePage'))
const PostAuctionPage = React.lazy(()=>import('./components/PostAuctionPage'))
const UploadImagePage = React.lazy(()=>import('./components/UploadImagePage'))
const ViewItemPage = React.lazy(()=>import('./components/ViewItemPage'))

const PageNotFound = React.lazy(()=>import('./components/PageNotFound'))

function App() {
  return (
    <div className="App">

      <AuthProvider>

        <Routes>

          <Route
            path='/'
            element={
              <React.Suspense fallback={<Loading />}>
                <HomePage />
              </React.Suspense>
            }
          />

          <Route
            path='/SignIn'
            element={
              <React.Suspense fallback={<Loading />}>
                <SignInPage />
              </React.Suspense>
            }
          />
          
          <Route
            path='/SignUp'
            element={
              <React.Suspense fallback={<Loading />}>
                <SignUpPage />
              </React.Suspense>
            }
          />

          <Route
            path='/Profile'
            element={
              <React.Suspense fallback={<Loading />}>
                <ProfilePage />
              </React.Suspense>
            }
          />
                  
                  <Route
            path='/PostAuction'
            element={
              <React.Suspense fallback={<Loading />}>
                <PostAuctionPage />
              </React.Suspense>
            }
          />

          <Route
            path='/UploadImage'
            element={
              <React.Suspense fallback={<Loading />}>
                <UploadImagePage />
              </React.Suspense>
            }
          />

          <Route
            path='/ViewItem/:id'
            element={
              <React.Suspense fallback={<Loading />}>
                <ViewItemPage />
              </React.Suspense>
            }
          />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </AuthProvider>


    {/* testing only */}

      {/* <Comp></Comp> */}
      
    </div>
  );
}

function Loading() {
  return <div className="loader"></div>;
}

export default App;

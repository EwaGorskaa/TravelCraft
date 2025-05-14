import React from 'react';
import { Route, Routes, Router, Navigate } from "react-router-dom"
import './App.css';
import Home from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPanel from './pages/UserPanel';
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';


function App() {
  const user = localStorage.getItem("token")
  return (

          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={user ? <PrivateLayout /> : <Navigate to="/login" />}>
              <Route path="/dashboard" element={<UserPanel />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />

          </Routes>


  );
}

export default App;
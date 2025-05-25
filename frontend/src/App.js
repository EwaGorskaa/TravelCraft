import React from 'react';
import { Route, Routes, Router, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPanel from './pages/UserPanel';
import Calendar from './pages/Calendar';
import MapPage from './pages/MapPage';
import AddPlan from './pages/AddPlan';
import UserPlans from './pages/UserPlans';
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';


function App() {
  const user = localStorage.getItem("token")
  return (
<>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={user ? <PrivateLayout /> : <Navigate to="/login" />}>
              <Route path="/dashboard" element={<UserPanel />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/map" element={<MapPage/>}/>
              <Route path="/newplan" element={<AddPlan/>}/>
              <Route path="/myplans" element={<UserPlans/>}/>
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
            />
</>

  );
}

export default App;
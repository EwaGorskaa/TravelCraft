import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <Login/>
      <Footer />
    </div>
  );
}

export default App;
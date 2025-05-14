import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Home />
      <Footer />
    </div>
  );
}

export default App;
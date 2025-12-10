import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Corrigido para 'Components' (maiúsculo)
import Navbar from './components/NavBar/NavBar'; 
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
// Corrigido para remover a barra dupla '//'
import About from './pages/About/About'; 
import Contact from './pages/Contact/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
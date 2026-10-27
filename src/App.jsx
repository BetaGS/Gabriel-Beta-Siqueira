import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Corrigido para 'Components' (maiúsculo)
import Navbar from './components/NavBar/NavBar'; 
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
// Corrigido para remover a barra dupla '//'
import About from './pages/About/About'; 
import Contact from './pages/Contact/Contact';
import BackgroundFX from './components/BackgroundFX/BackgroundFX';
import { api } from './lib/api';
import './App.css';

function App() {
  useEffect(() => {
    // Registra 1 visita por sessão na API Python (silencioso se a API estiver offline)
    try {
      if (sessionStorage.getItem('visit-counted')) return;
      sessionStorage.setItem('visit-counted', '1');
    } catch {
      /* sessionStorage indisponível */
    }
    api('/api/visit', { method: 'POST' });
  }, []);

  return (
    <Router>
      <div className="App">
        <BackgroundFX />
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
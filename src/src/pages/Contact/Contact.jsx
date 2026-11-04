import React, { useState } from 'react';
import { FaLinkedinIn, FaGithub, FaInstagram, FaXTwitter, FaWhatsapp, FaEnvelope, FaLocationDot } from 'react-icons/fa6';
import { postJson } from '../../lib/api';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });

  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const enviarWhatsApp = (e) => {
    e.preventDefault();
    setLoading(true);

    // SEU NÚMERO DO WHATSAPP (IMPORTANTE!)
    const numero = "5521999472392"; // ← SUBSTITUA pelo SEU número
    
    // Formata a mensagem
    const texto = `*NOVO CONTATO DO PORTFÓLIO* 🚀\n\n` +
                  `*Nome:* ${form.nome}\n` +
                  `*Email:* ${form.email}\n\n` +
                  `*Mensagem:*\n${form.mensagem}\n\n` +
                  `_Enviado via Portfolio Website_`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    
    // Abre WhatsApp em nova aba
    window.open(url, '_blank');

    // Também registra a mensagem na API Python (se estiver online). Falhas são ignoradas.
    postJson('/api/contact', { nome: form.nome, email: form.email, mensagem: form.mensagem });
    
    // Feedback visual
    setEnviado(true);
    setLoading(false);
    
    // Limpa formulário
    setForm({ nome: "", email: "", mensagem: "" });
    
    // Remove mensagem de sucesso após 5 segundos
    setTimeout(() => {
      setEnviado(false);
    }, 5000);
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h1>Entre em Contato</h1>
            <p>Preencha o formulário abaixo e me envie diretamente pelo WhatsApp!</p>
            
            {enviado && (
              <div className="success-message">
                <p>✅ WhatsApp aberto! Agora é só enviar a mensagem.</p>
                <small>Se o WhatsApp não abriu, verifique se está instalado.</small>
              </div>
            )}
            
            <div className="contact-details">
              <div className="contact-item">
                <h3><FaWhatsapp aria-hidden="true" /> WhatsApp</h3>
                <p>+55 (21) 99947-2392</p>
              </div>
              <div className="contact-item">
                <h3><FaEnvelope aria-hidden="true" /> Email</h3>
                <p>gssmvilar@yahoo.com</p>
              </div>
              <div className="contact-item">
                <h3><FaLocationDot aria-hidden="true" /> Localização</h3>
                <p>Rio De Janeiro, RJ</p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://www.linkedin.com/in/gabriel-siqueira-448672316/" className="social-link social-linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn aria-hidden="true" /> <span>LinkedIn</span>
              </a>
              <a href="https://github.com/BetaGS" className="social-link social-github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub aria-hidden="true" /> <span>GitHub</span>
              </a>
              <a href="https://www.instagram.com/gabrielsiqueira_vilar/" className="social-link social-instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram aria-hidden="true" /> <span>Instagram</span>
              </a>
              <a href="https://x.com/GSiqueiraBeta" className="social-link social-x" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <FaXTwitter aria-hidden="true" /> <span>X</span>
              </a>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={enviarWhatsApp}>
              <div className="form-group">
                <label htmlFor="nome">Nome *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome completo"
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="mensagem">Mensagem *</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleChange}
                  required
                  placeholder="Digite sua mensagem aqui..."
                  rows="6"
                  disabled={loading}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading || !form.nome || !form.email || !form.mensagem}
              >
                {loading ? 'Abrindo WhatsApp...' : (
                  <>
                    📱 Enviar pelo WhatsApp
                    <span className="btn-icon">→</span>
                  </>
                )}
              </button>
              
              <p className="form-note">
                * Clique no botão para abrir o WhatsApp com sua mensagem pré-preenchida
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
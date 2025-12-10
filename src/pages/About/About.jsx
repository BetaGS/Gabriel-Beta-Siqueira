import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h1>Sobre Mim</h1>
            <p>
              Sou um desenvolvedor full-stack apaixonado por criar soluções digitais 
              inovadoras e eficientes. Com experiência em diversas tecnologias modernas, 
              busco sempre entregar produtos de alta qualidade que resolvam problemas reais.
            </p>
            <p>
              Minha jornada começou há 1 ano, e desde então tenho trabalhado em diversos 
              projetos, desde pequenos sites até aplicações empresariais complexas. Acredito 
              que a tecnologia deve ser acessível e intuitiva para todos.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <h3>20+</h3>
                <p>Projetos Concluídos</p>
              </div>
              <div className="stat">
                <h3>1</h3>
                <p>Ano de Experiência</p>
              </div>
              <div className="stat">
                <h3>30+</h3>
                <p>Clientes Satisfeitos</p>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <img src="Imagens/Foto perfil.png" alt="Sobre mim" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
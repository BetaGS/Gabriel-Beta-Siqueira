import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-title">Desenvolvedor Full Stack</h1>
          <p className="hero-subtitle">Transformando ideias em soluções digitais impactantes</p>
          <div className="hero-buttons">
            <a href="/projects" className="btn-primary">Ver Projetos</a>
            <a href="/contact" className="btn-secondary">Entrar em Contato</a>
          </div>
        </div>

        <div className="skills-section">
          <h2>Habilidades Técnicas</h2>
          <p className="section-description">
            Domínio completo do ecossistema web, desde a estrutura HTML até frameworks modernos
          </p>

          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">🌐</div>
              <h3>HTML & Semântica</h3>
              <p>Criação de estruturas semânticas, acessíveis e otimizadas para SEO. Domínio de tags modernas, microdados e validação W3C.</p>
              <div className="skill-level">
                <span className="level-text">Avançado</span>
                <div className="level-bar">
                  <div className="level-fill" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">🎨</div>
              <h3>CSS & Design</h3>
              <p>Estilização responsiva, animações CSS, Grid, Flexbox e variáveis CSS. Foco em UX/UI e performance.</p>
              <div className="skill-level">
                <span className="level-text">Avançado</span>
                <div className="level-bar">
                  <div className="level-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">⚡</div>
              <h3>Bootstrap</h3>
              <p>Desenvolvimento responsivo com Bootstrap, customização de temas, componentes e utilitários. Grid system e breakpoints.</p>
              <div className="skill-level">
                <span className="level-text">Avançado</span>
                <div className="level-bar">
                  <div className="level-fill" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">🚀</div>
              <h3>JavaScript</h3>
              <p>JavaScript moderno, async/await, promises, manipulação de DOM, APIs REST e programação funcional.</p>
              <div className="skill-level">
                <span className="level-text">Avançado</span>
                <div className="level-bar">
                  <div className="level-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">⚛️</div>
              <h3>React.js</h3>
              <p>Desenvolvimento de SPA com React, Hooks, Context API, React Router, gerenciamento de estado e componentes funcionais.</p>
              <div className="skill-level">
                <span className="level-text">Avançado</span>
                <div className="level-bar">
                  <div className="level-fill" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">📱</div>
              <h3>Responsividade</h3>
              <p>Design mobile-first, media queries, testes em múltiplos dispositivos e foco em experiência do usuário em todas as telas.</p>
              <div className="skill-level">
                <span className="level-text">Avançado</span>
                <div className="level-bar">
                  <div className="level-fill" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Tecnologias - Versão Corrigida */}
        <div className="technologies-section">
          <h2>Frameworks & Ferramentas</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-icon html">HTML</div>
              <span>Estrutura Web</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon css">CSS</div>
              <span>Estilização</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon bootstrap">BS</div>
              <span>Bootstrap</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon react">React</div>
              <span>React.js</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon node">Node</div>
              <span>Node.js</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon git">Git</div>
              <span>Versionamento</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon figma">Figma</div>
              <span>Design UI/UX</span>
            </div>
          </div>
        </div>

        {/* Seção sobre metodologia Bootstrap */}
        <div className="bootstrap-section">
          <div className="bootstrap-content">
            <div className="bootstrap-text">
              <h2>Metodologia Bootstrap</h2>
              <p>
                Utilizo <strong>Bootstrap </strong> como framework CSS para acelerar o desenvolvimento
                mantendo qualidade e consistência. Minha expertise inclui:
              </p>
              <ul className="bootstrap-list">
                <li>Grid system responsivo</li>
                <li>Componentes customizados</li>
                <li>Utilitários e helpers</li>
                <li>Integração com React</li>
                <li>Otimização de performance</li>
                <li>Temas personalizados</li>
              </ul>
              <p className="bootstrap-note">
                Combino Bootstrap com CSS puro para criar interfaces únicas e eficientes.
              </p>
            </div>
            <div className="bootstrap-image">
              <div className="bootstrap-card">
                <div className="bootstrap-card-header">
                  <div className="bootstrap-dot red"></div>
                  <div className="bootstrap-dot yellow"></div>
                  <div className="bootstrap-dot green"></div>
                </div>
                <div className="bootstrap-card-body">
                  <div className="bootstrap-grid">
                    <div className="bootstrap-col"></div>
                    <div className="bootstrap-col"></div>
                    <div className="bootstrap-col"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
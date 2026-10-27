import React from 'react';
import { Link } from 'react-router-dom';
import Hero3D from '../../components/Hero3D/Hero3D';
import TiltCard from '../../components/TiltCard/TiltCard';
import ApiPlayground from '../../components/ApiPlayground/ApiPlayground';
import './Home.css';

const skills = [
  { icon: '🌐', title: 'HTML & Semântica', level: 95, text: 'Criação de estruturas semânticas, acessíveis e otimizadas para SEO. Domínio de tags modernas, microdados e validação W3C.' },
  { icon: '🎨', title: 'CSS & Design', level: 90, text: 'Estilização responsiva, animações CSS, Grid, Flexbox e variáveis CSS. Foco em UX/UI e performance.' },
  { icon: '⚡', title: 'Bootstrap', level: 92, text: 'Desenvolvimento responsivo com Bootstrap, customização de temas, componentes e utilitários. Grid system e breakpoints.' },
  { icon: '🚀', title: 'JavaScript', level: 90, text: 'JavaScript moderno, async/await, promises, manipulação de DOM, APIs REST e programação funcional.' },
  { icon: '⚛️', title: 'React.js', level: 88, text: 'Desenvolvimento de SPA com React, Hooks, Context API, React Router, gerenciamento de estado e componentes funcionais.' },
  { icon: '📱', title: 'Responsividade', level: 94, text: 'Design mobile-first, media queries, testes em múltiplos dispositivos e foco em experiência do usuário em todas as telas.' },
];

const tools = [
  { cls: 'html', label: 'HTML', text: 'Estrutura Web' },
  { cls: 'css', label: 'CSS', text: 'Estilização' },
  { cls: 'bootstrap', label: 'BS', text: 'Bootstrap' },
  { cls: 'react', label: 'React', text: 'React.js' },
  { cls: 'python', label: 'Py', text: 'Python' },
  { cls: 'node', label: 'Node', text: 'Node.js' },
  { cls: 'git', label: 'Git', text: 'Versionamento' },
  { cls: 'figma', label: 'Figma', text: 'Design UI/UX' },
];

const learning = [
  { icon: '📱', title: 'React Native', text: 'Desenvolvimento de aplicativos móveis multiplataforma (iOS e Android) usando os mesmos conceitos do React.' },
  { icon: '🛠️', title: 'Expo', text: 'Ferramentas e serviços do ecossistema Expo para acelerar o desenvolvimento e a publicação de apps React Native.' },
  { icon: '🗄️', title: 'Back-End', text: 'Construção de APIs em Python, autenticação e integração com bancos de dados para dar suporte completo às aplicações.' },
];

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="hero-section">
          <Hero3D />
          <h1 className="hero-title">Desenvolvedor FullStack</h1>
          <p className="hero-subtitle">Transformando ideias em soluções digitais impactantes do front-end ao back-end</p>
          <div className="hero-buttons">
            <Link to="/Projects" className="btn-primary">Ver Projetos</Link>
            <Link to="/contact" className="btn-secondary">Entrar em Contato</Link>
          </div>
        </div>

        <div className="skills-section">
          <h2>Habilidades Técnicas</h2>
          <p className="section-description">
            Domínio completo do ecossistema web, desde a estrutura HTML até frameworks modernos
          </p>

          <div className="skills-grid">
            {skills.map((skill, i) => (
              <TiltCard key={skill.title} delay={(i % 3) * 90}>
                <div className="skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.title}</h3>
                  <p>{skill.text}</p>
                  <div className="skill-level">
                    <span className="level-text">Avançado</span>
                    <div className="level-bar">
                      <div className="level-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        <div className="backend-section">
          <h2>Back-End em Python</h2>
          <p className="section-description">
            Este portfólio tem um servidor próprio em Python. Teste a API ao vivo: ela conta visitas,
            serve os projetos e recebe as mensagens do formulário de contato.
          </p>
          <ApiPlayground />
        </div>

        <div className="technologies-section">
          <h2>Frameworks & Ferramentas</h2>
          <div className="tech-grid">
            {tools.map((tool) => (
              <div className="tech-item" key={tool.cls}>
                <div className={`tech-icon ${tool.cls}`}>{tool.label}</div>
                <span>{tool.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="learning-section">
          <h2>Em Estudo</h2>
          <p className="section-description">
            Tecnologias que estou aprendendo agora para expandir do front-end para mobile e back-end
          </p>

          <div className="learning-grid">
            {learning.map((item, i) => (
              <TiltCard key={item.title} delay={i * 90}>
                <div className="learning-card">
                  <div className="learning-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="learning-badge">Estudando</span>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

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

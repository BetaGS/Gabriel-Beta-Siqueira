import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce de Confeitaria',
      description: 'Plataforma de e-commerce para venda de produtos de confeitaria',
      technologies: ['Bootstrap', 'HTML', 'CSS', 'JavaScript'],
      image: '/images/docemila.png',
      link: 'https://betags.github.io/docemila/'
    },
    {
      id: 2,
      title: 'Calculadora Online',
      description: 'Calculadora Básica: Realiza as quatro operações fundamentais: adição (+), subtração (-), multiplicação (x) e divisão (/). Geralmente inclui funções como porcentagem (%), raiz quadrada ($\sqrt{}$), e botões de memória',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/calculadora.png',
      link: 'https://betags.github.io/calculadora/'
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      description: 'Dashboard para análise de dados com gráficos interativos',
      technologies: ['React', 'D3.js', 'Express'],
      image: 'https://via.placeholder.com/400x250/3498db/ffffff?text=Dashboard',
      link: '#'
    },
    {
      id: 4,
      title: 'Rede Social',
      description: 'Plataforma social com perfis, posts e mensagens',
      technologies: ['React', 'GraphQL', 'PostgreSQL'],
      image: 'https://via.placeholder.com/400x250/9b59b6/ffffff?text=Social+Network',
      link: '#'
    },
    {
      id: 5,
      title: 'App de Clima',
      description: 'Aplicativo de previsão do tempo com localização',
      technologies: ['React', 'API REST', 'CSS Modules'],
      image: 'https://via.placeholder.com/400x250/2ecc71/ffffff?text=Weather+App',
      link: '#'
    },
    {
      id: 6,
      title: 'Blog Pessoal',
      description: 'Blog com sistema de comentários e administração',
      technologies: ['Next.js', 'Sanity.io', 'Tailwind'],
      image: 'https://via.placeholder.com/400x250/e74c3c/ffffff?text=Personal+Blog',
      link: '#'
    }
  ];

  return (
    <div className="projects">
      <div className="container">
        <h1 className="projects-title">Meus Projetos</h1>
        <p className="projects-subtitle">Confira alguns dos meus trabalhos recentes</p>
        
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link">Ver Projeto →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
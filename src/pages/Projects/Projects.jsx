import React, { useState } from 'react';
import { projects, categories } from '../../data/projects';
import TiltCard from '../../components/TiltCard/TiltCard';
import PhoneShowcase from '../../components/PhoneShowcase/PhoneShowcase';
import './Projects.css';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Apps mobile ganham uma exposição interativa em destaque; os demais ficam na grade de cards.
  const mobileProjects = filteredProjects.filter((project) => project.category === 'mobile');
  const gridProjects = filteredProjects.filter((project) => project.category !== 'mobile');

  return (
    <div className="projects">
      <div className="container">
        <h1 className="projects-title">Meus Projetos</h1>
        <p className="projects-subtitle">Confira alguns dos meus trabalhos recentes</p>

        <div className="projects-filters">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {mobileProjects.map((project) => (
          <PhoneShowcase key={project.id} project={project} />
        ))}

        {gridProjects.length > 0 && (
          <div className="projects-grid">
            {gridProjects.map((project, index) => (
              <TiltCard key={project.id} delay={(index % 3) * 90} radius={10}>
                <div className="project-card">
                  <div className="project-image">
                    {project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : (
                      <div className="project-image-placeholder" aria-hidden="true">{project.icon || '🛠️'}</div>
                    )}
                    <span className={`category-badge category-${project.category}`}>
                      {categories.find((c) => c.value === project.category)?.label}
                    </span>
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-technologies">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      Ver Projeto →
                    </a>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <p className="projects-empty">Nenhum projeto nessa categoria ainda. Em breve!</p>
        )}
      </div>
    </div>
  );
};

export default Projects;

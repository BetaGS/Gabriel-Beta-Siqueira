import React, { useState } from 'react';
import { projects, categories } from '../../data/projects';
import './Projects.css';

const AppleIcon = () => (
  <svg viewBox="0 0 384 512" className="store-icon" fill="currentColor" aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 8 184.8 8 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 37.6 59 129.3 107.2 127.8 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-84.1 102.6-121.8-65.2-30.7-65.7-90-65.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

const PlayStoreIcon = () => (
  <svg viewBox="0 0 512 512" className="store-icon" fill="currentColor" aria-hidden="true">
    <path d="M99 8.5C93 14 88 22.5 88 34v444c0 11.5 5 20 11 25.5l1 1L327 256 100 9.5l-1-1z"/>
    <path d="M405 208l-63.5-37-70 85 70 85 63.6-37c19-11 19-49 0-96z" opacity=".85"/>
    <path d="M341.5 256l-241.5 247c6.7 3 15 2.5 24-2.5l246-142z" opacity=".7"/>
    <path d="M341.5 256l70-85-246-142c-9-5-17.3-5.5-24-2.5z" opacity=".55"/>
  </svg>
);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

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

        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => {
              const isMobile = project.category === 'mobile';
              const hasStoreLinks = isMobile && (project.appStoreLink || project.playStoreLink);

              return (
                <div key={project.id} className={`project-card ${isMobile ? 'project-card-mobile' : ''}`}>
                  {isMobile ? (
                    <div className="phone-mockup-wrap">
                      <span className={`category-badge category-${project.category}`}>
                        {categories.find((c) => c.value === project.category)?.label}
                      </span>
                      <div className="phone-frame">
                        <div className="phone-notch"></div>
                        <div className="phone-screen">
                          <img src={project.image} alt={project.title} />
                        </div>
                        <div className="phone-home-bar"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                      <span className={`category-badge category-${project.category}`}>
                        {categories.find((c) => c.value === project.category)?.label}
                      </span>
                    </div>
                  )}
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-technologies">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    {hasStoreLinks ? (
                      <div className="store-links">
                        {project.appStoreLink && (
                          <a
                            href={project.appStoreLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="store-btn store-btn-apple"
                          >
                            <AppleIcon />
                            <span>
                              <small>Baixar na</small>
                              App Store
                            </span>
                          </a>
                        )}
                        {project.playStoreLink && (
                          <a
                            href={project.playStoreLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="store-btn store-btn-google"
                          >
                            <PlayStoreIcon />
                            <span>
                              <small>Disponível no</small>
                              Google Play
                            </span>
                          </a>
                        )}
                      </div>
                    ) : (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        Ver Projeto →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="projects-empty">Nenhum projeto nessa categoria ainda. Em breve!</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
